//-----------------------------------------------------------------------------
// apps/marqeta-adapter/src/card-products/dto/update-card-product.dto.ts
//-----------------------------------------------------------------------------
import { OmitType, PartialType }    from '@nestjs/mapped-types'

import { CreateCardProductDto }     from './create-card-product.dto'

/**
 * @class UpdateCardProductDto
 */
export class UpdateCardProductDto extends PartialType(
  OmitType(CreateCardProductDto, ['token'] as const)
 ) {}


