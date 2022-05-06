//-----------------------------------------------------------------------------
// libs/baas-interfaces/src/addresses/dto/create-address.dto.ts
//-----------------------------------------------------------------------------
import { 
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString, 
  Length,
  Matches,
  MaxLength,
}                             from 'class-validator'

import { ICreateAddressDto }  from '../address.interface'
import { States }             from '../address.enum'

/**
 * @class CreateAddressDto
 */
export class CreateAddressDto implements ICreateAddressDto {
  @IsOptional()
  @IsString()
  @MaxLength(128)
  name:           string

  @IsNotEmpty()
  @IsString()
  @MaxLength(128)
  street_line_1:  string      // maxLength 128
  
  @IsOptional()
  @IsString()
  @MaxLength(128)
  street_line_2?: string      // maxLength 128
  
  @IsNotEmpty()
  @IsString()
  @MaxLength(128)
  city:           string      // maxLength 128

  @IsNotEmpty()
  @IsString()
  @IsEnum(States)
  state:          States

  @IsNotEmpty()
  @Matches(/^\d{5}(-\d{4})?$/)
  postal_code:    string      
}