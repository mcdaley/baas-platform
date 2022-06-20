//-----------------------------------------------------------------------------
// apps/marqeta-adapter/src/cards/dto/update-card.dto.ts
//-----------------------------------------------------------------------------
import {
  IsBoolean, 
  IsOptional, 
  IsString, 
  Length, 
  ValidateNested,
}                             from 'class-validator'
import { Type }               from 'class-transformer'

import { FulfillmentDto }     from './create-card.dto'

import { ICardUpdateRequest } from '@app/baas-marqeta'

/**
 * @class UpdateCardDto
 */
export class UpdateCardDto implements ICardUpdateRequest {
  @IsOptional()
  @IsString()
  @Length(1,36)
  token: string

  @IsOptional()
  @IsString()
  @Length(1,36)
  user_token?: string

  @IsOptional()
  @IsBoolean()
  expedite?: boolean

  @IsOptional()
  @ValidateNested()
  @Type(() => FulfillmentDto)
  fulfillment?: FulfillmentDto

  @IsOptional()
  metadata?: Record<string, string>
}
