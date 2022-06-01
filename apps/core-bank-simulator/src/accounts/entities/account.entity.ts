//-----------------------------------------------------------------------------
// apps/core-bank-simulator/src/accounts/entities/account.entity.ts
//-----------------------------------------------------------------------------
import { Participant }      from './participant.entity'

import {
  AccountType,
  AccountStatus,
  IAccount,
}                           from '@app/baas-interfaces'

/**
 * @class Account
 */
export class Account implements IAccount {
  id:                     string
  branch_id:              string
  account_type:           AccountType
  account_number:         string
  routing_number:         string
  name_on_account:        string
  name:                   string
  available_balance:      number
  posted_balance:         number
  //* currency:               Currency
  account_status:         AccountStatus
  account_status_reason?: string
  usage?:                 string
  nickname?:              string
  multiple_participants:  boolean
  participants:           Participant[]
  created_at:             Date
  updated_at:             Date
} // end of class Account

