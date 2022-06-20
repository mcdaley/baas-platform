//-----------------------------------------------------------------------------
// apps/marqeta-adapter/src/card-products/dto/card-life-cycle.dto.ts
//-----------------------------------------------------------------------------
import {
  IsBoolean,
  IsNumberString, 
  IsOptional, 
  Length, 
  ValidateNested,
}                                           from 'class-validator'
import { Type }                             from 'class-transformer'

import { ExpirationOffsetWithMinimumDto }   from './expiration-offset.dto'

import { ICardLifeCycle }                   from "@app/baas-marqeta"

/**
 * @class CardLifeCycleDto
 */
export class CardLifeCycleDto implements ICardLifeCycle {
  @IsOptional()
  @IsBoolean()
  activate_upon_issue?: boolean;

  @IsOptional()
  @IsNumberString()
  @Length(3)
  card_service_code?: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => ExpirationOffsetWithMinimumDto)
  expiration_offset?: ExpirationOffsetWithMinimumDto

  @IsOptional()
  @IsBoolean()
  update_expiration_upon_activation?: boolean;
}