//-----------------------------------------------------------------------------
// apps/core-bank-simulator/src/core-bank-db/core-accounts-db.service.ts
//-----------------------------------------------------------------------------
import { Injectable }           from '@nestjs/common'

import { 
  BaaSErrors, 
  NotFoundError, 
  BaaSException, 
  BaaSExceptionFactory, 
}                               from '@app/baas-errors'
import { 
  IAccount, 
  IUpdateAccountDto 
}                               from '@app/baas-interfaces'
import { WinstonLoggerService } from '@app/winston-logger'

/**
 * @class CoreAccountsDBService
 */
@Injectable()
export class CoreAccountsDBService {
  private static  _default:     CoreAccountsDBService
  private         coreAccounts: Map<string, IAccount>

  /**
   * @method constructor
   */
  constructor(private readonly logger: WinstonLoggerService) {
    this.coreAccounts = new Map<string, IAccount>()
  }

  /**
   * @method instance
   */
  public static instance(logger: WinstonLoggerService) {
    if(!CoreAccountsDBService._default) {
      CoreAccountsDBService._default = new CoreAccountsDBService(logger)
    }
    return CoreAccountsDBService._default
  }

  /**
   * @method add
   */
  public add(account: IAccount) : Promise<IAccount> {
    return new Promise( (resolve, reject) => {
      try {
        this.coreAccounts.set(account.id, account)
        this.logger.log(`AccountsDB: added account= %o`, account)

        resolve(account)
      }
      catch(error) {
        reject(BaaSExceptionFactory.create(error, `Account`))
      }
    })
  }

  /**
   * @method has
   */
  public has(accountId: string) : Promise<boolean> {
    return new Promise( (resolve, reject) => {
      try {
        const result = this.coreAccounts.has(accountId) ? true : false
        resolve(result)
      }
      catch(error) {
        reject(BaaSExceptionFactory.create(error, `Account`))
      }
    })
  }

  /**
   * @method findAll
   */
   public findAll() : Promise<IAccount[]> {
    return new Promise( (resolve, reject) => {
      try {
        let accountList: IAccount[] = []
        for(let account of this.coreAccounts.values()) {
          accountList.push(account)
        }

        resolve(accountList)
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
    return new Promise( async (resolve, reject) => {
      try {
        if(!await this.has(accountId)) {
          return reject(this.accountNotFound(accountId))
        }
    
        const account = this.coreAccounts.get(accountId)
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
    accountId:            string, 
    updateCoreAccountDto: IUpdateAccountDto) : Promise<IAccount> 
  {
    return new Promise( async (resolve, reject) => {
      try {
        if(!await this.has(accountId)) {
          return reject(this.accountNotFound(accountId))
        }

        let account = this.coreAccounts.get(accountId)
        account     = {
          ...account,
          ...updateCoreAccountDto,
        }
        this.coreAccounts.set(account.id, account)

        this.logger.log(`Updated account id=[${accountId}], account= %o`, account)
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
    return new Promise( async (resolve, reject) => {
      try {
        if(!await this.has(accountId)) {
          return reject(this.accountNotFound(accountId))
        }

        this.coreAccounts.delete(accountId)
        this.logger.log(`Deleted account id=${accountId}`)

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
} // end of class CoreAccountsDBService
