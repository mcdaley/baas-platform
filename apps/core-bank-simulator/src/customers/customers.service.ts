//----------------------------------------------------------------------------------
// apps/core-bank-simulator/src/customers/customer.service.ts
//---------------------------------------------------------------------------------
import { Injectable }             from '@nestjs/common'
import { InjectRepository }       from '@nestjs/typeorm'
import { Repository }             from 'typeorm'

import { CreateCustomerDto }      from './dto/create-customer.dto'
import { UpdateCustomerDto }      from './dto/update-customer.dto'
import { Customer }               from './entities/customer.entity'

import { 
  CustomerStatus, 
  ICustomer, 
}                                 from '@app/baas-interfaces'
import { WinstonLoggerService }   from '@app/winston-logger'

/**
 * @class CustomersService
 */
@Injectable()
export class CustomersService {
  /**
   * @method constructor
   */
  constructor(
    @InjectRepository(Customer) private customerRepository: Repository<Customer>,
    private readonly logger:      WinstonLoggerService,
  ) {}

  /**
   * @method create
   */
  async create(createCustomerDto: CreateCustomerDto) : Promise<any> {
    try {
      // Create the customer
      let customer: Customer = {
        status:     CustomerStatus.Pending,
        ...createCustomerDto,
      }

      // Add the customer to the DB
      const response = await this.customerRepository.save(customer)
      const result   =  {
        data: response
      }

      this.logger.log(`Created customer, result= %o`, result)
      return result
    }
    catch(error) {
      this.logger.error(`Failed to create customer, error= %o`, error)
      throw(error)
    }
  }

  /**
   * @method findAll
   */
  async findAll() {
    try {
      // Set up default pagination
      let start_index = 0
      let take        = 2
      let end_index   = start_index + take
      let is_more     = true

      // Query the DB
      const response = await this.customerRepository.findAndCount({
        relations:  ['physical_address', 'mailing_address'],
        skip:       start_index,
        take:       take,
      })
      const customers = response[0]
      const count     = response[1]

      // Reset pagination
      if(start_index + take > count) {
        is_more   = false
        end_index = count -1
      }

      // Compose and return the result object
      const result = {
        data:     customers,
        metadata: {
          pagination: {
            count:        count,
            start_index:  start_index,
            end_index:    end_index,
            is_more:      is_more,
          }
        }
      }

      this.logger.log(`Fetched [${customers.length}] customers`)
      return result
    }
    catch(error) {
      this.logger.error(`Failed to fetch customers, error= %o`, error)
      throw(error)
    }
  }

  /**
   * @method findOne
   */
  async findOne(customerId: string) {
    try {
      const customer = await this.customerRepository.findOne({
        where:      {id: customerId},
        relations:  ['physical_address', 'mailing_address'],
      })

      const result = {
        data: customer,
      }

      this.logger.log(`Fetched customer`)
      return result
    }
    catch(error) {
      this.logger.log(`Failed to fetch customer id=[${customerId}], error= %o`, error)
      throw(error)
    }
  }

  /**
   * Updates a customer by using the repository "save" method which correctly
   * handles the updating of the embedded physical and mailing address objects
   * in the json request. If the physical or mailing address exists then the
   * API request needs to specify the address id, otherwise the method will
   * create a new address and link it to the customer.
   * 
   * @method update
   */
  async update(customerId: string, updateCustomerDto: UpdateCustomerDto) {
    ///////////////////////////////////////////////////////////////////////////
    // BUG: 07/07/2022
    // The update method only returns the fields that were updated, even w/ 
    // the "reload" option set to true. 
    ///////////////////////////////////////////////////////////////////////////
    try {
      const updateCustomer = await this.customerRepository.create({
        id: customerId, ...updateCustomerDto
      })
      const response = await this.customerRepository.save(updateCustomer, {reload: true})
      const customer = await this.customerRepository.findOne({
        where:      {id: customerId},
        relations:  ['physical_address', 'mailing_address'],
      })

      this.logger.log(`Update the customer= %o`, customer)
      const result = {
        data: customer,
      }

      return result
    }
    catch(error) {
      this.logger.error(`Failed to update the customer id=${customerId}, error= %o`, error)
      throw(error)
    }
  }

  /**
   * @method remove
   */
  async remove(customerId: string) {
    ///////////////////////////////////////////////////////////////////////////
    // BUG: 7/7/22
    // I cannot get the delete to cascade and remove the corresponding
    // customer addresses. No need to worry about it now because the app
    // should not delete customers.
    ///////////////////////////////////////////////////////////////////////////
    try {
      const response = await this.customerRepository.delete(customerId)
      this.logger.log(`Deleted customer id=${customerId}, response= %o`, response)
      
      const result   = {
        data: response,
      }
      return result
    }
    catch(error) {
      this.logger.error(`Failed to delete the customer id=${customerId}, error= %o`, error)
      throw(error)
    }
  }

} // end of class CustomersService
