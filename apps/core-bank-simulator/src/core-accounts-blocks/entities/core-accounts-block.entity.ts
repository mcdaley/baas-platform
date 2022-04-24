//-----------------------------------------------------------------------------------------
// apps/core-bank-simulator/src/core-account-blocks/entities/core-accounts-block.entity.ts
//-----------------------------------------------------------------------------------------
import { 
  AccountBlockStatus, 
  AccountBlockType,
  IAccountBlock, 
}                         from '@app/baas-interfaces'

/**
 * @class AccountBlock
 */
export class CoreAccountsBlock implements IAccountBlock {
  id:             string
  block_status:   AccountBlockStatus
  block_type:     AccountBlockType
  block_reason?:  string
}