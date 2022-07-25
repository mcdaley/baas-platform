//-----------------------------------------------------------------------------
// apps/baas-debit-card-service/src/debit-cards/entities/debit-card.entity.ts
//-----------------------------------------------------------------------------
import { DebitCardsBlock }  from '../../blocks/entities/debit-cards-block.entity'

import { 
  CardStatus, 
  IDebitCard, 
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
  tenant_id:                      string
  blocks?:                        DebitCardsBlock[]
}
