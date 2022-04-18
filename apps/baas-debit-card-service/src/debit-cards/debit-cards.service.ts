//-----------------------------------------------------------------------------
// apps/baas-debit-card-service/src/debit-cards/debit-cards.service.ts
//-----------------------------------------------------------------------------
import { Injectable }                   from '@nestjs/common'

import { CreateDebitCardDto }           from './dto/create-debit-card.dto'
import { UpdateDebitCardDto }           from './dto/update-debit-card.dto'

import { WinstonLoggerService }         from '@app/winston-logger'
import { CoreDebitCardSimulator }       from '@app/core-simulator'

/**
 * @class DebitCardsService
 */
@Injectable()
export class DebitCardsService {
  /**
   * @constructor
   */
  constructor(
    private readonly logger       : WinstonLoggerService,
    private readonly coreService  : CoreDebitCardSimulator
  ) {}

  /**
   * @method create
   */
  async create(createDebitCardDto: CreateDebitCardDto) {
    try {
      const debitCard = await this.coreService.create(createDebitCardDto)
      const result    = {
        debit_card: debitCard,
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
      const debitCardList = await this.coreService.findAll()
      const result        = {
        debit_cards: debitCardList,
      }
      this.logger.log(`Fetched debit cards, sending response= %o`, result)
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
      const debitCard = await this.coreService.findOne(debitCardId)
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

  update(debitCardId: string, updateDebitCardDto: UpdateDebitCardDto) {
    return `This action updates a #${debitCardId} debitCard`
  }

  remove(debitCardId: string) {
    return `This action removes a ${debitCardId} debitCard`
  }
}
