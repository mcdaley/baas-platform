//-----------------------------------------------------------------------------
// apps/baas-debit-card-service/src/accounts/accounts.service.ts
//-----------------------------------------------------------------------------
import { Injectable }           from '@nestjs/common'
import { ConfigService }        from '@nestjs/config'
import axios                    from 'axios'

import { 
  AccountStatus, 
  IAccount, 
}                               from '@app/baas-interfaces'
import { 
  BaaSErrors, 
  createBaaSException, 
  InactiveAccountError, 
}                               from '@app/baas-errors'
import { WinstonLoggerService } from '@app/winston-logger'

/**
 * @class AccountsService
 */
@Injectable()
export class AccountsService {
  private accountsServiceUrl : string

  constructor(
    private readonly configService : ConfigService,
    private readonly logger        : WinstonLoggerService,
  ) {
    this.accountsServiceUrl = this.configService.get('accountsUrl')
  }

  /**
   * Fetch and return an account from baas-account-service and verify that 
   * the account is active. If the account is not active then throw an error.
   * 
   * @method verifyAccount
   */
  public verifyAccount(accountId: string) : Promise<IAccount> {
    return new Promise( async (resolve, reject) => {
      try {
        const url = `${this.accountsServiceUrl}/${accountId}`
        this.logger.log(`GET ${url}`)

        const response    = await axios.get(url)
        const { account } = response.data

        if(account.account_status !== AccountStatus.Open) {
          const message = 
            `Unable to issue debit card because account id=[${accountId}] is ` +
            `not ${AccountStatus.Open}, the account status=${account.account_status}` 
          this.logger.error(message)
          
          return reject(
            new InactiveAccountError(BaaSErrors.debitCard.inactiveAccount, message)
          )
        }

        resolve(account)
      }
      catch(error) {
        reject(createBaaSException(error))
      }
    })
  }
} // end of class AccountsService