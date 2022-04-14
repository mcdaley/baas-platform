//-----------------------------------------------------------------------------
// apps/baas-account-service/src/accounts/entities/account.entity.ts
//-----------------------------------------------------------------------------
import {
  AccountType,
  AccountStatus,
}                         from '../../common/account.enum'

/**
 * @class Account
 */
export class Account {
  id:                     string
  branch_id:              string
  account_type:           AccountType
  account_status:         AccountStatus
  account_number:         string
  routing_number:         string
  available_balance:      number
} // end of class Account
