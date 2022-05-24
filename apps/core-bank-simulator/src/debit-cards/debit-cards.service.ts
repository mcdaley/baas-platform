//-----------------------------------------------------------------------------
// apps/core-bank-simulator/src/debit-cards/debit-cards.service.ts
//-----------------------------------------------------------------------------
import { Injectable }               from '@nestjs/common'
import { ConfigService }            from '@nestjs/config'
import faker                        from '@faker-js/faker'

import { CreateDebitCardDto }       from './dto/create-debit-card.dto'
import { UpdateDebitCardDto }       from './dto/update-debit-card.dto'
import { CoreDebitCardsDBService }  from '../core-bank-db/core-debit-cards-db.service'

import { 
  CardStatus, 
  IDebitCard, 
}                                   from '@app/baas-interfaces'
import { uuid }                     from '@app/baas-utils'
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
    private readonly debitCardsDB  : CoreDebitCardsDBService,
    private readonly configService : ConfigService,
    private readonly logger        : WinstonLoggerService) 
  {
    this.debitCardsDB = CoreDebitCardsDBService.instance(logger)
  }

  /**
   * @method create
   */
  async create(createDebitCardDto: CreateDebitCardDto) {
    try {
      // Create the debit card
      const debitCard = this.buildDebitCard(createDebitCardDto)
      
      // Add the debit card to the DB and return it to caller
      const response = await this.debitCardsDB.add(debitCard)
      const result   = {
        data: response,
      }

      return result
    }
    catch(error) {
      throw error
    }
  }

  /**
   * @method findAll
   */
  async findAll() {
    try {
      const response = await this.debitCardsDB.findAll()
      const result   = {
        data: response
      }

      return result
    }
    catch(error) {
      throw error
    }
  }

  /**
   * @method findOne
   */
  async findOne(debitCardId: string) {
    try {
      const response = await this.debitCardsDB.findOne(debitCardId)
      const result   = {
        data: response
      }

      return result
    }
    catch(error) {
      throw error
    }
  }

  /**
   * @method update
   */
  async update(debitCardId: string, updateDebitCardDto: UpdateDebitCardDto) {
    try {
      const response = await this.debitCardsDB.update(debitCardId, updateDebitCardDto)
      const result   = {
        data: response
      }

      return result
    }
    catch(error) {
      throw error
    }
  }

  /**
   * @method remove
   */
  async remove(debitCardId: string) {
    try {
      const response = await this.debitCardsDB.remove(debitCardId)
      const result   = {
        result: response
      }
    }
    catch(error) {
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
      id:                   uuid(),
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
