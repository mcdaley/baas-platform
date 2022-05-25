//-----------------------------------------------------------------------------
// apps/baas-debit-card-service/src/bass-debit-card-service.controller.spec.ts
//-----------------------------------------------------------------------------
import { 
  Test, 
  TestingModule 
}                                         from '@nestjs/testing'
import { ConfigService }                  from '@nestjs/config'

import { BaasDebitCardServiceController } from './baas-debit-card-service.controller'
import { BaasDebitCardServiceService }    from './baas-debit-card-service.service'

import { IHeartbeat }                     from '@app/baas-interfaces'

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
 * BaasDebitCardServiceController
 */
describe('BaasDebitCardServiceController', () => {
  let baasDebitCardServiceController : BaasDebitCardServiceController
  let baasDebitCardServiceService    : BaasDebitCardServiceService
  let configService                  : ConfigService

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers:  [BaasDebitCardServiceController],
      providers:    [
        BaasDebitCardServiceService,
        {
          provide:  ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    baasDebitCardServiceController = app.get<BaasDebitCardServiceController>(BaasDebitCardServiceController)
    baasDebitCardServiceService    = app.get<BaasDebitCardServiceService>(BaasDebitCardServiceService)
    configService                  = app.get<ConfigService>(ConfigService)
  });

  /**
   * ping()
   */
  describe('ping', () => {
    it('returns a heartbeat', () => {
      const heartbeat : IHeartbeat = {
        app:      `baas-debit-card-service-test`,
        message:  `Is alive`,
        timestamp: (new Date()).toISOString(),
      }

      const spy    = jest.spyOn(baasDebitCardServiceService, 'ping').mockReturnValue(heartbeat)
      const result = baasDebitCardServiceController.pingV1()
      
      expect(spy).toBeCalled()
      expect(spy).toBeCalledWith()
      expect(result).toEqual(heartbeat)
    });
  });
});
