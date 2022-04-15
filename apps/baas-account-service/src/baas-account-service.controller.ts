//-----------------------------------------------------------------------------
// apps/baas-account-service/src/baas-account-service.controller.ts
//-----------------------------------------------------------------------------
import { 
  Controller, 
  Get, 
}                                     from '@nestjs/common'
import { BaasAccountServiceService }  from './baas-account-service.service'

import { WinstonLoggerService }       from '@app/winston-logger'

@Controller()
export class BaasAccountServiceController {
  constructor(
    private readonly baasAccountServiceService: BaasAccountServiceService,
    private readonly logger:                    WinstonLoggerService,
  ) {}

  @Get()
  getHello(): string {
    this.logger.log(`Dude, global logging works!`)
    return this.baasAccountServiceService.getHello();
  }
}
