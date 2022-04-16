//-----------------------------------------------------------------------------
// apps/baas-account-service/src/accounts/entities/account.entity.ts
//-----------------------------------------------------------------------------
import {
  AccountType,
  AccountStatus,
  IAccount,
}                         from '@app/baas-interfaces'

/**
 * @class Account
 */
export class Account implements IAccount {
  id:                     string
  branch_id:              string
  account_type:           AccountType
  account_status:         AccountStatus
  account_number:         string
  routing_number:         string
  available_balance:      number
  posted_balance:         number
  //* currency:               Currency
  name_on_account:        string
  account_status_reason?: string
  name:                   string
  nickname?:              string
  usage?:                 string
  multiple_participants:  boolean
  created_at:             Date
  updated_at:             Date
} // end of class Account
