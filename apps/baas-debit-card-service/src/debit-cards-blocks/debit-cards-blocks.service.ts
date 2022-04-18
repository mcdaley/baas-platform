//-----------------------------------------------------------------------------
// apps/baas-debit-card-service/src/debit-cards-blocks/debit-cards-blocks.service.ts
//-----------------------------------------------------------------------------
import { Injectable }               from '@nestjs/common'

import { CreateDebitCardsBlockDto } from './dto/create-debit-cards-block.dto'

import { WinstonLoggerService }     from '@app/winston-logger'
import { CoreDebitCardSimulator }   from '@app/core-simulator'

/**
 * @class DebitCardsBlocksService
 */
@Injectable()
export class DebitCardsBlocksService {
  constructor(
    private readonly logger:              WinstonLoggerService,
    private readonly debitCardSimulator:  CoreDebitCardSimulator,
  ) {}

  /**
   * @method create
   */
  async create(
    debitCardId:              string, 
    createDebitCardsBlockDto: CreateDebitCardsBlockDto
  ) {
    this.logger.log(`Block debit card id=[${debitCardId}], w/ block= %o`, createDebitCardsBlockDto)
    try {
      const blocks = await this.debitCardSimulator.createDebitCardBlocks(debitCardId, createDebitCardsBlockDto)
      const result = {
        blocks: blocks,
      }

      return result
    }
    catch(error) {
      throw(error)
    }
  }

  /**
   * @method findAll
   */
  async findAll(debitCardId: string) {
    try {
      const blocks = await this.debitCardSimulator.findAllDebitCardBlocks(debitCardId)
      const result = {
        blocks: blocks
      }
      
      return result
    }
    catch(error) {
      throw(error)
    }
  }

  /**
   * @method remove
   */
  async remove(debitCardId: string, blockId: string) {
    try {
      const  blocks = await this.debitCardSimulator.removeDebitCardBlocks(debitCardId, blockId)
      const result = {
        blocks: blocks
      }

      return result
    }
    catch(error) {
      throw(error)
    }
  }
}
