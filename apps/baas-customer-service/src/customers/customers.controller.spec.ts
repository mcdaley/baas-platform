//-----------------------------------------------------------------------------
// apps/baas-customer-service/src/customers/customers.controller.spec.ts
//-----------------------------------------------------------------------------
import { 
  Test, 
  TestingModule 
}                                 from '@nestjs/testing'
import { ConfigService }          from '@nestjs/config'
import { APP_INTERCEPTOR }        from '@nestjs/core'

import { CustomersController }    from './customers.controller'
import { CustomersService }       from './customers.service'

import { 
  CustomerStatus, 
  ICustomerListResponse, 
  ICustomerResponse, 
}                                 from '@app/baas-interfaces'
import { 
  RequestIdAsyncLocalStorageModule, 
  RequestIdInterceptor, 
}                                 from '@app/baas-async-local-storage'
import { WinstonLoggerService }   from '@app/winston-logger'

/**
 * Import test data
 */
import {
  createCustomerDtoFactoryData,
  customerFactoryData,
  BaasApplication,
  setMockConfigService,
}                                 from '../../../../test/'
import { BaaSRequestHeaders, IBaaSRequestHeaders } from '@app/baas-errors'

/**
 * Setup test environment and data
 */
const mockConfigService = setMockConfigService(BaasApplication.CustomerService)
const createCustomerDto = createCustomerDtoFactoryData.joe_ferguson
const customerData      = customerFactoryData.joe_ferguson
const tenantId          = `buffalo_bills`
const idempotencyKey    = `unique_idempotency_key`

/**
 * CustomersController
 */
describe('CustomersController', () => {
  let customersController:  CustomersController
  let customersService:     CustomersService
  let configService:        ConfigService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports:      [
        RequestIdAsyncLocalStorageModule.forRoot(),
      ],
      controllers:  [CustomersController],
      providers:    [
        CustomersService, 
        {
          provide:  ConfigService,
          useValue: mockConfigService,
        }, 
        WinstonLoggerService,
        {
          provide:  APP_INTERCEPTOR,
          useValue: RequestIdInterceptor,
        }
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
      const headers: IBaaSRequestHeaders = {
        'Tenant-Id':       tenantId,
        'Idempotency-Key': idempotencyKey,
      }
      const response = {
        customer: {...customerData}
      }

      const spy    = jest.spyOn(customersService, 'create').mockResolvedValue(response)
      const result = await customersController.createV1(
        headers, createCustomerDto
      )
      
      
      expect(result).toBe(response)
      expect(spy).toBeCalled()
      expect(spy).toBeCalledWith(createCustomerDto, headers)
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
            ...customerData
          },
        ]
      }
      const headers : IBaaSRequestHeaders = {
        'Tenant-Id':       tenantId,
      }

      const spy    = jest.spyOn(customersService, 'findAll').mockResolvedValue(response)
      const result = await customersController.findAllV1(headers)
      
      expect(result).toBe(response)
      expect(spy).toBeCalled()
      expect(spy).toBeCalledWith(headers)
    })
  })

  /**
   * findOneV1()
   */
  describe(`findOneV1`, () => {
    it(`Returns a customer`, async () => {
      const customerId : string              = `unique-id`
      const headers    : IBaaSRequestHeaders = { 'Tenant-Id': tenantId }
      const response   : ICustomerResponse   = {
        customer: { ...customerData }
      }

      const spy    = jest.spyOn(customersService, 'findOne').mockResolvedValue(response)
      const result = await customersController.findOneV1(headers, customerId)
      
      expect(result).toBe(response)
      expect(spy).toBeCalled()
      expect(spy).toBeCalledWith(customerId, headers)
    })
  })

  /**
   * updateV1
   */
  describe(`updateV1`, () => {
    it(`Returns the updated customer`, async () => {
      const customerId        = `unique-customer-id`
      const headers           = {
        'Tenant-Id':       tenantId,
        'Idempotency-Key': idempotencyKey,
      }
      const updateCustomerDto = {
        status: CustomerStatus.Blocked,
      }
      const response : ICustomerResponse = {
        customer: {
          ...customerData,
          ...updateCustomerDto
        }
      }

      const spy    = jest.spyOn(customersService, 'update').mockResolvedValue(response)
      const result = await customersController.updateV1(
        headers, customerId, updateCustomerDto
      )
      
      expect(result).toEqual(response)
      expect(spy).toBeCalled()
      expect(spy).toBeCalledWith(customerId, updateCustomerDto, headers)
    })
  })

  /**
   * deleteV1
   */
  describe(`deleteV1`, () => {
    it(`Deletes a customer`, async () => {
      const customerId = `unique-customer-id`
      const headers    = { 'Tenant-Id':       tenantId }
      const response   = {
        customer: customerId
      }
      
      const spy    = jest.spyOn(customersService, 'remove').mockResolvedValue(response)
      const result = await customersController.removeV1(headers, customerId)
      
      expect(result).toEqual(response)
      expect(spy).toBeCalled()
      expect(spy).toBeCalledWith(customerId, headers)
    })
  })
})
