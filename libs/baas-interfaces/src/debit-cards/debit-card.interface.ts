//-----------------------------------------------------------------------------
// libs/baas-interfaces/src/debit-cards/debit-card.interface.ts
//-----------------------------------------------------------------------------
import { 
  CardType,
  CardStatus,
  BusinessNameOnCard,
  Delivery,
  Packaging,
  ICreateAddressDto,
  IAddress,
}                           from '@app/baas-interfaces'

/**
 * @interface ICreateDebitCardDto
 */
export interface ICreateDebitCardDto {
  card_type:                      CardType
  name_on_card:                   string
  //* business_name_on_card?:         BusinessNameOnCard
  custom_business_name_on_card?:  string
  delivery?:                      Delivery
  packaging:                      Packaging
  phone_number:                   string
  mailing_address:                ICreateAddressDto
  customer_id:                    string
  account_id:                     string
  //* branch_id:                      string
}

export interface IDebitCard {
  id:                             string
  name_on_card:                   string
  //* business_name_on_card?:         string
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
  mailing_address:                IAddress
  customer_id:                    string
  account_id:                     string
  //* branch_id:                      string 
  //* blocks?:                        DebitCardsBlock[]
}
