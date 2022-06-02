//-----------------------------------------------------------------------------
// apps/marqeta-adapter/src/marqeta-adapter.controller.spec.ts
//-----------------------------------------------------------------------------
import { 
  Test, 
  TestingModule 
}                                     from '@nestjs/testing'
import { ConfigService }              from '@nestjs/config'

import { MarqetaAdapterController }   from './marqeta-adapter.controller'
import { MarqetaAdapterService }      from './marqeta-adapter.service'

import { IHeartbeat }                   from '@app/baas-interfaces'
import { WinstonLoggerService }         from '@app/winston-logger'

import { 
  BaasApplication,
  setMockConfigService,
}                                       from '../../../test/baas.factory.utils'

// Setup test eenvironment
const mockConfigService = setMockConfigService(BaasApplication.MarqetaAdapter)

/**
 * MarqetaAdapterController
 */
describe('MarqetaAdapterController', () => {
  let marqetaAdapterController: MarqetaAdapterController
  let marqetaAdapterService:    MarqetaAdapterService
  let configService:            ConfigService

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers:  [MarqetaAdapterController],
      providers:    [
        MarqetaAdapterService,
        WinstonLoggerService,
        {
          provide:  ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    marqetaAdapterController = app.get<MarqetaAdapterController>(MarqetaAdapterController)
    marqetaAdapterService    = app.get<MarqetaAdapterService>(MarqetaAdapterService)
    configService            = app.get<ConfigService>(ConfigService)
  });

  describe('Ping', () => {
    it('Returns a heartbeat', () => {
      const heartbeat : IHeartbeat = {
        app:      configService.get('appName'),
        message:  `Is alive`,
        timestamp: (new Date()).toISOString(),
      }

      const spy    = jest.spyOn(marqetaAdapterService, 'ping').mockReturnValue(heartbeat)
      const result = marqetaAdapterController.pingV1()
      
      expect(spy).toBeCalled()
      expect(spy).toBeCalledWith()
      expect(result).toEqual(heartbeat)
    });
  });
});
