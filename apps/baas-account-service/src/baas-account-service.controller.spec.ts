//-----------------------------------------------------------------------------
// apps/baas-account-service/src/baas-account-service.controller.spec.ts
//-----------------------------------------------------------------------------
import { ConfigService }                from '@nestjs/config'
import { APP_INTERCEPTOR }              from '@nestjs/core'
import { Test, TestingModule }          from '@nestjs/testing'

import { BaasAccountServiceController } from './baas-account-service.controller'
import { BaasAccountServiceService }    from './baas-account-service.service'

import {
  RequestIdAsyncLocalStorageModule,
  RequestIdInterceptor,
}                                       from '@app/baas-async-local-storage'
import { IHeartbeat }                   from '@app/baas-interfaces'
import { WinstonLoggerService }         from '@app/winston-logger'

import { 
  BaasApplication,
  setMockConfigService,
}                                       from '../../../test/baas.factory.utils'

// Setup test eenvironment
const mockConfigService = setMockConfigService(BaasApplication.AccountService)

/**
 * BaasAccountServiceController
 */
describe('BaasAccountServiceController', () => {
  let baasAccountServiceController: BaasAccountServiceController
  let baasAccountServiceService:    BaasAccountServiceService
  let configService:                ConfigService

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        RequestIdAsyncLocalStorageModule.forRoot()
      ],
      controllers:  [BaasAccountServiceController],
      providers:    [
        BaasAccountServiceService, 
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

    baasAccountServiceController = app.get<BaasAccountServiceController>(BaasAccountServiceController)
    baasAccountServiceService    = app.get<BaasAccountServiceService>(BaasAccountServiceService)
    configService                = app.get<ConfigService>(ConfigService)
  });

  describe('Ping', () => {
    it('Returns a heartbeat', () => {
      const heartbeat : IHeartbeat = {
        app:      configService.get('appName'),
        message:  `Is alive`,
        timestamp: (new Date()).toISOString(),
      }

      const spy    = jest.spyOn(baasAccountServiceService, 'ping').mockReturnValue(heartbeat)
      const result = baasAccountServiceController.pingV1()
      
      expect(spy).toBeCalled()
      expect(spy).toBeCalledWith()
      expect(result).toEqual(heartbeat)
    });
  });
});
