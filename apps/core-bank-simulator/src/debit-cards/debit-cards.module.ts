//-----------------------------------------------------------------------------
// apps/core-bank-simulator/src/debit-cards/debit-cards.module.ts
//-----------------------------------------------------------------------------
import { Module }                   from '@nestjs/common'
import { TypeOrmModule }            from '@nestjs/typeorm'

import { DebitCardsController }     from './debit-cards.controller'
import { DebitCardsService }        from './debit-cards.service'
import { DebitCard }                from './entities/debit-card.entity'
import { DebitCardBlock }           from './entities/debit-card-block.entity'

@Module({
  imports:     [TypeOrmModule.forFeature([DebitCard, DebitCardBlock])],
  controllers: [DebitCardsController],
  providers:   [
    DebitCardsService,
  ]
})
export class DebitCardsModule {}
