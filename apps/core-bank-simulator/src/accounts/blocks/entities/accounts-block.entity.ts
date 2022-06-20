//----------------------------------------------------------------------------------
// apps/core-bank-simulator/src/accounts/blocks/entities/accounts-block.entity.ts
//----------------------------------------------------------------------------------
import { 
  AccountBlockStatus, 
  AccountBlockType,
  IAccountBlock, 
}                         from '@app/baas-interfaces'

/**
 * @class AccountBlock
 */
export class AccountsBlock implements IAccountBlock {
  id:             string
  block_status:   AccountBlockStatus
  block_type:     AccountBlockType
  block_reason?:  string
}