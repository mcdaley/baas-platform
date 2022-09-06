//-----------------------------------------------------------------------------
// apps/baas-account-service/src/customers/customers.service.ts
//-----------------------------------------------------------------------------
import { Injectable }           from '@nestjs/common'
import { ConfigService }        from '@nestjs/config'
import axios                    from 'axios'

import { 
  CustomerStatus, 
  ICreateAccountDto, 
  ICustomer, 
  ICreateParticipantDto, 
  ParticipantRole 
}                               from '@app/baas-interfaces'
import { 
  BaaSErrors, 
  BadRequestError, 
  createBaaSException, 
  BaaSErrorLabel,
  InactiveCustomerError 
}                               from '@app/baas-errors'
import { WinstonLoggerService } from '@app/winston-logger'

/**
 * @class CustomersService
 */
@Injectable()
export class CustomersService {
  private customersServiceUrl: string

  constructor(
    private readonly configService: ConfigService,
    private readonly logger:        WinstonLoggerService,
  ) {
    this.customersServiceUrl = configService.get('customersUrl')
  }

  /**
   * Verify the account participant customers are valid customers by
   * fetching each participant customer and checking its status. If 
   * the customer is not "active" then return by reject with an
   * InactiveCustomerError. If all the participants are active then
   * return an array of the customers.
   * 
   * @method verifyCustomers
   */
  public async verifyCustomers(
    participants: ICreateParticipantDto[],
    axiosConfig:  any) : Promise<ICustomer[]> 
  {
    let customerRequests = this.buildCustomerRequests(participants, axiosConfig)
    try {
      const response  = await Promise.all(customerRequests)
      const customers = response.map( (res) => {
        const  { customer } = res.data
        return customer
      })
      this.logger.log({
        message: `Fetched [${customers.length}] account participants`
      })

      return customers
    }
    catch(error) {
      this.logger.error({
        message:  `Failed to fetch all of the customers from baas-customer-service`, 
        error:    error
      })
      throw(error)
    }
  }

  /**
   * Build and array of axios requests to "GET /api/v1/customers/:customerId", so 
   * that I can use to validate all of the account participants in the create
   * account request. 
   * 
   * @method buildCustomerRequests
   */
  private buildCustomerRequests(participants, axiosConfig) {
    let requests = participants.map( (p) => {
      let url     = `${this.customersServiceUrl}/${p.customer_id}`
      let request = axios.get(url, axiosConfig)

      this.logger.log({
        message:  `Call baas-customer-service to verify customer id = ${p.customer_id} is active`,
        url:      url,
      })

      return request
    })

    return requests
  }

  /**
   * Find the account owner/holder in the createAccountDto. An account needs
   * an owner/holder in order to be created and it is required that the
   * account holder be defined in the "participants" of the createAccountDto.
   * Return the account holder if it is found, otherwise return a 
   * BadRequest error.
   * 
   * @method findAccountHolder
   */
  public findAccountHolder(
    createAccountDto:     ICreateAccountDto, 
    participantCustomers: ICustomer[]) : Promise<ICustomer> 
  {
    return new Promise( (resolve, reject) => {
      try {
        const holderParticipant = createAccountDto.participants.find( participant => 
          participant.participant_role === ParticipantRole.Holder
        )
        if(holderParticipant === undefined) {
          return reject(new BadRequestError(
            BaaSErrors.account.badRequest,
            `Account does not have a participant with status equal to "holder"`
          ))
        }

        const holder = participantCustomers.find( customer => 
          customer.id === holderParticipant.customer_id
        )

        if(holder === undefined) {
          return reject(new BadRequestError(
            BaaSErrors.account.badRequest,
            `Account does not have a participant with status equal to "holder"`
          ))
        }

        this.logger.log({
          message: `Account holder/owner is customer id = ${holder.id}`
        })

        resolve(holder)
      }
      catch(error) {
        this.logger.error({
          message:  `Failed to validate customers rquired to create account, error= %o`, 
          error:    error
        })
        reject(createBaaSException(error, BaaSErrorLabel.Account))
      }
    })
  }
} // end of class CustomersService