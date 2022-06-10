//-----------------------------------------------------------------------------
// apps/marqeta-adapter/src/card-products/dto/special.dto.ts
//-----------------------------------------------------------------------------
import {
  IsOptional,
  IsBoolean,
}                       from 'class-validator'

import { ISpecial }     from "@app/baas-marqeta"

/**
 * @class SpecialDto
 */
export class SpecialDto implements ISpecial {
  @IsOptional()
  @IsBoolean()
  merchant_on_boarding?: boolean;
}