//-----------------------------------------------------------------------------
// apps/baas-account-service/src/common/account.enum.ts
//-----------------------------------------------------------------------------

/**
 * @enum AccountType
 */
 export enum AccountType {
  Checking  = 'checking',
  Savings   = 'savings',
}

/**
 * @enum AccountStatus
 */
export enum AccountStatus {
  Open    = 'open',
  Blocked = 'blocked',
  Closed  = 'closed'
}

///////////////////////////////////////////////////////////////////////////////
// TODO: 3/16/2022
//  - The ParticpantRoles will depend on how it is implemented by partner
//    bank.
//  - Does it make sense to move this to src/participants?
///////////////////////////////////////////////////////////////////////////////

/**
 * @enum ParticipantRole
 */
export enum ParticipantRole {
  Holder      = 'holder',
  Authorized  = 'authorized',
  Beneficiary = 'beneficiary',
}

/**
 * @enum AccountBlock
 */
export enum AccountBlockType {
  Credits   = 'credits',
  Debits    = 'debits',
  Checks    = 'checks',
  All       = 'all',
}

export enum AccountBlockStatus {
  Active    = 'active',
  Canceled  = 'canceled',
}