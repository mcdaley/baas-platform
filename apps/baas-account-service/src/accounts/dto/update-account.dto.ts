//-----------------------------------------------------------------------------
// apps/baas-account-service/src/accounts/dto/update-account.dto.ts
//-----------------------------------------------------------------------------
import { 
  IsEnum,
  IsNotEmpty,
  ValidateNested,
  IsArray,
  IsOptional,
  IsString,
  MaxLength,
}                               from 'class-validator'
import { Type }                 from 'class-transformer'

import { PartialType }        from '@nestjs/mapped-types'

import { AccountStatus }      from '@app/baas-interfaces'
import { CreateAccountDto }   from './create-account.dto'

/**
 * @class UpdateAccountDto
 */
export class UpdateAccountDto {
  @IsOptional()
  @IsEnum(AccountStatus)
  account_status?:        AccountStatus

  @IsOptional()
  account_status_reason?: string
  
  @IsOptional()
  @IsString()
  @MaxLength(64)
  nickname?:              string
}
