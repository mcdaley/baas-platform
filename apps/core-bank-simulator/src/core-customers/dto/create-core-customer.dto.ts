//-----------------------------------------------------------------------------
// apps/core-bank-simulator/src/customers/dto/create-core-customer.dto.ts
//-----------------------------------------------------------------------------
import { 
  IsEmail,
  IsEnum,
  IsJSON,
  IsNotEmpty,
  IsOptional,
  IsNotEmptyObject,
  IsString, 
  Matches,
  MaxLength,
  ValidateNested,
}                             from 'class-validator'
import { Type }               from 'class-transformer'

import { 
  CreateAddressDto, 
  CustomerStatus, 
  ICreateCustomerDto,
}                             from '@app/baas-interfaces'

/**
 * @class CreateCoreCustomerDto
 */
export class CreateCoreCustomerDto implements ICreateCustomerDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(128, {message: 'First name is too long'})
  first_name:   string

  @IsOptional()
  @IsString()
  @MaxLength(128, {message: 'Middle name is too long'})
  middle_name:  string

  @IsNotEmpty()
  @IsString()
  @MaxLength(128, {message: 'Last name is too long'})
  last_name:    string

  @IsOptional()
  @IsString()
  @MaxLength(24)
  suffix:       string

  @IsNotEmpty()
  @IsEmail()
  email:        string

  @Matches(/^\d{3}-\d{3}-\d{4}$/)
  phone_number: string
  
  @IsNotEmpty()
  @IsString()
  @Matches(/^\d{3}-\d{2}-\d{4}$/)
  ssn:          string

  @IsOptional()
  @IsJSON()
  metatdata:    string
  
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CreateAddressDto)
  physical_address:  CreateAddressDto

  @ValidateNested()
  @Type(() => CreateAddressDto)
  mailing_address:  CreateAddressDto

  /////////////////////////////////////////////////////////////////////////////
  // TODO: 04/20/2022
  // I had to add the status in order to get the core-bank-simulator update
  // customer api to work. I will need to clean this up later.
  /////////////////////////////////////////////////////////////////////////////
  @IsOptional()
  @IsEnum(CustomerStatus)
  status?:          CustomerStatus   
}
