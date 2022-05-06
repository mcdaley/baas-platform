//-----------------------------------------------------------------------------
// apps/baas-customer-service/src/customers/customers.controller.spec.ts
//-----------------------------------------------------------------------------
import { 
  Test, 
  TestingModule 
}                               from '@nestjs/testing'
import { ConfigService }        from '@nestjs/config'

import { CustomersController }  from './customers.controller'
import { CustomersService }     from './customers.service'

import { 
  CustomerStatus, 
  ICreateCustomerDto, 
  ICustomer, 
  ICustomerListResponse, 
  ICustomerResponse, 
  IUpdateCustomerDto, 
  States, 
}                               from '@app/baas-interfaces'
import { WinstonLoggerService } from '@app/winston-logger'

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

/**
 * CustomersController
 */
describe('CustomersController', () => {
  let customersController:  CustomersController
  let customersService:     CustomersService
  let configService:        ConfigService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers:  [CustomersController],
      providers:    [
        CustomersService, 
        {
          provide:  ConfigService,
          useValue: mockConfigService,
        }, 
        WinstonLoggerService
      ],
    }).compile()

    customersController = module.get<CustomersController>(CustomersController)
    customersService    = module.get<CustomersService>(CustomersService)
  });

  /**
   * createV1()
   */
  describe(`createV1`, () => {
    it(`Creates a new customer`, async () => {
      
      const response = {
        customer: {...customer}
      }

      const spy    = jest.spyOn(customersService, 'create').mockResolvedValue(response)
      const result = await customersController.createV1(`idempotency-key`, createCustomerDto)
      
      expect(result).toBe(response)
      expect(spy).toBeCalled()
      expect(spy).toBeCalledWith(createCustomerDto)
    })
  })

  /**
   * findAllV1()
   */
  describe(`findAllV1`, () => {
    it(`Returns a list of customer`, async () => {
      const response : ICustomerListResponse = {
        customers: [
          {
            ...customer
          },
        ]
      }

      const spy    = jest.spyOn(customersService, 'findAll').mockResolvedValue(response)
      const result = await customersController.findAllV1()
      
      expect(result).toBe(response)
      expect(spy).toBeCalled()
      expect(spy).toBeCalledWith()
    })
  })

  /**
   * findOneV1()
   */
  describe(`findOneV1`, () => {
    it(`Returns a customer`, async () => {
      const customerId : string             = `unique-id`
      const response   : ICustomerResponse  = {
        customer: { ...customer }
      }

      const spy    = jest.spyOn(customersService, 'findOne').mockResolvedValue(response)
      const result = await customersController.findOneV1(customerId)
      
      expect(result).toBe(response)
      expect(spy).toBeCalled()
      expect(spy).toBeCalledWith(customerId)
    })
  })

  /**
   * updateV1
   */
  describe(`updateV1`, () => {
    it(`Returns the updated customer`, async () => {
      const customerId     : string = `unique-customer-id`
      const idempotencyKey : string = `another-unique-string`
      const response       : ICustomerResponse = {
        customer: {
          ...customer,
          ...updateCustomerDto
        }
      }

      const spy    = jest.spyOn(customersService, 'update').mockResolvedValue(response)
      const result = await customersController.updateV1(idempotencyKey, customerId, updateCustomerDto)
      
      expect(result).toEqual(response)
      expect(spy).toBeCalled()
      expect(spy).toBeCalledWith(customerId, updateCustomerDto)
    })
  })

  /**
   * deleteV1
   */
  describe(`deleteV1`, () => {
    it(`Deletes a customer`, async () => {
      const customerId = `unique-customer-id`
      const response   = {
        customer: customerId
      }
      
      const spy    = jest.spyOn(customersService, 'remove').mockResolvedValue(response)
      const result = await customersController.removeV1(customerId)
      
      expect(result).toEqual(response)
      expect(spy).toBeCalled()
      expect(spy).toBeCalledWith(customerId)
    })
  })
})
