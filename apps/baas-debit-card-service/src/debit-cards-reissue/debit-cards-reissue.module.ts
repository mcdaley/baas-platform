//---------------------------------------------------------------------------------------
// apps/baas-debit-card-service/src/debit-cards-reissue/debit-cards-reissue.module.ts
//---------------------------------------------------------------------------------------
import { Module }                       from '@nestjs/common'

import { DebitCardsReissueService }     from './debit-cards-reissue.service'
import { DebitCardsReissueController }  from './debit-cards-reissue.controller'

import { CoreDebitCardSimulator }       from '@app/core-simulator'

@Module({
  controllers:  [DebitCardsReissueController],
  providers:    [DebitCardsReissueService, CoreDebitCardSimulator]
})
export class DebitCardsReissueModule {}
