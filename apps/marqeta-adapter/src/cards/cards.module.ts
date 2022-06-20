//-----------------------------------------------------------------------------
// apps/marqeta-adapter/src/cards/cards.modeule.ts
//-----------------------------------------------------------------------------
import { Module }             from '@nestjs/common'

import { CardsService }       from './cards.service'
import { CardsController }    from './cards.controller'

@Module({
  controllers:  [CardsController],
  providers:    [CardsService]
})
export class CardsModule {}
