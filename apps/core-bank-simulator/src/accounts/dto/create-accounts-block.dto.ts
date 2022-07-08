//---------------------------------------------------------------------------------------
// apps/core-bank-simulator/src/accounts/dto/create-accounts-block.dto.ts
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
 * @class CreateAccountsBlockDto
 */
export class CreateAccountsBlockDto implements ICreateAccountBlockDto {
  @IsNotEmpty()
  @IsEnum(AccountBlockType)
  block_type:     AccountBlockType
  
  @IsString()
  @MaxLength(64)
  @IsOptional()
  block_reason?:  string
}