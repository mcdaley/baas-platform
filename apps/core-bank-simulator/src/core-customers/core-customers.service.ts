//-----------------------------------------------------------------------------
// apps/core-bank-simulator/src/core-customers/core-customer.service.ts
//-----------------------------------------------------------------------------
import { Injectable }             from '@nestjs/common'
import { plainToClass }           from 'class-transformer'
import { v4 as uuidv4 }           from 'uuid'

import { CreateCoreCustomerDto }  from './dto/create-core-customer.dto'
import { UpdateCoreCustomerDto }  from './dto/update-core-customer.dto'
import { CoreCustomer }           from './entities/core-customer.entity'

import { 
  NotFoundError,
  BaaSErrors, 
  BaaSExceptionFactory,
  BaaSException,
  BadRequestError, 
}                                 from '@app/baas-errors'
import { 
  CustomerStatus, 
  ICustomer, 
}                                 from '@app/baas-interfaces'
import { WinstonLoggerService }   from '@app/winston-logger'
import { CoreCustomersDBService } from '../core-bank-db/core-customers-db.service'
import { throwIfEmpty } from 'rxjs'

@Injectable()
export class CoreCustomersService {
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
  async create(createCoreCustomerDto: CreateCoreCustomerDto) : Promise<any> {
    try {
      // Create the customer
      let customer        = plainToClass(CoreCustomer, createCoreCustomerDto)
      customer.id         = uuidv4()
      customer.branch_id  = uuidv4()
      customer.status     = CustomerStatus.Pending

      // Add the customer to the DB
      const response = await this.customersDB.add(customer)
      const result   = {
        customer: response,
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
        customers: customers,
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
        customer: customer,
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
  async update(customerId: string, updateCoreCustomerDto: UpdateCoreCustomerDto) {
    try {
      const customer = await this.customersDB.update(customerId, updateCoreCustomerDto)
      const result   = {
        customer: customer,
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

} // end of class CoreCustomersService
