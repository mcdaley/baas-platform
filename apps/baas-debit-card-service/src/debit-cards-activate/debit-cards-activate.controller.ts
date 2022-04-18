//-----------------------------------------------------------------------------
// apps/baas-debit-card-service/src/debit-cards-activate/debit-cards-activate.controller.ts
//-----------------------------------------------------------------------------
import { 
  Controller,
  HttpCode,
  Param,  
  ParseUUIDPipe,
  Post,  
}                                       from '@nestjs/common'

import { DebitCardsActivateService }    from './debit-cards-activate.service'

import { WinstonLoggerService }         from '@app/winston-logger'

/**
 * @class DebitCardsActivateController
 */
@Controller({path: '/debit-cards/:debitCardId/activate', version: '1'})
export class DebitCardsActivateController {
  constructor(
    private readonly debitCardsActivateService: DebitCardsActivateService,
    private readonly logger:                    WinstonLoggerService
  ) {}

  /**
   * @method  createV1
   */
  @Post()
  @HttpCode(204)
  createV1(
    @Param('debitCardId', ParseUUIDPipe) debitCardId: string
  ) {
    this.logger.log(`POST /v1/debit-cards/${debitCardId}/activate`)
    return this.debitCardsActivateService.create(debitCardId)
  }
} // end of class DebitCardsActivateController
