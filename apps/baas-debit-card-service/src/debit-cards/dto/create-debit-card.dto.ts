//-----------------------------------------------------------------------------
// src/debit-cards/dto/create-debit-card.dto.ts
//-----------------------------------------------------------------------------
import {
  IsEnum, 
  IsNotEmpty, 
  IsOptional, 
  IsString, 
  IsUUID, 
  Matches, 
  MaxLength, 
  ValidateNested,
}                           from 'class-validator'
import { Type }             from 'class-transformer'

import { 
  CardType,
  Delivery,
  Packaging,
  ICreateDebitCardDto,
  CreateAddressDto,
}                           from '@app/baas-interfaces'

/**
 * @class CreateDebitCardDto
 */
export class CreateDebitCardDto implements ICreateDebitCardDto {
  @IsEnum(CardType)
  card_type:                      CardType
  
  @IsString()
  @MaxLength(64)
  name_on_card:                   string      // Default is Customer's name
  
  @IsOptional()
  @IsEnum(Delivery)
  delivery?:                       Delivery
  
  @IsOptional()
  @IsEnum(Packaging)
  packaging?:                     Packaging
  
  @IsNotEmpty()
  @IsString()
  @Matches(/^\d{3}-\d{3}-\d{4}$/)
  phone_number:                   string

  @ValidateNested()
  @Type(() => CreateAddressDto)
  mailing_address:                CreateAddressDto

  @IsUUID()
  customer_id:                    string
  
  @IsUUID()
  account_id:                     string
}
