//---------------------------------------------------------------------------------------
// apps/baas-debit-card-service/src/debit-cards-reissue/debit-cards-reissue.module.ts
//---------------------------------------------------------------------------------------
import { Module }                       from '@nestjs/common'

import { DebitCardsReissueService }     from './debit-cards-reissue.service'
import { DebitCardsReissueController }  from './debit-cards-reissue.controller'

@Module({
  controllers:  [DebitCardsReissueController],
  providers:    [DebitCardsReissueService]
})
export class DebitCardsReissueModule {}
