//-----------------------------------------------------------------------------
// apps/core-bank-simulator/src/debit-cards/debit-cards.module.ts
//-----------------------------------------------------------------------------
import { Module }                   from '@nestjs/common'

import { DebitCardsController }     from './debit-cards.controller'
import { DebitCardsService }        from './debit-cards.service'
import { CoreDebitCardsDBService }  from '../core-bank-db/core-debit-cards-db.service'


@Module({
  controllers: [DebitCardsController],
  providers:   [
    DebitCardsService,
    CoreDebitCardsDBService,
  ]
})
export class DebitCardsModule {}
