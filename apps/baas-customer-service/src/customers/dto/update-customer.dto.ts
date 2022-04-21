//-----------------------------------------------------------------------------
// apps/baas-customer-service/src/customers/dto/update-customer.dto.ts
//-----------------------------------------------------------------------------
import { 
  PartialType, 
  OmitType, 
  IntersectionType 
}                                 from '@nestjs/mapped-types'
import { 
  IsEnum, 
  IsOptional 
}                                 from 'class-validator'

import { CreateCustomerDto }      from './create-customer.dto'

import { 
  CustomerStatus, 
  IUpdateCustomerDto 
}                                 from '@app/baas-interfaces'


///////////////////////////////////////////////////////////////////////////////
// BUG: 04/21/2022
// Unable to stop the update of the ssn w/ OmitType
///////////////////////////////////////////////////////////////////////////////

/**
 * @class UpdateCustomerStatusDto
 */
export class UpdateCustomerStatusDto {
  @IsOptional()
  @IsEnum(CustomerStatus)
  status: CustomerStatus
}

/**
 * @class UpdateCustomerDto
 */
export class UpdateCustomerDto 
  extends IntersectionType(
    //* OmitType(CreateCustomerDto, ['ssn'] as const),
    PartialType(CreateCustomerDto),
    PartialType(UpdateCustomerStatusDto)
  ) 
  implements IUpdateCustomerDto {}
