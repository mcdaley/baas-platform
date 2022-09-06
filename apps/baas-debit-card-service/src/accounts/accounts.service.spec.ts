//-----------------------------------------------------------------------------
// apps/baas-debit-card-service/src/accounts/accounts.service.spec.ts
//-----------------------------------------------------------------------------
import { 
  Test, 
  TestingModule 
}                               from '@nestjs/testing'
import { ConfigService }        from '@nestjs/config'
import { APP_INTERCEPTOR }      from '@nestjs/core'
import axios                    from 'axios'
import faker                    from '@faker-js/faker'

import { AccountsService }      from './accounts.service'

import {
  RequestIdAsyncLocalStorageModule,
  RequestIdInterceptor,
}                               from '@app/baas-async-local-storage'
import { WinstonLoggerService } from '@app/winston-logger'

// Import test data
import { 
  accountFactoryData,
  BaasApplication,
  setMockConfigService,
}                               from '../../../../test/'

/**
 * Set up environment and test data
 */
const mockConfigService = setMockConfigService(BaasApplication.DebitCardService)
const accountData       = accountFactoryData.checking_1

/**
 * AccountsService
 */
describe(`AccountsService`, () => {
  let accountsService : AccountsService
  let configService   : ConfigService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports:   [RequestIdAsyncLocalStorageModule.forRoot()],
      providers: [
        AccountsService, 
        { 
          provide:  ConfigService,
          useValue: mockConfigService,
        }, 
        {
          provide:  APP_INTERCEPTOR,
          useValue: RequestIdInterceptor,
        },
        WinstonLoggerService,
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