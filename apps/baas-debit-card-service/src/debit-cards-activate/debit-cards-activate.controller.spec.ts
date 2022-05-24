//----------------------------------------------------------------------------------------------
// apps/baas-debit-card-service/src/debit-cards-activate/debit-cards-activate.controller.spec.ts
//-----------------------------------------------------------------------------------------------
import { 
  Test, 
  TestingModule 
}                                       from '@nestjs/testing'
import { ConfigService }                from '@nestjs/config'

import { DebitCardsActivateController } from './debit-cards-activate.controller'
import { DebitCardsActivateService }    from './debit-cards-activate.service'

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
const debitCardData = debitCardFactoryData.checking_1

/**
 * DebitCardsActivateController
 */
describe(`DebitCardsActivateController`, () => {
  let debitCardsActivateController:  DebitCardsActivateController
  let debitCardsActivateService:     DebitCardsActivateService
  let configService:         ConfigService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers:  [DebitCardsActivateController],
      providers:    [
        DebitCardsActivateService, 
        {
          provide:  ConfigService,
          useValue: mockConfigService,
        }, 
        WinstonLoggerService,
        CoreDebitCardSimulator,       // TODO: REMOVE ONCE I REMOVE SIMULATOR
      ],
    }).compile()

    debitCardsActivateController = module.get<DebitCardsActivateController>(DebitCardsActivateController)
    debitCardsActivateService    = module.get<DebitCardsActivateService>(DebitCardsActivateService)
    configService                = module.get<ConfigService>(ConfigService)
  })

  /**
   * createV1()
   */
  describe(`createV1`, () => {
    it(`Activates a debit cards`, async () => {
      const idempotencyKey = `unique-idempotency-key`
      const debitCardId    = debitCardData.id
      const url            = `${configService.get('bankSimulatorDebitCardsUrl')}/${debitCardId}`
      const response       = {
        ...debitCardData,
      }

      const spy    = jest.spyOn(debitCardsActivateService, 'update').mockResolvedValue(response)
      const result = await debitCardsActivateController.updateV1(idempotencyKey, debitCardId)

      expect(spy).toBeCalled()
      expect(spy).toBeCalledWith(debitCardId)
      expect(result).toEqual(response)
    })
  })
})