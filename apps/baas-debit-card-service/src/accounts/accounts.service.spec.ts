//-----------------------------------------------------------------------------
// apps/baas-debit-card-service/src/accounts/accounts.service.spec.ts
//-----------------------------------------------------------------------------
import { 
  Test, 
  TestingModule 
}                               from '@nestjs/testing'
import { ConfigService }        from '@nestjs/config'
import axios                    from 'axios'
import faker                    from '@faker-js/faker'

import { AccountsService }      from './accounts.service'

import { 
  AccountStatus, 
  AccountType, 
  IAccount, 
  ParticipantRole, 
}                               from '@app/baas-interfaces'
import { uuid }                 from '@app/baas-utils'
import { WinstonLoggerService } from '@app/winston-logger'
import { CoreDebitCardSimulator } from '@app/core-simulator'  ///TODO

// Import test data
import { accountFactoryData }   from '../../../../test/baas.factory.data'


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
const accountData = accountFactoryData.checking_1

/**
 * AccountsService
 */
describe(`AccountsService`, () => {
  let accountsService : AccountsService
  let configService   : ConfigService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountsService, 
        { 
          provide:  ConfigService,
          useValue: mockConfigService,
        }, 
        WinstonLoggerService,
        CoreDebitCardSimulator,
      ],
    }).compile()

    configService   = module.get<ConfigService>(ConfigService)
    accountsService = module.get<AccountsService>(AccountsService)
  })

  /**
   * verifyAccount()
   */
  describe(`verifyAccount`, () => {
    it(`Returns a verified account`, async () => {
      const accountId = accountData.id
      const url       = `${configService.get('accountsUrl')}/${accountId}`
      const response  = {
        data: {account: accountData},
      }

      const spy    = jest.spyOn(axios, 'get').mockResolvedValue(response)
      const result = await accountsService.verifyAccount(accountId)

      expect(spy).toBeCalled()
      expect(spy).toBeCalledWith(url)
      expect(result).toEqual(accountData)
    })
  })
})