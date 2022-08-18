//-----------------------------------------------------------------------------
// apps/core-bank-simulator/src/debit-cards/blocks/debit-card-blocks.service.ts
//-----------------------------------------------------------------------------
import { Injectable }                   from '@nestjs/common'
import { InjectRepository }             from '@nestjs/typeorm'
import { Repository }                   from 'typeorm'

import { CreateDebitCardBlockDto }      from '../dto/create-debit-card-block.dto'
import { DebitCardBlock }               from '../entities/debit-card-block.entity'
import { DebitCard }                    from '../entities/debit-card.entity'

import { 
  CardStatus, 
  BlockReason,
}                                       from '@app/baas-interfaces'
import { 
  BaaSErrorLabel, 
  createBaaSException, 
}                                       from '@app/baas-errors'
import { WinstonLoggerService }         from '@app/winston-logger'

/**
 * @class DebitCardBlocksService
 */
@Injectable()
export class DebitCardBlocksService {
  /**
   * @constructor
   */
  constructor(
    @InjectRepository(DebitCardBlock) private debitCardBlockRepository: Repository<DebitCardBlock>,
    @InjectRepository(DebitCard)      private debitCardRepository: Repository<DebitCard>,
    private readonly logger: WinstonLoggerService,
  ) {}

  /**
   * @method create
   */
  async create(debitCardId: string, createDebitCardBlockDto: CreateDebitCardBlockDto) {
    try {
      /////////////////////////////////////////////////////////////////////////
      // BUG: 07/26/2022
      // The CreateDebitCardBlockDto should assign the BlockStatus, so we
      // can control what is blocked on the debit card. Just blocking all
      // transactions for now.
      /////////////////////////////////////////////////////////////////////////
      const block    = {
        debit_card_id:  debitCardId, 
        is_active:      true,
        ...createDebitCardBlockDto,
      }
      const response        = await this.debitCardBlockRepository.save(block)
      const debitCardStatus = await this.debitCardRepository.update(
        { id:     debitCardId },
        { status: CardStatus.Blocked }
      )

      const result   = {
        data: response,
      }

      this.logger.log(`Blocked debit card id=[${debitCardId}], result= %o`, result)
      return result
    }
    catch(error) {
      this.logger.error(`Failed to block debit card id=[${debitCardId}], error= %o`, error)
      throw(createBaaSException(error, BaaSErrorLabel.DebitCard))
    }
  }

  /**
   * @method findAll
   */
  async findAll(debitCardId: string) {
    this.logger.log(`Get blocks for debit card id=[${debitCardId}]`)
    try {
      const blocks = await this.debitCardBlockRepository.find({
        where: { debit_card_id: debitCardId },
        order: { block_date:    'DESC'},
      })

      const result = {
        data: blocks,
      }

      this.logger.log(`Fetched blocks for debit card id=[${debitCardId}], result= %o`, result)
      return result
    }
    catch(error) {
      this.logger.error(`Failed to blocks for debit card id=[${debitCardId}], error= %o`, error)
      throw(createBaaSException(error, BaaSErrorLabel.DebitCard))
    }
  }

  /**
   * @method remove
   */
  async remove(debitCardId: string, debitCardBlockId: string) {
    try {
      const block  = {
        debit_card_id:  debitCardId, 
        id:             debitCardBlockId, 
        is_active:      false
      }
      const response        = await this.debitCardBlockRepository.save(block)
      const debitCardStatus = await this.debitCardRepository.update(
        { id:     debitCardId },
        { status: CardStatus.Active }
      )
      console.log(`[DEBUG] response = `, response)

      const result = {
        data: response,
      }

      this.logger.log(`Removed debit card block id=[${debitCardBlockId}] for debitCard, id=[${debitCardId}]`)
      return result
    }
    catch(error) {
      this.logger.error(`Failed to remove block for debit card id=[${debitCardId}], error= %o`, error)
      throw(createBaaSException(error, BaaSErrorLabel.DebitCard))
    }
  }
}