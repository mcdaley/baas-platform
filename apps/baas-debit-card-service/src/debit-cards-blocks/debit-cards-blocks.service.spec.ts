//---------------------------------------------------------------------------------------
// apps/baas-debit-card-service/src/debit-card-blocks/debit-cards-blocks.service.spec.ts
//---------------------------------------------------------------------------------------
import { 
  Test, 
  TestingModule 
}                                       from '@nestjs/testing'
import { ConfigService }                from '@nestjs/config'
import axios                            from 'axios'

import { DebitCardsBlocksService }      from './debit-cards-blocks.service'

import { WinstonLoggerService }         from '@app/winston-logger'
import { CoreDebitCardSimulator }       from '@app/core-simulator'  // TODO: Remove

// Import the test data
import { debitCardFactoryData }         from '../../../../test/baas.factory.data'
import { BlockReason } from '@app/baas-interfaces'
import { uuid } from '@app/baas-utils'

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
 * DebitCardsBlocksService
 */
describe(`DebitCardsBlocksService`, () => {
  let debitCardsBlocksService : DebitCardsBlocksService
  let configService           : ConfigService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DebitCardsBlocksService, 
        { 
          provide:  ConfigService,
          useValue: mockConfigService,
        }, 
        WinstonLoggerService,
        CoreDebitCardSimulator,
      ],
    }).compile()

    configService           = module.get<ConfigService>(ConfigService)
    debitCardsBlocksService = module.get<DebitCardsBlocksService>(DebitCardsBlocksService)
  })

  /**
   * create()
   */
  describe(`create`, () => {
    it(`Blocks a debit card`, async () => {
      const debitCardId              = debitCardData.id
      const createDebitCardBlocksDto = { block_reason: BlockReason.Fraud }
      const debitCardsBlock          = [
        {
          id:           uuid(),
          block_reason: BlockReason.Fraud,
          is_active:    true,
          block_date:   new Date(),
        }
      ]

      const url      = `${configService.get('bankSimulatorDebitCardsUrl')}/${debitCardId}`
      const response = {
        data: debitCardsBlock
      }

      const spy    = jest.spyOn(axios, 'patch').mockResolvedValue(response)
      const result = await debitCardsBlocksService.create(debitCardId, createDebitCardBlocksDto)

      expect(spy).toBeCalled()
      expect(spy).toBeCalledWith(url, createDebitCardBlocksDto)
      expect(result).toEqual(debitCardsBlock)
    })
  })

  /**
   * findAll()
   */
  describe(`findAll`, () => {
    it(`Returns a list of all the account blocks`, async () => {
      const debitCardId          = debitCardData.id
      const debitCardsBlocksList = [
        {
          id:           uuid(),
          block_reason: BlockReason.Fraud,
          is_active:    true,
          block_date:   new Date(),
        },
      ]

      const url      = `${configService.get('bankSimulatorDebitCardsUrl')}/${debitCardId}`
      const response = {
        data: debitCardsBlocksList,
      }

      const spy   = jest.spyOn(axios, 'get').mockResolvedValue(response)
      const result = await debitCardsBlocksService.findAll(debitCardId)

      expect(spy).toBeCalled()
      expect(spy).toBeCalledWith(url)
      expect(result).toEqual(debitCardsBlocksList)
    })
  })

  /**
   * remove()
   */
  describe(`remove`, () => {
    it(`Cancels a debit card block`, async () => {
      const debitCardId          = debitCardData.id
      const blockId              = uuid()
      const debitCardsBlocksList = [
        {
          id:           blockId,
          block_reason: BlockReason.Stolen,
          is_active:    false,
          block_date:   new Date(),
        },
      ]


      const url      = `${configService.get('bankSimulatorDebitCardsUrl')}/${debitCardId}/blocks/${blockId}`
      const response = {
        data: debitCardsBlocksList,
      }

      const spy    = jest.spyOn(axios, 'delete').mockResolvedValue(response)
      const result = await debitCardsBlocksService.remove(debitCardId, blockId)

      expect(spy).toBeCalled()
      expect(spy).toBeCalledWith(url)
      expect(result).toEqual(debitCardsBlocksList)
    })
  })
})


