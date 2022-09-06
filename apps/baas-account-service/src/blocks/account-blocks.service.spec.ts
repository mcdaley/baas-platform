//-----------------------------------------------------------------------------
// apps/baas-account-service/src/blocks/account-blocks.service.spec.ts
//-----------------------------------------------------------------------------
import { 
  Test, 
  TestingModule, 
}                                   from '@nestjs/testing'
import { ConfigService }            from '@nestjs/config'
import { APP_INTERCEPTOR }          from '@nestjs/core'
import axios                        from 'axios'

import { AccountBlocksController }  from './account-blocks.controller'
import { AccountBlocksService }     from './account-blocks.service'
import { CreateAccountBlockDto }    from './dto/create-account-block.dto'

import { 
  AccountBlockType, 
  AccountBlockStatus, 
}                                   from '@app/baas-interfaces'
import { 
  RequestIdAsyncLocalStorageModule, 
  RequestIdInterceptor 
}                                   from '@app/baas-async-local-storage'
import { WinstonLoggerService }     from '@app/winston-logger'
import { uuid }                     from '@app/baas-utils'

/**
 * Import test data
 */
 import {
  accountFactoryData,
  BaasApplication,
  setMockConfigService,
}                               from '../../../../test/'

/**
 * Setup test environment and data
 */
const mockConfigService    = setMockConfigService(BaasApplication.AccountService)
const accountData          = accountFactoryData.checking_1
const accountId            = accountData.id
const customerId           = uuid()
const tenantId             = `buffalo_bills`
const idempotencyKey       = uuid()
const createAccountBlockto = {
  block_type:   AccountBlockType.All,
  block_reason: `Suspected fraud`,
}

describe(`AccountBlocksService`, () => {
  let accountBlocksService:    AccountBlocksService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        RequestIdAsyncLocalStorageModule.forRoot(),
      ],
      controllers:  [AccountBlocksController],
      providers:    [
        AccountBlocksService,
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

    accountBlocksService = module.get<AccountBlocksService>(AccountBlocksService)
  })

  /**
   * create
   */
  describe(`create`, () => {
    it(`Creates a new account block`, async () => {
      const url           = `http://localhost:5001/core/api/v1/accounts/${accountId}/blocks`
      const requestHeaders = {
        'Customer-Id':      customerId,
        'Tenant-Id':        tenantId,
        'Idempotency-Key':  idempotencyKey,
      }
      const axiosConfig = {
        headers: requestHeaders
      }

      const accountBlock = {
        id: uuid(),
        block_status: AccountBlockStatus.Active,
        ...createAccountBlockto
      }
      const response = { data: {data: accountBlock}}

      const spy    = jest.spyOn(axios, 'post').mockResolvedValue(response)
      const result = await accountBlocksService.create(
        accountId, createAccountBlockto, requestHeaders
      )

      expect(spy).toBeCalled()
      expect(spy).toBeCalledWith(url, createAccountBlockto, axiosConfig)
      expect(result).toEqual({block: accountBlock})
    })
  })

  /**
   * findAll
   */
  describe(`findAll`, () => {
    it(`Returns a list of account blocks`, async () => {
      const url            = `http://localhost:5001/core/api/v1/accounts/${accountId}/blocks`
      const requestHeaders = {
        'Customer-Id':      customerId,
        'Tenant-Id':        tenantId,
      }
      const axiosConfig = {
        headers: requestHeaders
      }

      const accountBlock = {
        id: uuid(),
        block_status: AccountBlockStatus.Active,
        ...createAccountBlockto
      }
      const response = { data: {data: [accountBlock]}}

      const spy    = jest.spyOn(axios, 'get').mockResolvedValue(response)
      const result = await accountBlocksService.findAll(accountId, requestHeaders)

      expect(spy).toBeCalled()
      expect(spy).toBeCalledWith(url, axiosConfig)
      expect(result).toEqual({blocks: [accountBlock]})
    })
  })

  /**
   * remove
   */
  describe(`remove`, () => {
    it(`Removes account block`, async () => {
      const accountBlockId = uuid()
      const url            = `http://localhost:5001/core/api/v1/accounts/${accountId}/blocks/${accountBlockId}`
      const requestHeaders = {
        'Customer-Id':      customerId,
        'Tenant-Id':        tenantId,
      }
      const axiosConfig = {
        headers: requestHeaders
      }

      const accountBlock = {
        id:           accountBlockId,
        block_status: AccountBlockStatus.Canceled,
        ...createAccountBlockto
      }
      const response = { data: {data: accountBlock}}

      const spy    = jest.spyOn(axios, 'delete').mockResolvedValue(response)
      const result = await accountBlocksService.remove(
        accountId, accountBlockId, requestHeaders
      )

      expect(spy).toBeCalled()
      expect(spy).toBeCalledWith(url, axiosConfig)
      expect(result).toEqual({block: accountBlock})
    })
  })
}) // end of AccountBlocksService
