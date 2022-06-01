//----------------------------------------------------------------------------------
// apps/core-bank-simulator/src/customers/customer.service.ts
//---------------------------------------------------------------------------------
import { Injectable }             from '@nestjs/common'
import { plainToClass }           from 'class-transformer'
import { v4 as uuidv4 }           from 'uuid'

import { CreateCustomerDto }      from './dto/create-customer.dto'
import { UpdateCustomerDto }      from './dto/update-customer.dto'
import { Customer }               from './entities/customer.entity'

import { 
  CustomerStatus, 
  ICustomer, 
}                                 from '@app/baas-interfaces'
import { WinstonLoggerService }   from '@app/winston-logger'
import { CoreCustomersDBService } from '../core-bank-db/core-customers-db.service'

@Injectable()
export class CustomersService {
  /**
   * @method constructor
   */
  constructor(
    private readonly logger:      WinstonLoggerService,
    private readonly customersDB: CoreCustomersDBService) 
    {
      customersDB = CoreCustomersDBService.instance(logger)
    }

  /**
   * @method create
   */
  async create(createCustomerDto: CreateCustomerDto) : Promise<any> {
    try {
      // Create the customer
      let customer: Customer = {
        id:         uuidv4(),
        status:     CustomerStatus.Pending,
        ...createCustomerDto,
      }

      // Add the customer to the DB
      const response = await this.customersDB.add(customer)
      const result   = {
        data: response,
      }

      return result
    }
    catch(error) {
      throw(error)
    }
  }

  /**
   * @method findAll
   */
  async findAll() {
    try {
      const customers = await this.customersDB.findAll()
      const result    = {
        data: customers,
      }

      return result
    }
    catch(error) {
      throw(error)
    }
  }

  /**
   * @method findOne
   */
  async findOne(customerId: string) {
    try {
      const customer = await this.customersDB.findOne(customerId)
      const result   = {
        data: customer,
      }

      return result
    }
    catch(error) {
      throw(error)
    }
  }

  /**
   * @method update
   */
  async update(customerId: string, updateCustomerDto: UpdateCustomerDto) {
    try {
      const customer = await this.customersDB.update(customerId, updateCustomerDto)
      const result   = {
        data: customer,
      }

      return result
    }
    catch(error) {
      throw(error)
    }
  }

  async remove(customerId: string) {
    try {
      const  result = await this.customersDB.remove(customerId) 
      return result
    }
    catch(error) {
      throw(error)
    }
  }

} // end of class CustomersService
