//-----------------------------------------------------------------------------
// apps/core-bank-simulator/src/core-account-blocks/core-accounts-blocks.service.ts
//-----------------------------------------------------------------------------
import { Injectable }                   from '@nestjs/common'

import { CreateCoreAccountsBlockDto }   from './dto/create-core-accounts-block.dto'
import { CoreAccountsDBService }        from '../core-bank-db/core-accounts-db.service'

import { CoreSimulatorService }         from '@app/core-simulator'
import { WinstonLoggerService }         from '@app/winston-logger'

/**
 * @class CoreAccountsBlocksService
 */
@Injectable()
export class CoreAccountsBlocksService {
  private accountsDB: CoreAccountsDBService

  constructor(
    private readonly logger:        WinstonLoggerService,
    private readonly coreService:   CoreSimulatorService,
  ) {
    this.accountsDB = CoreAccountsDBService.instance(logger)
  }

  /**
   * @method create
   */
  async create(accountId: string, createAccountBlockDto: CreateCoreAccountsBlockDto) {
    try {
      const blocks = await this.accountsDB.createCoreAccountsBlock(accountId, createAccountBlockDto)
      const result = {
        blocks: blocks,
      }
      this.logger.log(`Blocked account id=[${accountId}] with block= %o`, createAccountBlockDto)

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
      const blocks = await this.accountsDB.findAllCoreAccountsBlocks(accountId)
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
    try {
      const blocks = await this.accountsDB.removeCoreAccountsBlock(accountId, accountBlockId)
      const result = {
        blocks: blocks,
      }
      this.logger.log(`Removed account block id=[${accountBlockId}] for account, id=[${accountId}]`)

      return result
    }
    catch(error) {
      throw(error)
    }
  }
} // end of class AccountBlocksService
