//-----------------------------------------------------------------------------
// apps/baas-debit-card-service/src/debit-cards-activate/debit-cards-activate.controller.ts
//-----------------------------------------------------------------------------
import { 
  Controller,
  HttpCode,
  Param,  
  ParseUUIDPipe,
  Patch,
  Post,  
}                                       from '@nestjs/common'

import { DebitCardsActivateService }    from './debit-cards-activate.service'

import { WinstonLoggerService }         from '@app/winston-logger'
import { IdempotencyKey } from '@app/baas-errors'

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
   * @method  updateV1
   */
  @Patch()
  @HttpCode(204)
  updateV1(
    @IdempotencyKey() idempotencyKey: string,
    @Param('debitCardId', ParseUUIDPipe) debitCardId: string
  ) {
    this.logger.log(`PATCH /v1/debit-cards/${debitCardId}/activate`)
    return this.debitCardsActivateService.update(debitCardId)
  }
} // end of class DebitCardsActivateController
