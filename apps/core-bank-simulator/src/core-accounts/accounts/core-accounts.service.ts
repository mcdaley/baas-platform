//-----------------------------------------------------------------------------
// apps/core-bank-simulator/src/core-accounts/accounts/core-accounts.service.ts
//-----------------------------------------------------------------------------
import { Injectable }             from '@nestjs/common'
import { v4 as uuidv4 }           from 'uuid'
import { faker }                  from '@faker-js/faker'

import { CreateCoreAccountDto }   from './dto/create-core-account.dto'

import { 
  AccountStatus, 
  IAccount, 
  ICreateAccountDto, 
  IUpdateAccountDto 
}                                 from '@app/baas-interfaces'
import { CoreAccountsDBService }  from '../../core-bank-db/core-accounts-db.service'
import { WinstonLoggerService }   from '@app/winston-logger'

/**
 * @class CoreAccountsService
 */
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
  private buildAccount(createCoreAccountDto: ICreateAccountDto) : IAccount {
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
      multiple_participants:  createCoreAccountDto.participants.length > 1 ? true : false,
      ...createCoreAccountDto,
      available_balance:      0,
      posted_balance:         0,
      created_at:             new Date(),
      updated_at:             new Date(),
    }
    
    this.logger.log(`Built account= %o`, account)

    return <IAccount>account
  }

} // end of class CoreAccountsService