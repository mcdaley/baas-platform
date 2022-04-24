//---------------------------------------------------------------------------------------
// apps/core-bank-simulator/src/core-account-blocks/dto/create-core-accounts-block.dto.ts
//---------------------------------------------------------------------------------------
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
 * @class CreateCoreAccountsBlockDto
 */
export class CreateCoreAccountsBlockDto implements ICreateAccountBlockDto {
  @IsNotEmpty()
  @IsEnum(AccountBlockType)
  block_type:     AccountBlockType
  
  @IsString()
  @MaxLength(64)
  @IsOptional()
  block_reason?:  string
}