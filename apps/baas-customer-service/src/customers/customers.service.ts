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
        
import { 
  ICustomerListResponse, 
  ICustomerResponse, 
}                               from '@app/baas-interfaces'
import { 
  createBaaSException,
  BaaSErrorLabel,
}                               from '@app/baas-errors'
import { WinstonLoggerService } from '@app/winston-logger'

/**
 * @class CustomersService
 */
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

  /**
   * @method create
   */
  async create(
    createCustomerDto: CreateCustomerDto,
    requestHeaders:    any) : Promise<ICustomerResponse> 
  {
    try {
      const axiosConfig = {
        headers: requestHeaders,
      }
      const response  = await axios.post(this.coreCustomerUrl, createCustomerDto, axiosConfig)
      const customer  = response.data.data
      const result    = {
        customer: customer,
      }
      this.logger.log(`Created customer, sending response= %o`, result)
      
      return result
    }
    catch(error) {
      this.logger.error(`Failed to create customer error= %o`, error)
      throw(createBaaSException(error, BaaSErrorLabel.Customer))
    }
  }

  /**
   * @method findAll
   */
  async findAll(requestHeaders: any) : Promise<ICustomerListResponse> {
    try {
      const axiosConfig = { headers: requestHeaders }
      const response    = await axios.get(this.coreCustomerUrl, axiosConfig)
      const customers   = response.data.data
      const metadata    = response.data.metadata
      const result      = {
        customers: customers,
        metadata:  metadata,
      }
      this.logger.log(`Fetched [%d] customers`, customers.length)

      return result
    }
    catch(error) {
      throw(createBaaSException(error, BaaSErrorLabel.Customer))
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
  async findOne(customerId: string, requestHeaders: any) : Promise<ICustomerResponse> {
    try {
      const url         = `${this.coreCustomerUrl}/${customerId}`
      const axiosConfig = { headers: requestHeaders }
      const response    = await axios.get(url, axiosConfig)
      const customer    = response.data.data
      
      const result = {
        customer: customer,
      }

      this.logger.log(`Fetched customer, result= %o`, result)
      return result
    }
    catch(error) {
      throw(createBaaSException(error, BaaSErrorLabel.Customer))
    }
  }

  /**
   * @method update
   */
  async update(
    customerId:        string, 
    updateCustomerDto: UpdateCustomerDto, 
    requestHeaders:    any) : Promise<ICustomerResponse> 
  {
    try {
      const url         = `${this.coreCustomerUrl}/${customerId}`
      const axiosConfig = { headers: requestHeaders }
      const response    = await axios.patch(url, updateCustomerDto, axiosConfig)
      const customer    = response.data.data
      
      const result = {
        customer: customer
      }
      return result
    }
    catch(error) {
      this.logger.error(`Failed to updated customer id=[${customerId}], error= %o`, error)
      throw(createBaaSException(error, BaaSErrorLabel.Customer))
    }
  }

  /**
   * @method remove
   */
  async remove(customerId: string, requestHeaders: any) {
    try {
      const url         = `${this.coreCustomerUrl}/${customerId}`
      const axiosConfig = { headers: requestHeaders }
      await axios.delete(url, axiosConfig)
      
      const result = {
        customer: customerId
      }
      return result
    }
    catch(error) {
      this.logger.error(`Failed to remove customer id=[${customerId}], error= %o`, error)
      throw(createBaaSException(error, BaaSErrorLabel.Customer))
    }
  }
}
