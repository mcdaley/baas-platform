//-----------------------------------------------------------------------------
// apps/baas-debit-card-service/src/debit-cards/debit-cards-activate.module.ts
//-----------------------------------------------------------------------------
import { Module }                       from '@nestjs/common'

import { DebitCardsActivateService }    from './debit-cards-activate.service'
import { DebitCardsActivateController } from './debit-cards-activate.controller'

import { CoreDebitCardSimulator }       from '@app/core-simulator'

@Module({
  controllers:  [DebitCardsActivateController],
  providers:    [DebitCardsActivateService, CoreDebitCardSimulator]
})
export class DebitCardsActivateModule {}
