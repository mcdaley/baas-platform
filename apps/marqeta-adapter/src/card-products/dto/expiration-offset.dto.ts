//-----------------------------------------------------------------------------
// apps/marqeta-adapter/src/card-products/dto/expiration-offset.dto.ts
//-----------------------------------------------------------------------------
import {
  IsEnum, 
  IsInt, 
  IsOptional, 
  ValidateNested,
}                           from 'class-validator'

import { 
  IExpirationOffset, 
  IExpirationOffsetWithMinimum, 
  IMinOffset, 
}                                 from "@app/baas-marqeta";

/**
 * @enum Units
 */
export enum Units {
  Years   = 'YEARS',
  Months  = 'MONTHS',
  Days    = 'DAYS',
  Hours   = 'HOURS',
  Minutes = 'MINUTES',
  Seconds = 'SECONDS',
}

/**
 * @class MinOffsetDto
 */
 export class MinOffsetDto implements IMinOffset {
  @IsOptional()
  @IsEnum(Units)
  unit?:  Units

  @IsOptional()
  @IsInt()
  value?: number
}

/**
 * @class ExpirationOffsetDto
 */
export class ExpirationOffsetDto implements IExpirationOffsetWithMinimum {
  @IsOptional()
  @IsEnum(Units)
  unit?:  Units

  @IsOptional()
  @IsInt()
  value?: number

  @IsOptional()
  @ValidateNested()
  min_offset?: MinOffsetDto
}
