//-----------------------------------------------------------------------------
// apps/baas-debit-card-service/src/customers/customers.service.spec.ts
//-----------------------------------------------------------------------------
import { 
  Test, 
  TestingModule 
}                               from '@nestjs/testing'
import { ConfigService }        from '@nestjs/config'
import axios                    from 'axios'

import { CustomersService }     from './customers.service'

import { WinstonLoggerService } from '@app/winston-logger'
import { CustomerStatus }       from '@app/baas-interfaces'

// Import test data
import { 
  customerFactoryData,
  BaasApplication,
  setMockConfigService,
}                               from '../../../../test'

/**
 * Set up environment and test data
 */
let mockConfigService = setMockConfigService(BaasApplication.DebitCardService)
let customerData      = customerFactoryData.joe_ferguson

/**
 * CustomersService
 */
describe(`CustomersService`, () => {
  let customersService : CustomersService
  let configService    : ConfigService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomersService, 
        { 
          provide:  ConfigService,
          useValue: mockConfigService,
        }, 
        WinstonLoggerService,
      ],
    }).compile()

    configService    = module.get<ConfigService>(ConfigService)
    customersService = module.get<CustomersService>(CustomersService)
  })

  /**
   * verifyCustomer()
   */
  describe(`verifyCustomer`, () => {
    it(`Returns a verified customer`, async () => {
      // Set customer status to active
      customerData.status = CustomerStatus.Active

      const customerId = customerData.id
      const url        = `${configService.get('customersUrl')}/${customerId}`
      const response   = {
        data: {customer: customerData}
      }

      const spy    = jest.spyOn(axios, 'get').mockResolvedValue(response)
      const result = await customersService.verifyCustomer(customerId)

      expect(spy).toBeCalled()
      expect(spy).toBeCalledWith(url)
      expect(result).toEqual(customerData)
    })
  })
})