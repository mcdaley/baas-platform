//--------------------------------------------------------------------------------------------
// apps/baas-debit-card-service/src/debit-cards-blocks/debit-cards-blocks.controller.spec.ts
//--------------------------------------------------------------------------------------------
import { 
  Test, 
  TestingModule 
}                                       from '@nestjs/testing'
import { ConfigService }                from '@nestjs/config'

import { DebitCardsBlocksController }   from './debit-cards-blocks.controller'
import { DebitCardsBlocksService }      from './debit-cards-blocks.service'

import { WinstonLoggerService }         from '@app/winston-logger'
import { CoreDebitCardSimulator }       from '@app/core-simulator'  // TODO: Remove

// Import test data 
import { debitCardFactoryData }         from '../../../../test/baas.factory.data'
import { uuid } from '@app/baas-utils'
import { BlockReason } from '@app/baas-interfaces'

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
const debitCardData = debitCardFactoryData.checking_1

/**
 * DebitCardsBlocksController
 */
describe(`DebitCardsBlocksController`, () => {
  let debitCardsBlocksController:  DebitCardsBlocksController
  let debitCardsBlocksService:     DebitCardsBlocksService
  let configService:               ConfigService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers:  [DebitCardsBlocksController],
      providers:    [
        DebitCardsBlocksService, 
        {
          provide:  ConfigService,
          useValue: mockConfigService,
        }, 
        WinstonLoggerService,
        CoreDebitCardSimulator,       // TODO: REMOVE ONCE I REMOVE SIMULATOR
      ],
    }).compile()

    debitCardsBlocksController = module.get<DebitCardsBlocksController>(DebitCardsBlocksController)
    debitCardsBlocksService    = module.get<DebitCardsBlocksService>(DebitCardsBlocksService)
    configService              = module.get<ConfigService>(ConfigService)
  })

  describe(`createV1`, () => {
    it(`Blocks a debit cards`, async () => {
      const idempotencyKey           = `unique-idempotency-key`
      const debitCardId              = debitCardData.id
      const createDebitCardsBlockDto = {
        block_reason: BlockReason.Lost
      }

      const debitCardBlocks = [
        {
          id:           uuid(),
          block_reason: BlockReason.Lost,
          is_active:    true,
          block_date:   new Date(),
        }
      ]
      const response = {
        ...debitCardBlocks,
      }

      const spy    = jest.spyOn(debitCardsBlocksService, 'create').mockResolvedValue(response)
      const result = await debitCardsBlocksController.createV1(idempotencyKey, debitCardId, createDebitCardsBlockDto)

      expect(spy).toBeCalled()
      expect(spy).toBeCalledWith(debitCardId, createDebitCardsBlockDto)
      expect(result).toEqual(response)
    })
  })

  describe(`findAllV1`, () => {
    it(`Returns a list of all blocks placed on a debit card`, async () => {
      const debitCardId     = debitCardData.id
      const debitCardBlocks = [
        {
          id:           uuid(),
          block_reason: BlockReason.Lost,
          is_active:    true,
          block_date:   new Date(),
        }
      ]

      const response       = {
        ...debitCardBlocks,
      }

      const spy    = jest.spyOn(debitCardsBlocksService, 'findAll').mockResolvedValue(response)
      const result = await debitCardsBlocksController.findAllV1(debitCardId)

      expect(spy).toBeCalled()
      expect(spy).toBeCalledWith(debitCardId)
      expect(result).toEqual(response)
    })
  })

  describe(`removeV1`, () => {
    it(`Cancels a block on a debit card`, async () => {
      const idempotencyKey  = `unique-idempotency-key`
      const debitCardId     = debitCardData.id
      const blockId         = uuid()
      const debitCardBlocks = [
        {
          id:           blockId,
          block_reason: BlockReason.Lost,
          is_active:    false,
          block_date:   new Date(),
        }
      ]
      const response = {
        ...debitCardBlocks,
      }

      const spy    = jest.spyOn(debitCardsBlocksService, 'remove').mockResolvedValue(response)
      const result = await debitCardsBlocksController.removeV1(idempotencyKey, debitCardId, blockId)

      expect(spy).toBeCalled()
      expect(spy).toBeCalledWith(debitCardId, blockId)
      expect(result).toEqual(response)
    })
  })
})
