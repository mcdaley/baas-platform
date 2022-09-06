//-----------------------------------------------------------------------------
// apps/baas-account-service/src/accounts/accounts.service.spec.ts
//-----------------------------------------------------------------------------
import { 
  Test, 
  TestingModule, 
}                                 from '@nestjs/testing'
import { ConfigService }          from '@nestjs/config'
import { APP_INTERCEPTOR }        from '@nestjs/core'
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
import { 
  RequestIdAsyncLocalStorageModule, 
  RequestIdInterceptor 
}                                 from '@app/baas-async-local-storage'
import { uuid }                   from '@app/baas-utils'
import { WinstonLoggerService }   from '@app/winston-logger'

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
const customerId        = uuid()
const tenantId          = `buffalo_bills`
const idempotencyKey    = uuid()

/**
 * AccountsService
 */
describe('AccountsService', () => {
  let accountsService  : AccountsService;
  let customersService : CustomersService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        RequestIdAsyncLocalStorageModule.forRoot(),
      ],
      providers: [
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
      let url            = `http://localhost:5001/core/api/v1/accounts`
      let requestHeaders = {
        'Customer-Id':      customerId,
        'Tenant-Id':        tenantId,
        'Idempotency-Key':  idempotencyKey,
      }
      let axiosConfig = {
        headers: requestHeaders,
      }
      let participants = accountData.participants.map( (p) => {
        // Remove created_at & updated_at properties.
        return {
          customer_id:      p.customer_id,
          participant_role: p.participant_role
        }
      })
      let customers  = [customerData]
      let response   = {data: { data: accountData }}

      let verifyCustomersSpy = jest
        .spyOn(customersService, 'verifyCustomers')
        .mockResolvedValueOnce(customers)
      
      let accountHolderSpy   = jest
        .spyOn(customersService, 'findAccountHolder')
        .mockResolvedValue(customerData)

      const spy    = jest.spyOn(axios, 'post').mockResolvedValue(response)
      const result = await accountsService.create(
         createAccountDto, requestHeaders
      )


      expect(verifyCustomersSpy).toBeCalled()
      expect(verifyCustomersSpy).toBeCalledWith(participants, axiosConfig)

      expect(accountHolderSpy).toBeCalled()
      expect(accountHolderSpy).toBeCalledWith(createAccountDto, customers)
      
      expect(spy).toBeCalled()
      expect(spy).toBeCalledWith(
        url, 
        {
          ...createAccountDto, 
          name:            `${accountData.name_on_account} ${accountData.account_type}`, 
          name_on_account: accountData.name_on_account
        },
        axiosConfig
      )
      expect(result).toEqual({account: accountData})
    })
  })

  /**
   * findAll
   */
  describe(`findAll`, () => {
    it(`Returns a list of accounts`, async () => {
      let url            = `http://localhost:5001/core/api/v1/accounts`
      let requestHeaders = {
        'Customer-Id': customerId,
        'Tenant-Id':   tenantId,
      }
      let axiosConfig    = {
        headers: requestHeaders,
      }
      let response    = {data: { data: [accountData] }}

      const spy    = jest.spyOn(axios, 'get').mockResolvedValue(response)
      const result = await accountsService.findAll(requestHeaders)

      expect(spy).toBeCalled()
      expect(spy).toBeCalledWith(url, axiosConfig)
      expect(result).toEqual({accounts: [accountData]})
    })
  })

  /**
   * findOne
   */
  describe(`findOne`, () => {
    it(`Returns an account`, async () => {
      let accountId      = `unique-account-id`
      let url            = `http://localhost:5001/core/api/v1/accounts/${accountId}`
      let requestHeaders = {
        'Customer-Id': customerId,
        'Tenant-Id':   tenantId,
      }
      let axiosConfig = {
        headers: requestHeaders,
      }
      let response = {data: { data: accountData }}

      const spy    = jest.spyOn(axios, 'get').mockResolvedValue(response)
      const result = await accountsService.findOne(accountId, requestHeaders)

      expect(spy).toBeCalled()
      expect(spy).toBeCalledWith(url, axiosConfig)
      expect(result).toEqual({account: accountData})
    })

    it(`Returns 404 account not found error`, async () => {
      let accountId      = `unique-account-id`
      let url            = `http://localhost:5001/core/api/v1/accounts/${accountId}`
      let requestHeaders = {
        'Customer-Id': customerId,
        'Tenant-Id':   tenantId,
      }
      let axiosConfig = {
        headers: requestHeaders
      }

      const spy    = jest.spyOn(axios, 'get').mockRejectedValueOnce(
        new NotFoundError(BaaSErrors.account.notFound, `Account ${accountId} not found`)
      )

      try {
        await accountsService.findOne(accountId, requestHeaders)
      }
      catch(error) {
        expect(spy).toBeCalled()
        expect(spy).toBeCalledWith(url, axiosConfig)
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

    let requestHeaders = {
      'Customer-Id':     customerId,
      'Tenant-Id':       tenantId,
      'Idempotency-Key': idempotencyKey,
    }

    let axiosConfig = {
      headers: requestHeaders,
    }

    it(`Returns the updated account`, async () => {
      const accountId    = `unique-account-id`
      const url          = `http://localhost:5001/core/api/v1/accounts/${accountId}`
      let updatedAccount = {
        ...accountData,
        ...updateAccountDto,
      }
      
      let response = {data: {data: updatedAccount}}
      const spy    = jest.spyOn(axios, 'patch').mockResolvedValue(response)
      const result = await accountsService.update(
        accountId, updateAccountDto, requestHeaders
      )

      expect(spy).toBeCalled()
      expect(spy).toBeCalledWith(url, updateAccountDto, axiosConfig)
      expect(result).toEqual({account: updatedAccount})
    })

    it(`Returns 404 account not found error`, async () => {
      let accountId      = `unique-account-id`
      let url            = `http://localhost:5001/core/api/v1/accounts/${accountId}`
      let requestHeaders = {
        'Customer-Id':     customerId,
        'Tenant-Id':       tenantId,
        'Idempotency-Key': idempotencyKey,
      }

      const spy     = jest.spyOn(axios, 'patch').mockRejectedValueOnce(
        new NotFoundError(BaaSErrors.account.notFound, `Account ${accountId} not found`)
      )

      try {
        await accountsService.update(
          accountId, updateAccountDto, requestHeaders
        )
      }
      catch(error) {
        expect(spy).toBeCalled()
        expect(spy).toBeCalledWith(url, updateAccountDto, axiosConfig)
        expect(error).toBeInstanceOf(NotFoundError)
      }
    })
  })

  /**
   * remove
   */
  describe(`remove`, () => {
    let requestHeaders = {
      'Customer-Id': customerId,
      'Tenant-Id':   tenantId,
    }
    let axiosConfig    = {
      headers: requestHeaders,
    }

    it(`Deletes the account`, async () => {
      let accountId = `unique-account-id`
      let url       = `http://localhost:5001/core/api/v1/accounts/${accountId}`
      let response  = true

      const spy     = jest.spyOn(axios, 'delete').mockResolvedValue({data: true})
      const result  = await accountsService.remove(accountId, requestHeaders)

      expect(spy).toBeCalled()
      expect(spy).toBeCalledWith(url, axiosConfig)
      expect(result).toEqual(response)
    })

    it(`Returns 404 account not found error`, async () => {
      let accountId = `unique-account-id`
      let url       = `http://localhost:5001/core/api/v1/accounts/${accountId}`
      let requestHeaders = {
        'Customer-Id': customerId,
        'Tenant-Id':   tenantId,
      }

      const spy    = jest.spyOn(axios, 'delete').mockRejectedValueOnce(
        new NotFoundError(BaaSErrors.account.notFound, `Account ${accountId} not found`)
      )

      try {
        await accountsService.remove(accountId, requestHeaders)
      }
      catch(error) {
        expect(spy).toBeCalled()
        expect(spy).toBeCalledWith(url, axiosConfig)
        expect(error).toBeInstanceOf(NotFoundError)
      }
    })
  })
});
