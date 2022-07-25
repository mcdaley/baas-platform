//-----------------------------------------------------------------------------
// apps/baas-customer-service/src/customers/entities/customer.entity.ts
//-----------------------------------------------------------------------------
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
  tenant_id:          string            // Identifies customer's bank
  status:             CustomerStatus
  first_name:         string
  middle_name?:       string
  last_name:          string
  suffix?:            string
  email:              string
  phone_number:       string
  ssn:                string
  metadata?:          string
  physical_address:   Address
  mailing_address?:   Address
  created_at:         Date
  updated_at:         Date
}

