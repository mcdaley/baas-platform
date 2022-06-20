//-----------------------------------------------------------------------------
// apps/marqeta-adapter/src/cards/dto/create-card.dto.ts
//-----------------------------------------------------------------------------
import {
  IsBoolean, 
  IsNotEmpty, 
  IsNotEmptyObject, 
  IsOptional, 
  IsString, 
  Length, 
  ValidateNested,
}                                 from 'class-validator'
import { Type }                   from 'class-transformer'

import { ExpirationOffsetDto }    from '../../card-products/dto/expiration-offset.dto'
import { CardPersonalizationDto } from '../../card-products/dto/card-product-fulfillment.dto'
import { ShippingDto }            from '../../card-products/dto/shipping.dto'

import { 
  IActivationActions, 
  ICardRequest,
  IFulfillment,
}                                 from '@app/baas-marqeta'



/**
 * @class ActivationActionsDto
 */
export class ActivationActionsDto implements IActivationActions {
  @IsOptional()
  @IsString()
  @Length(1, 36)
  swap_digital_wallet_tokens_from_card_token?:  string

  @IsOptional()
  @IsBoolean()
  terminate_reissued_source_card?:              boolean
}

/**
 * @class FulfillmentDto
 */
export class FulfillmentDto implements IFulfillment {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CardPersonalizationDto)
  card_personalization: CardPersonalizationDto

  @IsOptional()
  @ValidateNested()
  @Type(() => ShippingDto)
  shipping?:            ShippingDto
}

/**
 * @class CreateCardDto
 */
export class CreateCardDto implements ICardRequest{
  @IsOptional()
  @IsString()
  @Length(1, 36)
  token?: string

  @IsString()
  @IsNotEmpty()
  @Length(1, 36)
  user_token: string

  @IsString()
  @IsNotEmpty()
  @Length(1, 36)
  card_product_token: string

  @IsOptional()
  @ValidateNested()
  @Type(() => ActivationActionsDto)
  activation_actions?: ActivationActionsDto

  @IsOptional()
  @IsString()
  @Length(1, 36)
  bulk_issuance_token?: string

  @IsOptional()
  @IsBoolean()
  expedite?: boolean

  @IsOptional()
  @ValidateNested()
  @Type(() => ExpirationOffsetDto)
  expiration_offset?: ExpirationOffsetDto

  @IsOptional()
  @ValidateNested()
  @Type(() => FulfillmentDto)
  fulfillment?: FulfillmentDto

  @IsOptional()
  @IsString()
  @Length(1, 36)
  reissue_pan_from_card_token?: string

  @IsOptional()
  @IsString()
  @Length(1, 36)
  translate_pin_from_card_token?: string

  @IsOptional()
  metadata?: Record<string, string>
}
