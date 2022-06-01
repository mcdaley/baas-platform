//---------------------------------------------------------------------------------------
// apps/core-bank-simulator/src/customers/entities/customer.entity.ts
//----------------------------------------------------------------------------------------
import { 
  CustomerStatus,
  Address,
  ICustomer, 
}                     from '@app/baas-interfaces'

/**
 * @class Customer
 */
export class Customer implements ICustomer {
  id:                 string            // Unique customer identifier
  branch_id:          string            // Identifies customer's bank
  status:             CustomerStatus
  first_name:         string
  middle_name?:       string
  last_name:          string
  suffix?:            string
  email:              string
  phone_number:       string
  ssn:                string
  metatdata?:         string
  physical_address:   Address
  mailing_address?:   Address
}
