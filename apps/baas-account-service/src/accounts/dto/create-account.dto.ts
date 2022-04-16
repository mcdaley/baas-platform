//-----------------------------------------------------------------------------
// apps/baas-account-service/src/accounts/dto/create-account.dto.ts
//-----------------------------------------------------------------------------
import { 
  IsEnum,
  IsNotEmpty,
  ValidateNested,
  IsArray,
  IsString,
  IsOptional,
}                               from 'class-validator'
import { Type }                 from 'class-transformer'

import { ICreateAccountDto }    from '@app/baas-interfaces'
import { AccountType }          from '../../common/account.enum'

/**
 * @class CreateAccountDto
 */
export class CreateAccountDto implements ICreateAccountDto {
  @IsNotEmpty()
  @IsEnum(AccountType)
  account_type: AccountType

  @IsOptional()
  @IsString()
  name:         string
} // end of class CreateAccountDto
