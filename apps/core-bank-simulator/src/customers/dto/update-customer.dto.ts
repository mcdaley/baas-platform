//-----------------------------------------------------------------------------
// apps/core-bank-simulator/src/customers/dto/update-customer.dto.ts
//-----------------------------------------------------------------------------
import { PartialType }            from '@nestjs/mapped-types'

import { CreateCustomerDto }      from './create-customer.dto'
import { IUpdateCustomerDto }     from '@app/baas-interfaces'

/**
 * @class UpdateCustomerDto
 */
export class UpdateCustomerDto 
  extends    PartialType(CreateCustomerDto)
  implements IUpdateCustomerDto {}
