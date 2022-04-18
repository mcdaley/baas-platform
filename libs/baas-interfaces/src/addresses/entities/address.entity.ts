//-----------------------------------------------------------------------------
// libs/baas-interfaces/src/addresses/entities/address.entity.ts
//-----------------------------------------------------------------------------
import { States }   from '../address.enum'
import { IAddress } from '../address.interface'

export class Address implements IAddress{
  name:             string
  street_line_1:    string
  street_line_2:    string
  city:             string
  state:            States
  postal_code:      string      
}