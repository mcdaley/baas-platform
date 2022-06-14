//-----------------------------------------------------------------------------
// apps/marqeta-adapter/src/users/entities/user.entity.ts
//-----------------------------------------------------------------------------
import { 
  IdentificationDocument,
  Gender, 
}                                       from '../dto/create-user.dto'

import { 
  IAuthentication, 
  IIdentificationResponseModel, 
  IUserCardHolderResponse, 
}                                       from '@app/baas-marqeta'

/**
 * @enum PasswordUpdateChannel
 */
export enum PasswordUpdateChannel {
  UserChange = 'USER_CHANGE',
  UserReset  = 'USER_RESET',
}

/**
 * @enum MarqetsUserStatus
 */
export enum MarqetaUserStatus {
  Unverfied = 'UNVERIFIED',
  Limited   = 'LIMITED',
  Active    = 'ACTIVE',
  Suspended = 'SUSPENDED',
  Closed    = 'CLOSED',
}

/**
 * @class EmailAuthentication
 */
export class EmailAuthentication implements IAuthentication {
  email_verified?:                boolean
  email_verified_time?:           string
  last_password_update_channel?:  PasswordUpdateChannel
  last_password_update_time?:     string
}

/**
 * @class IdentificationResponseModel
 */
class IdentificationResponseModel implements IIdentificationResponseModel {
  type?:                          IdentificationDocument
  expiration_date?:               string
  value?:                         string
}

/**
 * @class User
 */
export class User implements IUserCardHolderResponse {
  token?:                       string
  first_name?:                  string
  middle_name?:                 string
  last_name?:                   string
  honorific?:                   string
  active?:                      boolean
  status?:                      MarqetaUserStatus
  account_holder_group_token?:  string
  uses_parent_account?:         boolean
  parent_token?:                string
  phone?:                       string
  email?:                       string
  business_token?:              string
  company?:                     string
  corporate_card_holder?:       boolean
  address1?:                    string
  address2?:                    string
  city?:                        string
  state?:                       string
  postal_code?:                 string
  country?:                     string
  birth_date?:                  string
  ssn?:                         string
  gender?:                      Gender
  nationality?:                 string
  passport_number?:             string
  passport_expiration_date?:    string
  id_card_number?:              string
  id_card_expiration_date?:     string
  ip_address?:                  string
  identifications?:             IdentificationResponseModel[]
  password?:                    string
  authentication?:              EmailAuthentication
  metadata?:                    Record<string, string>
  notes?:                       string
  created_time:                 string
  last_modified_time:           string
  zip?:                         string
}
