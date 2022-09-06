//-----------------------------------------------------------------------------
// apps/baas-account-service/src/accounts/accounts.controller.spec.ts
//-----------------------------------------------------------------------------
import { 
  Test, 
  TestingModule, 
}                               from '@nestjs/testing'
import { ConfigService }        from '@nestjs/config'
import { APP_INTERCEPTOR }      from '@nestjs/core'

import { AccountsController }   from './accounts.controller'
import { AccountsService }      from './accounts.service'
import { CustomersService }     from '../customers/customers.service'
import { UpdateAccountDto }     from './dto/update-account.dto'

import { WinstonLoggerService } from '@app/winston-logger'
import { CoreSimulatorService } from '@app/core-simulator'

import { 
  AccountStatus, 
}                               from '@app/baas-interfaces'
import { 
  RequestIdAsyncLocalStorageModule, 
  RequestIdInterceptor 
}                               from '@app/baas-async-local-storage'
import { uuid }                 from '@app/baas-utils'

/**
 * Import test data
 */
import {
  createAccountDtoFactoryData,
  accountFactoryData,
  BaasApplication,
  setMockConfigService,
}                               from '../../../../test/'

/**
 * Setup test environment and data
 */
const mockConfigService = setMockConfigService(BaasApplication.AccountService)
const createAccountDto  = createAccountDtoFactoryData.checking_1
const accountData       = accountFactoryData.checking_1
const customerId        = uuid()
const tenantId          = `buffalo_bills`
const idempotencyKey    = uuid()
 
/**
 * AccountsController
 */
describe('AccountsController', () => {
  let accountsController: AccountsController
  let accountsService:    AccountsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports:      [
        RequestIdAsyncLocalStorageModule.forRoot(),
      ],
      controllers:  [AccountsController],
      providers:    [
        AccountsService,
        CustomersService,
        {
          provide:  ConfigService,
          useValue: mockConfigService,
        }, 
        {
          provide:  APP_INTERCEPTOR,
          useValue: RequestIdInterceptor,
        },
        WinstonLoggerService,
        CoreSimulatorService,
      ],
    }).compile();

    accountsController  = module.get<AccountsController>(AccountsController)
    accountsService     = module.get<AccountsService>(AccountsService)
  });

  /**
   * createV1
   */
  describe(`createV1`, () => {
    it(`Creates and returns a new account`, async () => {
      let requestHeaders = {
        'Customer-Id':      customerId,
        'Tenant-Id':        tenantId,
        'Idempotency-Key':  idempotencyKey,
      }
      let response = {
        account: accountData,
      }

      const spy     = jest.spyOn(accountsService,  'create').mockResolvedValue(response)
      const result  = await accountsController.createV1(
        requestHeaders, createAccountDto
      )

      expect(spy).toBeCalled()
      expect(spy).toBeCalledWith(createAccountDto, requestHeaders)
      expect(result).toBe(response)
    })
  })

  /**
   * findAllV1
   */
  describe(`findAllV1`, () => {
    it(`Returns a list of accounts`, async () => {
      let requestHeaders = {
        'Customer-Id':      customerId,
        'Tenant-Id':        tenantId,
      }

      let response = {
        accounts: [accountData]
      }

      const spy     = jest.spyOn(accountsService, 'findAll').mockResolvedValue(response)
      const result  = await accountsController.findAllV1(requestHeaders)

      expect(spy).toBeCalled()
      expect(result).toBe(response)
    })
  })

  /**
   * findOneV1
   */
  describe(`findOneV1`, () => {
    it(`Returns a account`, async () => {
      let accountId      = `unique-account-id`
      let requestHeaders = {
        'Customer-Id':      customerId,
        'Tenant-Id':        tenantId,
      }
      let response  = {
        account: accountData
      }

      const spy     = jest.spyOn(accountsService, 'findOne').mockResolvedValue(response)
      const result  = await accountsController.findOneV1(requestHeaders, accountId)

      expect(spy).toBeCalled()
      expect(spy).toBeCalledWith(accountId, requestHeaders)
      expect(result).toBe(response)
    })
  })

  /**
   * updateV1
   */
  describe(`updateV1`, () => {
    it(`Returns updated account`, async () => {
      let accountId        = `unique-account-id`
      let requestHeaders   = {
        'Customer-Id':      customerId,
        'Tenant-Id':        tenantId,
        'Idempotency-Key':  idempotencyKey,
      }
      let updateAccountDto = {
        account_status: AccountStatus.Blocked,
        nickname:       'Blocked Checking Account'
      }
      let updatedAccount = {
        ...accountData,
        ...updateAccountDto
      }
      
      let response = { account: updatedAccount }
      const spy    = jest.spyOn(accountsService, 'update').mockResolvedValue(response)
      const result = await accountsController.updateV1(
        requestHeaders, accountId, <UpdateAccountDto>updateAccountDto
      )

      expect(spy).toBeCalled()
      expect(spy).toBeCalledWith(accountId, updateAccountDto, requestHeaders)
      expect(result).toBe(response)
    })
  })

  /**
   * removeV1
   */
  describe(`removeV1`, () => {
    it(`Deletes account and returns null`, async () => {
      let accountId = `unique-account-id`
      let requestHeaders   = {
        'Customer-Id':      customerId,
        'Tenant-Id':        tenantId,
      }
      let response  = true

      const spy    = jest.spyOn(accountsService, 'remove').mockResolvedValue(response)
      const result = await accountsController.removeV1(requestHeaders, accountId)

      expect(spy).toBeCalled()
      expect(spy).toBeCalledWith(accountId, requestHeaders)
      expect(result).toBe(response)
    })
  })
});
