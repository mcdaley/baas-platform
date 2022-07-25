//---------------------------------------------------------------------------------------
// apps/core-bank-simulator/src/accounts/blocks/accounts-blocks.service.ts
//---------------------------------------------------------------------------------------
import { Injectable }                   from '@nestjs/common'
import { InjectRepository }             from '@nestjs/typeorm'
import { Repository }                   from 'typeorm'

import { AccountBlock }                 from '../entities/account-block.entity'
import { Account }                      from '../entities/account.entity'
import { CreateAccountsBlockDto }       from '../dto/create-accounts-block.dto'

import { 
  AccountBlockStatus, 
  AccountStatus 
}                                       from '@app/baas-interfaces'
import { WinstonLoggerService }         from '@app/winston-logger'

/**
 * @class AccountsBlocksService
 */
@Injectable()
export class AccountsBlocksService {

  constructor(
    @InjectRepository(AccountBlock) private accountBlockRepository: Repository<AccountBlock>,
    @InjectRepository(Account)      private accountRepository: Repository<Account>,
    private readonly logger: WinstonLoggerService,
  ) {}

  /**
   * Add a block to an account and update the account status to blocked.
   * 
   * @method create
   */
  async create(accountId: string, createAccountBlockDto: CreateAccountsBlockDto) {
    try {
      const block    = {
        account_id:   accountId, 
        block_status: AccountBlockStatus.Active,
        ...createAccountBlockDto,
      }
      const response      = await this.accountBlockRepository.save(block)
      const accountStatus = await this.accountRepository.update(
        { id:             accountId },
        { account_status: AccountStatus.Blocked }
      )

      const result   = {
        data: response,
      }

      this.logger.log(`Blocked account id=[${accountId}], result= %o`, result)
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
      const blocks = await this.accountBlockRepository.find({
        where: { account_id: accountId },
        order: { created_at: 'DESC'},
      })

      const result = {
        data: blocks,
      }

      this.logger.log(`Fetched blocks for account id=[${accountId}], result= %o`, result)
      return result
    }
    catch(error) {
      throw(error)
    }
  }

  /**
   * Remove block from an account and set the account status to open.
   * 
   * @method remove
   */
  async remove(accountId: string, accountBlockId: string) {
    try {
      const block  = {
        account_id:   accountId, 
        id:           accountBlockId, 
        block_status: AccountBlockStatus.Canceled
      }
      const response      = await this.accountBlockRepository.save(block)
      const accountStatus = await this.accountRepository.update(
        { id:             accountId },
        { account_status: AccountStatus.Open }
      )

      const result = {
        data: response,
      }

      this.logger.log(`Removed account block id=[${accountBlockId}] for account, id=[${accountId}]`)
      return result
    }
    catch(error) {
      throw(error)
    }
  }
} // end of class AccountBlocksService
