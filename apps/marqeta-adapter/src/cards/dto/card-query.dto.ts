//-----------------------------------------------------------------------------
// apps/marqeta-adapter/src/cards/dto/card-query.dto.ts
//-----------------------------------------------------------------------------
import {
  IsInt,
  IsNumber,
  IsNumberString,
  IsOptional, 
  IsString, 
  Length,
}                     from 'class-validator'
import { Type }       from 'class-transformer'

/**
 * @class MarqetaSearchQueryDto
 * 
 * Defines the Marqeta findAll query parameters that manage pagination.
 */
export class MarqetaSearchQueryDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  count?: number
  
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  start_index?: number
  
  @IsOptional()
  @IsString()
  fields?: string
  
  @IsOptional()
  @IsString()
  sort_by?: string
}

/**
 * @class CardQueryDto
 */
 export class CardQueryDto extends MarqetaSearchQueryDto {
  @IsNumberString()
  @Length(4)
  last_four: string  
}

