//---------------------------------------------------------------------------------------
// apps/baas-debit-card-service/src/debit-cards-blocks/debit-cards-blocks.module.ts
//---------------------------------------------------------------------------------------
import { Module }                     from '@nestjs/common'

import { DebitCardsBlocksService }    from './debit-cards-blocks.service'
import { DebitCardsBlocksController } from './debit-cards-blocks.controller'

import { CoreDebitCardSimulator }     from '@app/core-simulator'

@Module({
  controllers:  [DebitCardsBlocksController],
  providers:    [DebitCardsBlocksService, CoreDebitCardSimulator]
})
export class DebitCardsBlocksModule {}
