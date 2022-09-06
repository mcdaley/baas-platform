//-----------------------------------------------------------------------------
// apps/baas-debit-card-service/src/bass-debit-card-service.controller.spec.ts
//-----------------------------------------------------------------------------
import { 
  Test, 
  TestingModule 
}                                         from '@nestjs/testing'
import { ConfigService }                  from '@nestjs/config'
import { APP_INTERCEPTOR }                from '@nestjs/core'

import { BaasDebitCardServiceController } from './baas-debit-card-service.controller'
import { BaasDebitCardServiceService }    from './baas-debit-card-service.service'

import {
  RequestIdAsyncLocalStorageModule,
  RequestIdInterceptor,
}                                         from '@app/baas-async-local-storage'
import { IHeartbeat }                     from '@app/baas-interfaces'

import {
  BaasApplication,
  setMockConfigService,
}                                         from '../../../test/baas.factory.utils'

// Setup test environment
const mockConfigService = setMockConfigService(BaasApplication.DebitCardService)

/**
 * BaasDebitCardServiceController
 */
describe('BaasDebitCardServiceController', () => {
  let baasDebitCardServiceController : BaasDebitCardServiceController
  let baasDebitCardServiceService    : BaasDebitCardServiceService
  let configService                  : ConfigService

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        RequestIdAsyncLocalStorageModule.forRoot()
      ],
      controllers:  [BaasDebitCardServiceController],
      providers:    [
        BaasDebitCardServiceService,
        {
          provide:  ConfigService,
          useValue: mockConfigService,
        },
        {
          provide:  APP_INTERCEPTOR,
          useValue: RequestIdInterceptor,
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
        app:      configService.get('appName'),
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
