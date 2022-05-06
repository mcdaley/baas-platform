//-----------------------------------------------------------------------------
// libs/baas-interfaces/src/addresses/address.interface.ts
//-----------------------------------------------------------------------------
import { States }         from './address.enum'

/**
 * @interface ICreateAddressDto
 */
export interface ICreateAddressDto {
  name:             string
  street_line_1:    string
  street_line_2?:   string
  city:             string
  state:            States
  postal_code:      string      
}

/**
 * @interface IAddress
 */
export interface IAddress extends ICreateAddressDto {}