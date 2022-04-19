//---------------------------------------------------------------------------------------
// apps/baas-debit-card-service/src/debit-cards-reissue/debit-cards-reissue.controller.ts
//---------------------------------------------------------------------------------------
import { 
  Controller, 
  Post, 
  Body,
  Param, 
  ParseUUIDPipe, 
}                                     from '@nestjs/common'

import { DebitCardsReissueService }   from './debit-cards-reissue.service'
import { CreateDebitCardsReissueDto } from './dto/create-debit-cards-reissue.dto'

import { WinstonLoggerService }       from '@app/winston-logger'

/**
 * @class DebitCardsReissueController
 */
@Controller({path: 'debit-cards/:debitCardId/reissue', version: '1'})
export class DebitCardsReissueController {
  constructor(
    private readonly debitCardReissueService: DebitCardsReissueService,
    private readonly logger:                  WinstonLoggerService,
  ) {}

  @Post()
  createV1(
    @Param('debitCardId', ParseUUIDPipe) debitCardId: string,
    @Body() createDebitCardsReissueDto: CreateDebitCardsReissueDto
  ) {
    this.logger.log(
      `POST /v1/debit-cards/${debitCardId}/reissue, createDebitCardsReissueDto = %o`,
      createDebitCardsReissueDto
    )
    return this.debitCardReissueService.create(debitCardId, createDebitCardsReissueDto)
  }
} // end of class DebitCardsReissueController
