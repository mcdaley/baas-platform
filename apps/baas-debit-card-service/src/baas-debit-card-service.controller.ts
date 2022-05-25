//-----------------------------------------------------------------------------
// apps/baas-debit-card-service/src/baas-debit-card-service.controller.ts
//-----------------------------------------------------------------------------
import { 
  Controller, 
  Get 
}                                       from '@nestjs/common'
import { BaasDebitCardServiceService }  from './baas-debit-card-service.service'
import { IHeartbeat }                   from '@app/baas-interfaces'

/**
 * @class BaasDebitCardServiceController
 */
@Controller({path: '/', version: '1'})
export class BaasDebitCardServiceController {
  constructor(
    private readonly baasDebitCardServiceService: BaasDebitCardServiceService,
  ) {}

  @Get('ping')
  pingV1(): IHeartbeat {
    return this.baasDebitCardServiceService.ping();
  }
}
