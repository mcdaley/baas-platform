//-----------------------------------------------------------------------------
// apps/baas-account-service/src/baas-account-service.controller.spec.ts
//-----------------------------------------------------------------------------
import { ConfigService }                from '@nestjs/config'
import { Test, TestingModule }          from '@nestjs/testing'

import { BaasAccountServiceController } from './baas-account-service.controller'
import { BaasAccountServiceService }    from './baas-account-service.service'

import { WinstonLoggerService }         from '@app/winston-logger'

describe('BaasAccountServiceController', () => {
  let baasAccountServiceController: BaasAccountServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers:  [BaasAccountServiceController],
      providers:    [
        BaasAccountServiceService, 
        WinstonLoggerService,
        ConfigService,
      ],
    }).compile();

    baasAccountServiceController = app.get<BaasAccountServiceController>(BaasAccountServiceController);
  });

  describe('Ping', () => {
    it('Returns a heartbeat', () => {
      const result        = baasAccountServiceController.ping()
      const { heartbeat } = result

      expect(heartbeat.app).toBe(`baas-account-service`)
    });
  });
});
