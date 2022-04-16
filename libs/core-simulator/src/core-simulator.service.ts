//-----------------------------------------------------------------------------
// libs/core-simulator/src/core-simulator.service.ts
//-----------------------------------------------------------------------------
import { Injectable }           from '@nestjs/common'
import { v4 as uuidv4 }         from 'uuid'

import { CoreBank }             from './core-bank'
import { 
  AccountType,
  AccountStatus,
  ICreateAccountDto,
  IAccount,
  IUpdateAccountDto,
}                               from '@app/baas-interfaces'
import { 
  BaaSErrors, 
  BaaSException, 
  BaaSExceptionFactory,
  NotFoundError, 
}                               from '@app/baas-errors'
import { WinstonLoggerService } from '@app/winston-logger'


/**
 * @class CoreSimulatorService
 */
@Injectable()
export class CoreSimulatorService {
  private coreBank: CoreBank

  constructor(private readonly logger: WinstonLoggerService) {
    this.coreBank = CoreBank.instance()
  }

  /**
   * Helper method to build the account from the CreateAccountDto.
   * 
   * @method buildAccount
   */
   private buildAccount(accountParams: ICreateAccountDto) : IAccount {
    let account: IAccount = {
      id:                     uuidv4(),
      branch_id:              uuidv4(),
      account_number:         '1111-2222-3333',
      routing_number:         '5555-6666',
      account_status:         AccountStatus.Open,
      account_type:           AccountType.Checking,
      //* currency:              Currency.USD,
      name_on_account:        'Marv Levy',
      nickname:               '',
      multiple_participants:  false,
      available_balance:      0,
      posted_balance:         0,
      created_at:             new Date(),
      updated_at:             new Date(),
      ...accountParams,
    }
    this.logger.log(`Built account= %o`, account)

    return account
  }

  /**
   * @method create
   */
  public create(createAccountDto: ICreateAccountDto) : Promise<IAccount> {
    this.logger.log(`Create new DDA account w/ createAccountDto= %o`, createAccountDto)

    return new Promise( (resolve, reject) => {
      try {
        const account = this.buildAccount(createAccountDto)
        this.coreBank.setAccount(account.id, account)

        resolve(account)
      }
      catch(error) {
        reject(BaaSExceptionFactory.create(error, `Account`))
      }
    })
  }

  /**
   * @method findAll
   */
  public findAll(): Promise<IAccount[]> {
    return new Promise( (resolve, reject) => {
      try {
        const accounts: IAccount[] = this.coreBank.getAccounts()
        resolve(accounts)
      }
      catch(error) {
        reject(BaaSExceptionFactory.create(error, `Account`))
      }
    })
  }

  /**
   * @method findOne
   */
  public findOne(accountId: string) : Promise<IAccount> {
    ///////////////////////////////////////////////////////////////////////////
    // START HERE
    ///////////////////////////////////////////////////////////////////////////
    return new Promise( (resolve, reject) => {
      try {
        if(!this.coreBank.hasAccount(accountId)) {
          // Account is Not Found
          return reject(this.accountNotFound(accountId))
        }

        const account = this.coreBank.getAccount(accountId)
        this.logger.log(`Fetched account= %o`, account)

        resolve(account)
      }
      catch(error) {
        reject(BaaSExceptionFactory.create(error, `Account`))
      }
    })
  }

  /**
   * @method update
   */
  public update(
    accountId:        string,
    updateAccountDto: IUpdateAccountDto) : Promise<IAccount> 
  {
    return new Promise( (resolve, reject) => {
      try {
        if(!this.coreBank.hasAccount(accountId)) {
          // Account is Not Found
          return reject(this.accountNotFound(accountId))
        }

        this.coreBank.updateAccount(accountId, updateAccountDto)
        const account = this.coreBank.getAccount(accountId)

        resolve(account)
      }
      catch(error) {
        reject(BaaSExceptionFactory.create(error, `Account`))
      }
    })
  }

  /**
   * @method remove
   */
  public remove(accountId: string) : Promise<boolean> {
    return new Promise( (resolve, reject) => {
      try {
        if(!this.coreBank.hasAccount(accountId)) {
          // Account is Not Found
          return reject(this.accountNotFound(accountId))
        }
        this.logger.log(`Remove the account id=[${accountId}]`)

        this.coreBank.removeAccount(accountId)
        resolve(true)
      }
      catch(error) {
        reject(BaaSExceptionFactory.create(error, `Account`))
      }
    })
  }

  /**
   * @method accountNotFound
   */
  private accountNotFound(accountId: string): BaaSException {
    this.logger.error(`Account w/ id=${accountId} Not Found`)
    return new NotFoundError(
      BaaSErrors.account.notFound, 
      `Account w/ id=${accountId} Not Found`
    )
  }

} // end of class CoreSimulatorService
