//-----------------------------------------------------------------------------
// apps/marqeta-adapter/src/card-products/dto/transaction-controls.dto.ts
//-----------------------------------------------------------------------------
import {
  IsOptional,
  IsBoolean,
  IsInt,
  IsString,
  ValidateNested,
}                         from 'class-validator'
import { Type }           from 'class-transformer'

import { 
  IAvsControlOptions,
  IAvsControls,
  IStrongCustomerAuthenticationLimits,
  ITransactionControls, 
}                         from '@app/baas-marqeta'

/**
 * @class StrongCustomerAuthenticationLimitsDto
 */
 export class StrongCustomerAuthenticationLimitsDto implements IStrongCustomerAuthenticationLimits {
  @IsOptional()
  @IsInt()
  sca_contactless_cumulative_amount_limit?: number;

  @IsOptional()
  @IsInt()
  sca_contactless_transaction_limit?: number;

  @IsOptional()
  @IsInt()
  sca_contactless_transactions_count_limit?: number;

  @IsOptional()
  @IsString()
  sca_contactless_transactions_currency?: string;

  @IsOptional()
  @IsInt()
  sca_lvp_cumulative_amount_limit?: number;

  @IsOptional()
  @IsInt()
  sca_lvp_transaction_limit?: number;

  @IsOptional()
  @IsInt()
  sca_lvp_transactions_count_limit?: number;

  @IsOptional()
  @IsString()
  sca_lvp_transactions_currency?: string;
}

/**
 * @class AvsControlOptionsDto
 */
 export class AvsControlOptionsDto implements IAvsControlOptions {
  @IsOptional()
  @IsBoolean()
  decline_on_address_number_mismatch?: boolean;

  @IsOptional()
  @IsBoolean()
  decline_on_postal_code_mismatch?: boolean;
  
  @IsOptional()
  @IsBoolean()
  validate?: boolean;
}

/**
 * @class AvsControlsDto
 */
 export class AvsControlsDto implements IAvsControls {
  @IsOptional()
  @ValidateNested()
  @Type(() => AvsControlOptionsDto)
  auth_messages?: AvsControlOptionsDto
  
  @IsOptional()
  @ValidateNested()
  @Type(() => AvsControlOptionsDto)
  av_messages?:   AvsControlOptionsDto
}

/**
 * @class TransactionControlsDto
 */
export class TransactionControlsDto implements ITransactionControls {
  @IsOptional()
  @IsString()
  accepted_countries_token?: string

  @IsOptional()
  @ValidateNested()
  @Type(() => AvsControlsDto)
  address_verification?: AvsControlsDto

  @IsOptional()
  @IsBoolean()
  allow_chip_fallback?: boolean;

  @IsOptional()
  @IsBoolean()
  allow_first_pin_set_via_financial_transaction?: boolean;

  @IsOptional()
  @IsBoolean()
  allow_gpa_auth?: boolean;

  @IsOptional()
  @IsBoolean()
  allow_mcc_group_authorization_controls?: boolean;

  @IsOptional()
  @IsBoolean()
  allow_network_load?: boolean;

  @IsOptional()
  @IsBoolean()
  allow_network_load_card_activation?: boolean;

  @IsOptional()
  @IsBoolean()
  allow_quasi_cash?: boolean;

  @IsOptional()
  @IsBoolean()
  always_require_icc?: boolean;

  @IsOptional()
  @IsBoolean()
  always_require_pin?: boolean;
  
  @IsOptional()
  @IsBoolean()
  enable_credit_service?: boolean;

  @IsOptional()
  @IsBoolean()
  enable_partial_auth_approval?: boolean;

  @IsOptional()
  @IsBoolean()
  ignore_card_suspended_state?: boolean;

  @IsOptional()
  @IsString()
  notification_language?: string;

  @IsOptional()
  @IsString()
  quasi_cash_exempt_merchant_group_token?: string;

  @IsOptional()
  @IsString()
  quasi_cash_exempt_mids?: string;

  @IsOptional()
  @IsBoolean()
  require_card_not_present_card_security_code?: boolean;

  @IsOptional()
  @ValidateNested()
  @Type(() => StrongCustomerAuthenticationLimitsDto)
  strong_customer_authentication_limits?: StrongCustomerAuthenticationLimitsDto
}
