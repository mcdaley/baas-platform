//-----------------------------------------------------------------------------
// apps/baas-debit-card-service/src/debit-cards/debit-cards.module.ts
//-----------------------------------------------------------------------------
import { Module }                 from '@nestjs/common'

import { DebitCardsService }      from './debit-cards.service'
import { DebitCardsController }   from './debit-cards.controller'

import { CoreDebitCardSimulator }   from '@app/core-simulator'

@Module({
  controllers:  [DebitCardsController],
  providers:    [DebitCardsService, CoreDebitCardSimulator]
})
export class DebitCardsModule {}
