//-----------------------------------------------------------------------------
// apps/baas-debit-card-service/src/customers/customers.service.ts
//-----------------------------------------------------------------------------
import { Injectable }           from '@nestjs/common'
import { ConfigService }        from '@nestjs/config'
import axios                    from 'axios'

import { 
  CustomerStatus, 
  ICustomer, 
}                               from '@app/baas-interfaces'
import { 
  BaaSErrors, 
  createBaaSException, 
  InactiveAccountError, 
}                               from '@app/baas-errors'
import { WinstonLoggerService } from '@app/winston-logger'

/**
 * @class CustomersService
 */
@Injectable()
export class CustomersService {
  private customersServiceUrl : string

  constructor(
    private readonly configService : ConfigService,
    private readonly logger        : WinstonLoggerService,
  ) {
    this.customersServiceUrl = this.configService.get('customersUrl')
  }

  /**
   * Fetch and return a customer from baas-customer-service and verify that 
   * the customer is active. If the customer is not active then throw an error.
   * 
   * @method verifyCustomer
   */
  public verifyCustomer(customerId: string) : Promise<ICustomer> {
    return new Promise( async (resolve, reject) => {
      try {
        const url = `${this.customersServiceUrl}/${customerId}`
        this.logger.log(`GET ${url}`)

        const response     = await axios.get(url)
        const { customer } = response.data

        if(customer.status !== CustomerStatus.Active) {
          const message = 
            `Unable to issue debit card because customer id=[${customerId}] is ` +
            `not ${CustomerStatus.Active}, the customer status=${customer.status}` 
          this.logger.error(message)
          
          return reject(
            new InactiveAccountError(BaaSErrors.debitCard.inactiveCustomer, message)
          )
        }

        resolve(customer)
      }
      catch(error) {
        reject(createBaaSException(error))
      }
    })
  }
} // end of class CustomersService