//-----------------------------------------------------------------------------
// libs/baas-interfaces/src/debit-cards/debit-card.interface.ts
//-----------------------------------------------------------------------------
import { 
  CardType,
  CardStatus,
  Delivery,
  Packaging,
  ICreateAddressDto,
  BlockReason,
  ReissueReason,
  CreateAddressDto,
}                           from '@app/baas-interfaces'

/**
 * @interface ICreateDebitCardDto
 */
export interface ICreateDebitCardDto {
  card_type:                      CardType
  name_on_card:                   string
  delivery?:                      Delivery
  packaging?:                     Packaging
  phone_number:                   string
  mailing_address:                ICreateAddressDto
  customer_id:                    string
  account_id:                     string
  //* branch_id:                      string
}

/**
 * @interface IUpdateDebitCardDto
 */
export interface IUpdateDebitCardDto {
  name_on_card?:                  string
  card_number:                    string
  expiration_date?:               string
  cvv?:                           string
  status?:                        CardStatus
  pin?:                           string
  atm_daily?:                     number
  pos_daily?:                     number
  daily_transactions?:            number
  //* blocks?:                    IDebitCardsBlock[]
}

/**
 * @interface IDebitCard
 */
export interface IDebitCard {
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

/**
 * @interface IUpdateDebitCardStatus
 */
export interface IUpdateDebitCardStatus {
  status: CardStatus
}

/**
 * @interface ICreateDebitCardsPinDto
 */
export interface ICreateDebitCardsPinDto {
  pin:  string
}

/**
 * @interface IUpdateDebitCardsPinDto
 */
export interface IUpdateDebitCardsPinDto extends ICreateDebitCardsPinDto {}

/**
 * @interface IDebitCardsPin
 */
export interface IDebitCardsPin extends ICreateDebitCardsPinDto {}

/**
 * @interface ICreateDebitCardsBlockDto
 */
export interface ICreateDebitCardsBlockDto {
  block_reason:   BlockReason
}

/**
 * @interface IDebitCardsBlock
 */
export interface IDebitCardsBlock extends ICreateDebitCardsBlockDto {
  id:             string
  block_date:     Date
  is_active:      boolean
}

/**
 * @interface IUpdateDebitCardsLimitDto
 */
export interface IUpdateDebitCardsLimitDto {
  atm_daily:          number
  pos_daily:          number
  daily_transactions: number
}

/**
 * @interface IDebitCardsLimit
 */
export interface IDebitCardsLimit extends IUpdateDebitCardsLimitDto {}

/**
 * @interface ICreateDebitCardsReissueDto
 */
export interface ICreateDebitCardsReissueDto {
  name_on_card:                   string      // Default is Customer's name
  //* business_name_on_card:          BusinessNameOnCard
  //* custom_business_name_on_card?:  string      // Define if business_name_on_card = 'custom'
  reason:                         ReissueReason
  delivery:                       Delivery
  packaging:                      Packaging
  phone_number:                   string
  mailing_address:                CreateAddressDto
}