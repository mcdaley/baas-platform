//-----------------------------------------------------------------------------
// apps/marqeta-adapter/src/card-products/card-products.module.ts
//-----------------------------------------------------------------------------
import { Module }                 from '@nestjs/common'

import { CardProductsService }    from './card-products.service'
import { CardProductsController } from './card-products.controller'

@Module({
  controllers:  [CardProductsController],
  providers:    [CardProductsService]
})
export class CardProductsModule {}
