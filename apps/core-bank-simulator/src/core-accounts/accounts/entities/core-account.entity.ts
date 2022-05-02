//-----------------------------------------------------------------------------
// apps/core-bank-simulator/src/core-accounts/entities/core-account.entity.ts
//-----------------------------------------------------------------------------
import { CoreParticipant }  from './core-participant.entity'

import {
  AccountType,
  AccountStatus,
  IAccount,
}                           from '@app/baas-interfaces'

/**
 * @class CoreAccount
 */
export class CoreAccount implements IAccount {
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
  participants:           CoreParticipant[]
  created_at:             Date
  updated_at:             Date
} // end of class Account

