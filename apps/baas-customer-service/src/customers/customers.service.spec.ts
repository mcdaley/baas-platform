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

/**
 * Import customer test data
 */
import { 
  createCustomerDtoFactoryData,
  customerFactoryData,
}                                     from '../../../../test/baas.factory.data'

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

/**
 * Test Data
 */
const createCustomerDto  : ICreateCustomerDto  = createCustomerDtoFactoryData.joe_ferguson
const customerData       : ICustomer           = customerFactoryData.joe_ferguson

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
      const url      = `http://localhost:5001/core/api/v1/customers`
      const response = {
        data: {
          data: customerData
        }
      }

      const spy      = jest.spyOn(axios, 'post').mockResolvedValue(response)
      const result   = await customersService.create(createCustomerDto)

      expect(spy).toBeCalled()
      expect(spy).toBeCalledWith(url, createCustomerDto)
      expect(result).toEqual({customer: customerData})
    })
  })

  /**
   * findAll()
   */
  describe(`findAll()`, () => {
    it(`Returns a list of customers`, async () => {
      let url       = `http://localhost:5001/core/api/v1/customers`
      let customers = [customerData]
      let response  = { data: {data: customers} }

      const spy     = jest.spyOn(axios, 'get').mockResolvedValue(response)
      const result  = await customersService.findAll()

      expect(spy).toBeCalled()
      expect(spy).toBeCalledWith(url)
      expect(result).toEqual({customers: customers})
    })
  })

  /**
   * findOne()
   */
  describe(`findOne()`, () => {
    it(`Returns a customer`, async () => {
      let customerId = `unique-customer-id`
      let url        = `http://localhost:5001/core/api/v1/customers/${customerId}`
      let response   = { data: {data: customerData}}

      const spy      = jest.spyOn(axios, 'get').mockResolvedValue(response)
      const result   = await customersService.findOne(customerId)

      expect(result).toEqual({customer: customerData})
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
      let url           = `http://localhost:5001/core/api/v1/customers/${customerId}`

      const updateCustomerDto = {
        status: CustomerStatus.Blocked,
      }
      const customer = {
        ...customerData,
        ...updateCustomerDto,
      }

      const response = {
        data: { data: customer}
      }

      const spy    = jest.spyOn(axios, 'patch').mockResolvedValue(response)
      const result = await customersService.update(customerId, updateCustomerDto)
      
      expect(spy).toBeCalled()
      expect(spy).toBeCalledWith(url, updateCustomerDto)
      expect(result).toEqual({customer: customer})
    })
  })

  /**
   * remove()
   */
  describe(`remove()`, () => {
    it(`Deletes a customer`, async () => {
      let customerId = `unique-customer-id`
      let url        = `http://localhost:5001/core/api/v1/customers/${customerId}`
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
