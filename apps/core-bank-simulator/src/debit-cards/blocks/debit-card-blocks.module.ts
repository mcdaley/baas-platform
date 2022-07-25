//-----------------------------------------------------------------------------
// apps/core-bank-simulator/src/debit-cards/blocks/debit-card-blocks.module.ts
//-----------------------------------------------------------------------------
import { Module }                         from '@nestjs/common'
import { TypeOrmModule }                  from '@nestjs/typeorm'

import { DebitCardBlocksController }      from './debit-card-blocks.controller'
import { DebitCardBlocksService }         from './debit-card-blocks.service'
import { DebitCard }                      from '../entities/debit-card.entity'
import { DebitCardBlock }                 from '../entities/debit-card-block.entity'

@Module({
  imports:      [TypeOrmModule.forFeature([DebitCard, DebitCardBlock])],
  controllers:  [DebitCardBlocksController],
  providers:    [DebitCardBlocksService],
})
export class DebitCardBlocksModule {}