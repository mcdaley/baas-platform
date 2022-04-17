//-----------------------------------------------------------------------------
// apps/baas-account-service/src/blocks/entities/account-block.entity.ts
//-----------------------------------------------------------------------------
import { 
  AccountBlockStatus, 
  AccountBlockType,
  IAccountBlock, 
}                         from '@app/baas-interfaces'

/**
 * @class AccountBlock
 */
export class AccountBlock implements IAccountBlock {
  id:             string
  block_status:   AccountBlockStatus
  block_type:     AccountBlockType
  block_reason?:  string
}