//--------------------------------------------------------------------------------------------
// apps/marqeta-adapters/src/funding-sources/program/dto/create-program-funding-source.dto.ts
//--------------------------------------------------------------------------------------------
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
}                                 from 'class-validator'

import { 
  IProgramFundingSourceRequest 
}                                 from '@app/baas-marqeta'

/**
 * @class CreateProgramFundingSourceDto
 */
export class CreateProgramFundingSourceDto implements IProgramFundingSourceRequest {
  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  name:     string

  @IsOptional()
  @IsString()
  @Length(1, 36)
  token?:   string

  @IsOptional()
  @IsBoolean()
  active?:  boolean
}