//-----------------------------------------------------------------------------
// apps/baas-account-service/src/accounts/dto/update-account.dto.ts
//-----------------------------------------------------------------------------
import { 
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
}                             from 'class-validator'

import { AccountStatus }      from '@app/baas-interfaces'

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
