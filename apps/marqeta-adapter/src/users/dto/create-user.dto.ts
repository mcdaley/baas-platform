//-----------------------------------------------------------------------------
// apps/marqeta-adapter/src/users/dto/create-user.dto.ts
//-----------------------------------------------------------------------------
import {
  IsBoolean, 
  IsEmail, 
  IsEnum, 
  IsNumberString, 
  IsOptional, 
  IsString, 
  Length, 
  Matches, 
  MaxLength, 
  ValidateNested,
}                               from 'class-validator'
import { Type }                 from 'class-transformer'

import { 
  IIdentificationRequestModel, 
  IUserCardHolderUpdateModel
}                               from '@app/baas-marqeta'

/**
 * @enum IdentificationDocument
 */
export enum IdentificationDocument {
  Ssn               = 'SSN',
  Tin               = 'TIN',
  Sin               = 'SIN',
  Nin               = 'NIN',
  PassportNumber    = 'PASSPORT_NUMBER',
  DriversLicense    = 'DRIVERS_LICENSE',
  BusinessNumber    = 'BUSINESS_NUMBER',
  BusinessTaxId     = 'BUSINESS_TAX_ID',
  TaxpayerReference = 'TAXPAYER_REFERENCE',
}

/**
 * @enum Gender
 */
export enum Gender {
  M = 'M',
  F = 'F',
}

/**
 * @class IdentificationRequestModel
 */
export class IdentificationRequestModel implements IIdentificationRequestModel {
  @IsOptional()
  @IsString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/)
  expiration_date?: string;

  @IsOptional()
  @IsEnum(IdentificationDocument)
  type:             IdentificationDocument

  @IsOptional()
  @IsString()
  @MaxLength(255)
  value?:           string;

}

/**
 * @class CreateUserDto
 */
export class CreateUserDto implements IUserCardHolderUpdateModel{
  @IsOptional()
  @IsString()
  @MaxLength(36)
  token?: string

  @IsOptional()
  @IsBoolean()
  active?: boolean

  @IsOptional()
  @IsString()
  @MaxLength(40)
  first_name?: string

  @IsOptional()
  @IsString()
  @MaxLength(40)
  middle_name?: string

  @IsOptional()
  @IsString()
  @MaxLength(40)
  last_name?: string

  @IsOptional()
  @IsString()
  @MaxLength(10)
  honorific?: string

  @IsOptional()
  @IsString()
  @MaxLength(255)
  company?: string

  @IsOptional()
  @IsBoolean()
  corporate_card_holder?: boolean

  @IsOptional()
  @IsString()
  @MaxLength(255)
  phone?: string
  
  @IsOptional()
  @IsEmail()
  email?: string

  @IsOptional()
  @IsString()
  @MaxLength(255)
  address1?: string

  @IsOptional()
  @IsString()
  @MaxLength(255)
  address2?: string

  @IsOptional()
  @IsString()
  @MaxLength(40)
  city?: string

  @IsOptional()
  @IsString()
  @MaxLength(32)
  state?: string

  @IsOptional()
  @IsString()
  @MaxLength(36)
  postal_code?: string

  @IsOptional()
  @IsString()
  @MaxLength(40)
  country?: string
  
  @IsOptional()
  @IsString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/)
  birth_date?: string

  @IsOptional()
  @IsNumberString()
  @Length(9)
  ssn?: string

  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender

  @IsOptional()
  @IsString()
  @MaxLength(255)
  nationality?: string

  @IsOptional()
  @IsString()
  @MaxLength(36)
  account_holder_group_token?: string

  @IsOptional()
  @IsBoolean()
  uses_parent_account?: boolean;

  @IsOptional()
  @IsString()
  @MaxLength(36)
  parent_token?: string

  @IsOptional()
  @IsString()
  @MaxLength(255)
  password?: string

  @IsOptional()
  @IsString()
  @MaxLength(40)
  passport_number?: string

  @IsOptional()
  @IsString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/)
  passport_expiration_date?: string

  @IsOptional()
  @IsString()
  @MaxLength(255)
  id_card_number?: string

  @IsOptional()
  @IsString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/)
  id_card_expiration_date?: string

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => IdentificationRequestModel)
  identifications?: IdentificationRequestModel[]

  @IsOptional()
  @IsString()
  @MaxLength(39)
  ip_address?: string

  @IsOptional()
  metadata?: Record<string, string>

  @IsOptional()
  @IsString()
  @MaxLength(255)
  notes?: string
}
