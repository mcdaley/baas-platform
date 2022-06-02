//-----------------------------------------------------------------------------
// src/customers/customers.service.ts
//-----------------------------------------------------------------------------
import { 
  Injectable
}                               from '@nestjs/common'
import axios                    from 'axios'
import { ConfigService }        from '@nestjs/config'

import { CreateCustomerDto }    from './dto/create-customer.dto'
import { UpdateCustomerDto }    from './dto/update-customer.dto'
        
import { WinstonLoggerService } from '@app/winston-logger'
import { createBaaSException }  from '@app/baas-errors'
import { ICustomerListResponse, ICustomerResponse } from '@app/baas-interfaces'

@Injectable()
export class CustomersService {
  private coreCustomerUrl: string

  constructor(
    private readonly configService: ConfigService,
    private readonly logger:        WinstonLoggerService,
  ) {
    this.coreCustomerUrl = `${configService.get('bankSimulatorCustomersUrl')}`
    this.logger.log(`Initialized the Customer Simulator URL= %s`, this.coreCustomerUrl)
  }

  async create(createCustomerDto: CreateCustomerDto) : Promise<ICustomerResponse> {
    try {
      const response  = await axios.post(this.coreCustomerUrl, createCustomerDto)
      const customer  = response.data.data
      const result    = {
        customer: customer,
      }
      this.logger.log(`Created customer, sending response= %o`, result)
      
      return result
    }
    catch(error) {
      this.logger.error(`Error= %o`, error)
      throw(createBaaSException(error, 'Customer'))
    }
  }

  async findAll() : Promise<ICustomerListResponse> {
    try {
      const response  = await axios.get(this.coreCustomerUrl)
      const customers = response.data.data
      const result    = {
        customers: customers,
      }
      this.logger.log(`Fetched [%d] customers`, customers.length)

      return result
    }
    catch(error) {
      throw(createBaaSException(error, 'Customer'))
    }
  }

  /////////////////////////////////////////////////////////////////////////////
  // TODO: 3/19/2022
  // Attempt to use rxjs observables to handle the response from the
  // httpService. I'm going to come back to this later when I have a basic
  // understanding of rxjs and observables.
  //
  // This returns the Customers[] but I'm unable to create the object 
  // { customers: customers[] } that I want in the response.
  /////////////////////////////////////////////////////////////////////////////
  //* findAllV2() {
  //*   const  response = this.bankCustomer.findAllV2()
  //*   return response
  //* }

  /**
   * @method findOne
   * 
   * Search for a customer by Id and return the customer. If the customer is not found
   * return a 404 Not Found response.
   */
  async findOne(customerId: string) {
    try {
      const url      = `${this.coreCustomerUrl}/${customerId}`
      const response = await axios.get(url)
      const customer = response.data.data
      
      const result = {
        customer: customer,
      }
      return result
    }
    catch(error) {
      throw(createBaaSException(error, 'Customer'))
    }
  }

  /**
   * @method update
   */
  async update(customerId: string, updateCustomerDto: UpdateCustomerDto) {
    try {
      const url      = `${this.coreCustomerUrl}/${customerId}`
      const response = await axios.patch(url, updateCustomerDto)
      const customer = response.data.data
      
      const result   = {
        customer: customer
      }
      return result
    }
    catch(error) {
      throw(createBaaSException(error, 'Customer'))
    }
  }

  /**
   * @method remove
   */
  async remove(customerId: string) {
    try {
      const url = `${this.coreCustomerUrl}/${customerId}`
      await axios.delete(url)
      
      const result = {
        customer: customerId
      }
      return result
    }
    catch(error) {
      throw(createBaaSException(error, 'Customer'))
    }
  }
}
