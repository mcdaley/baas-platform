//-----------------------------------------------------------------------------
// apps/core-bank-simulator/src/debit-cards/debit-cards.service.ts
//-----------------------------------------------------------------------------
import { Injectable }               from '@nestjs/common'
import { InjectRepository }         from '@nestjs/typeorm'
import { Repository }               from 'typeorm'
import faker                        from '@faker-js/faker'

import { CreateDebitCardDto }       from './dto/create-debit-card.dto'
import { UpdateDebitCardDto }       from './dto/update-debit-card.dto'
import { DebitCard }                from './entities/debit-card.entity'

import { 
  CardStatus, 
  IDebitCard, 
}                                   from '@app/baas-interfaces'
import { 
  BaaSErrorLabel, 
  BaaSErrors, 
  createBaaSException,
  NotFoundError, 
}                                   from '@app/baas-errors'
import { WinstonLoggerService }     from '@app/winston-logger'

/**
 * @class DebitCardsService
 */
@Injectable()
export class DebitCardsService {
  /**
   * @constructor
   */
  constructor(
    @InjectRepository(DebitCard) private debitCardRepository: Repository<DebitCard>,
    private readonly logger: WinstonLoggerService,
  ) {}

  /**
   * @method create
   */
  async create(createDebitCardDto: CreateDebitCardDto, tenantId: string) {
    try {
      // Create the debit card
      const debitCard = this.buildDebitCard(createDebitCardDto, tenantId)
      
      // Add the debit card to the DB and return it to caller
      const response = await this.debitCardRepository.save(debitCard)
      const result   = {
        data: response,
      }

      this.logger.log({
        message: `Issued debit card`,
      })
      return result
    }
    catch(error) {
      this.logger.error({
        message:  `Failed to create debit card`, 
        error:    error
      })
      throw(createBaaSException(error, BaaSErrorLabel.DebitCard))
    }
  }

  /**
   * @method findAll
   */
  async findAll(customerId: string, tenantId: string) {
    try {
      // Set up default pagination
      let start_index = 0
      let take        = 2
      let end_index   = start_index + take
      let is_more     = true

      // Query the DB
      const response = await this.debitCardRepository.findAndCount({
        where:      {customer_id: customerId, tenant_id: tenantId},
        relations:  ['account', 'blocks'],
        skip:       start_index,
        take:       take,
      })
      const debitCards = response[0]
      const count      = response[1]

      // Reset pagination
      if(start_index + take > count) {
        is_more   = false
        end_index = count - 1
      }

      // Compose and return the result object
      const result = {
        data:     debitCards,
        metadata: {
          pagination: {
            count:        count,
            start_index:  start_index,
            end_index:    end_index,
            is_more:      is_more,
          }
        }
      }

      this.logger.log({
        message: `Fetched [${count}] debit cards`,
      })
      return result
    }
    catch(error) {
      this.logger.error({
        message:  `Failed to fetch debit cards`, 
        error:    error
      })
      throw(createBaaSException(error, BaaSErrorLabel.DebitCard))
    }
  }

  /**
   * @method findOne
   */
  async findOne(debitCardId: string, customerId: string, tenantId: string) {
    try {
      const debitCard = await this.debitCardRepository.findOne({
        where:            {id: debitCardId, customer_id: customerId, tenant_id: tenantId},
        relations:        ['blocks'],
        //* loadRelationIds:  true,
        //* relations:        ['account', 'customer', 'blocks']
      })

      if(debitCard == null) {
        throw(new NotFoundError(BaaSErrors.debitcard.notFound, `Debit card id = ${debitCardId}`))
      }

      const result   = {
        data: debitCard
      }

      this.logger.log({
        message:  `Fetched debit card id=[${debitCardId}]`,
      })
      return result
    }
    catch(error) {
      this.logger.error({
        message:  `Failed to fetch debit card id=[${debitCardId}]`,
        error:    error,
      })
      throw(createBaaSException(error, BaaSErrorLabel.DebitCard))
    }
  }

  /**
   * Update a debit card and then fetch and return the updated debit card.
   * 
   * @method update
   */
  async update(
    debitCardId:        string, 
    updateDebitCardDto: UpdateDebitCardDto,
    customerId:         string,
    tenantId:           string) 
  {
    try {
      const response = await this.debitCardRepository.update(
        {
          id:           debitCardId, 
          customer_id:  customerId, 
          tenant_id:    tenantId
        }, 
        updateDebitCardDto
      )

      // Update failed - debit card is not found
      if(response.affected === 0) {
        throw(new NotFoundError(BaaSErrors.debitcard.notFound, `Debit card id = ${debitCardId}`))
      }

      const debitCard = await this.debitCardRepository.findOne({
        where: {id: debitCardId},
      })

      const result   = {
        data: debitCard
      }

      this.logger.log({
        message: `Updated debit card id=[${debitCardId}]`,
      })
      return result
    }
    catch(error) {
      this.logger.error({
        message:  `Failed to update debit card id=[${debitCardId}]`,
        error:    error,
      })
      throw(createBaaSException(error, BaaSErrorLabel.DebitCard))
    }
  }

  /**
   * @method remove
   */
  async remove(
    debitCardId: string,
    customerId:  string,
    tenantId:    string) 
  {
    try {
      const response = await this.debitCardRepository.delete(debitCardId)

      // Delete failed - debit card is not found
      if(response.affected === 0) {
        throw(new NotFoundError(BaaSErrors.debitcard.notFound, `Debit card id = ${debitCardId}`))
      }

      const result   = {
        data: response
      }

      this.logger.log({
        message: `Deleted debit card id=[${debitCardId}]`,
      })
      return result
    }
    catch(error) {
      this.logger.error({
        message:  `Failed to delete debit card id=[${debitCardId}]`, 
        error:    error
      })
      throw(createBaaSException(error, BaaSErrorLabel.DebitCard))
    }
  }

  /**
   * Helper method to build the fake debit card from the create debit card DOT
   * for the simulator.
   * 
   * @function buildDebitCard
   */
  private buildDebitCard(createDebitCardDto, tenantId) {
    const debitCard = {
      name_on_card:         createDebitCardDto.name_on_card ? createDebitCardDto.name_on_card : 'Joe Ferguson',
      card_number:          faker.finance.creditCardNumber(),
      expiration_date:      `07/25`,
      cvv:                  faker.finance.creditCardCVV(),
      status:               CardStatus.Active,
      pin:                  ``,
      atm_daily:            500,
      pos_daily:            800,
      daily_transactions:   10,
      tenant_id:            tenantId,
      customer_id:          createDebitCardDto.customer_id,
      account_id:           createDebitCardDto.account_id,
    }

    return debitCard
  }
}
