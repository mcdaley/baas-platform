//-----------------------------------------------------------------------------
// apps/baas-account-service/src/accounts/accounts.service.spec.ts
//-----------------------------------------------------------------------------
import { 
  Test, 
  TestingModule, 
}                                 from '@nestjs/testing'
import { ConfigService }          from '@nestjs/config'
import axios                      from 'axios'

import { AccountsService }        from './accounts.service'
import { CustomersService }       from '../customers/customers.service'

import { 
  AccountStatus, 
}                                 from '@app/baas-interfaces'
import { 
  BaaSErrors, 
  NotFoundError, 
}                                 from '@app/baas-errors'
import { WinstonLoggerService }   from '@app/winston-logger'
import { CoreSimulatorService }   from '@app/core-simulator'

import {
  customerFactoryData,
  createAccountDtoFactoryData,
  accountFactoryData,
  BaasApplication,
  setMockConfigService,
}                                 from '../../../../test/'

/**
 * Setup test environment and data
 */
const mockConfigService = setMockConfigService(BaasApplication.AccountService)
const customerData      = customerFactoryData.joe_ferguson
const createAccountDto  = createAccountDtoFactoryData.checking_1
const accountData       = accountFactoryData.checking_1

/**
 * AccountsService
 */
describe('AccountsService', () => {
  let accountsService  : AccountsService;
  let customersService : CustomersService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
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

    accountsService  = module.get<AccountsService>(AccountsService)
    customersService = module.get<CustomersService>(CustomersService)
  });

  /**
   * create
   */
  describe(`create`, () => {
    it(`Creates a new account`, async () => {
      let url        = `http://localhost:5001/core/api/v1/accounts`
      let customers  = [customerData]
      let response   = {data: { data: accountData }}

      let verifyCustomersSpy = jest
        .spyOn(customersService, 'verifyCustomers')
        .mockResolvedValueOnce(customers)
      
      let accountHolderSpy   = jest
        .spyOn(customersService, 'findAccountHolder')
        .mockResolvedValue(customerData)

      const spy    = jest.spyOn(axios, 'post').mockResolvedValue(response)
      const result = await accountsService.create(createAccountDto)


      expect(verifyCustomersSpy).toBeCalled()
      expect(verifyCustomersSpy).toBeCalledWith(accountData.participants)

      expect(accountHolderSpy).toBeCalled()
      expect(accountHolderSpy).toBeCalledWith(createAccountDto, customers)
      
      expect(spy).toBeCalled()
      expect(spy).toBeCalledWith(
        url, 
        {
          ...createAccountDto, 
          name:            `${accountData.name_on_account} ${accountData.account_type}`, 
          name_on_account: accountData.name_on_account
        }
      )
      expect(result).toEqual({account: accountData})
    })
  })

  /**
   * findAll
   */
  describe(`findAll`, () => {
    it(`Returns a list of accounts`, async () => {
      let url        = `http://localhost:5001/core/api/v1/accounts`
      let response   = {data: { data: [accountData] }}

      const spy    = jest.spyOn(axios, 'get').mockResolvedValue(response)
      const result = await accountsService.findAll()

      expect(spy).toBeCalled()
      expect(spy).toBeCalledWith(url)
      expect(result).toEqual({accounts: [accountData]})
    })
  })

  /**
   * findOne
   */
  describe(`findOne`, () => {
    it(`Returns an account`, async () => {
      let accountId = `unique-account-id`
      let url       = `http://localhost:5001/core/api/v1/accounts/${accountId}`
      let response  = {data: { data: accountData }}

      const spy     = jest.spyOn(axios, 'get').mockResolvedValue(response)
      const result  = await accountsService.findOne(accountId)

      expect(spy).toBeCalled()
      expect(spy).toBeCalledWith(url)
      expect(result).toEqual({account: accountData})
    })

    it(`Returns 404 account not found error`, async () => {
      let accountId = `unique-account-id`
      let url       = `http://localhost:5001/core/api/v1/accounts/${accountId}`

      const spy    = jest.spyOn(axios, 'get').mockRejectedValueOnce(
        new NotFoundError(BaaSErrors.account.notFound, `Account ${accountId} not found`)
      )

      try {
        await accountsService.findOne(accountId)
      }
      catch(error) {
        expect(spy).toBeCalled()
        expect(spy).toBeCalledWith(url)
        expect(error).toBeInstanceOf(NotFoundError)
      }
    })
  })

  /**
   * update
   */
  describe(`update`, () => {
    const updateAccountDto = {
      account_status:     AccountStatus.Blocked,
      nickname:           'Blocked Checking Account'
    }

    it(`Returns the updated account`, async () => {
      const accountId    = `unique-account-id`
      const url          = `http://localhost:5001/core/api/v1/accounts/${accountId}`
      let updatedAccount = {
        ...accountData,
        ...updateAccountDto,
      }
      let response       = {data: {data: updatedAccount}}

      const spy    = jest.spyOn(axios, 'patch').mockResolvedValue(response)
      const result = await accountsService.update(accountId, updateAccountDto)

      expect(spy).toBeCalled()
      expect(spy).toBeCalledWith(url, updateAccountDto)
      expect(result).toEqual({account: updatedAccount})
    })

    it(`Returns 404 account not found error`, async () => {
      let accountId = `unique-account-id`
      let url       = `http://localhost:5001/core/api/v1/accounts/${accountId}`

      const spy     = jest.spyOn(axios, 'patch').mockRejectedValueOnce(
        new NotFoundError(BaaSErrors.account.notFound, `Account ${accountId} not found`)
      )

      try {
        await accountsService.update(accountId, updateAccountDto)
      }
      catch(error) {
        expect(spy).toBeCalled()
        expect(spy).toBeCalledWith(url, updateAccountDto)
        expect(error).toBeInstanceOf(NotFoundError)
      }
    })
  })

  /**
   * remove
   */
  describe(`remove`, () => {
    it(`Deletes the account`, async () => {
      let accountId = `unique-account-id`
      let url       = `http://localhost:5001/core/api/v1/accounts/${accountId}`
      let response  = true

      const spy     = jest.spyOn(axios, 'delete').mockResolvedValue({data: true})
      const result  = await accountsService.remove(accountId)

      expect(spy).toBeCalled()
      expect(spy).toBeCalledWith(url)
      expect(result).toEqual(response)
    })

    it(`Returns 404 account not found error`, async () => {
      let accountId = `unique-account-id`
      let url       = `http://localhost:5001/core/api/v1/accounts/${accountId}`

      const spy    = jest.spyOn(axios, 'delete').mockRejectedValueOnce(
        new NotFoundError(BaaSErrors.account.notFound, `Account ${accountId} not found`)
      )

      try {
        await accountsService.remove(accountId)
      }
      catch(error) {
        expect(spy).toBeCalled()
        expect(spy).toBeCalledWith(url)
        expect(error).toBeInstanceOf(NotFoundError)
      }
    })
  })
});
