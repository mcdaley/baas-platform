//---------------------------------------------------------------------------------------
// apps/baas-debit-card-service/src/blocks/debit-cards-blocks.module.ts
//---------------------------------------------------------------------------------------
import { Module }                     from '@nestjs/common'

import { DebitCardsBlocksService }    from './debit-cards-blocks.service'
import { DebitCardsBlocksController } from './debit-cards-blocks.controller'

@Module({
  controllers:  [DebitCardsBlocksController],
  providers:    [DebitCardsBlocksService]
})
export class DebitCardsBlocksModule {}
