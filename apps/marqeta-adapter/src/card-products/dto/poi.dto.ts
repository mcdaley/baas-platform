//-----------------------------------------------------------------------------
// apps/marqeta-adapter/src/card-products/dto/poi.dto.ts
//-----------------------------------------------------------------------------
import {
  IsBoolean,
  IsOptional,
  IsString,
  ValidateNested,
}                   from 'class-validator'
import { Type }     from 'class-transformer'

import { 
  IOtherPoi,
  IPoi, 
}                   from '@app/baas-marqeta'

/**
 * @class OtherPoiDto
 */
export class OtherPoiDto implements IOtherPoi {
  @IsOptional()
  @IsBoolean()
  allow?: boolean
  
  @IsOptional()
  @IsBoolean()
  card_presence_required?: boolean

  @IsOptional()
  @IsBoolean()
  cardholder_presence_required?: boolean
  
  @IsOptional()
  @IsString()
  track1_discretionary_data?: string
  
  @IsOptional()
  @IsString()
  track2_discretionary_data?: string
}

/**
 * @class PoiDto
 */
 export class PoiDto implements IPoi {
  @IsOptional()
  @IsBoolean()
  atm?: boolean
  
  @IsOptional()
  @IsBoolean()
  ecommerce?: boolean
  
  @IsOptional()
  @ValidateNested()
  @Type(() => OtherPoiDto)
  other?: OtherPoiDto
}