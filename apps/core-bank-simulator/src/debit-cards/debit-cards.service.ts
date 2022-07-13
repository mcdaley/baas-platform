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
  async create(createDebitCardDto: CreateDebitCardDto) {
    try {
      // Create the debit card
      const debitCard = this.buildDebitCard(createDebitCardDto)
      this.logger.log(`Created debit card= %o`, debitCard)
      
      // Add the debit card to the DB and return it to caller
      const response = await this.debitCardRepository.save(debitCard)
      const result   = {
        data: response,
      }

      this.logger.log(`Issued debit card, result= %o`, result)
      return result
    }
    catch(error) {
      this.logger.error(`Failed to create debit card, error= %o`, error)
      throw error
    }
  }

  /**
   * @method findAll
   */
  async findAll() {
    try {
      // Set up default pagination
      let start_index = 0
      let take        = 2
      let end_index   = start_index + take
      let is_more     = true

      // Query the DB
      const response = await this.debitCardRepository.findAndCount({
        relations:  ['account'],
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

      this.logger.log(`Fetched [${count}] debit cards, result= %o`, result)
      return result
    }
    catch(error) {
      this.logger.error(`Failed to fetch debit cards, error= %o`, error)
      throw error
    }
  }

  /**
   * @method findOne
   */
  async findOne(debitCardId: string) {
    try {
      const debitCard = await this.debitCardRepository.findOne({
        where:            {id: debitCardId},
        //* loadRelationIds:  true,
        //* relations:        ['account', 'customer']
      })

      const result   = {
        data: debitCard
      }

      this.logger.log(`Fetched debit card id=[${debitCardId}], result= %o`, result)
      return result
    }
    catch(error) {
      this.logger.error(`Failed to fetch debit card id=[${debitCardId}], error= %o`)
      throw error
    }
  }

  /**
   * Update a debit card and then fetch and return the updated debit card.
   * 
   * @method update
   */
  async update(debitCardId: string, updateDebitCardDto: UpdateDebitCardDto) {
    try {
      const response  = await this.debitCardRepository.update({id: debitCardId}, updateDebitCardDto)
      const debitCard = await this.debitCardRepository.findOne({
        where: {id: debitCardId},
      })

      const result   = {
        data: debitCard
      }

      this.logger.log(`Updated debit card id=[${debitCardId}], result= %o`, result)
      return result
    }
    catch(error) {
      this.logger.error(`Failed to update debit card id=[${debitCardId}], error= %o`)
      throw error
    }
  }

  /**
   * @method remove
   */
  async remove(debitCardId: string) {
    try {
      const response = await this.debitCardRepository.delete(debitCardId)
      const result   = {
        data: response
      }

      this.logger.log(`Deleted debit card id=[${debitCardId}]`)
      return result
    }
    catch(error) {
      this.logger.error(`Failed to delete debit card id=[${debitCardId}], error= %o`)
      throw error
    }
  }

  /**
   * Helper method to build the fake debit card from the create debit card DOT
   * for the simulator.
   * 
   * @function buildDebitCard
   */
  private buildDebitCard(createDebitCardDto) : IDebitCard {
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
      customer_id:          createDebitCardDto.customer_id,
      account_id:           createDebitCardDto.account_id,
    }

    return debitCard
  }
}
