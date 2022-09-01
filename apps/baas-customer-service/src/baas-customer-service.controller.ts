//-----------------------------------------------------------------------------
// apps/baas-customer-service/src/baas-customer-service.controller.ts
//-----------------------------------------------------------------------------
import { 
  Controller, 
  Get 
}                                     from '@nestjs/common'

import { BaasCustomerServiceService } from './baas-customer-service.service'

import { IHeartbeat }                 from '@app/baas-interfaces'
import { WinstonLoggerService }       from '@app/winston-logger'

/**
 * @class BaasCustomerServiceController
 */
@Controller({path: '/', version: '1'})
export class BaasCustomerServiceController {
  constructor(
    private readonly baasCustomerServiceService: BaasCustomerServiceService,
    private readonly logger:                     WinstonLoggerService,
  ) {}

  @Get('ping')
  pingV1(): IHeartbeat {
    this.logger.log({message: `GET /v1/ping`})
    return this.baasCustomerServiceService.ping();
  }
}
