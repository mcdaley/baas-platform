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
  IParticipant, 
  ParticipantRole 
}                               from '@app/baas-interfaces'
import { 
  BaaSErrors, 
  BadRequestError, 
  createBaaSException, 
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
  public verifyCustomers(participants: IParticipant[]) : Promise<ICustomer[]> {
    return new Promise( async (resolve, reject) => {
      try {
        let participantCustomers: ICustomer[] = []

        for(let i = 0; i < participants.length; i++) {
          let customerId    = participants[i].participant_customer_id
          let url           = `${this.customersServiceUrl}/${customerId}`
          this.logger.log(`GET ${url}`)

          let response      = await axios.get(url)
          let customer      = response.data.data
          
          if(customer.status !== CustomerStatus.Active) {
            this.logger.warn(`CustomerId=[${customerId}] is not active, status=[${customer.status}]`)

            return reject(new InactiveCustomerError(
              BaaSErrors.account.inactiveCustomer,
              `Customer id=[${customerId}] is not active, customer status=[${customer.status}]`
            ))
          }
          else {
            participantCustomers.push(customer)
          }
        }
        this.logger.log(`Account participants are all active`)

        resolve(participantCustomers)
      }
      catch(error) {
        reject(createBaaSException(error))
      }
    })
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
          customer.id === holderParticipant.participant_customer_id
        )

        if(holder === undefined) {
          return reject(new BadRequestError(
            BaaSErrors.account.badRequest,
            `Account does not have a participant with status equal to "holder"`
          ))
        }

        resolve(holder)
      }
      catch(error) {
        reject(createBaaSException(error))
      }
    })
  }
} // end of class CustomersService