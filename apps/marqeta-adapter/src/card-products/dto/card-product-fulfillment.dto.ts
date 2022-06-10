//-----------------------------------------------------------------------------
// apps/marqeta-adapter/src/card-products/dto/fulfillment.dto.ts
//-----------------------------------------------------------------------------
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsOptional, 
  IsString, 
  ValidateNested,
}                               from 'class-validator'

import { ShippingDto }          from './shipping.dto'

import { 
  ICardPersonalization, 
  ICardProductFulfillment, 
  ICarrier, 
  IImages, 
  IImagesCard, 
  IImagesCarrier, 
  IImagesCarrierReturnWindow, 
  IImagesSignature, 
  IShipping, 
  IText,
  ITextValue, 
}                               from '@app/baas-marqeta'

/**
 * @enum CardPersonalizationTextType
 */
export enum CardPersonalizationTextType {
  Emboss  = 'EMBOSS',
  Laser   = 'LASER',
  Flat    = 'FLAT',
}

/**
 * @enum FulfillmentProfider
 */
export enum FulfillmentProvider {
  PerfectPlastic  = 'PERFECTPLASTIC',
  Arroweye        = 'ARROWEYE',
  Idemia          = 'IDEMIA',
  Idemia_UK       = 'IDEMIA_UK',
  Idemia_FR       = 'IDEMIA_FR',
  Idemia_CZ       = 'IDEMIA_CZ',
  Idemia_APAC     = 'IDEMIA_APAC',
  Idemia_PL       = 'IDEMIA_PL',
  Idemia_AU       = 'IDEMIA_AU',
  Idemia_LA       = 'IDEMIA_LA',
  Gemalto         = 'GEMALTO',
  NiteCrest       = 'NITECREST',
  Oberthur        = 'OBERTHUR',
  AllPay          = 'ALLPAY',
}

/**
 * @enum PaymentInstrument
 */
export enum PaymentInstrument {
  PhysicalMsr         = 'PHYSICAL_MSR',
  PhysicalIcc         = 'PHYSICAL_ICC',
  PhysicalContactless = 'PHYSICAL_CONTACTLESS',
  PhysicalCombo       = 'PHYSICAL_COMBO',
  VirtualPan          = 'VIRTUAL_PAN',
}

/**
 * @class TextValueDto
 */
 export class TextValueDto implements ITextValue {
  @IsOptional()
  @IsString()
  value?: string;
}

/**
 * @class TextDto
 */
 export class TextDto implements IText {
  @IsNotEmpty()
  @IsString()
  name_line_1:  TextValueDto
  
  @IsOptional()
  @IsString()
  name_line_2?: TextValueDto
  
  @IsOptional()
  @IsString()
  name_line_3?: TextValueDto
}

/**
 * @class ImagesSignatureDto
 */
 export class ImagesSignatureDto implements IImagesSignature {
  @IsOptional()
  @IsString()
  name?: string;
}

/**
 * @class ImagesCarrierReturnWindowDto
 */
 export class ImagesCarrierReturnWindowDto implements IImagesCarrierReturnWindow {
  @IsOptional()
  @IsString()
  name?: string;
}

/**
 * @class ImagesCarrierDto
 */
 export class ImagesCarrierDto implements IImagesCarrier {
  @IsOptional()
  @IsString()
  message_1?: string

  @IsOptional()
  @IsString()
  name?:      string
}

/**
 * @class ImagesCardDto
 */
 export class ImagesCardDto implements IImagesCard {
  @IsOptional()
  @IsString()
  name?:          string;
  
  @IsOptional()
  @IsString()
  thermal_color?: string;
}

/**
 * @class ImagesDto
 */
 export class ImagesDto implements IImages {
  @IsOptional()
  @ValidateNested()
  card?:                  ImagesCardDto
  
  @IsOptional()
  @ValidateNested()
  carrier?:               ImagesCarrierDto
  
  @IsOptional()
  @ValidateNested()
  carrier_return_window?: ImagesCarrierReturnWindowDto
  
  @IsOptional()
  @ValidateNested()
  signature?:             ImagesSignatureDto
}

/**
 * @class CarrierDto
 */
 export class CarrierDto implements ICarrier {
  @IsOptional()
  @IsString()
  logo_file?: string;

  @IsOptional()
  @IsString()
  logo_thumbnail_file?: string;

  @IsOptional()
  @IsString()
  message_file?: string;

  @IsOptional()
  @IsString()
  message_line?: string;

  @IsOptional()
  @IsString()
  template_id?: string;
}

/**
 * @class CardPersonalizationDto
 */
 export class CardPersonalizationDto implements ICardPersonalization {
  @IsOptional()
  @ValidateNested()
  carrier?:       CarrierDto

  @IsOptional()
  @ValidateNested()
  images?:        ImagesDto

  @IsOptional()
  @IsEnum(CardPersonalizationTextType)
  perso_type?:    CardPersonalizationTextType

  @IsNotEmpty()
  @ValidateNested()
  text:           TextDto;
}

/**
 * @class CardProductFulfillmentDto
 */
export class CardProductFulfillmentDto implements ICardProductFulfillment {
  @IsOptional()
  @IsBoolean()
  all_zero_card_security_code?: boolean
  
  @IsOptional()
  @IsBoolean()
  allow_card_creation?:         boolean
  
  @IsOptional()
  @IsString()
  bin_prefix?:                  string
  
  @IsOptional()
  @IsBoolean()
  bulk_ship?:                   boolean
  
  @IsNotEmpty()
  @ValidateNested()
  card_personalization:         CardPersonalizationDto
  
  @IsOptional()
  @IsBoolean()
  enable_offline_pin?:          boolean

  @IsOptional()
  @IsEnum(FulfillmentProvider)
  fulfillment_provider?:        FulfillmentProvider

  @IsOptional()
  @IsString()
  package_id?:                  string

  @IsOptional()
  @IsNumberString()
  pan_length?:                  string

  @IsOptional()
  @IsEnum(PaymentInstrument)
  payment_instrument?:          PaymentInstrument

  @IsOptional()
  @ValidateNested()
  shipping?:                    ShippingDto

  @IsOptional()
  @IsBoolean()
  uppercase_name_lines?:        boolean
}















