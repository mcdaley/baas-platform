//-----------------------------------------------------------------------------
// apps/baas-account-service/src/blocks/account-blocks.service.ts
//-----------------------------------------------------------------------------
import { Injectable }             from '@nestjs/common'

import { CreateAccountBlockDto }  from './dto/create-account-block.dto'

import { CoreSimulatorService }   from '@app/core-simulator'
import { WinstonLoggerService }   from '@app/winston-logger'

/**
 * @class AccountBlocksService
 */
@Injectable()
export class AccountBlocksService {
  constructor(
    private readonly logger:        WinstonLoggerService,
    private readonly coreService:   CoreSimulatorService,
  ) {}

  /**
   * @method create
   */
  async create(accountId: string, createAccountBlockDto: CreateAccountBlockDto) {
    this.logger.log(`Block account id=[${accountId}] with block= %o`, createAccountBlockDto)
    try {
      const blocks = await this.coreService.createAccountBlock(accountId, createAccountBlockDto)
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
  async findAll(accountId: string) {
    this.logger.log(`Get account blocks for account id=[${accountId}]`)
    try {
      const blocks = await this.coreService.findAllAccountBlocks(accountId)
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
   * @method remove
   */
  async remove(accountId: string, accountBlockId: string) {
    this.logger.log(`Remove account block id=[${accountBlockId}] for account, id=[${accountId}]`)
    try {
      const blocks = await this.coreService.removeAccountBlock(accountId, accountBlockId)
      const result = {
        blocks: blocks,
      }

      return result
    }
    catch(error) {
      throw(error)
    }
  }
} // end of class AccountBlocksService
