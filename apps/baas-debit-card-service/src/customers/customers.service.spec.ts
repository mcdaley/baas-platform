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
import { CoreDebitCardSimulator } from '@app/core-simulator'  ///TODO - DEPRECATE

// Import test data
import { customerFactoryData }  from '../../../../test/baas.factory.data'

/**
 * Set mockConfigService using env variables in .jest/set-env-vars.ts
 */
let mockConfigService = new Map()
mockConfigService.set('NODE_ENV',    process.env.NODE_ENV)
mockConfigService.set('appRoot',     '.')
mockConfigService.set('appName',     process.env.DEBIT_CARD_APP_NAME)
mockConfigService.set('logLevel',    process.env.DEBIT_CARD_LOG_LEVEL)
mockConfigService.set('accountsUrl', process.env.ACCOUNT_URL)
mockConfigService.set('bankSimulatorDebitCardsUrl', process.env.BANK_SIMULATOR_DEBIT_CARDS_URL)

/**
 * Test Data
 */
const customerData = customerFactoryData.joe_ferguson

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
        CoreDebitCardSimulator,
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