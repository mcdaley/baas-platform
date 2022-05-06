//-----------------------------------------------------------------------------
// apps/baas-customer-service/src/customers/customers.service.spec.ts
//-----------------------------------------------------------------------------
import { 
  Test, 
  TestingModule 
}                               from '@nestjs/testing'
import { ConfigService }        from '@nestjs/config'
import axios                    from 'axios'

import { CustomersService }     from './customers.service'

import { 
  ICreateCustomerDto, 
  CustomerStatus, 
  States,
  ICustomer,
  IUpdateCustomerDto, 
}                               from '@app/baas-interfaces'
import { WinstonLoggerService } from '@app/winston-logger'

// Tell jest to mock all the axios calls.
jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

/**
 * Set mockConfigService using env variables in .jest/set-env-vars.ts
 */
let mockConfigService = new Map()
mockConfigService.set('NODE_ENV', process.env.NODE_ENV)
mockConfigService.set('appRoot',  '.')
mockConfigService.set('appName',  process.env.CUSTOMER_APP_NAME)
mockConfigService.set('logLevel', process.env.CUSTOMER_LOG_LEVEL)
mockConfigService.set('bankSimulatorCustomersUrl', process.env.BANK_SIMULATOR_CUSTOMERS_URL)

/////////////////////////////////////////////////////////////////////////////
// TODO: 05/04/2022
// The customer data inputs is a little weird here becuase the expected
// simulator response is { customer: customer } instead of just the
// customer object. Need to rethink the simulator responses.
/////////////////////////////////////////////////////////////////////////////

/**
 * Customer Test Data
 */
const createCustomerDto : ICreateCustomerDto = {
  branch_id:          `unique-branch-id`,
  first_name:         `Joe`,
  last_name:          `Ferguson`,
  status:             CustomerStatus.Active,
  email:              `joe@bills.com`,
  phone_number:       `716-649-1475`,
  ssn:                `222-33-4444`,
  physical_address: {
    name:             `Joe Ferguson`,
    street_line_1:    `One Bills Drive`,
    city:             `Orchard Park`,
    state:            States.NY,
    postal_code:      `14075`,  
  }
}

const updateCustomerDto : IUpdateCustomerDto = {
  status: CustomerStatus.Blocked,
}

const customer : ICustomer = {
  id:       `unique-id`,
  status:   CustomerStatus.Active,
  ...createCustomerDto,
}

// Define customer response from core-bank-simulator
let customerMessage = { 
  customer: {...customer}
}

let customerListMessage = {
  customers: [customer]
}

/**
 * CustomersService
 */
describe('CustomersService', () => {
  let customersService: CustomersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomersService, 
        { 
          provide:  ConfigService,
          useValue: mockConfigService,
        }, 
        WinstonLoggerService
      ],
    }).compile();

    customersService = module.get<CustomersService>(CustomersService);
  });

  /**
   * create()
   */
  describe(`create()`, () => {
    it(`Creates a new customer`, async () => {
      const url      = `http://localhost:5001/v1/core-customers`
      const response = {data: customerMessage}

      const spy      = jest.spyOn(axios, 'post').mockResolvedValue(response)
      const result   = await customersService.create(createCustomerDto)

      expect(result).toEqual(customerMessage)
      expect(spy).toBeCalled()
      expect(spy).toBeCalledWith(url, createCustomerDto)
    })
  })

  /**
   * findAll()
   */
  describe(`findAll()`, () => {
    it(`Returns a list of customers`, async () => {
      let url       = `http://localhost:5001/v1/core-customers`
      let customers = [customer]
      let response  = { data: {customers: customers} }

      const spy     = jest.spyOn(axios, 'get').mockResolvedValue(response)
      const result  = await customersService.findAll()

      expect(result).toEqual(customerListMessage)
      expect(spy).toBeCalled()
      expect(spy).toBeCalledWith(url)
    })
  })

  /**
   * findOne()
   */
  describe(`findOne()`, () => {
    it(`Returns a customer`, async () => {
      let customerId = `unique-customer-id`
      let url        = `http://localhost:5001/v1/core-customers/${customerId}`
      let response   = { data: {customer: customer}}

      const spy      = jest.spyOn(axios, 'get').mockResolvedValue(response)
      const result   = await customersService.findOne(customerId)

      expect(result).toEqual(customerMessage)
      expect(spy).toBeCalled()
      expect(spy).toBeCalledWith(url)
    })
  })

  /**
   * update()
   */
  describe(`update()`, () => {
    it(`Returns an updated customer`, async () => {
      const customerId  = `unique-customer-id`
      let url           = `http://localhost:5001/v1/core-customers/${customerId}`
      let response      = {
        customer: {
          ...customer,
          ...updateCustomerDto,
        }
      }

      const spy    = jest.spyOn(axios, 'patch').mockResolvedValue({data: response})
      const result = await customersService.update(customerId, updateCustomerDto)
      
      expect(result).toEqual(response)
      expect(spy).toBeCalled()
      expect(spy).toBeCalledWith(url, updateCustomerDto)
    })
  })

  /**
   * remove()
   */
  describe(`remove()`, () => {
    it(`Deletes a customer`, async () => {
      let customerId = `unique-customer-id`
      let url        = `http://localhost:5001/v1/core-customers/${customerId}`
      let response   = {
        customer: customerId,
      }

      const spy    = jest.spyOn(axios, 'delete').mockResolvedValue({data: response})
      const result = await customersService.remove(customerId)
      
      expect(result).toEqual(response)
      expect(spy).toBeCalled()
      expect(spy).toBeCalledWith(url)
    })
  })
});
