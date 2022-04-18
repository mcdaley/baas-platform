//-----------------------------------------------------------------------------
// apps/baas-debit-card-service/src/debit-cards-blocks/entities/debit-cards-block.entity.ts
//-----------------------------------------------------------------------------
import { BlockReason, IDebitCardsBlock } from '@app/baas-interfaces'

///////////////////////////////////////////////////////////////////////////////
// TODO: 04/18/2022
// FIGURE OUT IF block_date is a number of Date
///////////////////////////////////////////////////////////////////////////////

/**
 * @class DebitCardsBlock
 */
export class DebitCardsBlock implements IDebitCardsBlock {
  id:             string
  block_reason:   BlockReason
  block_date:     Date
  is_active:      boolean
}
