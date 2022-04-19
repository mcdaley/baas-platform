//---------------------------------------------------------------------------------------
// apps/baas-debit-card-service/src/debit-cards-limits/debit-cards-limits.module.ts
//---------------------------------------------------------------------------------------
import { Module }                     from '@nestjs/common'

import { DebitCardsLimitsService }     from './debit-cards-limits.service'
import { DebitCardsLimitsController }  from './debit-cards-limits.controller'

import { CoreDebitCardSimulator }      from '@app/core-simulator'

@Module({
  controllers:  [DebitCardsLimitsController],
  providers:    [DebitCardsLimitsService, CoreDebitCardSimulator]
})
export class DebitCardsLimitsModule {}
