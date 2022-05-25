//-----------------------------------------------------------------------------
// apps/baas-debit-card-service/src/debit-cards/debit-cards.service.ts
//-----------------------------------------------------------------------------
import { Injectable }                   from '@nestjs/common'
import { ConfigService }                from '@nestjs/config'
import axios                            from 'axios'

import { CreateDebitCardDto }           from './dto/create-debit-card.dto'
import { UpdateDebitCardDto }           from './dto/update-debit-card.dto'

import { createBaaSException }          from '@app/baas-errors'
import { WinstonLoggerService }         from '@app/winston-logger'

/**
 * @class DebitCardsService
 */
@Injectable()
export class DebitCardsService {
  simulatorUrl : string

  /**
   * @constructor
   */
  constructor(
    private readonly configService  : ConfigService,
    private readonly logger         : WinstonLoggerService) 
  {
    this.simulatorUrl = configService.get(`bankSimulatorDebitCardsUrl`)
  }

  /**
   * @method create
   */
  async create(createDebitCardDto: CreateDebitCardDto) {
    try {
      const response  = await axios.post(this.simulatorUrl, createDebitCardDto)
      const debitCard = response.data.data
      const result    = {
        debit_card: debitCard
      }
      
      this.logger.log(`Created debit card, sending response= %o`, result)
      return result
    }
    catch(error) {
      throw(createBaaSException(error, 'Debit Card'))
    }
  }

  /**
   * @method findAll
   */
  async findAll() {
    try {
      const response      = await axios.get(this.simulatorUrl)
      const debitCardList = response.data.data
      const result        = {
        debit_cards: debitCardList,
      }
      this.logger.log(`Fetched [${debitCardList.length}] debit cards, response= %o`, result)
      
      return result
    }
    catch(error) {
      throw(createBaaSException(error, 'Debit Card'))
    }
  }

  /**
   * @method findOne
   */
  async findOne(debitCardId: string) {
    try {
      const url       = `${this.simulatorUrl}/${debitCardId}`
      const response  = await axios.get(url)
      const debitCard = response.data.data
      const result    = {
        debit_card: debitCard,
      }
      this.logger.log(`Fetched debit card w/ id=[${debitCardId}], sending response= %o`, result)
      
      return result
    }
    catch(error) {
      this.logger.error(`Failed to find debit card, error= %o`, error)
      throw(createBaaSException(error, 'Debit Card'))
    }
  }

  /**
   * @method update
   */
  async update(debitCardId: string, updateDebitCardDto: UpdateDebitCardDto) {
    try {
      const url       = `${this.simulatorUrl}/${debitCardId}`
      const response  = await axios.patch(url, updateDebitCardDto)
      const debitCard = response.data.data
      const result    = {
        debit_card: debitCard,
      }

      return result
    }
    catch(error) {
      this.logger.error(`Failed to update debit card id=${debitCardId}, error= %o`, error)
      throw(createBaaSException(error, 'Debit Card'))
    }
  }

  //* remove(debitCardId: string) {
  //*   return `This action removes a ${debitCardId} debitCard`
  //* }
}
