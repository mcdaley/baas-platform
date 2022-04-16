//-----------------------------------------------------------------------------
// lib/baas-interfaces/src/accounts/account.interface.ts
//-----------------------------------------------------------------------------
import { 
  AccountStatus,
  AccountType 
}                         from './account.enum'

/**
 * @interface ICreateAccountDto
 */
export interface ICreateAccountDto {
  account_type:   AccountType,
  name:           string,
}

/**
 * @interface IUpdateAccountDto
 */
export interface IUpdateAccountDto {
  account_status?:          AccountStatus,
  account_status_reason?:   string,
  nickname?:                string,
}

/**
 * @interface IAccount
 */
export interface IAccount extends ICreateAccountDto {
  id:                     string,
  branch_id:              string,
  account_type:           AccountType,
  account_number:         string,
  routing_number:         string,
  //* currency:               Currency,
  available_balance:      number,
  posted_balance:         number,
  name_on_account:        string,
  account_status:         AccountStatus,
  account_status_reason?: string,
  nickname?:              string,
  usage?:                 string,
  multiple_participants:  boolean,
  //* participants:           Participant[],
  //* blocks?:                AccountBlock[],
  created_at:             Date,
  updated_at:             Date,
}
