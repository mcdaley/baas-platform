//-----------------------------------------------------------------------------
// lib/baas-interfaces/src/accounts/account.interface.ts
//-----------------------------------------------------------------------------
import { 
  AccountStatus,
  AccountType,
  ParticipantRole,
  AccountBlockType,
  AccountBlockStatus,
}                             from './account.enum'
import { IResponseMetadata }  from '../common/common.interface'

/**
 * @interface ICreateAccountDto
 */
export interface ICreateAccountDto {
  account_type:             AccountType,
  name_on_account?:         string,
  name?:                    string,
  nickname?:                string,
  participants:             ICreateParticipantDto[],
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
  customer_id:  string
  participant_role:         ParticipantRole
}

/**
 * @interface IParticipant
 */
export interface IParticipant extends ICreateParticipantDto {
  created_at: Date | string
  updated_at: Date | string
}

/**
 * @interface ICreateAccountBlockDto
 */
export interface ICreateAccountBlockDto {
  block_type:     AccountBlockType,
  block_reason?:  string
}

/**
 * @interface IAccountBlock
 */
 export interface IAccountBlock extends ICreateAccountBlockDto {
  id:             string
  block_status:   AccountBlockStatus
  created_at:     Date | string
  updated_at:     Date | string
}

/**
 * @interface IAccount
 */
export interface IAccount extends ICreateAccountDto {
  id:                     string
  tenant_id:              string
  account_type:           AccountType
  account_number:         string
  routing_number:         string
  //* currency:               Currency
  available_balance:      number
  posted_balance:         number
  name_on_account:        string
  account_status:         AccountStatus
  nickname?:              string
  multiple_participants:  boolean
  participants:           IParticipant[]
  blocks?:                IAccountBlock[]
  created_at:             Date | string
  updated_at:             Date | string
}

/**
 * @interface IAccountResponse
 */
 export interface IAccountResponse {
  account: IAccount,
}

/**
 * @interface IAccountListResponse
 */
export interface IAccountListResponse {
  accounts:   IAccount[],
  metadata?:  IResponseMetadata,
}
