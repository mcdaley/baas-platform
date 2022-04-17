//-----------------------------------------------------------------------------
// apps/baas-account-service/src/blocks/dto/create-account-block.dto.ts
//-----------------------------------------------------------------------------
import { 
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
}                         from 'class-validator'

import { 
  AccountBlockType,
  ICreateAccountBlockDto,
}                         from '@app/baas-interfaces'

/**
 * @class CreateAccountBlockDto
 */
export class CreateAccountBlockDto implements ICreateAccountBlockDto {
  @IsNotEmpty()
  @IsEnum(AccountBlockType)
  block_type:     AccountBlockType
  
  @IsString()
  @MaxLength(64)
  @IsOptional()
  block_reason?:  string
}