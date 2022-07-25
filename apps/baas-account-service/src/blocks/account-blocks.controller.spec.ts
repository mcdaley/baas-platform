//-----------------------------------------------------------------------------
// apps/baas-account-service/src/blocks/account-blocks.controller.spec.ts
//-----------------------------------------------------------------------------
import { 
  Test, 
  TestingModule, 
}                                   from '@nestjs/testing'
import { ConfigService }            from '@nestjs/config'

import { AccountBlocksController }  from './account-blocks.controller'
import { AccountBlocksService }     from './account-blocks.service'
import { CreateAccountBlockDto }    from './dto/create-account-block.dto'

import { 
  AccountBlockType, 
  AccountBlockStatus, 
}                                   from '@app/baas-interfaces'
import { WinstonLoggerService }     from '@app/winston-logger'
import { uuid }                     from '@app/baas-utils'
///////////////////////////////////////////////////////////////////////////////
// TODO: 07/21/2022
// Remove all references to "CoreSimulatorService" in baas-account-service
// as it has been deprecated.
///////////////////////////////////////////////////////////////////////////////
import { CoreSimulatorService }     from '@app/core-simulator'

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

describe(`AccountBlocksController`, () => {
  let accountBlocksController: AccountBlocksController
  let accountBlocksService:    AccountBlocksService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers:  [AccountBlocksController],
      providers:    [
        AccountBlocksService,
        {
          provide:  ConfigService,
          useValue: mockConfigService,
        }, 
        WinstonLoggerService,
        CoreSimulatorService,
      ],
    }).compile();

    accountBlocksController  = module.get<AccountBlocksController>(AccountBlocksController)
    accountBlocksService     = module.get<AccountBlocksService>(AccountBlocksService)
  })

  /**
   * createV1
   */
  describe(`createV1`, () => {
    it(`Creates a new account block`, async () => {
      let accountBlock = {
        id:           uuid(),
        block_status: AccountBlockStatus.Active,
        ...createAccountBlockto
      }

      let response = {
        block: accountBlock,
      }

      const spy    = jest.spyOn(accountBlocksService, 'create').mockResolvedValue(response)
      const result = await accountBlocksController.createV1(
        customerId, tenantId, idempotencyKey, accountId, createAccountBlockto
      )

      expect(spy).toBeCalled()
      expect(spy).toBeCalledWith(accountId, createAccountBlockto, customerId, tenantId, idempotencyKey)
      expect(result).toEqual(response)
    })
  })

  /**
   * findAllV1
   */
  describe(`findAllV1`, () => {
    it(`Returns a list of all the account blocks`, async () => {
      let accountBlock = {
        id:           uuid(),
        block_status: AccountBlockStatus.Active,
        ...createAccountBlockto
      }

      let response = {
        blocks: [accountBlock]
      }

      const spy    = jest.spyOn(accountBlocksService, 'findAll').mockResolvedValue(response)
      const result = await accountBlocksController.findAllV1(customerId, tenantId, accountId)

      expect(spy).toBeCalled()
      expect(spy).toBeCalledWith(accountId, customerId, tenantId)
      expect(result).toEqual(response)
    })
  })

  /**
   * removeV1
   */
  describe(`removeV1`, () => {
    it(`Removes account block by updating status to canceled`, async () => {
      let accountBlockId = uuid()
      let accountBlock   = {
        id:           accountBlockId,
        block_status: AccountBlockStatus.Canceled,
        ...createAccountBlockto
      }

      let response = {
        block: accountBlock
      }

      const spy    = jest.spyOn(accountBlocksService, 'remove').mockResolvedValue(response)
      const result = await accountBlocksController.removeV1(
        customerId, tenantId, accountId, accountBlockId
      )

      expect(spy).toBeCalled()
      expect(spy).toBeCalledWith(accountId, accountBlockId, customerId, tenantId)
      expect(result).toEqual(response)
    })
  })
}) // end of describe AccountBlocksController

