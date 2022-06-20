//-----------------------------------------------------------------------------
// apps/marqeta-adapter/src/card-products/dto/shipping.dto.ts
//-----------------------------------------------------------------------------
import {
  IsEnum,
  IsOptional, 
  IsString, 
  ValidateNested,
}                       from 'class-validator'
import { Type }         from 'class-transformer'

import { 
  IFulfillmentAddressRequest,
  IShipping, 
}                       from '@app/baas-marqeta'

/**
 * @enum ShippingMethod
 */
export enum ShippingMethod {
  LocalMail         = 'LOCAL_MAIL',
  LocalMailPackage  = 'LOCAL_MAIL_PACKAGE',
  Ground            = 'GROUND',
  TwoDay            = 'TWO_DAY',
  Overnight         = 'OVERNIGHT',
  International     = 'INTERNATIONAL',
  FedexExpedited    = 'FEDEX_EXPEDITED',
  FedexRegular      = 'FEDEX_REGULAR',
  UpsExpedited      = 'UPS_EXPEDITED',
  UpsRegular        = 'UPS_REGULAR',
  UspsExpedited     = 'USPS_EXPEDITED',
  UspsRegular       = 'USPS_REGULAR',
}

/**
 * @class FulfillmentAddressRequestDto
 */
 export class FulfillmentAddressRequestDto implements IFulfillmentAddressRequest {
  @IsOptional()
  @IsString()
  address1?:    string;

  @IsOptional()
  @IsString()
  address2?:    string;

  @IsOptional()
  @IsString()
  city?:        string;

  @IsOptional()
  @IsString()
  country?:     string;

  @IsOptional()
  @IsString()
  first_name?:  string;

  @IsOptional()
  @IsString()
  last_name?:   string;

  @IsOptional()
  @IsString()
  middle_name?: string;

  @IsOptional()
  @IsString()
  phone?:       string;

  @IsOptional()
  @IsString()
  postal_code?: string;

  @IsOptional()
  @IsString()
  state?:       string;

  @IsOptional()
  @IsString()
  zip?:         string;
}

/**
 * @class ShippingDto
 */
export class ShippingDto implements IShipping {
  @IsOptional()
  @IsString()
  care_of_line?:      string

  @IsOptional()
  @IsEnum(ShippingMethod)
  method?:            ShippingMethod

  @IsOptional()
  @ValidateNested()
  @Type(() => FulfillmentAddressRequestDto)
  recipient_address?: FulfillmentAddressRequestDto

  @IsOptional()
  @ValidateNested()
  @Type(() => FulfillmentAddressRequestDto)
  return_address?: FulfillmentAddressRequestDto
}

