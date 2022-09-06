//--------------------------------------------------------------------------------------------
// apps/baas-debit-card-service/src/blocks/debit-cards-blocks.controller.spec.ts
//--------------------------------------------------------------------------------------------
import { 
  Test, 
  TestingModule 
}                                       from '@nestjs/testing'
import { ConfigService }                from '@nestjs/config'
import { APP_INTERCEPTOR }              from '@nestjs/core'

import { DebitCardsBlocksController }   from './debit-cards-blocks.controller'
import { DebitCardsBlocksService }      from './debit-cards-blocks.service'

import {
  RequestIdAsyncLocalStorageModule,
  RequestIdInterceptor,
}                                       from '@app/baas-async-local-storage'
import { uuid }                         from '@app/baas-utils'
import { BlockReason }                  from '@app/baas-interfaces'
import { WinstonLoggerService }         from '@app/winston-logger'
import { CoreDebitCardSimulator }       from '@app/core-simulator'  // TODO: Remove

// Import test data 
import { debitCardFactoryData }         from '../../../../test/baas.factory.data'

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
 * Test data
 */
const debitCardData   = debitCardFactoryData.checking_1
const debitCardId     = debitCardData.id
const customerId      = debitCardData.customer_id
const tenantId        = debitCardData.tenant_id
const idempotencyKey  = uuid()

/**
 * DebitCardsBlocksController
 */
describe(`DebitCardsBlocksController`, () => {
  let debitCardsBlocksController:  DebitCardsBlocksController
  let debitCardsBlocksService:     DebitCardsBlocksService
  let configService:               ConfigService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports:      [RequestIdAsyncLocalStorageModule.forRoot()],
      controllers:  [DebitCardsBlocksController],
      providers:    [
        DebitCardsBlocksService, 
        {
          provide:  ConfigService,
          useValue: mockConfigService,
        }, 
        {
          provide:  APP_INTERCEPTOR,
          useValue: RequestIdInterceptor,
        },
        WinstonLoggerService,
        CoreDebitCardSimulator,       // TODO: REMOVE ONCE I REMOVE SIMULATOR
      ],
    }).compile()

    debitCardsBlocksController = module.get<DebitCardsBlocksController>(DebitCardsBlocksController)
    debitCardsBlocksService    = module.get<DebitCardsBlocksService>(DebitCardsBlocksService)
    configService              = module.get<ConfigService>(ConfigService)
  })

  /**
   * createV1
   */
  describe(`createV1`, () => {
    it(`Blocks a debit cards`, async () => {
      const requestHeaders = {
        'Customer-Id':      customerId,
        'Tenant-Id':        tenantId,
        'Idempotency-Key':  idempotencyKey,
      }

      const createDebitCardsBlockDto = {
        block_reason: BlockReason.Lost
      }

      const debitCardBlock = {
        id:           uuid(),
        is_active:    true,
        block_date:   new Date(),
        ...createDebitCardsBlockDto
      }
      const response = {
        block: debitCardBlock,
      }

      const spy    = jest.spyOn(debitCardsBlocksService, 'create').mockResolvedValue(response)
      const result = await debitCardsBlocksController.createV1(
        requestHeaders, debitCardId, createDebitCardsBlockDto)

      expect(spy).toBeCalled()
      expect(spy).toBeCalledWith(debitCardId, createDebitCardsBlockDto, requestHeaders)
      expect(result).toEqual(response)
    })
  })

  describe(`findAllV1`, () => {
    it(`Returns a list of all blocks placed on a debit card`, async () => {
      const requestHeaders = {
        'Customer-Id':      customerId,
        'Tenant-Id':        tenantId,
      }

      const debitCardBlocks = [
        {
          id:           uuid(),
          block_reason: BlockReason.Lost,
          is_active:    true,
          block_date:   new Date(),
        }
      ]

      const response       = {
        blocks: debitCardBlocks,
      }

      const spy    = jest.spyOn(debitCardsBlocksService, 'findAll').mockResolvedValue(response)
      const result = await debitCardsBlocksController.findAllV1(requestHeaders, debitCardId)

      expect(spy).toBeCalled()
      expect(spy).toBeCalledWith(debitCardId, requestHeaders)
      expect(result).toEqual(response)
    })
  })

  describe(`removeV1`, () => {
    it(`Cancels a block on a debit card`, async () => {
      const blockId         = uuid()
      const block  = {
        id:           blockId,
        block_reason: BlockReason.Lost,
        is_active:    false,
        block_date:   new Date(),
      }

      const requestHeaders = {
        'Customer-Id':      customerId,
        'Tenant-Id':        tenantId,
      }

      const response = {
        block: block,
      }

      const spy    = jest.spyOn(debitCardsBlocksService, 'remove').mockResolvedValue(response)
      const result = await debitCardsBlocksController.removeV1(
        requestHeaders, debitCardId, blockId)

      expect(spy).toBeCalled()
      expect(spy).toBeCalledWith(debitCardId, blockId, requestHeaders)
      expect(result).toEqual(response)
    })
  })
})
