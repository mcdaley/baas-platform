//-----------------------------------------------------------------------------
// apps/marqeta-adapter/src/card-products/dto/jit-funding.dto
//-----------------------------------------------------------------------------
import {
  IsBoolean,
  IsEnum,
  IsOptional,
  IsString,
  ValidateNested,
}                             from 'class-validator'

import { 
  IJitFunding, 
  IJitFundingPaymentcardFundingSource, 
  IJitFundingProgramFundingSource, 
  IJitFundingProgramgatewayFundingSource, 
}                             from '@app/baas-marqeta'

/**
 * @enum 
 */
export enum PaymentCardFundingSourceRefundsDestination {
  Gateway   = 'GATEWAY',
  Gpa       = 'GPA',
  Waterfall = 'WATERFALL'
}

/**
 * @enum ProgramFundingSourceRefundsDestination
 */
export enum ProgramFundingSourceRefundsDestination {
  ProgramFundingSource  = 'PROGRAM_FUNDING_SOURCE',
  Gpa                   = 'GPA',
  Waterfall             = 'WATERFALL',
}

/**
 * @enum ProgramgatewayFundingSourceRefundsDestination
 */
export enum ProgramgatewayFundingSourceRefundsDestination {
  Gateway   = 'GATEWAY',
  Gpa       = 'GPA', 
  Waterfall = 'WATERFALL',
}

/**
 * @class JitFundingProgramgatewayFundingSourceDto
 */
 export class JitFundingProgramgatewayFundingSourceDto implements IJitFundingProgramgatewayFundingSource {
  @IsOptional()
  @IsBoolean()
  always_fund?: boolean;

  @IsOptional()
  @IsBoolean()
  enabled?: boolean;
  
  @IsOptional()
  @IsString()
  funding_source_token?: string;

  @IsOptional()
  @IsEnum(ProgramgatewayFundingSourceRefundsDestination)
  refunds_destination?: ProgramgatewayFundingSourceRefundsDestination
}

/**
 * @class JitFundingProgramFundingSourceDto
 */
 export class JitFundingProgramFundingSourceDto implements IJitFundingProgramFundingSource {
  @IsOptional()
  @IsBoolean()
  enabled?: boolean;

  @IsOptional()
  @IsString()
  funding_source_token?: string;

  @IsOptional()
  @IsEnum(ProgramFundingSourceRefundsDestination)
  refunds_destination?:   ProgramFundingSourceRefundsDestination
}

/**
 * @class JitFundingPaymentcardFundingSourceDto
 */
 export class JitFundingPaymentcardFundingSourceDto implements IJitFundingPaymentcardFundingSource {
  @IsOptional()
  @IsBoolean()
  enabled?: boolean

  @IsOptional()
  @IsEnum(PaymentCardFundingSourceRefundsDestination)
  refunds_destination?: PaymentCardFundingSourceRefundsDestination
}

/**
 *  @class JitFundingDto
 */
export class JitFundingDto implements IJitFunding {
  @IsOptional()
  @ValidateNested()
  paymentcard_funding_source?:    JitFundingPaymentcardFundingSourceDto
  
  @IsOptional()
  @ValidateNested()
  program_funding_source?:        JitFundingProgramFundingSourceDto
  
  @IsOptional()
  @ValidateNested()
  programgateway_funding_source?: IJitFundingProgramgatewayFundingSource
}




