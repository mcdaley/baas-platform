//-----------------------------------------------------------------------------
// apps/baas-customer-service/src/customers/dto/create-customer.dto.ts
//-----------------------------------------------------------------------------
import { 
  IsEmail,
  IsJSON,
  IsNotEmpty,
  IsOptional,
  IsNotEmptyObject,
  IsString, 
  Matches,
  MaxLength,
  ValidateNested,
  IsUUID,
}                             from 'class-validator'
import { Type }               from 'class-transformer'

import { 
  CreateAddressDto,
  CustomerStatus,
  ICreateCustomerDto,
}                             from '@app/baas-interfaces'

/**
 * @class CreateCustomerDto
 */
export class CreateCustomerDto implements ICreateCustomerDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(128, {message: 'First name is too long'})
  first_name:   string

  @IsOptional()
  @IsString()
  @MaxLength(128, {message: 'Middle name is too long'})
  middle_name?: string

  @IsNotEmpty()
  @IsString()
  @MaxLength(128, {message: 'Last name is too long'})
  last_name:    string

  @IsOptional()
  @IsString()
  @MaxLength(24)
  suffix?:      string

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
  metatdata?:   string
  
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CreateAddressDto)
  physical_address:  CreateAddressDto

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateAddressDto)
  mailing_address?: CreateAddressDto

  @IsNotEmpty()
  @IsUUID()
  branch_id:    string
}
