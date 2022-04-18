//-----------------------------------------------------------------------------
// apps/baas-debit-card-service/src/debit-cards/entities/debit-card.entity.ts
//-----------------------------------------------------------------------------
import { 
  BusinessNameOnCard, 
  CardStatus, 
  IDebitCard, 
  Address,
}                           from '@app/baas-interfaces'

/**
 * @class DebitCard
 */
export class DebitCard implements IDebitCard {
  id:                             string
  name_on_card:                   string
  //* business_name_on_card:          string
  card_number:                    string
  expiration_date:                string
  cvv:                            string
  status:                         CardStatus
  pin:                            string
  credit_limit:                   number
  available_balance:              number
  posted_balance:                 number
  atm_daily:                      number
  pos_daily:                      number
  daily_transactions:             number 
  phone_number:                   string
  mailing_address:                Address
  customer_id:                    string
  account_id:                     string
  branch_id:                      string
  //* blocks?:                         DebitCardsBlock[]
}
