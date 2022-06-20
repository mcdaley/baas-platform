//-----------------------------------------------------------------------------
// apps/marqeta-adapter/src/cards/entities/card.entity.ts
//-----------------------------------------------------------------------------
import { 
  CardPersonalizationDto, 
  PaymentInstrument 
}                                 from '../../card-products/dto/card-product-fulfillment.dto'
import { 
  ShippingMethod,
  FulfillmentAddressRequestDto,
}                                 from '../../card-products/dto/shipping.dto'
import { ActivationActionsDto }   from '../dto/create-card.dto'

import { 
  IActivationActions,
  ICardFulfillmentResponse, 
  ICardResponse, 
  IFulfillmentAddressResponse, 
  IShippingInformationResponse 
}                                 from '@app/baas-marqeta'

/**
 * @enum CardFulfillmentStatus
 */
export enum CardFulfillmentStatus {
  Issued              = 'ISSUED',
  Ordered             = 'ORDERED',
  Reordered           = 'REORDERED',
  Rejected            = 'REJECTED',
  Shipped             = 'SHIPPED',
  Delivered           = 'DELIVERED',
  DigitallyPresented  = 'DIGITALLY_PRESENTED',
}

/**
 * @enum CardState
 */
export enum CardState {
  Active      = 'ACTIVE',
  Suspended   = 'SUSPENDED',
  Terminated  = 'TERMINATED',
  Unsupported = 'UNSUPPORTED',
  Unactivated = 'UNACTIVATED',
  Limited     = 'LIMITED',
}

/**
 * @enum CardFulfillmentReason
 */
export enum CardFulfillmentReason {
  New          = 'NEW',
  LostOrStolen = 'LOST_STOLEN',
  Expired      = 'EXPIRED',
}

/**
 * @class FulfillmentAddressResponse
 */
export class FulfillmentAddressResponse 
  extends    FulfillmentAddressRequestDto 
  implements IFulfillmentAddressResponse {
}

/**
 * @class ShippingInformationResponse
 */
export class ShippingInformationResponse implements IShippingInformationResponse {
  care_of_line?:      string;
  method?:            ShippingMethod
  recipient_address?: FulfillmentAddressResponse
  return_address?:    FulfillmentAddressResponse
}

/**
 * @class CardFulfillmentResponse
 */
export class CardFulfillmentResponse implements ICardFulfillmentResponse {
  card_fulfillment_reason?: CardFulfillmentReason
  card_personalization:     CardPersonalizationDto
  shipping?:                ShippingInformationResponse
}

/**
 * @class Card
 */
export class Card implements ICardResponse {
  activation_actions?:                  ActivationActionsDto
  barcode:                              string
  bulk_issuance_token?:                 string
  card_product_token:                   string
  chip_cvv_number?:                     string
  contactless_exemption_counter?:       number
  contactless_exemption_total_amount?:  number
  created_time:                         string
  cvv_number?:                          string
  expedite?:                            boolean
  expiration:                           string
  expiration_time:                      string
  fulfillment?:                         CardFulfillmentResponse
  fulfillment_status:                   CardFulfillmentStatus
  instrument_type?:                     PaymentInstrument
  last_four:                            string
  last_modified_time:                   string
  metadata?:                            Record<string, string>
  pan:                                  string
  pin_is_set:                           boolean
  reissue_pan_from_card_token?:         string
  state:                                CardState
  state_reason:                         string
  token:                                string
  translate_pin_from_card_token?:       string
  user_token:                           string
}
