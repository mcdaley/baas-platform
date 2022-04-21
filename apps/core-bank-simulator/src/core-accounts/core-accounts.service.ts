//-----------------------------------------------------------------------------
// apps/core-bank-simulator/src/core-accounts/core-accounts.service.ts
//-----------------------------------------------------------------------------
import { Injectable }             from '@nestjs/common'
import { plainToClass }           from 'class-transformer'
import { v4 as uuidv4 }           from 'uuid'
import { faker }                  from '@faker-js/faker'

import { CreateCoreAccountDto }   from './dto/create-core-account.dto'
import { UpdateCoreAccountDto }   from './dto/update-core-account.dto'
import { CoreAccount }            from './entities/core-account.entity'

import { CoreAccountsDBService }  from '../core-bank-db/core-accounts-db.service'
import { WinstonLoggerService }   from '@app/winston-logger'
import axios from 'axios'
import { BaaSExceptionFactory } from '@app/baas-errors'
import { AccountStatus, IAccount, ICreateAccountDto, IUpdateAccountDto } from '@app/baas-interfaces'

@Injectable()
export class CoreAccountsService {
  /**
   * @method constructor
   */
  constructor(
    private readonly accountsDB: CoreAccountsDBService,
    private readonly logger:     WinstonLoggerService) 
  {
    this.accountsDB = CoreAccountsDBService.instance(logger)
  }

  /**
   * @method create
   */
  async create(createCoreAccountDto: CreateCoreAccountDto) {
    try {
      // Create the account
      const account = this.buildAccount(createCoreAccountDto)
      
      // Add the account to the DB and return it to caller
      const response = await this.accountsDB.add(account)
      const result   = {
        account: response,
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
  async findAll() {
    try {
      const accounts = await this.accountsDB.findAll()
      const result   = {
        accounts: accounts
      }

      return result
    }
    catch(error) {
      throw(error)
    }
  }

  /**
   * @method findOne 
   */
  async findOne(accountId: string) {
    try {
      const account = await this.accountsDB.findOne(accountId)
      const result  = {
        account: account,
      }

      return result
    }
    catch(error) {
      throw(error)
    }
  }

  /**
   * @method update
   */
  async update(accountId: string, updateCoreAccountDto: IUpdateAccountDto) {
    try {
      const account = await this.accountsDB.update(accountId, updateCoreAccountDto)
      const result  = {
        account: account
      }

      return account
    }
    catch(error) {
      throw(error)
    }
  }

  /**
   * @method remove
   */
  async remove(accountId: string) {
    try {
      const  result = await this.accountsDB.remove(accountId)
      return result
    }
    catch(error) {
      throw(error)
    }
  }

  /**
   * @method buildAccount
   */
  private buildAccount(createCoreAccountDto: ICreateAccountDto) : IAccount {
    /*
     * Build the account
     */
    let account = plainToClass(CoreAccount, createCoreAccountDto)

    account.id                      = uuidv4()
    account.branch_id               = uuidv4()
    account.account_number          = faker.finance.account()
    account.routing_number          = faker.finance.routingNumber()
    account.account_status          = AccountStatus.Open
    //* account.currency                = Currency.USD
    account.name_on_account         = 'Marv Levy'
    account.name                    = `Marv Levy - ${createCoreAccountDto.account_type}`
    account.nickname                = ''
    account.multiple_participants   = createCoreAccountDto.participants.length > 1 ? true : false
    account.available_balance       = 0
    account.posted_balance          = 0
    account.created_at              = new Date()
    account.updated_at              = new Date()
    
    this.logger.log(`Built account= %o`, account)

    return account
  }

} // end of class CoreAccountsService