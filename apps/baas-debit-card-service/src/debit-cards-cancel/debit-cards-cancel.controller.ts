//---------------------------------------------------------------------------------------
// apps/baas-debit-card-service/src/debit-cards-cancel/debit-cards-cancel.controller.ts
//---------------------------------------------------------------------------------------
import { 
  Controller, 
  Delete,
  HttpCode,
  Param, 
  ParseUUIDPipe,
  Patch, 
}                                     from '@nestjs/common'
import { DebitCardsCancelService }    from './debit-cards-cancel.service'

import { WinstonLoggerService }       from '@app/winston-logger'

///////////////////////////////////////////////////////////////////////////////
// TODO: 04/05/2022
// When a card is canceled then it cannot be reactivated or reissued. I 
// have not added any of that logic to the MambuDebitCardService and will
// have to be added at some future point in time.
///////////////////////////////////////////////////////////////////////////////

/**
 * @class DebitCardsCancelController
 */
@Controller({path: 'debit-cards/:debitCardId/cancel', version: '1'})
export class DebitCardsCancelController {
  constructor(
    private readonly debitCardsCancelService: DebitCardsCancelService,
    private readonly logger:                  WinstonLoggerService
  ) {}

  @Delete()
  @HttpCode(204)
  remove(@Param('debitCardId', ParseUUIDPipe) debitCardId: string) {
    this.logger.log(`DELETE /v1/debit-cards/${debitCardId}/cancel`)
    return this.debitCardsCancelService.remove(debitCardId);
  })
}
