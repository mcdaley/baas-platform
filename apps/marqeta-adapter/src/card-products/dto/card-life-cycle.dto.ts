//-----------------------------------------------------------------------------
// apps/marqeta-adapter/src/card-products/dto/card-life-cycle.dto.ts
//-----------------------------------------------------------------------------
import {
  IsBoolean,
  IsNumberString, 
  IsOptional, 
  Length, 
  ValidateNested,
}                               from 'class-validator'

import { ExpirationOffsetDto }  from './expiration-offset.dto';

import { ICardLifeCycle, IExpirationOffsetWithMinimum }       from "@app/baas-marqeta"

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
  expiration_offset?: ExpirationOffsetDto;
  //* expiration_offset?: IExpirationOffsetWithMinimum;

  @IsOptional()
  @IsBoolean()
  update_expiration_upon_activation?: boolean;
}