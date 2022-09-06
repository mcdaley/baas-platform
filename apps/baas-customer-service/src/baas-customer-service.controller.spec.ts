//-----------------------------------------------------------------------------
// apps/baas-customer-service/src/baas-customer-service.controller.spec.ts
//-----------------------------------------------------------------------------
import { 
  Test, 
  TestingModule 
}                                         from '@nestjs/testing'
import { ConfigService }                  from '@nestjs/config'
import { APP_INTERCEPTOR }                from '@nestjs/core'

import { BaasCustomerServiceController }  from './baas-customer-service.controller'
import { BaasCustomerServiceService }     from './baas-customer-service.service'

import { IHeartbeat }                     from '@app/baas-interfaces'
import { WinstonLoggerService }           from '@app/winston-logger'

import {
  BaasApplication,
  setMockConfigService,
}                                         from '../../../test/baas.factory.utils'
import { 
  RequestIdAsyncLocalStorageModule, 
  RequestIdInterceptor 
}                                         from '@app/baas-async-local-storage'

// Setup test environment
const mockConfigService = setMockConfigService(BaasApplication.CustomerService)

/**
 * BaasCustomerServiceController
 */
describe('BaasCustomerServiceController', () => {
  let baasCustomerServiceController: BaasCustomerServiceController
  let baasCustomerServiceService:    BaasCustomerServiceService
  let configService:                 ConfigService

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports:      [
        RequestIdAsyncLocalStorageModule.forRoot(),
      ],
      controllers:  [BaasCustomerServiceController],
      providers:    [
        BaasCustomerServiceService,
        WinstonLoggerService,
        {
          provide:  ConfigService,
          useValue: mockConfigService,
        },
        {
          provide:  APP_INTERCEPTOR,
          useClass: RequestIdInterceptor
        },
      ],
    }).compile();

    baasCustomerServiceController = app.get<BaasCustomerServiceController>(BaasCustomerServiceController)
    baasCustomerServiceService    = app.get<BaasCustomerServiceService>(BaasCustomerServiceService)
    configService                 = app.get<ConfigService>(ConfigService)
  });

  describe('Ping', () => {
    it('Returns a heartbeat', () => {
      const heartbeat : IHeartbeat = {
        app:      configService.get('appName'),
        message:  `Is alive`,
        timestamp: (new Date()).toISOString(),
      }

      const spy    = jest.spyOn(baasCustomerServiceService, 'ping').mockReturnValue(heartbeat)
      const result = baasCustomerServiceController.pingV1()
      
      expect(spy).toBeCalled()
      expect(spy).toBeCalledWith()
      expect(result).toEqual(heartbeat)
    });
  });
});
