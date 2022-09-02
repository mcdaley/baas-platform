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

/**
 * @class DebitCardsReissueController
 */
@Controller({path: 'debit-cards/:debitCardId/reissue', version: '1'})
export class DebitCardsReissueController {
  constructor(
    private readonly debitCardReissueService: DebitCardsReissueService,
  ) {}

  @Post()
  createV1(
    @Param('debitCardId', ParseUUIDPipe) debitCardId: string,
    @Body() createDebitCardsReissueDto: CreateDebitCardsReissueDto
  ) {
    return this.debitCardReissueService.create(debitCardId, createDebitCardsReissueDto)
  }
} // end of class DebitCardsReissueController
