//-----------------------------------------------------------------------------
// app/marqeta-adapter/src/marqeta-adapter.controller.ts
//-----------------------------------------------------------------------------
import { 
  Controller, 
  Get 
}                                 from '@nestjs/common'

import { MarqetaAdapterService }  from './marqeta-adapter.service'

import { IHeartbeat }             from '@app/baas-interfaces'
import { WinstonLoggerService }   from '@app/winston-logger'

/**
 * @class MarqetaAdapterController
 */
@Controller({path: '/', version: '1'})
export class MarqetaAdapterController {
  constructor(
    private readonly marqetaAdapterService: MarqetaAdapterService,
    private readonly logger:                WinstonLoggerService,
  ) {}

  @Get('ping')
  pingV1() : IHeartbeat {
    this.logger.log(`GET /v1/ping`)
    return this.marqetaAdapterService.ping()
  }
}
