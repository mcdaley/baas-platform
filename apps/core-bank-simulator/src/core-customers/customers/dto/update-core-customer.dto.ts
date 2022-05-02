//--------------------------------------------------------------------------------------
// apps/core-bank-simulator/src/core-customers/customers/dto/update-core-customer.dto.ts
//--------------------------------------------------------------------------------------
import { PartialType }            from '@nestjs/mapped-types'

import { CreateCoreCustomerDto }  from './create-core-customer.dto'
import { IUpdateCustomerDto }     from '@app/baas-interfaces'

export class UpdateCoreCustomerDto 
  extends    PartialType(CreateCoreCustomerDto) 
  implements IUpdateCustomerDto {}
