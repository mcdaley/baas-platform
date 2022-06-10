//-----------------------------------------------------------------------------
// apps/marqeta-adapter/src/card-products/dto/selective-auth.dto.ts
//-----------------------------------------------------------------------------
import {
  IsBoolean,
  IsInstance,
  IsNumber,
  IsOptional,
}                           from 'class-validator'

import { ISelectiveAuth }   from '@app/baas-marqeta'

export class SelectiveAuthDto implements ISelectiveAuth {
  /**
   * Determines what type of merchant information is required for a match (authorization).
   * Not relevant if `enable_regex_search_chain = false`.
   *
   * * *0* – Requires exact match on card acceptor name and postal code to existing entry in Marqeta Merchant database (most restrictive).
   * * *1* – Partial match on card acceptor name (least restrictive).
   * * *2* – Partial match on card acceptor name; exact match on card acceptor city.
   * * *3* – Partial match on card acceptor name; exact match on card acceptor postal code.
   * * *4* – Partial match on card acceptor name; exact match on street address 1 and postal code.
   * @format int32
   */
  @IsOptional()
  dmd_location_sensitivity?: 0 | 1 | 2 | 3 | 4

  @IsOptional()
  @IsBoolean() 
  enable_regex_search_chain?: boolean
 
  @IsOptional() 
  @IsNumber()
  sa_mode?: 0 | 1 | 2
}