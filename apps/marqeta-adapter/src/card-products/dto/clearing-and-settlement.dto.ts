//-----------------------------------------------------------------------------
// apps/marqeta-adapter/src/card-products/dto/clearing-and-settlement.dto.ts
//-----------------------------------------------------------------------------
import {
  IsOptional,
  IsEnum,
}                                 from 'class-validator'

import { IClearingAndSettlement } from '@app/baas-marqeta'

export enum OverdraftDestination {
  Gpa                     = 'GPA',
  Msa                     = 'MSA',
  MerchantCampaignAccount = 'MERCHANT_CAMPAIGN_ACCOUNT',
  GlobalOverdraftAccount  = 'GLOBAL_OVERDRAFT_ACCOUNT',
}

/**
 * @class ClearingAndSettlementDto
 */
export class ClearingAndSettlementDto implements IClearingAndSettlement {
  @IsOptional()
  @IsEnum(OverdraftDestination)
  overdraft_destination?: OverdraftDestination
}