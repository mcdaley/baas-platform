//-----------------------------------------------------------------------------
// lib/baas-interfaces/src/accounts/account.interface.ts
//-----------------------------------------------------------------------------
import { 
  AccountStatus,
  AccountType,
  ParticipantRole, 
}                         from './account.enum'

/**
 * @interface ICreateAccountDto
 */
export interface ICreateAccountDto {
  account_type:   AccountType,
  name?:          string,
  participants:   IParticipant[],
}

/**
 * @interface IUpdateAccountDto
 */
export interface IUpdateAccountDto {
  account_status?:          AccountStatus,
  account_status_reason?:   string,
  nickname?:                string,
  participants?:            IParticipant[],
}

/**
 * @interface ICreateParticipantDto
 */
export interface ICreateParticipantDto {
  participant_customer_id:  string
  participant_role:         ParticipantRole
}

/**
 * @interface IParticipant
 */
export interface IParticipant extends ICreateParticipantDto {
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
  participants:           IParticipant[],
  //* blocks?:                AccountBlock[],
  created_at:             Date,
  updated_at:             Date,
}
