//-----------------------------------------------------------------------------
// apps/baas-account-service/src/baas-account-service.controller.ts
//-----------------------------------------------------------------------------
import { 
  Controller, 
  Get, 
}                                     from '@nestjs/common'

import { BaasAccountServiceService }  from './baas-account-service.service'

import { IHeartbeat }                 from '@app/baas-interfaces'
import { WinstonLoggerService }       from '@app/winston-logger'

@Controller({path: '/', version: '1'})
export class BaasAccountServiceController {
  constructor(
    private readonly baasAccountServiceService: BaasAccountServiceService,
    private readonly logger:                    WinstonLoggerService,
  ) {}

  @Get('ping')
  pingV1() : IHeartbeat {
    this.logger.log(`GET /v1/ping`)
    return this.baasAccountServiceService.ping()
  }
}
