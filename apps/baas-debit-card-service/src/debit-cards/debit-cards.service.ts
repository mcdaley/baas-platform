//-----------------------------------------------------------------------------
// apps/baas-debit-card-service/src/debit-cards/debit-cards.service.ts
//-----------------------------------------------------------------------------
import { Injectable }                   from '@nestjs/common'
import { ConfigService }                from '@nestjs/config'
import axios                            from 'axios'

import { CreateDebitCardDto }           from './dto/create-debit-card.dto'
import { UpdateDebitCardDto }           from './dto/update-debit-card.dto'

import { WinstonLoggerService }         from '@app/winston-logger'
import { CoreDebitCardSimulator }       from '@app/core-simulator'

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
    private readonly logger         : WinstonLoggerService,
    private readonly coreService    : CoreDebitCardSimulator
  ) {
    this.simulatorUrl = configService.get(`bankSimulatorDebitCardsUrl`)
  }

  /**
   * @method create
   */
  async create(createDebitCardDto: CreateDebitCardDto) {
    try {
      const response  = await axios.post(this.simulatorUrl, createDebitCardDto)
      const debitCard = response.data
      const result    = {
        debit_card: debitCard
      }
      
      this.logger.log(`Created debit card, sending response= %o`, result)
      return result
    }
    catch(error) {
      throw(error)
    }
  }

  /**
   * @method findAll
   */
  async findAll() {
    try {
      const response      = await axios.get(this.simulatorUrl)
      const debitCardList = response.data
      const result        = {
        debit_cards: debitCardList,
      }
      this.logger.log(`Fetched [${debitCardList.length}] debit cards, response= %o`, result)
      
      return result
    }
    catch(error) {
      throw(error)
    }
  }

  /**
   * @method findOne
   */
  async findOne(debitCardId: string) {
    try {
      const url       = `${this.simulatorUrl}/${debitCardId}`
      const response  = await axios.get(url)
      const debitCard = response.data
      const result    = {
        debit_card: debitCard,
      }
      this.logger.log(`Fetched debit card w/ id=[${debitCardId}], sending response= %o`, result)
      
      return result
    }
    catch(error) {
      throw(error)
    }
  }

  //* update(debitCardId: string, updateDebitCardDto: UpdateDebitCardDto) {
  //*   return `This action updates a #${debitCardId} debitCard`
  //* }

  //* remove(debitCardId: string) {
  //*   return `This action removes a ${debitCardId} debitCard`
  //* }
}
