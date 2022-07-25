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
      providers: [
        AccountsService, 
        { 
          provide:  ConfigService,
          useValue: mockConfigService,
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