//-----------------------------------------------------------------------------
// apps/marqeta-adapter/src/cards/dto/pan-request.dto.ts
//-----------------------------------------------------------------------------
import {
  IsCreditCard,
  IsNumberString,
  IsOptional,
  IsString,
  Length,
  Matches,
}                       from 'class-validator'

import { IPanRequest }  from '@app/baas-marqeta'

/**
 * @class PanRequestDto
 */
export class PanRequestDto implements IPanRequest {
  @IsNumberString()
  @Length(16)
  pan: string

  @IsOptional()
  @IsString()
  @Matches(/^\d{4}$/)
  expiration?: string
  
  @IsOptional()
  @IsString()
  @Length(3)
  cvv_number?: string
}