//-----------------------------------------------------------------------------
// apps/core-bank-simulator/src/accounts/accounts.service.ts
//-----------------------------------------------------------------------------
import { Injectable }             from '@nestjs/common'
import { v4 as uuidv4 }           from 'uuid'
import { faker }                  from '@faker-js/faker'

import { CreateAccountDto }       from './dto/create-core-account.dto'

import { 
  AccountStatus, 
  IAccount, 
  ICreateAccountDto, 
  IUpdateAccountDto 
}                                 from '@app/baas-interfaces'
import { CoreAccountsDBService }  from '../core-bank-db/core-accounts-db.service'
import { WinstonLoggerService }   from '@app/winston-logger'

/**
 * @class AccountsService
 */
@Injectable()
export class AccountsService {
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
  async create(createAccountDto: CreateAccountDto) {
    try {
      // Create the account
      const account = this.buildAccount(createAccountDto)
      
      // Add the account to the DB and return it to caller
      const response = await this.accountsDB.add(account)
      const result   = {
        data: response,
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
        data: accounts
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
        data: account,
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
  async update(accountId: string, updateAccountDto: IUpdateAccountDto) {
    try {
      const account = await this.accountsDB.update(accountId, updateAccountDto)
      const result  = {
        data: account
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
  private buildAccount(createAccountDto: ICreateAccountDto) : IAccount {
    /*
     * Build the account
     */
    let account = {
      id:                     uuidv4(),
      branch_id:              uuidv4(),
      account_number:         faker.finance.account(),
      routing_number:         faker.finance.routingNumber(),
      account_status:         AccountStatus.Open,
      // currency:               Currency.USD,
      multiple_participants:  createAccountDto.participants.length > 1 ? true : false,
      ...createAccountDto,
      available_balance:      0,
      posted_balance:         0,
      created_at:             new Date(),
      updated_at:             new Date(),
    }
    
    this.logger.log(`Built account= %o`, account)

    return <IAccount>account
  }

} // end of class AccountsService