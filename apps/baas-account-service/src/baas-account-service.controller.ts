//-----------------------------------------------------------------------------
// apps/baas-account-service/src/baas-account-service.controller.ts
//-----------------------------------------------------------------------------
import { 
  Controller, 
  Get, 
}                                     from '@nestjs/common'

import { BaasAccountServiceService }  from './baas-account-service.service'

import { WinstonLoggerService }       from '@app/winston-logger'

@Controller({path: 'accounts/ping', version: '1'})
export class BaasAccountServiceController {
  constructor(
    private readonly baasAccountServiceService: BaasAccountServiceService,
    private readonly logger:                    WinstonLoggerService,
  ) {}

  @Get()
  ping() {
    this.logger.log(`GET /v1/accounts/ping`)
    return this.baasAccountServiceService.ping()
  }
}
