//-----------------------------------------------------------------------------
// apps/baas-account-service/src/accounts/dto/create-account.dto.ts
//-----------------------------------------------------------------------------
import { 
  IsEnum,
  IsNotEmpty,
  ValidateNested,
  IsArray,
  IsString,
}                               from 'class-validator'
import { Type }                 from 'class-transformer'

import { AccountType }          from '../../common/account.enum'

/**
 * @class CreateAccountDto
 */
export class CreateAccountDto {
  @IsNotEmpty()
  @IsEnum(AccountType)
  account_type: AccountType

  @IsString()
  name:         string
} // end of class CreateAccountDto
