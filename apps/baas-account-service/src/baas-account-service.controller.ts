//-----------------------------------------------------------------------------
// apps/baas-account-service/src/baas-account-service.controller.ts
//-----------------------------------------------------------------------------
import { 
  Controller, 
  Get, 
}                                     from '@nestjs/common'

import { BaasAccountServiceService }  from './baas-account-service.service'

import { IHeartbeat }                 from '@app/baas-interfaces'

@Controller({path: '/', version: '1'})
export class BaasAccountServiceController {
  constructor(
    private readonly baasAccountServiceService: BaasAccountServiceService,
  ) {}

  @Get('ping')
  pingV1() : IHeartbeat {
    return this.baasAccountServiceService.ping()
  }
}
