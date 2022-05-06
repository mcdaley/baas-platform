//-----------------------------------------------------------------------------
// libs/baas-interfaces/src/customer/customer.interface.ts
//-----------------------------------------------------------------------------
import { IAddress, ICreateAddressDto } from "../addresses/address.interface"
import { CustomerStatus } from "./customer.enum"

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
  status?:            CustomerStatus
  branch_id:          string
}

/**
 * @interface IUpdateCustomerDto
 */
export interface IUpdateCustomerDto {
  first_name?:        string
  middle_name?:       string
  last_name?:         string
  suffix?:            string
  email?:             string
  phone_number?:      string
  ssn?:               string
  metatdata?:         string
  physical_address?:  ICreateAddressDto
  mailing_address?:   ICreateAddressDto
  status?:            CustomerStatus
}

/**
 * @interface ICustomer
 */
export interface ICustomer extends ICreateCustomerDto {
  id:                 string
  physical_address:   IAddress
  mailing_address?:   IAddress
}

/**
 * @interface ICustomerResponse
 */
export interface ICustomerResponse {
  customer: ICustomer,
}

/**
 * @interface ICustomerListResponse
 */
export interface ICustomerListResponse {
  customers: ICustomer[],
}
