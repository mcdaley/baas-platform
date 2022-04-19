//---------------------------------------------------------------------------------------
// apps/baas-debit-card-service/src/debit-cards-reissue/create-debit-cards-reissue.dto.ts
//---------------------------------------------------------------------------------------
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
  BusinessNameOnCard,
  Delivery,
  Packaging,
  ReissueReason,
  CreateAddressDto,
  ICreateDebitCardsReissueDto,
}                           from '@app/baas-interfaces'

/**
 * @class CreateDebitCardsReissueDto
 */
export class CreateDebitCardsReissueDto implements ICreateDebitCardsReissueDto {
  @IsString()
  @MaxLength(64)
  name_on_card:                   string      // Default is Customer's name
  
  //* @IsOptional()
  //* @IsEnum(BusinessNameOnCard)
  //* business_name_on_card:          BusinessNameOnCard
  
  //* @IsOptional()
  //* @IsString()
  //* @MaxLength(64)
  //* custom_business_name_on_card:   string      // Define if business_name_on_card = 'custom'
  
  @IsNotEmpty()
  @IsEnum(ReissueReason)
  reason:                         ReissueReason
  
  @IsOptional()
  @IsEnum(Delivery)
  delivery:                       Delivery
  
  @IsOptional()
  @IsEnum(Packaging)
  packaging:                      Packaging
  
  @IsNotEmpty()
  @IsString()
  @Matches(/^\d{3}-\d{3}-\d{4}$/)
  phone_number:                   string

  @ValidateNested()
  @Type(() => CreateAddressDto)
  mailing_address:                CreateAddressDto
}
