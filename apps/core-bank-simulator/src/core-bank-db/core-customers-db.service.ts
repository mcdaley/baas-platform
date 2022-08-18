//-----------------------------------------------------------------------------
// apps/core-bank-simulator/src/core-bank-db/core-customers-db.service.ts
//-----------------------------------------------------------------------------
import { Injectable }           from '@nestjs/common'

import { 
  BaaSErrors, 
  NotFoundError, 
  BaaSException, 
  createBaaSException, 
  BaaSErrorLabel,
}                               from '@app/baas-errors'
import { 
  ICustomer, 
  IUpdateCustomerDto 
}                               from '@app/baas-interfaces'
import { WinstonLoggerService } from '@app/winston-logger'

@Injectable()
export class CoreCustomersDBService {
  private static  _default:       CoreCustomersDBService
  private         coreCustomers:   Map<string, ICustomer>

  /**
   * @method constructor
   */
  constructor(private readonly logger: WinstonLoggerService) {
    this.coreCustomers = new Map<string, ICustomer>()
  }

  /**
   * @method instance
   */
  static instance(logger: WinstonLoggerService): CoreCustomersDBService {
    if(!CoreCustomersDBService._default) {
      CoreCustomersDBService._default = new CoreCustomersDBService(logger)
    }
    return CoreCustomersDBService._default
  }

  /**
   * @method add
   */
  public add(customer: ICustomer) : Promise<ICustomer> {
    return new Promise( (resolve, reject) => {
      try {
        this.coreCustomers.set(customer.id, customer)
        this.logger.log(`CustomersDB: added customer= %o`, customer)

        resolve(customer)
      }
      catch(error) {
        reject(createBaaSException(error, BaaSErrorLabel.Customer))
      } 
    })
  }

  /**
   * @method has
   */
  public has(customerId: string) : Promise<boolean> {
    return new Promise( (resolve, reject) => {
      try {
        const result = this.coreCustomers.has(customerId) ? true : false
        resolve(result)
      }
      catch(error) {
        reject(createBaaSException(error, BaaSErrorLabel.Customer))
      }
    })
  }

  /**
   * @method findAll
   */
  public findAll() : Promise<ICustomer[]> {
    return new Promise( (resolve, reject) => {
      try {
        let customerList: ICustomer[] = []
        for(let customer of this.coreCustomers.values()) {
          customerList.push(customer)
        }

        resolve(customerList)
      }
      catch(error) {
        reject(createBaaSException(error, BaaSErrorLabel.Customer))
      }
    })
  }

  /**
   * @method findOne
   */
  public findOne(customerId: string) : Promise<ICustomer> {
    return new Promise( async (resolve, reject) => {
      try {
        if(!await this.has(customerId)) {
          reject(this.customerNotFound(customerId))
        }
    
        const customer = this.coreCustomers.get(customerId)
        resolve(customer)
      }
      catch(error) {
        reject(createBaaSException(error, BaaSErrorLabel.Customer))
      }
    })
  }

  /**
   * @method update
   */
  public update(
    customerId:             string, 
    updateCoreCustomerDto:  IUpdateCustomerDto ) : Promise<ICustomer> 
  {
    return new Promise( async (resolve, reject) => {
      try {
        if(!await this.has(customerId)) {
          reject(this.customerNotFound(customerId))
        }
    
        const customer = {
          ...this.coreCustomers.get(customerId),
          ...updateCoreCustomerDto
        }
        this.coreCustomers.set(customer.id, customer)
    
        resolve(customer)
      }
      catch(error) {
        reject(createBaaSException(error, BaaSErrorLabel.Customer))
      }
    })
  }

  /**
   * @method remove
   */
  public remove(customerId: string) : Promise<boolean> {
    this.logger.log(`Remove customer id=[${customerId}]`)
    
    return new Promise( async (resolve, reject) => {
      try {
        if(!await this.has(customerId)) {
          reject(this.customerNotFound(customerId))
        }
    
        this.coreCustomers.delete(customerId)
        resolve(true)
      }
      catch(error) {
        reject(createBaaSException(error, BaaSErrorLabel.Customer))
      }
    })
  }

  /**
   * @method customerNotFound
   */
   private customerNotFound(customerId: string): BaaSException {
    this.logger.error(`Customer w/ id=${customerId} Not Found`)
    return new NotFoundError(
      BaaSErrors.customer.notFound, 
      `Customer w/ id=${customerId} Not Found`
    )
  }
} // end of class CoreCustomersDBService