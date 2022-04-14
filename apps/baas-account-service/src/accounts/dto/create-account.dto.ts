//-----------------------------------------------------------------------------
// apps/baas-account-service/src/accounts/dto/create-account.dto.ts
//-----------------------------------------------------------------------------
import { AccountType }    from '../../common/account.enum'

/**
 * @class CreateAccountDto
 */
export class CreateAccountDto {
  account_type: AccountType
  name:         string
} // end of class CreateAccountDto
