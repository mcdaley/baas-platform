//-----------------------------------------------------------------------------
// apps/core-bank-simulator/src/debit-cards/entities/debit-card.entity.ts
//-----------------------------------------------------------------------------
import { 
  CardStatus, 
  IDebitCard, 
  IDebitCardsBlock,
}                           from '@app/baas-interfaces'

/**
 * @class DebitCard
 */
export class DebitCard implements IDebitCard {
  id:                             string
  name_on_card:                   string
  card_number:                    string
  expiration_date:                string
  cvv:                            string
  status:                         CardStatus
  pin:                            string
  atm_daily:                      number
  pos_daily:                      number
  daily_transactions:             number 
  customer_id:                    string
  account_id:                     string
  //* branch_id:                      string
  blocks?:                        IDebitCardsBlock[]
}

