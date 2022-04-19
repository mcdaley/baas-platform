//-----------------------------------------------------------------------------
// libs/baas-interfaces/src/customer/customer.interface.ts
//-----------------------------------------------------------------------------
import { IAddress, ICreateAddressDto } from "../addresses/address.interface"

/**
 * @interface ICreateCustomerDto
 */
export interface ICreateCustomerDto {
  first_name:         string
  middle_name?:       string
  last_name:          string
  suffix?:            string
  email:              string
  phone_number:       string
  ssn:                string
  metatdata?:         string
  physical_address:   ICreateAddressDto
  mailing_address?:   ICreateAddressDto
}

/**
 * @interface ICustomer
 */
export interface ICustomer extends ICreateCustomerDto {
  id:                 string
  physical_address:   IAddress
  mailing_address?:   IAddress
}
