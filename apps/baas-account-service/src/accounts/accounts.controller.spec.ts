//-----------------------------------------------------------------------------
// apps/baas-account-service/src/accounts/accounts.controller.spec.ts
//-----------------------------------------------------------------------------
import { 
  Test, 
  TestingModule, 
}                               from '@nestjs/testing'
import { ConfigService }        from '@nestjs/config'

import { AccountsController }   from './accounts.controller'
import { AccountsService }      from './accounts.service'
import { CustomersService }     from '../customers/customers.service'
import { UpdateAccountDto }     from './dto/update-account.dto'

import { WinstonLoggerService } from '@app/winston-logger'
import { CoreSimulatorService } from '@app/core-simulator'

import { 
  AccountStatus, 
}                               from '@app/baas-interfaces'

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
 
/**
 * AccountsController
 */
describe('AccountsController', () => {
  let accountsController: AccountsController
  let accountsService:    AccountsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers:  [AccountsController],
      providers:    [
        AccountsService,
        CustomersService,
        {
          provide:  ConfigService,
          useValue: mockConfigService,
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
      let response = {
        account: accountData,
      }

      const spy     = jest.spyOn(accountsService,  'create').mockResolvedValue(response)
      const result  = await accountsController.createV1(`idempotency-key`, createAccountDto)

      expect(spy).toBeCalled()
      expect(spy).toBeCalledWith(createAccountDto)
      expect(result).toBe(response)
    })
  })

  /**
   * findAllV1
   */
  describe(`findAllV1`, () => {
    it(`Returns a list of accounts`, async () => {
      let response = {
        accounts: [accountData]
      }

      const spy     = jest.spyOn(accountsService, 'findAll').mockResolvedValue(response)
      const result  = await accountsController.findAllV1()

      expect(spy).toBeCalled()
      expect(result).toBe(response)
    })
  })

  /**
   * findOneV1
   */
  describe(`findOneV1`, () => {
    it(`Returns a account`, async () => {
      let accountId = `unique-account-id`
      let response  = {
        account: accountData
      }

      const spy     = jest.spyOn(accountsService, 'findOne').mockResolvedValue(response)
      const result  = await accountsController.findOneV1(accountId)

      expect(spy).toBeCalled()
      expect(spy).toBeCalledWith(accountId)
      expect(result).toBe(response)
    })
  })

  /**
   * updateV1
   */
  describe(`updateV1`, () => {
    it(`Returns updated account`, async () => {
      let idempotencyKey     = `unique- idempotency-key`
      let accountId          = `unique-account-id`
      const updateAccountDto = {
        account_status: AccountStatus.Blocked,
        nickname:       'Blocked Checking Account'
      }
      let updatedAccount = {
        ...accountData,
        ...updateAccountDto
      }
      let response       = { account: updatedAccount }

      const spy    = jest.spyOn(accountsService, 'update').mockResolvedValue(response)
      const result = await accountsController.updateV1(idempotencyKey, accountId, <UpdateAccountDto>updateAccountDto)

      expect(spy).toBeCalled()
      expect(spy).toBeCalledWith(accountId, updateAccountDto)
      expect(result).toBe(response)
    })
  })

  /**
   * removeV1
   */
  describe(`removeV1`, () => {
    it(`Deletes account and returns null`, async () => {
      let accountId = `unique-account-id`
      let response  = true

      const spy    = jest.spyOn(accountsService, 'remove').mockResolvedValue(response)
      const result = await accountsController.removeV1(accountId)

      expect(spy).toBeCalled()
      expect(spy).toBeCalledWith(accountId)
      expect(result).toBe(response)
    })
  })
});
