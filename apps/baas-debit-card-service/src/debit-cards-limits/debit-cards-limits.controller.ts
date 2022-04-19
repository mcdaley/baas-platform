//---------------------------------------------------------------------------------------
// apps/baas-debit-card-service/src/debit-cards-limits/debit-cards-limits.controller.ts
//----------------------------------------------------------------------------------------
import { 
  Controller, 
  Get, 
  Body, 
  Patch, 
  Param, 
  ParseUUIDPipe, 
}                                   from '@nestjs/common'

import { DebitCardsLimitsService }  from './debit-cards-limits.service'
import { UpdateDebitCardsLimitDto } from './dto/update-debit-cards-limit.dto'

import { WinstonLoggerService }     from '@app/winston-logger'

/**
 * @class DebitCardLimitsController
 */
@Controller({path: 'debit-cards/:debitCardId/limits', version: '1'})
export class DebitCardsLimitsController {
  constructor(
    private readonly debitCardLimitsService: DebitCardsLimitsService,
    private readonly logger:                 WinstonLoggerService,
  ) {}

  @Get()
  findAllV1(@Param('debitCardId', ParseUUIDPipe) debitCardId: string) {
    this.logger.log(`GET /v1/debit-cards/${debitCardId}/limits`)
    return this.debitCardLimitsService.findAll(debitCardId);
  }

  @Patch()
  updateV1(
    @Param('debitCardId', ParseUUIDPipe) debitCardId: string,
    @Body() updateDebitCardsLimitDto: UpdateDebitCardsLimitDto) 
  {
    this.logger.log(`PATCH /v1/debit-cards/${debitCardId}/limits, body= %o`, updateDebitCardsLimitDto)
    return this.debitCardLimitsService.update(debitCardId, updateDebitCardsLimitDto);
  }
}
