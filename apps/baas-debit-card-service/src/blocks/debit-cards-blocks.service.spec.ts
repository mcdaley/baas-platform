//---------------------------------------------------------------------------------------
// apps/baas-debit-card-service/src/blocks/debit-cards-blocks.service.spec.ts
//---------------------------------------------------------------------------------------
import { 
  Test, 
  TestingModule 
}                                       from '@nestjs/testing'
import { ConfigService }                from '@nestjs/config'
import { APP_INTERCEPTOR }              from '@nestjs/core'
import axios                            from 'axios'

import { DebitCardsBlocksService }      from './debit-cards-blocks.service'

import {
  RequestIdAsyncLocalStorageModule,
  RequestIdInterceptor,
}                                       from '@app/baas-async-local-storage'
import { BlockReason }                  from '@app/baas-interfaces'
import { uuid }                         from '@app/baas-utils'
import { WinstonLoggerService }         from '@app/winston-logger'

// Import the test data
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
 * DebitCardsBlocksService
 */
describe(`DebitCardsBlocksService`, () => {
  let debitCardsBlocksService : DebitCardsBlocksService
  let configService           : ConfigService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports:   [RequestIdAsyncLocalStorageModule.forRoot()],
      providers: [
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
      const createDebitCardBlocksDto = { 
        block_reason: BlockReason.Fraud 
      }

      const block = {
        id:           uuid(),
        is_active:    true,
        block_date:   new Date(),
        ...createDebitCardBlocksDto
      }

      const url            = `${configService.get('bankSimulatorDebitCardsUrl')}/${debitCardId}/blocks`
      const requestHeaders = {
        'Customer-Id':      customerId,
        'Tenant-Id':        tenantId,
        'Idempotency-Key':  idempotencyKey,
      }
      const axiosConfig = {
        headers: requestHeaders,
      }
      const response = {
        data: {
          data: block
        }
      }

      const spy    = jest.spyOn(axios, 'post').mockResolvedValue(response)
      const result = await debitCardsBlocksService.create(
        debitCardId, createDebitCardBlocksDto, requestHeaders)

      expect(spy).toBeCalled()
      expect(spy).toBeCalledWith(url, createDebitCardBlocksDto, axiosConfig)
      expect(result).toEqual({block: block})
    })
  })

  /**
   * findAll()
   */
  describe(`findAll`, () => {
    it(`Returns a list of all the account blocks`, async () => {
      const blocks = [
        {
          id:           uuid(),
          block_reason: BlockReason.Fraud,
          is_active:    true,
          block_date:   new Date(),
        },
      ]

      const url         = `${configService.get('bankSimulatorDebitCardsUrl')}/${debitCardId}/blocks`
      const requestHeaders = {
        'Customer-Id':      customerId,
        'Tenant-Id':        tenantId,
      }
      const axiosConfig = {
        headers: requestHeaders,
      }
      const response = {
        data: {
          data: blocks
        },
      }

      const spy   = jest.spyOn(axios, 'get').mockResolvedValue(response)
      const result = await debitCardsBlocksService.findAll(debitCardId, requestHeaders)

      expect(spy).toBeCalled()
      expect(spy).toBeCalledWith(url, axiosConfig)
      expect(result).toEqual({blocks: blocks})
    })
  })

  /**
   * remove()
   */
  describe(`remove`, () => {
    it(`Cancels a debit card block`, async () => {
      const blockId = uuid()
      const block   = {
        id:           blockId,
        block_reason: BlockReason.Stolen,
        is_active:    false,
        block_date:   new Date(),
      }


      const url         = `${configService.get('bankSimulatorDebitCardsUrl')}/${debitCardId}/blocks/${blockId}`
      const requestHeaders = {
        'Customer-Id':      customerId,
        'Tenant-Id':        tenantId,
      }
      const axiosConfig = {
        headers: requestHeaders,
      }
      const response = {
        data: { data: block },
      }

      const spy    = jest.spyOn(axios, 'delete').mockResolvedValue(response)
      const result = await debitCardsBlocksService.remove(debitCardId, blockId, requestHeaders)

      expect(spy).toBeCalled()
      expect(spy).toBeCalledWith(url, axiosConfig)
      expect(result).toEqual({block: block})
    })
  })
})


