/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface IACHListResponse {
  /**
   * The number of resources to retrieve.
   * @format int32
   */
  count?: number;

  /** An array of `ach_response_model` objects. */
  data?: IBaseAchResponseModel[];

  /**
   * The sort order index of the last resource in the returned array.
   * @format int32
   */
  end_index?: number;

  /** A value of `true` indicates that more unreturned resources exist. */
  is_more?: boolean;

  /**
   * The sort order index of the first resource in the returned array.
   * @format int32
   */
  start_index?: number;
}

export interface IAcceptedCountriesListResponse {
  /**
   * The number of `acceptedcountries` objects to retrieve.
   * @format int32
   */
  count?: number;

  /** An array of `acceptedcountries` objects. */
  data?: IAcceptedCountriesModel[];

  /**
   * The sort order index of the last resource in the returned array.
   * @format int32
   */
  end_index?: number;

  /** A value of `true` indicates that more unreturned resources exist. */
  is_more?: boolean;

  /**
   * The sort order index of the first resource in the returned array.
   * @format int32
   */
  start_index?: number;
}

export interface IAccountHolderGroupListResponse {
  /**
   * The number of resources to retrieve.
   * @format int32
   */
  count?: number;

  /** An array of objects in a returned resource. */
  data?: IAccountHolderGroupResponse[];

  /**
   * The sort order index of the last resource in the returned array.
   * @format int32
   */
  end_index?: number;

  /** A value of `true` indicates that more unreturned resources exist. */
  is_more?: boolean;

  /**
   * The sort order index of the first resource in the returned array.
   * @format int32
   */
  start_index?: number;
}

/**
 * An address associated with the business.
 */
export interface IAddressRequestModel {
  /**
   * Street address of the business proprietor or officer.
   *
   * This field is required for KYC verification (US-based accounts only).
   * Cannot perform KYC if set to a PO Box.
   */
  address1?: string;

  /** Additional address information. */
  address2?: string;

  /**
   * City of business proprietor or officer.
   *
   * This field is required for KYC verification (US-based accounts only).
   */
  city?: string;

  /** Country where the business proprietor or officer resides. */
  country?: string;

  /**
   * Business proprietor or officer's postal code.
   *
   * This field is required for KYC verification (US-based accounts only).
   */
  postal_code?: string;

  /**
   * State where the business proprietor or officer resides.
   *
   * This field is required for KYC verification (US-based accounts only).
   */
  state?: string;

  /** ZIP code of the address. */
  zip?: string;
}

export interface IAddressResponseModel {
  /** Street address. */
  address1?: string;

  /** Additional address information. */
  address2?: string;

  /** City. */
  city?: string;

  /** Country. */
  country?: string;

  /** Postal code of the address. */
  postal_code?: string;

  /** State, province, or territory of the address. */
  state?: string;

  /** ZIP code of the address. */
  zip?: string;
}

/**
 * Contains client application information.
 */
export interface IApplication {
  /** The access code of the client application. */
  access_code?: string;

  /** The URL of the client application assets. */
  assets_url?: string;

  /** The base URL of the client API. */
  client_api_base_url?: string;

  /** The client application's environment. */
  environment?: string;

  /** The name of the program on the Marqeta platform. */
  program?: string;

  /** The short code of the program on the Marqeta platform. */
  program_short_code?: string;

  /** The unique identifier of the `application` object. */
  token?: string;
}

export interface IAuthControlExemptMidsListResponse {
  /**
   * The number of resources retrieved.
   * @format int32
   */
  count?: number;

  /** An array of objects in a returned resource. */
  data?: IAuthControlExemptMidsResponse[];

  /**
   * The sort order index of the last resource in the returned array.
   * @format int32
   */
  end_index?: number;

  /** A value of `true` indicates that more unreturned resources exist. */
  is_more?: boolean;

  /**
   * The sort order index of the first resource in the returned array.
   * @format int32
   */
  start_index?: number;
}

export interface IAuthControlListResponse {
  /**
   * The number of resources retrieved.
   * @format int32
   */
  count?: number;

  /** An array of objects in a returned resource. */
  data?: IAuthControlResponse[];

  /**
   * The sort order index of the last resource in the returned array.
   * @format int32
   */
  end_index?: number;

  /** A value of `true` indicates that more unreturned resources exist. */
  is_more?: boolean;

  /**
   * The sort order index of the first resource in the returned array.
   * @format int32
   */
  start_index?: number;
}

/**
 * Contains the cardholder's email address and password information.
 */
export interface IAuthentication {
  /** Specifies whether the email address has been verified. */
  email_verified?: boolean;

  /**
   * The date and time when the email address was verified.
   * @format date-time
   */
  email_verified_time?: string;

  /** Specifies the channel through which the password was last changed. */
  last_password_update_channel?: 'USER_CHANGE' | 'USER_RESET';

  /**
   * The date and time when the password was last changed.
   * @format date-time
   */
  last_password_update_time?: string;
}

export interface IAutoReloadListResponse {
  /**
   * The number of resources to retrieve.
   * @format int32
   */
  count?: number;

  /** An array of objects in a returned resource. */
  data?: IAutoReloadResponseModel[];

  /**
   * The sort order index of the last resource in the returned array.
   * @format int32
   */
  end_index?: number;

  /** A value of `true` indicates that more unreturned resources exist. */
  is_more?: boolean;

  /**
   * The sort order index of the first resource in the returned array.
   * @format int32
   */
  start_index?: number;
}

export interface IBillingAddress {
  address?: string;
  compressed_zip?: string;
  first_name?: string;
  last_name?: string;
  zip?: string;
}

export interface IBulkCardOrderListResponse {
  /**
   * The number of resources retrieved.
   * @format int32
   */
  count?: number;

  /** An array of objects in the returned resource. */
  data?: IBulkIssuanceResponse[];

  /**
   * The sort order index of the last resource in the returned array.
   * @format int32
   */
  end_index?: number;

  /** A value of `true` indicates that more unreturned resources exist. */
  is_more?: boolean;

  /**
   * The sort order index of the first resource in the returned array.
   * @format int32
   */
  start_index?: number;
}

export interface IBusinessCardHolderListResponse {
  /**
   * The number of resources to retrieve.
   * @format int32
   */
  count?: number;

  /** An array of business objects. */
  data?: IBusinessCardholder[];

  /**
   * The sort order index of the last resource in the returned array.
   * @format int32
   */
  end_index?: number;

  /** A value of `true` indicates that more unreturned resources exist. */
  is_more?: boolean;

  /**
   * The sort order index of the first resource in the returned array.
   * @format int32
   */
  start_index?: number;
}

export interface IBusinessTransitionListResponse {
  /**
   * The number of resources retrieved.
   * @format int32
   */
  count?: number;

  /** An array of business transition objects. */
  data?: IBusinessTransitionResponse[];

  /**
   * The sort order index of the last resource in the returned array.
   * @format int32
   */
  end_index?: number;

  /** A value of `true` indicates that more unreturned resources exist. */
  is_more?: boolean;

  /**
   * The sort order index of the first resource in the returned array.
   * @format int32
   */
  start_index?: number;
}

export interface IBusinessTransitionRequest {
  /** Identifies the business whose status you want to transition. */
  business_token: string;

  /** The mechanism by which the transaction was initiated. */
  channel: 'API' | 'IVR' | 'FRAUD' | 'ADMIN' | 'SYSTEM';
  idempotentHash?: string;

  /** Additional information about the status change. */
  reason?: string;

  /**
   * Identifies the standardized reason for the transition:
   *
   * *00:* Object activated for the first time.
   * *01:* Requested by you.
   * *02:* Inactivity over time.
   * *03:* This address cannot accept mail or the addressee is unknown.
   * *04:* Negative account balance.
   * *05:* Account under review.
   * *06:* Suspicious activity was identified.
   * *07:* Activity outside the program parameters was identified.
   * *08:* Confirmed fraud was identified.
   * *09:* Matched with an Office of Foreign Assets Control list.
   * *10:* Card was reported lost.
   * *11:* Card information was cloned.
   * *12:* Account or card information was compromised.
   * *13:* Temporary status change while on hold/leave.
   * *14:* Initiated by Marqeta.
   * *15:* Initiated by issuer.
   * *16:* Card expired.
   * *17:* Failed KYC.
   * *18:* Changed to `ACTIVE` because information was properly validated.
   * *19:* Changed to `ACTIVE` because account activity was properly validated.
   * *20:* Change occurred prior to the normalization of reason codes.
   * *21:* Initiated by a third party, often a digital wallet provider.
   * *22:* PIN retry limit reached.
   * *23:* Card was reported stolen.
   * *24:* Address issue.
   * *25:* Name issue.
   * *26:* SSN issue.
   * *27:* DOB issue.
   * *28:* Email issue.
   * *29:* Phone issue.
   * *30:* Account/fulfillment mismatch.
   * *31:* Other reason.
   */
  reason_code:
    | '00'
    | '01'
    | '02'
    | '03'
    | '04'
    | '05'
    | '06'
    | '07'
    | '08'
    | '09'
    | '10'
    | '11'
    | '12'
    | '13'
    | '14'
    | '15'
    | '16'
    | '17'
    | '18'
    | '19'
    | '20'
    | '21'
    | '22'
    | '23'
    | '24'
    | '25'
    | '26'
    | '27'
    | '28'
    | '29'
    | '30'
    | '31';

  /** Specifies the new status of the business. */
  status: 'UNVERIFIED' | 'LIMITED' | 'ACTIVE' | 'SUSPENDED' | 'CLOSED';

  /**
   * The unique identifier of the business transition.
   *
   * If you do not include a token, the system generates one automatically.
   * This token is referenced in other API calls, so we recommend that you define a simple string that is easy to remember.
   * This value cannot be updated.
   */
  token?: string;
}

export interface IBusinessTransitionResponse {
  /** Identifies the business whose status you want to transition. */
  business_token?: string;

  /** The mechanism by which the transaction was initiated. */
  channel: 'API' | 'IVR' | 'FRAUD' | 'ADMIN' | 'SYSTEM';

  /**
   * The date and time when the resource was created, in UTC.
   * `2021-10-26T20:03:15Z`, for example.
   * @format date-time
   */
  created_time?: string;

  /**
   * The date and time when the resource was last updated, in UTC.
   * `2021-10-26T20:03:15Z`, for example.
   * @format date-time
   */
  last_modified_time?: string;

  /** Additional information about the status change. */
  reason?: string;

  /**
   * Identifies the standardized reason for the transition:
   *
   * *00:* Object activated for the first time.
   * *01:* Requested by you.
   * *02:* Inactivity over time.
   * *03:* This address cannot accept mail or the addressee is unknown.
   * *04:* Negative account balance.
   * *05:* Account under review.
   * *06:* Suspicious activity was identified.
   * *07:* Activity outside the program parameters was identified.
   * *08:* Confirmed fraud was identified.
   * *09:* Matched with an Office of Foreign Assets Control list.
   * *10:* Card was reported lost.
   * *11:* Card information was cloned.
   * *12:* Account or card information was compromised.
   * *13:* Temporary status change while on hold/leave.
   * *14:* Initiated by Marqeta.
   * *15:* Initiated by issuer.
   * *16:* Card expired.
   * *17:* Failed KYC.
   * *18:* Changed to `ACTIVE` because information was properly validated.
   * *19:* Changed to `ACTIVE` because account activity was properly validated.
   * *20:* Change occurred prior to the normalization of reason codes.
   * *21:* Initiated by a third party, often a digital wallet provider.
   * *22:* PIN retry limit reached.
   * *23:* Card was reported stolen.
   * *24:* Address issue.
   * *25:* Name issue.
   * *26:* SSN issue.
   * *27:* DOB issue.
   * *28:* Email issue.
   * *29:* Phone issue.
   * *30:* Account/fulfillment mismatch.
   * *31:* Other reason.
   */
  reason_code:
    | '00'
    | '01'
    | '02'
    | '03'
    | '04'
    | '05'
    | '06'
    | '07'
    | '08'
    | '09'
    | '10'
    | '11'
    | '12'
    | '13'
    | '14'
    | '15'
    | '16'
    | '17'
    | '18'
    | '19'
    | '20'
    | '21'
    | '22'
    | '23'
    | '24'
    | '25'
    | '26'
    | '27'
    | '28'
    | '29'
    | '30'
    | '31';

  /** Specifies the status of the business. */
  status: 'UNVERIFIED' | 'LIMITED' | 'ACTIVE' | 'SUSPENDED' | 'CLOSED';

  /** The unique identifier of the business transition. */
  token: string;
}

/**
 * Specifies certain physical characteristics of a card, as well as shipment information.
 */
export interface ICardFulfillmentResponse {
  /** Specifies the reason for card fulfillment. */
  card_fulfillment_reason?: 'NEW' | 'LOST_STOLEN' | 'EXPIRED';

  /** Allows personalized attributes to be added to the card. */
  card_personalization: ICardPersonalization;

  /** Specifies shipping details for the card. */
  shipping?: IShippingInformationResponse;
}

export interface ICardListResponse {
  /**
   * The number of resources retrieved.
   * @format int32
   */
  count?: number;

  /** An array of card objects. */
  data?: ICardResponse[];

  /**
   * The sort order index of the last resource in the returned array.
   * @format int32
   */
  end_index?: number;

  /** A value of `true` indicates that more unreturned resources exist. */
  is_more?: boolean;

  /**
   * The sort order index of the first resource in the returned array.
   * @format int32
   */
  start_index?: number;
}

export interface ICardProductListResponse {
  /**
   * The number of resources to retrieve.
   * @format int32
   */
  count?: number;

  /** An array of objects in a returned resource. */
  data?: ICardProductResponse[];

  /**
   * The sort order index of the last resource in the returned array.
   * @format int32
   */
  end_index?: number;

  /** A value of `true` indicates that more unreturned resources exist. */
  is_more?: boolean;

  /**
   * The sort order index of the first resource in the returned array.
   * @format int32
   */
  start_index?: number;
}

export interface ICardTransitionListResponse {
  /**
   * The number of resources to retrieve.
   * @format int32
   */
  count?: number;

  /** An array of card transitions. */
  data?: ICardTransitionResponse[];

  /**
   * The sort order index of the last resource in the returned array.
   * @format int32
   */
  end_index?: number;

  /** A value of `true` indicates that more unreturned resources exist. */
  is_more?: boolean;

  /**
   * The sort order index of the first resource in the returned array.
   * @format int32
   */
  start_index?: number;
}

export interface ICardholderAddressListResponse {
  /**
   * The number of resources to retrieve.
   * @format int32
   */
  count?: number;

  /** An array of `cardholder_address_model` objects. */
  data?: ICardholderAddressResponse[];

  /**
   * The sort order index of the last resource in the returned array.
   * @format int32
   */
  end_index?: number;

  /** A value of `true` indicates that more unreturned resources exist. */
  is_more?: boolean;

  /**
   * The sort order index of the first resource in the returned array.
   * @format int32
   */
  start_index?: number;
}

/**
 * Address information for a cardholder or funding source.
 */
export interface ICardholderAddressResponse {
  /** Whether the address is active. */
  active?: boolean;

  /** Street address of the funding source. */
  address_1: string;

  /** Additional address information for the funding source. */
  address_2?: string;

  /**
   * The unique identifier of the `business` account holder.
   * Required if `user_token` is not specified.
   */
  business_token?: string;

  /** City of the funding source. */
  city: string;

  /** Country of the funding source. */
  country: string;

  /**
   * Date and time when the address was created.
   * @format date-time
   */
  created_time: string;

  /** First name of the account holder associated with the funding source. */
  first_name: string;

  /** Whether this address is the default address used by the funding source. */
  is_default_address?: boolean;

  /**
   * Date and time when the address was last modified.
   * @format date-time
   */
  last_modified_time: string;

  /** Last name of the account holder associated with the funding source. */
  last_name: string;

  /** Phone number of the funding source. */
  phone?: string;

  /** Postal code of the funding source. */
  postal_code: string;

  /**
   * Two-character state, province, or territorial abbreviation.
   *
   * For the complete list, see <</core-api/kyc-verification#_valid_state_provincial_and_territorial_abbreviations, Valid state, provincial, and territorial abbreviations>>.
   */
  state: string;

  /** Unique identifier of the address. */
  token: string;

  /**
   * The unique identifier of the `user` account holder.
   * Required if `business_token` is not specified.
   */
  user_token?: string;

  /** Zip code of the funding source. */
  zip: string;
}

export interface IClearingModel {
  amount: number;
  card_acceptor?: ICardAcceptorModel;
  force_post?: boolean;
  is_refund?: boolean;
  mid?: string;
  network_fees?: INetworkFeeModel[];
  original_transaction_token: string;
  webhook?: IWebhook;
}

export interface ICommandoModeListResponse {
  /**
   * The number of Commando Mode control sets to retrieve.
   * @format int32
   */
  count?: number;

  /** An array of Commando Mode control set objects. */
  data?: ICommandoModeResponse[];

  /**
   * The sort order index of the last resource in the returned array.
   * @format int32
   */
  end_index?: number;

  /** A value of `true` indicates that more unreturned resources exist. */
  is_more?: boolean;

  /**
   * The sort order index of the first resource in the returned array.
   * @format int32
   */
  start_index?: number;
}

export interface ICommandoModeTransitionListResponse {
  /**
   * The number of Commando Mode control set transition objects to retrieve.
   * @format int32
   */
  count?: number;

  /** An array of Commando Mode control set transition objects. */
  data?: ICommandoModeTransitionResponse[];

  /**
   * The sort order index of the last resource in the returned array.
   * @format int32
   */
  end_index?: number;

  /** A value of `true` indicates that more unreturned resources exist. */
  is_more?: boolean;

  /**
   * The sort order index of the first resource in the returned array.
   * @format int32
   */
  start_index?: number;
}

export interface IDDARequest {
  dda: string;
}

export interface IDepositAccountUpdateRequest {
  allow_immediate_credit?: boolean;
}

/**
 * Contains information about a direct deposit.
 */
export interface IDepositDepositResponse {
  /** Amount being debited or credited. */
  amount?: number;

  /** The unique identifier of the `business` account holder. */
  business_token?: string;

  /** Company-specific data provided by the direct deposit originator. */
  company_discretionary_data?: string;

  /** Company-specific data provided by the direct deposit originator. */
  company_entry_description?: string;

  /** Alphanumeric code that identifies the direct deposit originator. */
  company_identification?: string;

  /** Name of the direct deposit originator. */
  company_name?: string;

  /**
   * Date and time when the direct deposit account was created.
   * @format date-time
   */
  created_time?: string;

  /** The unique identifier of the direct deposit account. */
  direct_deposit_account_token?: string;

  /** Accounting number by which the recipient is known to the direct deposit originator. */
  individual_identification_number?: string;

  /** Name of the direct deposit recipient. */
  individual_name?: string;

  /**
   * Date and time when the direct deposit account was last modified.
   * @format date-time
   */
  last_modified_time?: string;

  /**
   * Date and time when the credit or debit is applied.
   * @format date-time
   */
  settlement_date?: string;

  /** Three-letter code identifying the type of entry. */
  standard_entry_class_code?: string;

  /** Current status of the direct deposit record. */
  state?: 'PENDING' | 'APPLIED' | 'REVERSED' | 'REJECTED';

  /** Explanation for why the direct deposit record is in the current state. */
  state_reason?: string;

  /** Standard code describing the reason for the current state. */
  state_reason_code?: string;

  /** The unique identifier of the direct deposit record. */
  token?: string;

  /** Determines whether funds are being debited from or credited to the account. */
  type?: 'CREDIT' | 'DEBIT';

  /** The unique identifier of the `user` account holder. */
  user_token?: string;
}

export interface IDirectDepositAccountListResponse {
  /** @format int32 */
  count?: number;
  data?: IDirectDepositAccountResponse[];

  /** @format int32 */
  end_index?: number;
  is_more?: boolean;

  /** @format int32 */
  start_index?: number;
}

export interface IDirectDepositListResponse {
  /** @format int32 */
  count?: number;
  data?: IDepositDepositResponse[];

  /** @format int32 */
  end_index?: number;
  is_more?: boolean;

  /** @format int32 */
  start_index?: number;
}

export interface IDirectDepositRequest {
  account_number: string;
  amount: number;
  company_discretionary_data?: string;
  company_entry_description?: string;
  company_identification?: string;
  company_name?: string;
  earlyPayEligible?: boolean;
  individual_identification_number?: string;
  individual_name?: string;

  /** @format date-time */
  settlement_date: string;
  standard_entry_class_code?: string;
  token?: string;
  type: 'CREDIT' | 'DEBIT';
}

export interface IDirectDepositTransitionListResponse {
  /** @format int32 */
  count?: number;
  data?: IDirectDepositTransitionResponse[];

  /** @format int32 */
  end_index?: number;
  is_more?: boolean;

  /** @format int32 */
  start_index?: number;
}

export interface IDirectDepositTransitionRequest {
  channel: 'API' | 'SYSTEM' | 'PROD_SUPPORT';
  direct_deposit_token: string;
  idempotentHash?: string;
  reason: string;
  reason_code?:
    | 'R01'
    | 'R02'
    | 'R03'
    | 'R04'
    | 'R06'
    | 'R08'
    | 'R09'
    | 'R10'
    | 'R11'
    | 'R14'
    | 'R15'
    | 'R16'
    | 'R17'
    | 'R18'
    | 'R20'
    | 'R23'
    | 'R24'
    | 'R29';
  state: 'PENDING' | 'APPLIED' | 'REVERSED' | 'REJECTED';
  token?: string;
}

export interface IDirectDepositTransitionResponse {
  channel?:
    | 'API'
    | 'IVR'
    | 'FRAUD'
    | 'ADMIN'
    | 'SYSTEM'
    | 'NETWORK'
    | 'PROD_SUPPORT'
    | 'UNSUPPORTED';

  /** @format date-time */
  created_time?: string;
  direct_deposit_account_token?: string;
  direct_deposit_token?: string;
  reason?: string;
  reason_code?: string;
  state?: 'PENDING' | 'APPLIED' | 'REVERSED' | 'REJECTED';
  token?: string;
  transaction_token?: string;
  type?: string;
}

/**
 * Contains information about a disputed transaction.
 */
export interface IDisputeModel {
  /** The unique identifier of the dispute case. */
  case_management_identifier?: string;

  /** The reason for the dispute. */
  reason?: string;
}

export interface IFeeListResponse {
  /**
   * The number of resources to retrieve.
   * @format int32
   */
  count?: number;

  /** An array of `fees` objects. */
  data?: IFee[];

  /**
   * The sort order index of the last resource in the returned array.
   * @format int32
   */
  end_index?: number;

  /** A value of `true` indicates that more unreturned resources exist. */
  is_more?: boolean;

  /**
   * The sort order index of the first resource in the returned array.
   * @format int32
   */
  start_index?: number;
}

/**
 * Specifies a fulfillment shipping or return address.
 */
export interface IFulfillmentAddressResponse {
  /** Street address. */
  address1?: string;

  /** Additional address information. */
  address2?: string;

  /** City. */
  city?: string;

  /** Country. */
  country?: string;

  /** First name. */
  first_name?: string;

  /** Last name. */
  last_name?: string;

  /** Middle name. */
  middle_name?: string;

  /** Phone number. */
  phone?: string;

  /** Postal code. */
  postal_code?: string;

  /** State. */
  state?: string;

  /** ZIP code. */
  zip?: string;
}

/**
* Specifies certain physical characteristics of a card, as well as bulk shipment information.

This object is returned if it exists in the resource.
*/
export interface IFulfillmentResponse {
  /** Allows personalized attributes to be added to the card. */
  card_personalization: ICardPersonalization;

  /** Specifies shipping details for the card. */
  shipping?: IShippingInformationResponse;
}

export interface IFundingAccountListResponse {
  /**
   * The number of resources to retrieve.
   * @format int32
   */
  count?: number;

  /** An array of `funding_account_response_model` objects. */
  data?: IFundingAccountResponseModel[];

  /**
   * The sort order index of the last resource in the returned array.
   * @format int32
   */
  end_index?: number;

  /** A value of `true` indicates that more unreturned resources exist. */
  is_more?: boolean;

  /**
   * The sort order index of the first resource in the returned array.
   * @format int32
   */
  start_index?: number;
}

export interface IGPAUnloadListResponse {
  /**
   * The number of resources to retrieve.
   * @format int32
   */
  count?: number;

  /** An array of GPA unload order objects. */
  data?: IGpaReturns[];

  /**
   * The sort order index of the last resource in the returned array.
   * @format int32
   */
  end_index?: number;

  /** A value of `true` indicates that more unreturned resources exist. */
  is_more?: boolean;

  /**
   * The sort order index of the first resource in the returned array.
   * @format int32
   */
  start_index?: number;
}

/**
 * Contains forms of identification associated with the cardholder.
 */
export interface IIdentificationRequestModel {
  /** The expiration date for the form of identification, if applicable. */
  expiration_date?: string;

  /**
   * The form of identification.
   *
   * *NOTE:* Full SSN is required for KYC verification (US-based cardholders only).
   */
  type:
    | 'SSN'
    | 'TIN'
    | 'SIN'
    | 'NIN'
    | 'PASSPORT_NUMBER'
    | 'DRIVERS_LICENSE'
    | 'BUSINESS_NUMBER'
    | 'BUSINESS_TAX_ID'
    | 'TAXPAYER_REFERENCE';

  /** The identification number associated with the form of identification. */
  value?: string;
}

/**
 * Contains identifications associated with the cardholder.
 */
export interface IIdentificationResponseModel {
  /** The expiration date for the form of identification, if applicable. */
  expiration_date?: string;

  /** The form of identification. */
  type?:
    | 'SSN'
    | 'TIN'
    | 'SIN'
    | 'NIN'
    | 'PASSPORT_NUMBER'
    | 'DRIVERS_LICENSE'
    | 'BUSINESS_NUMBER'
    | 'BUSINESS_TAX_ID'
    | 'TAXPAYER_REFERENCE';

  /** The identification number associated with the form of identification. */
  value?: string;
}

export interface IImagesCarrier {
  /** Specifies a custom message that appears on the card carrier. */
  message_1?: string;

  /** Specifies a PNG image to display on the card carrier. */
  name?: string;
}

export interface IMCCGroupListResponse {
  /**
   * The number of resources to retrieve.
   * @format int32
   */
  count?: number;

  /** An array of objects in a returned resource. */
  data?: IMccGroupModel[];

  /**
   * The sort order index of the last resource in the returned array.
   * @format int32
   */
  end_index?: number;

  /** A value of `true` indicates that more unreturned resources exist. */
  is_more?: boolean;

  /**
   * The sort order index of the first resource in the returned array.
   * @format int32
   */
  start_index?: number;
}

export interface IMerchantGroupListResponse {
  /**
   * The number of resources retrieved.
   * @format int32
   */
  count?: number;

  /** An array of merchant group objects. */
  data?: IMerchantGroupResponse[];

  /**
   * The sort order index of the last resource in the returned array.
   * @format int32
   */
  end_index?: number;

  /** A value of `true` indicates that more unreturned resources exist. */
  is_more?: boolean;

  /**
   * The sort order index of the last resource in the returned array.
   * @format int32
   */
  start_index?: number;
}

export interface IPTCAddress {
  city: string;
  country?: string;
  county: string;
  line1: string;
  line2?: string;
  postal_code: string;
  state: string;
}

export interface IPTCPhone {
  country_code?: string;
  number: string;
}

export interface IPTCSoftDescriptor {
  address: IPTCAddress;
  email?: string;
  name: string;
  phone?: IPTCPhone;
}

/**
 * Describes the business' primary contact person.
 */
export interface IPrimaryContactInfoModel {
  /** Business department of the primary contact. */
  department?: string;

  /** Email address of the primary contact. */
  email?: string;

  /** Phone extension of the primary contact. */
  extension?: string;

  /** Fax number of the primary contact. */
  fax?: string;

  /** Full name of the primary contact. */
  full_name?: string;

  /** Mobile phone number of the primary contact. */
  mobile?: string;

  /** Phone number of the primary contact. */
  phone?: string;

  /** Title of the primary contact. */
  title?: string;
}

export interface IProgramReserveTransactionListResponse {
  /**
   * The number of resources to retrieve.
   * @format int32
   */
  count?: number;

  /** A list of program reserve transactions. */
  data?: IProgramReserveTransactionResponse[];

  /**
   * The sort order index of the last resource in the returned array.
   * @format int32
   */
  end_index?: number;

  /** A value of `true` indicates that more unreturned resources exist. */
  is_more?: boolean;

  /**
   * The sort order index of the first resource in the returned array.
   * @format int32
   */
  start_index?: number;
}

export interface IProgramTransferListResponse {
  /**
   * The number of program transfer resources to retrieve.
   * @format int32
   */
  count?: number;

  /** An array of program transfer objects. */
  data?: IProgramTransferResponse[];

  /**
   * The sort order index of the last resource in the returned array.
   * @format int32
   */
  end_index?: number;

  /** A value of `true` indicates that more unreturned resources exist. */
  is_more?: boolean;

  /**
   * The sort order index of the first resource in the returned array.
   * @format int32
   */
  start_index?: number;
}

export interface IProgramTransferTypeListResponse {
  /**
   * The number of program transfer resources to retrieve.
   * @format int32
   */
  count?: number;

  /** An array of program transfer types. */
  data?: IProgramTransferTypeReponse[];

  /**
   * The sort order index of the last resource in the returned array.
   * @format int32
   */
  end_index?: number;

  /** A value of `true` indicates that more unreturned resources exist. */
  is_more?: boolean;

  /**
   * The sort order index of the first resource in the returned array.
   * @format int32
   */
  start_index?: number;
}

export interface IPushToCardDisburseListResponse {
  /** @format int32 */
  count?: number;
  data?: IPushToCardDisbursementResponse[];

  /** @format int32 */
  end_index?: number;
  is_more?: boolean;

  /** @format int32 */
  start_index?: number;
}

export interface IPushToCardListResponse {
  /** @format int32 */
  count?: number;
  data?: IPushToCardResponse[];

  /** @format int32 */
  end_index?: number;
  is_more?: boolean;

  /** @format int32 */
  start_index?: number;
}

/**
 * Controls the assessment of real-time fees.
 */
export interface IRealTimeFeeAssessmentRequest {
  /** Enables fee assessments where the origin of the transaction acquirer is inside the US. */
  domestic_enabled?: boolean;

  /** Enables fee assessments where the origin of the transaction acquirer is outside the US. */
  international_enabled?: boolean;

  /** Indicates the type of transactions on which the fee is assessed. */
  transaction_type?: 'authorization' | 'pindebit.atm.withdrawal' | 'pindebit';
}

export interface IRealTimeFeeGroupListResponse {
  /**
   * The number of resources to retrieve.
   * @format int32
   */
  count?: number;

  /** An array of `real_time_fee_group` objects. */
  data?: IRealTimeFeeGroup[];

  /**
   * The sort order index of the last resource in the returned array.
   * @format int32
   */
  end_index?: number;

  /** A value of `true` indicates that more unreturned resources exist. */
  is_more?: boolean;

  /**
   * The sort order index of the first resource in the returned array.
   * @format int32
   */
  start_index?: number;
}

export interface IReversalModel {
  amount: number;

  /** @format int32 */
  find_original_window_days?: number;
  is_advice?: boolean;
  network_fees?: INetworkFeeModel[];
  original_transaction_token: string;
  webhook?: IWebhook;
}

/**
 * Specifies shipping details for the card.
 */
export interface IShippingInformationResponse {
  /** Person or entity to receive the card on behalf of the recipient. */
  care_of_line?: string;

  /** Shipping company and shipping service level. */
  method?:
    | 'LOCAL_MAIL'
    | 'LOCAL_MAIL_PACKAGE'
    | 'GROUND'
    | 'TWO_DAY'
    | 'OVERNIGHT'
    | 'INTERNATIONAL'
    | 'FEDEX_EXPEDITED'
    | 'FEDEX_REGULAR'
    | 'UPS_EXPEDITED'
    | 'UPS_REGULAR'
    | 'USPS_EXPEDITED'
    | 'USPS_REGULAR';

  /** Specifies a fulfillment shipping or return address. */
  recipient_address?: IFulfillmentAddressResponse;

  /** Specifies a fulfillment shipping or return address. */
  return_address?: IFulfillmentAddressResponse;
}

export interface ITransactionModelListResponse {
  /**
   * The number of resources to retrieve.
   * @format int32
   */
  count?: number;

  /** An array of transaction objects. */
  data?: ITransactionModel[];

  /**
   * The sort order index of the last resource in the returned array.
   * @format int32
   */
  end_index?: number;

  /** A value of `true` indicates that more unreturned resources exist. */
  is_more?: boolean;

  /**
   * The sort order index of the first resource in the returned array.
   * @format int32
   */
  start_index?: number;
}

export interface IUserCardHolderListResponse {
  /**
   * The number of `user` resources to retrieve.
   * @format int32
   */
  count?: number;

  /** An array of `user` objects. */
  data?: IUserCardHolderResponse[];

  /**
   * The sort order index of the first resource in the returned array.
   * @format int32
   */
  end_index?: number;

  /** A value of `true` indicates that more unreturned resources exist. */
  is_more?: boolean;

  /**
   * The sort order index of the first resource in the returned array.
   * @format int32
   */
  start_index?: number;
}

export interface IUserCardHolderUpdateModel {
  /**
   * Associates the specified account holder group with the cardholder.
   * Send a `GET` request to `/accountholdergroups` to retrieve account holder group tokens.
   */
  account_holder_group_token?: string;

  /** Specifies if the cardholder is in the `ACTIVE` state on the Marqeta platform. */
  active?: boolean;

  /**
   * Cardholder's address.
   *
   * *NOTE:* Required for KYC verification (US-based cardholders only).
   * Cannot perform KYC if set to a PO Box.
   */
  address1?: string;

  /**
   * Additional address information for the cardholder.
   *
   * *NOTE:* Cannot perform KYC if set to a PO Box.
   */
  address2?: string;

  /**
   * Cardholder's date of birth.
   *
   * *NOTE:* Required for KYC verification (US-based cardholders only).
   */
  birth_date?: string;

  /**
   * The city that corresponds to the address.
   *
   * *NOTE:* Required for KYC verification (US-based cardholders only).
   */
  city?: string;

  /** Company name. */
  company?: string;

  /** Specifies if the cardholder holds a corporate card. */
  corporate_card_holder?: boolean;

  /**
   * Country in which the cardholder resides.
   *
   * *NOTE:* Required for KYC verification (US-based cardholders only).
   */
  country?: string;

  /**
   * A valid email address for the cardholder.
   *
   * This value must be unique among cardholders.
   */
  email?: string;

  /**
   * Cardholder's first name.
   *
   * *NOTE:* Required for KYC verification (US-based cardholders only).
   */
  first_name?: string;

  /** Cardholder's gender. */
  gender?: 'F' | 'M';

  /** Cardholder's title or prefix: Ms., Mr., Miss, Mrs. */
  honorific?: string;

  /** The expiration date of the cardholder's identification card. */
  id_card_expiration_date?: string;

  /** Cardholder's identification card number. */
  id_card_number?: string;

  /** One or more objects containing identifications associated with the cardholder. */
  identifications?: IIdentificationRequestModel[];

  /** Cardholder's IP address. */
  ip_address?: string;

  /**
   * Cardholder's last name.
   *
   * *NOTE:* Required for KYC verification (US-based cardholders only).
   */
  last_name?: string;

  /** Associates any additional metadata you provide with the cardholder. */
  metadata?: Record<string, string>;

  /** Cardholder's middle name. */
  middle_name?: string;

  /** Cardholder's nationality. */
  nationality?: string;

  /** Any additional information pertaining to the cardholder. */
  notes?: string;

  /**
   * The unique identifier of a `user` or `business` resource already in the system.
   *
   * Required if `uses_parent_account = true`.
   * This account holder is configured as the parent of the current cardholder.
   */
  parent_token?: string;

  /** Expiration date of the cardholder's passport. */
  passport_expiration_date?: string;

  /** Cardholder's passport number. */
  passport_number?: string;

  /** Cardholder's `user` account password on the Marqeta platform. */
  password?: string;

  /**
   * Cardholder's telephone number (including area code), prepended by the `+` symbol and the 1- to 3-digit country calling code.
   * Do not include hyphens, spaces, or parentheses.
   */
  phone?: string;

  /**
   * Postal code of the cardholder's address.
   *
   * *NOTE:* Required for KYC verification (US-based cardholders only).
   */
  postal_code?: string;

  /** The cardholder's Social Security Number. */
  ssn?: string;

  /**
   * State in which the cardholder resides.
   *
   * *NOTE:* <</core-api/kyc-verification#_valid_state_provincial_and_territorial_abbreviations, Valid two-character abbreviation>> required for KYC verification (US-based cardholders only).
   */
  state?: string;

  /** The unique identifier of the cardholder. */
  token?: string;

  /**
   * Indicates whether the child shares balances with the parent (`true`), or the child's balances are independent of the parent (`false`).
   *
   * If set to `true`, you must also include a `parent_token` in the request.
   * This value cannot be updated.
   */
  uses_parent_account?: boolean;
}

export interface IUserTransitionListResponse {
  /**
   * The number of `user` resources retrieved.
   * @format int32
   */
  count?: number;

  /** An array of user transition objects. */
  data?: IUserTransitionResponse[];

  /**
   * The sort order index of the last resource in the returned array.
   * @format int32
   */
  end_index?: number;

  /** A value of `true` indicates that more unreturned resources exist. */
  is_more?: boolean;

  /**
   * The sort order index of the first resource in the returned array.
   * @format int32
   */
  start_index?: number;
}

export interface IUserTransitionRequest {
  /** The mechanism by which the transaction was initiated. */
  channel: 'API' | 'IVR' | 'FRAUD' | 'ADMIN' | 'SYSTEM';

  /** Additional information about the status change. */
  reason?: string;

  /**
   * Identifies the standardized reason for the transition:
   * *00:* Object activated for the first time.
   * *01:* Requested by you.
   * *02:* Inactivity over time.
   * *03:* This address cannot accept mail or the addressee is unknown.
   * *04:* Negative account balance.
   * *05:* Account under review.
   * *06:* Suspicious activity was identified.
   * *07:* Activity outside the program parameters was identified.
   * *08:* Confirmed fraud was identified.
   * *09:* Matched with an Office of Foreign Assets Control list.
   * *10:* Card was reported lost.
   * *11:* Card information was cloned.
   * *12:* Account or card information was compromised.
   * *13:* Temporary status change while on hold/leave.
   * *14:* Initiated by Marqeta.
   * *15:* Initiated by issuer.
   * *16:* Card expired.
   * *17:* Failed KYC.
   * *18:* Changed to `ACTIVE` because information was properly validated.
   * *19:* Changed to `ACTIVE` because account activity was properly validated.
   * *20:* Change occurred prior to the normalization of reason codes.
   * *21:* Initiated by a third party, often a digital wallet provider.
   * *22:* PIN retry limit reached.
   * *23:* Card was reported stolen.
   * *24:* Address issue.
   * *25:* Name issue.
   * *26:* SSN issue.
   * *27:* DOB issue.
   * *28:* Email issue.
   * *29:* Phone issue.
   * *30:* Account/fulfillment mismatch.
   * *31:* Other reason.
   */
  reason_code:
    | '00'
    | '01'
    | '02'
    | '03'
    | '04'
    | '05'
    | '06'
    | '07'
    | '08'
    | '09'
    | '10'
    | '11'
    | '12'
    | '13'
    | '14'
    | '15'
    | '16'
    | '17'
    | '18'
    | '19'
    | '20'
    | '21'
    | '22'
    | '23'
    | '24'
    | '25'
    | '26'
    | '27'
    | '28'
    | '29'
    | '30'
    | '31';

  /** Specifies the new status of the user. */
  status: 'UNVERIFIED' | 'LIMITED' | 'ACTIVE' | 'SUSPENDED' | 'CLOSED';

  /**
   * The unique identifier of the user transition.
   *
   * If you do not include a token, the system generates one automatically.
   * This token is referenced in other API calls, so we recommend that you define a simple string that is easy to remember.
   * This value cannot be updated.
   */
  token?: string;

  /** The unique identifier of the user whose status is transitioned. */
  user_token: string;
}

export interface IUserTransitionResponse {
  /** The mechanism by which the transaction was initiated. */
  channel: 'API' | 'IVR' | 'FRAUD' | 'ADMIN' | 'SYSTEM';

  /**
   * The date and time when the resource was created, in UTC.
   * @format date-time
   */
  created_time?: string;

  /**
   * The date and time when the resource was last modified, in UTC.
   * @format date-time
   */
  last_modified_time?: string;

  /** Additional information about the status change. */
  reason?: string;

  /**
   * Identifies the standardized reason for the transition:
   * *00:* Object activated for the first time.
   * *01:* Requested by you.
   * *02:* Inactivity over time.
   * *03:* This address cannot accept mail or the addressee is unknown.
   * *04:* Negative account balance.
   * *05:* Account under review.
   * *06:* Suspicious activity was identified.
   * *07:* Activity outside the program parameters was identified.
   * *08:* Confirmed fraud was identified.
   * *09:* Matched with an Office of Foreign Assets Control list.
   * *10:* Card was reported lost.
   * *11:* Card information was cloned.
   * *12:* Account or card information was compromised.
   * *13:* Temporary status change while on hold/leave.
   * *14:* Initiated by Marqeta.
   * *15:* Initiated by issuer.
   * *16:* Card expired.
   * *17:* Failed KYC.
   * *18:* Changed to `ACTIVE` because information was properly validated.
   * *19:* Changed to `ACTIVE` because account activity was properly validated.
   * *20:* Change occurred prior to the normalization of reason codes.
   * *21:* Initiated by a third party, often a digital wallet provider.
   * *22:* PIN retry limit reached.
   * *23:* Card was reported stolen.
   * *24:* Address issue.
   * *25:* Name issue.
   * *26:* SSN issue.
   * *27:* DOB issue.
   * *28:* Email issue.
   * *29:* Phone issue.
   * *30:* Account/fulfillment mismatch.
   * *31:* Other reason.
   */
  reason_code:
    | '00'
    | '01'
    | '02'
    | '03'
    | '04'
    | '05'
    | '06'
    | '07'
    | '08'
    | '09'
    | '10'
    | '11'
    | '12'
    | '13'
    | '14'
    | '15'
    | '16'
    | '17'
    | '18'
    | '19'
    | '20'
    | '21'
    | '22'
    | '23'
    | '24'
    | '25'
    | '26'
    | '27'
    | '28'
    | '29'
    | '30'
    | '31';

  /** Specifies the new status of the user. */
  status: 'UNVERIFIED' | 'LIMITED' | 'ACTIVE' | 'SUSPENDED' | 'CLOSED';

  /** The unique identifier of the user transition. */
  token: string;

  /** The unique identifier of the user whose status is transitioned. */
  user_token?: string;
}

/**
 * Contains information about the user.
 */
export interface IUserValidationRequest {
  /**
   * The birth date of the user associated with this card.
   * @format date-time
   */
  birth_date?: string;

  /** The telephone number of the user associated with this card. */
  phone?: string;

  /**
   * A random six-digit numeric postfix generated for some bulk card orders.
   *
   * See <</core-api/bulk-card-orders, Bulk Card Orders>> for more information about numeric postfixes.
   */
  random_name_line1_postfix?: string;

  /** The Social Security number of the user associated with this card. */
  ssn?: string;
}

/**
 * Contains information about the user.
 */
export interface IUserValidationResponse {
  /** Indicates whether the `birth_date` field in the request was validated. */
  birth_date: boolean;

  /** Indicates whether the `phone` field in the request was validated. */
  phone: boolean;

  /** Indicates whether the `random_name_line1_postfix` field in the request was validated. */
  random_name_line1_postfix: boolean;

  /** Indicates whether the `ssn` field in the request was validated. */
  ssn: boolean;
}

/**
 * Contains information about the user.
 */
export interface IValidationsRequest {
  /** Contains information about the user. */
  user?: IUserValidationRequest;
}

/**
 * Contains information about the user.
 */
export interface IValidationsResponse {
  /** Contains information about the user. */
  user: IUserValidationResponse;
}

export interface IVelocityControlBalanceListResponse {
  /**
   * The number of velocity control resources retrieved.
   * @format int32
   */
  count?: number;

  /** An array of velocity control resources that include available balances. */
  data?: IVelocityControlBalanceResponse[];

  /**
   * The sort order index of the last resource in the returned array.
   * @format int32
   */
  end_index?: number;

  /** A value of `true` indicates that more unreturned resources exist. */
  is_more?: boolean;

  /**
   * The sort order index of the last resource in the returned array.
   * @format int32
   */
  start_index?: number;
}

export interface IVelocityControlListResponse {
  /**
   * The number of velocity control resources retrieved.
   * @format int32
   */
  count?: number;

  /** An array of velocity control resources. */
  data?: IVelocityControlResponse[];

  /**
   * The sort order index of the last resource in the returned array.
   * @format int32
   */
  end_index?: number;

  /** A value of `true` indicates that more unreturned resources exist. */
  is_more?: boolean;

  /**
   * The sort order index of the last resource in the returned array.
   * @format int32
   */
  start_index?: number;
}

export interface IWebhookResponseModelListResponse {
  /**
   * The number of resources to retrieve.
   * @format int32
   */
  count?: number;

  /** An array of webhooks. */
  data?: IWebhookResponseModel[];

  /**
   * The sort order index of the last resource in the returned array.
   * @format int32
   */
  end_index?: number;

  /** A value of `true` indicates that more unreturned resources exist. */
  is_more?: boolean;

  /**
   * The sort order index of the first resource in the returned array.
   * @format int32
   */
  start_index?: number;
}

export interface IWebhookUpdateCustomHeaderRequest {
  /** Custom headers to be passed along with the request. */
  custom_header?: Record<string, string>;
}

export interface IAcceptedCountriesModel {
  /** A comma-delimited list of accepted countries by ISO 3166 three-digit country code. */
  country_codes: string[];

  /**
   * The time when the `acceptedcountries` object was created, in UTC.
   * This field is returned when included in your query.
   * @format date-time
   */
  created_time?: string;

  /**
   * Specifies if the list of accepted countries in this object is an allow list.
   * If set to `true`, transactions are accepted for all countries included in the object's `country_codes` array.
   * If set to `false`, transactions are prohibited for all countries included in the object's `country_codes` array.
   */
  is_whitelist: boolean;

  /**
   * The time when the `acceptedcountries` object was last updated, in UTC.
   * This field is returned when included in your query.
   * @format date-time
   */
  last_modified_time?: string;

  /** The name of the `acceptedcountries` object. */
  name: string;

  /** The unique identifier of the `acceptedcountries` object. */
  token?: string;
}

/**
 * Contains a cardholder's login access information.
 */
export interface IAccessTokenResponse {
  /** Contains client application information. */
  application?: IApplication;

  /**
   * The date and time when the access token expires.
   * @format date-time
   */
  expires: string;

  /** An array of master roles. */
  master_roles?: string[];

  /** Indicates whether the access token is a single-use token. */
  one_time?: boolean;

  /** The access token. */
  token?: string;

  /** Specifies the type of access token. */
  token_type?: string;

  /** The unique identifier of the `user` resource. */
  user_token?: string;
}

/**
 * Contains information related to the cardholder and provided by the digital wallet provider.
 */
export interface IAccount {
  /** Digital wallet provider's email address for the cardholder. */
  email_address?: string;

  /** Digital wallet provider's identity number for the cardholder. */
  id?: string;

  /** Score from the digital wallet provider. */
  score?: string;
}

export interface IAccountFunding {
  funding_source?:
    | 'CREDIT'
    | 'DEBIT'
    | 'PREPAID'
    | 'DEPOSIT_ACCOUNT'
    | 'CASH'
    | 'MOBILE_MONEY_ACCOUNT'
    | 'NON_VISA_CREDIT';
  receiver_account_type?:
    | 'OTHER'
    | 'RTN_BANK_ACCOUNT'
    | 'IBAN'
    | 'CARD_ACCOUNT'
    | 'EMAIL'
    | 'PHONE_NUMBER'
    | 'BANK_ACCOUNT_NUMBER_AND_BANK_IDENTIFICATION_CODE'
    | 'WALLET_ID'
    | 'SOCIAL_NETWORK_ID';
  receiver_name?: string;
  screening_score?: string;
  transaction_type?:
    | 'ACCOUNT_TO_ACCOUNT'
    | 'PERSON_TO_PERSON'
    | 'WALLET_TRANSFER'
    | 'MONEY_TRANSFER_BY_BANK'
    | 'BUSINESS_TO_BUSINESS'
    | 'DISBURSEMENT'
    | 'GOVERNMENT_DISBURSEMENT'
    | 'GAMBLING_PAYOUT'
    | 'LOYALTY'
    | 'MERCHANT_DISBURSEMENT'
    | 'ONLINE_GAMBLING_PAYOUT'
    | 'PENSION_DISBURSEMENT'
    | 'PREPAID_LOADS'
    | 'CARD_BILL_PAYMENT'
    | 'BILL_PAYMENT'
    | 'CASH_CLAIM'
    | 'CASH_IN'
    | 'CASH_OUT'
    | 'MOBILE_AIR_TIME_PAYMENT'
    | 'MONEY_TRANSFER_BY_MERCHANT'
    | 'FACE_TO_FACE_MERCHANT_PAYMENT'
    | 'GOVERNMENT_PAYMENT'
    | 'PAYMENTS_GOODS_SERVICES'
    | 'FUNDS_TRANSFER'
    | 'GENERAL_BUSINESS_TO_BUSINESS_TRANSFER'
    | 'CASH_DEPOSIT';
}

/**
 * Contains configuration fields for the account holder group.
 */
export interface IAccountHolderGroupConfig {
  /**
   * If set to `false`, this control prohibits an account holder's account from being reloaded with funds after the initial load.
   *
   * This restriction applies to GPA orders, peer transfers, direct deposits, but does not apply to operator adjustments.
   */
  is_reloadable?: boolean;

  /** If set to `ALWAYS`, new account holders are created in an `UNVERIFIED` status and must pass identity verification (KYC) before they can be active; set to `CONDITIONAL`, new account holders begin in a `LIMITED` status and have limited actions available before passing identity verification; set to `NEVER`, new account holders are created in an active state. */
  kyc_required?: 'ALWAYS' | 'CONDITIONAL' | 'NEVER';

  /**
   * Contains configuration fields for a number of controls.
   *
   * *NOTE:* These controls are in effect only if `kyc_required` is `CONDITIONAL` and the account holder has not yet passed KYC.
   */
  pre_kyc_controls?: IPreKycControls;

  /** Associates the specified real-time fee group with the members of the account holder group. */
  real_time_fee_group_token?: string;
}

export interface IAccountHolderGroupRequest {
  /** Contains configuration fields for the account holder group. */
  config?: IAccountHolderGroupConfig;

  /** Descriptive name for the account holder group. */
  name?: string;

  /**
   * The unique identifier of the account holder group.
   *
   * If you do not include a token, the system will generate one automatically.
   * This token is necessary for use in other calls, so we recommend that rather than let the system generate one, you use a simple string that is easy to remember.
   * This value cannot be updated.
   */
  token?: string;
}

export interface IAccountHolderGroupResponse {
  /** Contains configuration fields for the account holder group. */
  config?: IAccountHolderGroupConfig;

  /** Descriptive name for the account holder group. */
  name?: string;

  /** The unique identifier of the account holder group. */
  token?: string;
}

export interface IAccountHolderGroupUpdateRequest {
  /** Contains configuration fields for the account holder group. */
  config?: IAccountHolderGroupConfig;

  /** Descriptive name for the account holder group. */
  name?: string;
}

export interface IAchModel {
  /** The ACH account number. */
  account_number: string;

  /** The type of account. */
  account_type: 'checking' | 'savings' | 'corporate' | 'loan';

  /** The name of the financial institution where the ACH account is held. */
  bank_name?: string;

  /**
   * The unique identifier of the `business` account holder.
   * This token is required if a `user_token` is not specified.
   */
  business_token?: string;

  /**
   * If there are multiple funding sources, this field specifies which source is used by default in funding calls.
   * If there is only one funding source, the system ignores this field and always uses that source.
   */
  is_default_account?: boolean;

  /** The name on the ACH account. */
  name_on_account: string;

  /** The routing number for the ACH account. */
  routing_number: string;

  /**
   * The unique identifier of the funding source.
   * If you do not include a token, the system will generate one automatically.
   * This token is necessary for use in other calls, so we recommend that rather than let the system generate one, you use a simple string that is easy to remember.
   * This value cannot be updated.
   */
  token?: string;

  /**
   * The unique identifier of the `user` account holder.
   * This token is required if a `business_token` is not specified.
   */
  user_token?: string;

  /**
   * Free-form text field for holding notes about verification.
   * This field is returned only if `verification_override = true`.
   */
  verification_notes?: string;

  /** Allows the ACH funding source to be used regardless of its verification status. */
  verification_override?: boolean;
}

export interface IAchResponseModel {
  /** The ACH account identifier appended to the bank account number. */
  account_suffix: string;

  /** The type of account. */
  account_type: string;

  /** Specifies whether the account is active. */
  active: boolean;

  /**
   * The name of the bank holding the account.
   * This field is returned if it exists in the resource.
   */
  bank_name?: string;

  /**
   * The unique identifier of the `business` account holder.
   * This token is returned if a `user_token` is not specified.
   */
  business_token?: string;

  /**
   * The date and time when the resource was created, in UTC.
   * `2022-02-26T20:03:05Z`, for example.
   * @format date-time
   */
  created_time: string;

  /**
   * The date and time when the account was sent for verification, in UTC.
   * `2022-02-26T20:03:05Z`, for example.
   *
   * This field is returned if it exists in the resource.
   * @format date-time
   */
  date_sent_for_verification?: string;

  /**
   * The date and time when the account was verified, in UTC.
   * `2022-02-26T20:03:05Z`, for example.
   *
   * This field is returned if it exists in the resource.
   * @format date-time
   */
  date_verified?: string;

  /**
   * If there are multiple funding sources, this field specifies which source is used by default in funding calls.
   * If there is only one funding source, the system ignores this field and always uses that source.
   *
   * This field is returned if it exists in the resource.
   */
  is_default_account?: boolean;

  /**
   * The date and time when the resource was last modified, in UTC.
   * `2022-02-26T20:03:05Z`, for example.
   * @format date-time
   */
  last_modified_time: string;

  /** The name on the ACH account. */
  name_on_account: string;
  partner?: string;
  partner_account_link_reference_token?: string;

  /** The unique identifier of the funding source. */
  token: string;

  /**
   * The unique identifier of the `user` account holder.
   * This token is returned if a `business_token` is not specified.
   */
  user_token?: string;

  /**
   * Free-form text field for holding notes about verification.
   * This field is returned only if `verification_override = true`.
   */
  verification_notes?: string;

  /**
   * Allows the ACH funding source to be used regardless of its verification status.
   * This field is returned if it exists in the resource.
   */
  verification_override?: boolean;

  /**
   * The account verification status.
   * This field is returned if it exists in the resource.
   */
  verification_status?: string;
}

export interface IAchVerificationModel {
  /** Indicates whether the ACH funding source is active. */
  active?: boolean;

  /** Verification amount. */
  verify_amount1?: number;

  /** Verification amount. */
  verify_amount2?: number;
}

/**
 * Contains information about the merchant's financial institution.
 */
export interface IAcquirer {
  /** Country code of the merchant's financial institution. */
  institution_country?: string;

  /** Identifier code of the merchant's financial institution. */
  institution_id_code?: string;

  /** The international network identifier. */
  network_international_id?: string;

  /** Retrieval reference number of the merchant's financial institution. */
  retrieval_reference_number?: string;

  /** System trace audit number of the merchant's financial institution. */
  system_trace_audit_number?: string;
}

/**
 * Defines actions to execute when the card is activated.
 */
export interface IActivationActions {
  /**
   * Moves all digital wallet tokens from the specified card to the new card.
   *
   * Not relevant when `reissue_pan_from_card_token` is set.
   */
  swap_digital_wallet_tokens_from_card_token?: string;

  /** Whether or not the source card from which the card was reissued should be terminated. */
  terminate_reissued_source_card?: boolean;
}

/**
 * Contains address verification information.
 */
export interface IAddressVerification {
  /** The name of the cardholder. */
  name?: string;

  /** Postal code. */
  postal_code?: string;

  /** Street address provided by the cardholder. */
  street_address?: string;

  /** ZIP code. */
  zip?: string;
}

/**
 * Contains address verification data consisting of address data entered by the cardholder, address data held by the Marqeta platform, and an assertion by the Marqeta platform as to whether the two sets of data match.
 */
export interface IAddressVerificationModel {
  /** Contains address verification information provided by the cardholder or held on file by Marqeta. */
  on_file?: IAvsInformation;

  /** Contains address verification information provided by the cardholder or held on file by Marqeta. */
  request?: IAvsInformation;

  /** Contains information about the response, including the response code and response memo. */
  response?: IResponse;
}

/**
 * Contains address verification data consisting of address data entered by the cardholder, address data held by the Marqeta platform, and an assertion by the Marqeta platform as to whether the two sets of data match.
 */
export interface IAddressVerificationSource {
  /** Contains address verification information provided by the cardholder or held on file by Marqeta. */
  on_file?: IAvsInformation;

  /** Contains information about the response, including the response code and response memo. */
  response?: IResponse;
}

/**
 * Contains information about airline-related transactions.
 */
export interface IAirline {
  /**
   * The date and time of departure.
   * @format date-time
   */
  depart_date?: string;

  /** The city where the flight originates. */
  origination_city?: string;

  /** The name of the passenger. */
  passenger_name?: string;
}

export interface IAuthControlExemptMidsRequest {
  /** Defines the group of users to which the velocity control applies. */
  association?: ISpendControlAssociation;

  /**
   * The date and time when the exception ends, in UTC.
   * `2021-10-26T20:03:05Z`, for example.
   * @format date-time
   */
  end_time?: string;

  /**
   * The token of the merchant group to be exempted.
   * This field is required if there is no entry in the `mid` field.
   * Pass either this field or the `mid` field, not both.
   */
  merchant_group_token?: string;

  /**
   * The merchant to be exempted.
   * This field is required if there is no entry in the `merchant_group_token` field.
   * Use either this field or the `merchant_group_token` field, not both.
   */
  mid?: string;

  /** The name of the merchant identifier authorization control exemption. */
  name: string;

  /**
   * The date and time when the exception starts, in UTC.
   * `2020-10-26T20:03:05Z`, for example.
   * @format date-time
   */
  start_time?: string;

  /**
   * The unique identifier of the merchant identifier authorization control exemption.
   *
   * If you do not include a token, the system will generate one automatically.
   * This token is necessary for use in other API calls, so we recommend that rather than let the system generate one, you use a simple string that is easy to remember.
   * This value cannot be updated.
   */
  token?: string;
}

export interface IAuthControlExemptMidsResponse {
  /** Indicates whether the merchant identifier authorization control exception is active. */
  active?: boolean;

  /** Defines the group of users to which the velocity control applies. */
  association?: ISpendControlAssociation;

  /**
   * The date and time when the resource was created, in UTC.
   * `2020-10-26T20:03:05Z`, for example.
   * @format date-time
   */
  created?: string;

  /**
   * The date and time when the exception ends, in UTC.
   * `2021-10-26T20:03:05Z`, for example.
   * @format date-time
   */
  end_time?: string;

  /**
   * The date and time when the resource was last updated, in UTC.
   * `2020-10-26T20:03:15Z`, for example.
   * @format date-time
   */
  last_updated?: string;

  /**
   * The token of the merchant group to be exempted.
   * This field is required if there is no entry in the `mid` field.
   * Pass either this field or the `mid` field, not both.
   */
  merchant_group_token?: string;

  /**
   * The merchant to be exempted.
   * This field is required if there is no entry in the `merchant_group_token` field.
   * Use either this field or the `merchant_group_token` field, not both.
   */
  mid?: string;

  /** The name of the merchant identifier authorization control exemption. */
  name: string;

  /**
   * The date and time when the exception starts, in UTC.
   * `2020-10-26T20:03:05Z`, for example.
   * @format date-time
   */
  start_time?: string;

  /** The unique identifier of the merchant identifier authorization control exemption. */
  token?: string;
}

export interface IAuthControlExemptMidsUpdateRequest {
  /** Indicates whether the merchant identifier authorization control exception is active. */
  active?: boolean;
}

export interface IAuthControlRequest {
  /**
   * Indicates whether the authorization control is active.
   * If the control will be used for Commando Mode, set to `false` and then enable it using `commando_mode_enables`.
   * See <</core-api/commando-mode#_update_commando_mode_control_set, Update Commando Mode control set>>.
   */
  active?: boolean;

  /** Defines the group of users to which the velocity control applies. */
  association?: ISpendControlAssociation;

  /**
   * The date and time when the exception ends.
   * @format date-time
   */
  end_time?: string;

  /**
   * Defines the group of merchants to which the velocity control applies.
   *
   * Populate no more than one field of the `merchant_scope` object.
   * If no fields are populated, the velocity control applies to all merchants.
   */
  merchant_scope?: IMerchantScope;

  /** The name of the authorization control. */
  name: string;

  /**
   * The date and time when the exception goes into effect.
   * @format date-time
   */
  start_time?: string;

  /**
   * The unique identifier of the authorization control.
   *
   * If you do not include a token, the system will generate one automatically.
   * This token is necessary for use in other API calls, so we recommend that rather than let the system generate one, you use a simple string that is easy to remember.
   * This value cannot be updated.
   */
  token?: string;
}

export interface IAuthControlResponse {
  /**
   * Indicates whether the authorization control is active.
   * If the control will be used for Commando Mode, set to `false` and then enable it using `commando_mode_enables`.
   * See <</core-api/commando-mode#_update_commando_mode_control_set, Update Commando Mode control set>>.
   */
  active?: boolean;

  /** Defines the group of users to which the velocity control applies. */
  association?: ISpendControlAssociation;

  /**
   * The date and time when the exception ends.
   * @format date-time
   */
  end_time?: string;

  /**
   * Defines the group of merchants to which the velocity control applies.
   *
   * Populate no more than one field of the `merchant_scope` object.
   * If no fields are populated, the velocity control applies to all merchants.
   */
  merchant_scope?: IMerchantScope;

  /** The name of the authorization control. */
  name: string;

  /**
   * The date and time when the exception goes into effect.
   * @format date-time
   */
  start_time?: string;

  /**
   * The unique identifier of the authorization control.
   *
   * If you do not include a token, the system will generate one automatically.
   * This token is necessary for use in other API calls, so we recommend that rather than let the system generate one, you use a simple string that is easy to remember.
   * This value cannot be updated.
   */
  token?: string;
}

export interface IAuthControlUpdateRequest {
  /** Indicates whether the authorization control is active. */
  active?: boolean;

  /** Defines the group of users to which the velocity control applies. */
  association?: ISpendControlAssociation;

  /**
   * The date and time when the exception ends.
   * @format date-time
   */
  end_time?: string;

  /**
   * Defines the group of merchants to which the velocity control applies.
   *
   * Populate no more than one field of the `merchant_scope` object.
   * If no fields are populated, the velocity control applies to all merchants.
   */
  merchant_scope?: IMerchantScope;

  /** The name of the authorization control. */
  name?: string;

  /**
   * The date and time when the exception goes into effect.
   * @format date-time
   */
  start_time?: string;
  token: string;
}

export interface IAuthRequestModel {
  amount: number;
  card_acceptor?: ICardAcceptorModel;
  card_options?: ICardOptions;
  card_token: string;
  cash_back_amount?: number;
  is_pre_auth?: boolean;
  mid: string;
  network_fees?: INetworkFeeModel[];
  pin?: string;
  transaction_options?: ITransactionOptions;
  webhook?: IWebhook;
}

export interface IAuthorizationAdviceModel {
  amount: number;
  network_fees?: INetworkFeeModel[];
  original_transaction_token: string;
  transaction_options?: ITransactionOptions;
  webhook?: IWebhook;
}

/**
* Controls the expiration of authorizations and automatic increases to the authorization amount for MCCs specified in this group.

By default, these authorization controls apply program-wide, meaning that they apply to every card in your program. 
You can, however, exempt cards associated with any particular card product by setting that card product's `allow_mcc_group_authorization_controls` field to `false`.
*/
export interface IAuthorizationControls {
  /**
   * Specifies the number of days after which an authorization associated with this group expires.
   * @format int32
   */
  hold_expiration_days?: number;

  /** Controls automatic increases to the authorization amount for MCCs specified in this group. */
  hold_increase?: IHoldIncrease;
}

/**
* Contains the scope of the auto reload: card product, user, or business. 

If no value is supplied, the auto reload applies at the program level.
*/
export interface IAutoReloadAssociation {
  /** Unique identifier of the associated business. */
  business_token?: string;

  /** Unique identifier of the associated card product. */
  card_product_token?: string;

  /** Unique identifier of the associated user. */
  user_token?: string;
}

/**
* Contains information about an auto reload. 
See <</core-api/auto-reload,Auto Reloads>> for more information.

Returned if an auto reload was executed.
*/
export interface IAutoReloadModel {
  /**
   * Whether the auto reload is active.
   *
   * Only one auto reload per level, per object, can be active.
   */
  active?: boolean;

  /**
   * Contains the scope of the auto reload: card product, user, or business.
   *
   * If no value is supplied, the auto reload applies at the program level.
   */
  association?: IAutoReloadAssociation;

  /** Currency of the funds used in the auto reload. */
  currency_code: string;

  /**
   * Unique identifier of the associated funding source address used for the auto reload.
   *
   * Returned when the funding source is a payment card.
   */
  funding_source_address_token?: string;

  /**
   * Unique identifier of the associated funding source used for the auto reload.
   *
   * Returned when `order_scope` contains the `gpa` object.
   */
  funding_source_token?: string;

  /** Defines the balance threshold and reload amounts. */
  order_scope: IOrderScope;

  /** Unique identifier of the auto reload. */
  token?: string;
}

export interface IAutoReloadResponseModel {
  /**
   * Specifies whether the auto reload is active.
   *
   * Only one auto reload per level, per object, can be active.
   */
  active?: boolean;

  /**
   * Contains the scope of the auto reload: card product, user, or business.
   *
   * If no value is supplied, the auto reload applies at the program level.
   */
  association?: IAutoReloadAssociation;

  /**
   * The date and time when the auto reload object was created, in UTC.
   * `2021-10-26T20:03:05Z`, for example.
   * @format date-time
   */
  created_time: string;

  /** The three-digit ISO 4217 currency code. */
  currency_code: string;

  /**
   * The unique identifier of the funding source address to use for this auto reload.
   *
   * If your funding source is an ACH account, then a `funding_source_address_token` is not required.
   * If your funding source is a payment card, you must have at least one funding source address in order to create a GPA order.
   */
  funding_source_address_token?: string;

  /** The unique identifier of the funding source to use for this auto reload. */
  funding_source_token?: string;

  /**
   * The date and time when the auto reload object was last modified, in UTC.
   * `2021-10-26T20:03:10Z`, for example.
   * @format date-time
   */
  last_modified_time: string;

  /** Defines the balance threshold and reload amounts. */
  order_scope: IOrderScope;

  /** The unique identifier of the auto reload. */
  token?: string;
}

export interface IAutoReloadUpdateModel {
  /**
   * Specifies whether the auto reload is active.
   *
   * Only one auto reload per level, per object, can be active.
   */
  active?: boolean;

  /**
   * Contains the scope of the auto reload: card product, user, or business.
   *
   * If no value is supplied, the auto reload applies at the program level.
   */
  association?: IAutoReloadAssociation;

  /** The three-digit ISO 4217 currency code. */
  currency_code?: string;

  /**
   * The unique identifier of the funding source address to use for this auto reload.
   *
   * If your funding source is an ACH account, then a `funding_source_address_token` is not required.
   * If your funding source is a payment card, you must have at least one funding source address in order to create a GPA order.
   */
  funding_source_address_token?: string;

  /** The unique identifier of the funding source to use for this auto reload. */
  funding_source_token?: string;

  /** Defines the balance threshold and reload amounts. */
  order_scope?: IOrderScope;

  /** The token in the path parameter takes precedence over the token body field. */
  token?: string;
}

/**
 * Specifies the available balances of the velocity controls associated with a user.
 */
export interface IAvailable {
  /**
   * The total amount of spend remaining in the velocity control.
   * @min 0
   */
  amount: number;

  /**
   * The number of days remaining in the velocity control time window.
   * @format int32
   */
  days_remaining?: number;

  /**
   * The number of uses remaining in the velocity control.
   * @format int32
   */
  uses: number;
}

export interface IAvsControlOptions {
  /**
   * Set to `true` to decline account verification or authorization messages whose address number does not match the address number on file.
   *
   * Set to `false` to not decline account verification or authorization messages whose address number does not match the address number on file.
   * This field is functional only if `validate = true`.
   */
  decline_on_address_number_mismatch?: boolean;

  /**
   * Set to `true` to decline account verification or authorization messages whose postal code does not match the postal code on file.
   *
   * Set to `false` to not decline account verification or authorization messages whose postal code does not match the postal code on file.
   * This field is functional only if `validate = true`.
   */
  decline_on_postal_code_mismatch?: boolean;

  /**
   * Set to `true` to require validation of account verification or authorization messages.
   *
   * Set to `false` to forgo validation and approve all account verification and authorization messages.
   */
  validate?: boolean;
}

export interface IAvsControls {
  auth_messages?: IAvsControlOptions;
  av_messages?: IAvsControlOptions;
}

/**
 * Contains address verification information provided by the cardholder or held on file by Marqeta.
 */
export interface IAvsInformation {
  /** Postal code provided by the Marqeta platform. */
  postal_code?: string;

  /** Street address provided by the cardholder. */
  street_address?: string;

  /** ZIP code provided by the cardholder. */
  zip?: string;
}

export interface IBalanceInquiryRequestModel {
  account_type: 'checking' | 'savings' | 'credit';
  card_acceptor: ICardAcceptorModel;
  card_token: string;
  mid: string;
  network_fees?: INetworkFeeModel[];
  pin?: string;
  webhook?: IWebhook;
}

export interface IBaseAchRequestModel {
  /** The ACH account number. */
  account_number: string;

  /** The type of account. */
  account_type: 'checking' | 'savings' | 'corporate' | 'loan';

  /** The name of the bank holding the account. */
  bank_name?: string;

  /**
   * If there are multiple funding sources, this field specifies which source is used by default in funding calls.
   * If there is only one funding source, the system ignores this field and always uses that source.
   */
  is_default_account?: boolean;

  /** The name on the ACH account. */
  name_on_account: string;

  /** The routing number for the ACH account. */
  routing_number: string;

  /**
   * The unique identifier of the funding source.
   * If you do not include a token, the system will generate one automatically.
   * This token is necessary for use in other calls, so we recommend that rather than let the system generate one, you use a simple string that is easy to remember.
   * This value cannot be updated.
   */
  token?: string;

  /**
   * Free-form text field for holding notes about verification.
   * This field is returned only if `verification_override = true`.
   */
  verification_notes?: string;

  /** Allows the ACH funding source to be used regardless of its verification status. */
  verification_override?: boolean;
}

export interface IBaseAchResponseModel {
  /** The ACH account identifier appended to the bank account number. */
  account_suffix: string;

  /** The type of account. */
  account_type: string;

  /** Specifies whether the account is active. */
  active: boolean;

  /**
   * The name of the bank holding the account.
   * This field is returned if it exists in the resource.
   */
  bank_name?: string;

  /**
   * The date and time when the resource was created, in UTC.
   * `2022-02-26T20:03:05Z`, for example.
   * @format date-time
   */
  created_time: string;

  /**
   * The date and time when the account was sent for verification, in UTC.
   * `2022-02-26T20:03:05Z`, for example.
   *
   * This field is returned if it exists in the resource.
   * @format date-time
   */
  date_sent_for_verification?: string;

  /**
   * The date and time when the account was verified, in UTC.
   * `2022-02-26T20:03:05Z`, for example.
   *
   * This field is returned if it exists in the resource.
   * @format date-time
   */
  date_verified?: string;

  /**
   * If there are multiple funding sources, this field specifies which source is used by default in funding calls.
   * If there is only one funding source, the system ignores this field and always uses that source.
   */
  is_default_account?: boolean;

  /**
   * The date and time when the resource was last modified, in UTC.
   * `2022-02-26T20:03:05Z`, for example.
   * @format date-time
   */
  last_modified_time: string;

  /** The name on the ACH account. */
  name_on_account: string;
  partner?: string;
  partner_account_link_reference_token?: string;

  /** The unique identifier of the funding source. */
  token: string;

  /**
   * Free-form text field for holding notes about verification.
   * This field is returned only if `verification_override = true`.
   */
  verification_notes?: string;

  /**
   * Allows the ACH funding source to be used regardless of its verification status.
   * This field is returned if it exists in the resource.
   */
  verification_override?: boolean;

  /**
   * The account verification status.
   * This field is returned if it exists in the resource.
   */
  verification_status?: string;
}

/**
* Contains information about the beneficial owner of the business, if applicable.

This object is required for KYC verification in the United States if the business has a beneficial owner.
Do not include information about the proprietor or business officer in a `beneficial_owner` object.
If the proprietor or officer of the business is also a beneficial owner, you must indicate that in the `proprietor_is_beneficial_owner` field in the body field details of the business.
*/
export interface IBeneficialOwnerRequest {
  /**
   * Date of birth of the beneficial owner.
   * @format date-time
   */
  dob?: string;

  /** First name of the beneficial owner. */
  first_name?: string;

  /** An address associated with the business. */
  home?: IAddressRequestModel;

  /** Last name of the beneficial owner. */
  last_name?: string;

  /** Middle name of the beneficial owner. */
  middle_name?: string;

  /** Ten-digit phone number of the beneficial owner. */
  phone?: string;

  /** Nine-digit Social Security Number of the beneficial owner. */
  ssn?: string;

  /** Title of the beneficial owner. */
  title?: string;
}

/**
* Contains information about the beneficial owner of the business, if applicable.

This object is required for KYC verification in the United States if the business has a beneficial owner.
Do not include information about the proprietor or business officer in a `beneficial_owner` object.
If the proprietor or officer of the business is also a beneficial owner, you must indicate that in the `proprietor_is_beneficial_owner` field in the body field details of the business.
*/
export interface IBeneficialOwnerResponse {
  /** First name of the beneficial owner. */
  first_name?: string;

  /**
   * Date of birth of the beneficial owner.
   * @format date-time
   */
  getdob?: string;
  home?: IAddressResponseModel;

  /** Last name of the beneficial owner. */
  last_name?: string;

  /** Middle name of the beneficial owner. */
  middle_name?: string;

  /** Ten-digit phone number of the beneficial owner. */
  phone?: string;

  /** Title of the beneficial owner. */
  title?: string;
}

export interface IBulkIssuanceRequest {
  /**
   * The number of cards in the order.
   * @format int32
   * @max 50000
   */
  card_allocation: number;

  /** Specifies the card product from which to create your cards. */
  card_product_token: string;

  /**
   * Set to `true` to request expedited processing of the order by your card fulfillment provider.
   *
   * This expedited service is available for cards fulfilled by link:http://perfectplastic.com/[Perfect Plastic Printing], link:http://www.idemia.com[IDEMIA], and link:https://www.arroweye.com/[Arroweye Solutions].
   * *NOTE:* Contact your Marqeta representative for information regarding the cost of expedited service.
   */
  expedite?: boolean;

  /**
   * Specifies the length of time after the date of issue for which the cards are valid.
   *
   * If this field is not specified, the card uses the `config.card_life_cycle.expiration_offset` of the bulk card order or card product as appropriate.
   */
  expiration_offset?: IExpirationOffset;

  /** Specifies certain physical characteristics of a card, as well as shipment information. */
  fulfillment: IFulfillment;

  /**
   * If set to `true`, the unique numeric postfix appended to each card's token field is also appended to the card's `fulfillment.
   * card_personalization.text.name_line_1.value` field.
   */
  name_line_1_numeric_postfix?: boolean;

  /**
   * If set to `true`, the unique random postfix appended to each card's token field is also appended to the card's `fulfillment.
   * card_personalization.text.name_line_1.value` field.
   */
  name_line_1_random_postfix?: boolean;

  /**
   * If you do not include a token, the system will generate one automatically.
   * This token is necessary for use in other API calls, so we recommend that rather than let the system generate one, you use a simple string that is easy to remember.
   * This value cannot be updated.
   */
  token: string;

  /** Associates each card with a user. */
  user_association?: IUserAssociation;
}

export interface IBulkIssuanceResponse {
  /**
   * The number of cards in the order.
   * @format int32
   * @max 50000
   */
  card_allocation: number;

  /**
   * The date and time when the bulk card order was fulfilled, in UTC.
   * `2021-10-26T20:03:05Z`, for example.
   *
   * This field is included if your bulk card order has been processed.
   * @format date-time
   */
  card_fulfillment_time?: string;

  /** Specifies the card product from which the cards are created. */
  card_product_token: string;

  /**
   * The number of cards processed in the bulk card order.
   *
   * This field is returned if it exists in the resource.
   * @format int32
   */
  cards_processed?: number;

  /**
   * The date and time when the resource was created, in UTC.
   * `2021-10-26T20:03:05Z`, for example.
   *
   * This field is returned if it exists in the resource.
   * @format date-time
   */
  created_time?: string;

  /**
   * Indicates if expedited processing of this bulk card order was requested.
   *
   * This field is returned if it exists in the resource.
   */
  expedite?: boolean;

  /**
   * Specifies the length of time after the date of issue for which the cards are valid.
   *
   * If this field is not specified, the card uses the `config.card_life_cycle.expiration_offset` of the bulk card order or card product as appropriate.
   */
  expiration_offset?: IExpirationOffset;

  /**
   * Specifies certain physical characteristics of a card, as well as bulk shipment information.
   *
   * This object is returned if it exists in the resource.
   */
  fulfillment: IFulfillmentResponse;

  /**
   * This field is included if your bulk card order has been processed.
   *
   * You can use the `name_line1_start_index` and `name_line1_end_index` fields to identify the cards and users associated with the order.
   * For example, if the start index is "1" and the end index is "3", the card tokens are "card-1", "card-2", and "card-3", and the user tokens are "user-1", "user-2", and "user-3".
   * See <</core-api/bulk-card-orders#create_bulk_card_order, Create bulk card order>> for more information about the automatic generation and naming of cards and users.
   * @format int32
   */
  name_line1_end_index?: number;

  /**
   * This field is included if your bulk card order has been processed.
   *
   * You can use the `name_line1_start_index` and `name_line1_end_index` fields to identify the cards and users associated with the order.
   * For example, if the start index is "1" and the end index is "3", the card tokens are "card-1", "card-2", and "card-3", and the user tokens are "user-1", "user-2", and "user-3".
   * See <</core-api/bulk-card-orders#create_bulk_card_order, Create bulk card order>> for more information about the automatic generation and naming of cards and users.
   * @format int32
   */
  name_line1_start_index?: number;

  /** If set to `true`, the unique numeric postfix appended to each card's token field is also appended to the card's `fulfillment. card_personalization.text.name_line_1.value` field. */
  name_line_1_numeric_postfix?: boolean;

  /**
   * If set to `true`, the unique random postfix appended to each card's token field is also appended to the card's `fulfillment.
   * card_personalization.text.name_line_1.value` field.
   *
   * This field is returned if it exists in the resource.
   */
  name_line_1_random_postfix?: boolean;

  /**
   * The date and time when the card provider shipped the bulk card order, in UTC.
   * `2021-10-26T20:03:05Z`, for example.
   *
   * This field is included if your bulk card order has shipped.
   * @format date-time
   */
  provider_ship_date?: string;

  /**
   * The shipping method used by the card provider.
   * `United_Postal_Service`, for example.
   *
   * This field is included if your bulk card order has shipped.
   */
  provider_shipping_method?: string;

  /**
   * A tracking number is included only if your card provider is Arroweye Solutions.
   *
   * This field is included if your bulk card order has shipped.
   */
  provider_tracking_number?: string;

  /** The unique identifier of the bulk card order. */
  token: string;

  /** Associates each card with a user. */
  user_association?: IUserAssociation;
}

export interface IBusinessCardHolderResponse {
  /** Associates the specified account holder group with the business. */
  account_holder_group_token?: string;

  /** Specifies if the business is in the `ACTIVE` state on the Marqeta platform. */
  active?: boolean;

  /** Indicates that the attester agrees that the information provided is correct and truthful. */
  attestation_consent?: boolean;

  /**
   * The timestamp of the attestation.
   * @format date-time
   */
  attestation_date?: string;

  /** The name of the attester for KYC verification. */
  attester_name?: string;

  /** The title of the attester for KYC verification. */
  attester_title?: string;

  /** Contains the cardholder's email address and password information. */
  authentication?: IAuthentication;

  /**
   * Contains information about the beneficial owner of the business, if applicable.
   *
   * This object is required for KYC verification in the United States if the business has a beneficial owner.
   * Do not include information about the proprietor or business officer in a `beneficial_owner` object.
   * If the proprietor or officer of the business is also a beneficial owner, you must indicate that in the `proprietor_is_beneficial_owner` field in the body field details of the business.
   */
  beneficial_owner1?: IBeneficialOwnerResponse;

  /**
   * Contains information about the beneficial owner of the business, if applicable.
   *
   * This object is required for KYC verification in the United States if the business has a beneficial owner.
   * Do not include information about the proprietor or business officer in a `beneficial_owner` object.
   * If the proprietor or officer of the business is also a beneficial owner, you must indicate that in the `proprietor_is_beneficial_owner` field in the body field details of the business.
   */
  beneficial_owner2?: IBeneficialOwnerResponse;

  /**
   * Contains information about the beneficial owner of the business, if applicable.
   *
   * This object is required for KYC verification in the United States if the business has a beneficial owner.
   * Do not include information about the proprietor or business officer in a `beneficial_owner` object.
   * If the proprietor or officer of the business is also a beneficial owner, you must indicate that in the `proprietor_is_beneficial_owner` field in the body field details of the business.
   */
  beneficial_owner3?: IBeneficialOwnerResponse;

  /**
   * Contains information about the beneficial owner of the business, if applicable.
   *
   * This object is required for KYC verification in the United States if the business has a beneficial owner.
   * Do not include information about the proprietor or business officer in a `beneficial_owner` object.
   * If the proprietor or officer of the business is also a beneficial owner, you must indicate that in the `proprietor_is_beneficial_owner` field in the body field details of the business.
   */
  beneficial_owner4?: IBeneficialOwnerResponse;

  /** Fictitious business name ("Doing Business As" or DBA). */
  business_name_dba?: string;

  /** Legal name of business. */
  business_name_legal?: string;

  /** Indicates the type of business, for example B2B (business-to-business) or B2C (business-to-consumer). */
  business_type?: string;

  /**
   * The date and time when the business was created, in UTC.
   * `2021-10-26T20:03:05Z`, for example.
   * @format date-time
   */
  created_time: string;

  /**
   * The date and time when the business was established.
   * @format date-time
   */
  date_established?: string;

  /** Data Universal Numbering System (DUNS) number of the business. */
  duns_number?: string;

  /** General description of the business. */
  general_business_description?: string;

  /** History of the business. */
  history?: string;

  /** One or more objects containing identifications associated with the business. */
  identifications?: IIdentificationResponseModel[];

  /**
   * The date on which the business office opened in its current location.
   * @format date-time
   */
  in_current_location_since?: string;
  incorporation?: IBusinessIncorporationResponse;

  /** The locations of the business' offices outside the US. */
  international_office_locations?: string;

  /** The IP address of the business. */
  ip_address?: string;

  /**
   * The date and time when the business was last modified, in UTC.
   * `2021-10-26T20:03:05Z`, for example.
   * @format date-time
   */
  last_modified_time: string;

  /** Associates any additional metadata you provide with the business. */
  metadata?: Record<string, string>;

  /** Any additional information pertaining to the business. */
  notes?: string;
  office_location?: IAddressResponseModel;

  /** Password for the `business` account on the Marqeta platform. */
  password?: string;

  /** 10-digit telephone number of business. */
  phone?: string;

  /** Describes the business' primary contact person. */
  primary_contact?: IPrimaryContactInfoModel;

  /** Indicates that the proprietor or officer of the business is also a beneficial owner. */
  proprietor_is_beneficial_owner?: boolean;
  proprietor_or_officer?: IBusinessProprietorResponse;

  /** Specifies the state of the business on the Marqeta platform. */
  status?: 'UNVERIFIED' | 'LIMITED' | 'ACTIVE' | 'SUSPENDED' | 'CLOSED';

  /** The taxpayer identifier of the business. */
  taxpayer_id?: string;

  /** The unique identifier of the business resource. */
  token?: string;

  /** URL of the business' website. */
  website?: string;
}

export interface IBusinessCardHolderUpdate {
  /** Associates the specified account holder group with the business. */
  account_holder_group_token?: string;

  /** Specifies if the business is in the `ACTIVE` state on the Marqeta platform. */
  active?: boolean;

  /**
   * Indicates that the attester agrees that the information provided is correct and truthful.
   *
   * This field is required for KYC verification (US-based accounts only).
   */
  attestation_consent?: boolean;

  /**
   * The timestamp of the attestation.
   *
   * This field is required for KYC verification (US-based accounts only).
   * @format date-time
   */
  attestation_date?: string;

  /**
   * The name of the attester for KYC verification.
   *
   * This field is required for KYC verification (US-based accounts only).
   */
  attester_name?: string;

  /** The title of the attester for KYC verification. */
  attester_title?: string;

  /**
   * Contains information about the beneficial owner of the business, if applicable.
   *
   * This object is required for KYC verification in the United States if the business has a beneficial owner.
   * Do not include information about the proprietor or business officer in a `beneficial_owner` object.
   * If the proprietor or officer of the business is also a beneficial owner, you must indicate that in the `proprietor_is_beneficial_owner` field in the body field details of the business.
   */
  beneficial_owner1?: IBeneficialOwnerRequest;

  /**
   * Contains information about the beneficial owner of the business, if applicable.
   *
   * This object is required for KYC verification in the United States if the business has a beneficial owner.
   * Do not include information about the proprietor or business officer in a `beneficial_owner` object.
   * If the proprietor or officer of the business is also a beneficial owner, you must indicate that in the `proprietor_is_beneficial_owner` field in the body field details of the business.
   */
  beneficial_owner2?: IBeneficialOwnerRequest;

  /**
   * Contains information about the beneficial owner of the business, if applicable.
   *
   * This object is required for KYC verification in the United States if the business has a beneficial owner.
   * Do not include information about the proprietor or business officer in a `beneficial_owner` object.
   * If the proprietor or officer of the business is also a beneficial owner, you must indicate that in the `proprietor_is_beneficial_owner` field in the body field details of the business.
   */
  beneficial_owner3?: IBeneficialOwnerRequest;

  /**
   * Contains information about the beneficial owner of the business, if applicable.
   *
   * This object is required for KYC verification in the United States if the business has a beneficial owner.
   * Do not include information about the proprietor or business officer in a `beneficial_owner` object.
   * If the proprietor or officer of the business is also a beneficial owner, you must indicate that in the `proprietor_is_beneficial_owner` field in the body field details of the business.
   */
  beneficial_owner4?: IBeneficialOwnerRequest;

  /**
   * Fictitious business name ("Doing Business As" or DBA).
   *
   * This field is required for KYC verification (US-based accounts only).
   * If your business does not use a fictitious business name, enter your legal business name again in this field.
   */
  business_name_dba?: string;

  /**
   * Legal name of business.
   *
   * This field is required for KYC verification (US-based accounts only).
   */
  business_name_legal?: string;

  /** Indicates the type of business, for example business-to-business (B2B) or business-to-consumer (B2C). */
  business_type?: string;

  /**
   * Date the business was established.
   *
   * This field is required for KYC verification (US-based accounts only).
   * @format date-time
   */
  date_established?: string;

  /** Data Universal Numbering System (DUNS) number of the business. */
  duns_number?: string;

  /** General description of the business. */
  general_business_description?: string;

  /** History of the business. */
  history?: string;

  /** One or more objects containing identifications associated with the business. */
  identifications?: IIdentificationRequestModel[];

  /**
   * The date on which the business office opened in its current location.
   * @format date-time
   */
  in_current_location_since?: string;

  /**
   * Contains information about the organizational structure of the business.
   *
   * This object is required for KYC verification (US-based accounts only).
   */
  incorporation?: IBusinessIncorporation;

  /** The locations of the business' offices outside the United States. */
  international_office_locations?: string;

  /** The IP address of the business. */
  ip_address?: string;

  /** Associates any additional metadata you provide with the business. */
  metadata?: Record<string, string>;

  /** Any additional information pertaining to the business. */
  notes?: string;

  /** An address associated with the business. */
  office_location?: IAddressRequestModel;

  /** Password for the `business` account on the Marqeta platform. */
  password?: string;

  /** 10-digit telephone number of business. */
  phone?: string;

  /** Describes the business' primary contact person. */
  primary_contact?: IPrimaryContactInfoModel;

  /**
   * Indicates that the proprietor or officer of the business is also a beneficial owner.
   *
   * This field is required for KYC verification in the United States if the business proprietor or officer is also a beneficial owner.
   * If the proprietor or business officer is a beneficial owner, use this field to indicate their beneficial ownership.
   * Do not include information about the proprietor or business officer in a `beneficial_owner` object.
   */
  proprietor_is_beneficial_owner?: boolean;

  /**
   * Contains information about the proprietor or officer of the business.
   *
   * This object is required for KYC verification in the United States.
   */
  proprietor_or_officer?: IBusinessProprietor;

  /** The taxpayer identifier of the business. */
  taxpayer_id?: string;

  /**
   * The unique identifier of the business.
   *
   * Send a `GET` request to `/businesses` to retrieve business tokens.
   */
  token?: string;

  /** URL of the business' website. */
  website?: string;
}

export interface IBusinessCardholder {
  /** Associates the specified account holder group with the business. */
  account_holder_group_token?: string;

  /** Specifies if the business is in the `ACTIVE` state on the Marqeta platform. */
  active?: boolean;

  /**
   * Indicates that the attester agrees that the information provided is correct and truthful.
   *
   * This field is required for KYC verification (US-based accounts only).
   */
  attestation_consent?: boolean;

  /**
   * The timestamp of the attestation.
   *
   * This field is required for KYC verification (US-based accounts only).
   * @format date-time
   */
  attestation_date?: string;

  /**
   * The name of the attester for KYC verification.
   *
   * This field is required for KYC verification (US-based accounts only).
   */
  attester_name?: string;

  /** The title of the attester for KYC verification. */
  attester_title?: string;

  /**
   * Contains information about the beneficial owner of the business, if applicable.
   *
   * This object is required for KYC verification in the United States if the business has a beneficial owner.
   * Do not include information about the proprietor or business officer in a `beneficial_owner` object.
   * If the proprietor or officer of the business is also a beneficial owner, you must indicate that in the `proprietor_is_beneficial_owner` field in the body field details of the business.
   */
  beneficial_owner1?: IBeneficialOwnerRequest;

  /**
   * Contains information about the beneficial owner of the business, if applicable.
   *
   * This object is required for KYC verification in the United States if the business has a beneficial owner.
   * Do not include information about the proprietor or business officer in a `beneficial_owner` object.
   * If the proprietor or officer of the business is also a beneficial owner, you must indicate that in the `proprietor_is_beneficial_owner` field in the body field details of the business.
   */
  beneficial_owner2?: IBeneficialOwnerRequest;

  /**
   * Contains information about the beneficial owner of the business, if applicable.
   *
   * This object is required for KYC verification in the United States if the business has a beneficial owner.
   * Do not include information about the proprietor or business officer in a `beneficial_owner` object.
   * If the proprietor or officer of the business is also a beneficial owner, you must indicate that in the `proprietor_is_beneficial_owner` field in the body field details of the business.
   */
  beneficial_owner3?: IBeneficialOwnerRequest;

  /**
   * Contains information about the beneficial owner of the business, if applicable.
   *
   * This object is required for KYC verification in the United States if the business has a beneficial owner.
   * Do not include information about the proprietor or business officer in a `beneficial_owner` object.
   * If the proprietor or officer of the business is also a beneficial owner, you must indicate that in the `proprietor_is_beneficial_owner` field in the body field details of the business.
   */
  beneficial_owner4?: IBeneficialOwnerRequest;

  /**
   * Fictitious business name ("Doing Business As" or DBA).
   *
   * This field is required for KYC verification (US-based accounts only).
   * If your business does not use a fictitious business name, enter your legal business name again in this field.
   */
  business_name_dba?: string;

  /**
   * Legal name of business.
   *
   * This field is required for KYC verification (US-based accounts only).
   */
  business_name_legal?: string;

  /** Indicates the type of business, for example B2B (business-to-business) or B2C (business-to-consumer). */
  business_type?: string;

  /**
   * Date the business was established.
   *
   * This field is required for KYC verification (US-based accounts only).
   * @format date-time
   */
  date_established?: string;

  /** Data Universal Numbering System (DUNS) number of the business. */
  duns_number?: string;

  /** General description of the business. */
  general_business_description?: string;

  /** History of the business. */
  history?: string;

  /** One or more objects containing identifications associated with the business. */
  identifications?: IIdentificationRequestModel[];

  /**
   * The date on which the business office opened in its current location.
   * @format date-time
   */
  in_current_location_since?: string;

  /**
   * Contains information about the organizational structure of the business.
   *
   * This object is required for KYC verification (US-based accounts only).
   */
  incorporation?: IBusinessIncorporation;

  /** The locations of the business' offices outside the US. */
  international_office_locations?: string;

  /** The IP address of the business. */
  ip_address?: string;

  /** Associates any additional metadata you provide with the business. */
  metadata?: Record<string, string>;

  /** Any additional information pertaining to the business. */
  notes?: string;

  /** An address associated with the business. */
  office_location?: IAddressRequestModel;

  /** Password for the `business` account on the Marqeta platform. */
  password?: string;

  /** 10-digit telephone number of business. */
  phone?: string;

  /** Describes the business' primary contact person. */
  primary_contact?: IPrimaryContactInfoModel;

  /**
   * Indicates that the proprietor or officer of the business is also a beneficial owner.
   *
   * This field is required for KYC verification if the business proprietor or officer is also a beneficial owner.
   */
  proprietor_is_beneficial_owner?: boolean;

  /**
   * Contains information about the proprietor or officer of the business.
   *
   * This object is required for KYC verification in the United States.
   */
  proprietor_or_officer?: IBusinessProprietor;

  /** The taxpayer identifier of the business. */
  taxpayer_id?: string;

  /**
   * The unique identifier of the business resource.
   *
   * If you do not include a token, the system generates one automatically.
   * This token is necessary for use in other API calls, so we recommend that rather than let the system generate one, you use a simple string that is easy to remember.
   * This value cannot be updated.
   */
  token?: string;

  /** URL of the business' website. */
  website?: string;
}

/**
* Contains information about the organizational structure of the business.

This object is required for KYC verification (US-based accounts only).
*/
export interface IBusinessIncorporation {
  /** An address associated with the business. */
  address_registered_under?: IAddressRequestModel;

  /**
   * Organizational structure of the business, such as corporation or sole proprietorship.
   *
   * This field is required for KYC verification (US-based accounts only).
   */
  incorporation_type?:
    | 'LLC'
    | 'CORPORATION'
    | 'SOLE_PROPRIETORSHIP'
    | 'PARTNERSHIP'
    | 'COOPERATIVE'
    | 'OTHER';

  /** A value of `true` indicates that the business is publicly held. */
  is_public?: boolean;

  /** Name under which the business is registered. */
  name_registered_under?: string;

  /**
   * State where the business is incorporated.
   *
   * This field is required for KYC verification (US-based accounts only).
   */
  state_of_incorporation?: string;

  /** Business stock symbol. */
  stock_symbol?: string;
}

export interface IBusinessIncorporationResponse {
  address_registered_under?: IAddressResponseModel;

  /** Organizational structure of the business (corporation or sole proprietorship, for example). */
  incorporation_type?:
    | 'LLC'
    | 'CORPORATION'
    | 'SOLE_PROPRIETORSHIP'
    | 'PARTNERSHIP'
    | 'OTHER';

  /** A value of `true` indicates that the business is publicly held. */
  is_public?: boolean;

  /** Name under which the business is registered. */
  name_registered_under?: string;

  /** State where the business is incorporated. */
  state_of_incorporation?: string;

  /** Stock symbol associated with the business. */
  stock_symbol?: string;
}

/**
 * Contains customer-provided information about the business that funded the transaction.
 */
export interface IBusinessMetadata {
  /** Associates customer-provided metadata with the business. */
  metadata?: Record<string, string>;
}

/**
* Contains information about the proprietor or officer of the business.

This object is required for KYC verification in the United States.
*/
export interface IBusinessProprietor {
  /** Alternate names of the business proprietor or officer. */
  alternative_names?: string;

  /**
   * Business proprietor or officer's date of birth.
   *
   * This field is required for KYC verification (US-based accounts only).
   * @format date-time
   */
  dob?: string;

  /** Email address of the business proprietor or officer. */
  email?: string;

  /** First name of business proprietor or officer. */
  first_name: string;

  /** An address associated with the business. */
  home?: IAddressRequestModel;

  /** One or more objects containing personal identifications of the business proprietor or officer. */
  identifications?: IIdentificationRequestModel[];

  /** Last name of business proprietor or officer. */
  last_name: string;

  /** Middle name of business proprietor or officer. */
  middle_name?: string;

  /** Telephone number of the business proprietor or officer. */
  phone?: string;

  /** The Social Security Number of the business proprietor or officer. */
  ssn?: string;

  /** Title of business proprietor or officer. */
  title?: string;
}

export interface IBusinessProprietorResponse {
  /** Alternate names of the business proprietor or officer. */
  alternative_names?: string;

  /**
   * Business proprietor or officer's date of birth.
   * @format date-time
   */
  dob?: string;

  /** Email address of the business proprietor or officer. */
  email?: string;

  /** First name of the business proprietor or officer. */
  first_name?: string;
  home?: IAddressResponseModel;

  /** One or more objects containing personal identifications of the business proprietor or officer. */
  identifications?: IIdentificationResponseModel[];

  /** Last name of the business proprietor or officer. */
  last_name?: string;

  /** Middle name of the business proprietor or officer. */
  middle_name?: string;

  /** Telephone number of the business proprietor or officer. */
  phone?: string;

  /** Social Security Number of the business proprietor or officer. */
  ssn?: string;

  /** Title of the business proprietor or officer. */
  title?: string;
}

export interface ICardAcceptorModel {
  address?: string;
  city?: string;
  country?: string;
  ecommerce_security_level_indicator?: string;
  mcc?: string;
  name?: string;
  partial_approval_capable?: boolean;
  state?: string;
  zip?: string;
}

export interface ICardHolderAddressModel {
  /** Specifies whether the address is active. */
  active?: boolean;

  /** Street address. */
  address_1: string;

  /** Additional address information. */
  address_2?: string;

  /**
   * The unique identifier of the `business` account holder.
   * This token is required if a `user_token` is not specified.
   */
  business_token?: string;

  /** City. */
  city: string;

  /** Country. */
  country: string;

  /** First name. */
  first_name: string;

  /**
   * A value of `true` specifies that this address is the default address used by the account holder's funding source.
   * If this is the account holder's only address, it is used as the default regardless of this field's setting.
   */
  is_default_address?: boolean;

  /** Last name. */
  last_name: string;

  /** Telephone number. */
  phone?: string;

  /** Postal code. */
  postal_code?: string;

  /**
   * Two-character state, province, or territorial abbreviation.
   *
   * For a complete list of valid state and province abbreviations, see <</core-api/kyc-verification#_valid_state_provincial_and_territorial_abbreviations, Valid state, provincial, and territorial abbreviations>>.
   */
  state: string;

  /**
   * The unique identifier of the address.
   * If you do not include a token, the system will generate one automatically.
   * This token is necessary for use in other API calls, so we recommend that rather than let the system generate one, you use a simple string that is easy to remember.
   * This value cannot be updated.
   */
  token?: string;

  /**
   * The unique identifier of the `user` account holder.
   * This token is required if a `business_token` is not specified.
   */
  user_token?: string;

  /**
   * The United States ZIP code.
   * This field is required if `postal_code` is not specified.
   */
  zip?: string;
}

export interface ICardHolderAddressUpdateModel {
  /** Specifies whether the address is active. */
  active?: boolean;

  /** Street address. */
  address_1?: string;

  /** Additional address information. */
  address_2?: string;

  /** City. */
  city?: string;

  /** Country. */
  country?: string;

  /** First name. */
  first_name?: string;

  /**
   * A value of `true` specifies that this address is the default address used by the account holder's funding source.
   * If this is the account holder's only address, it is used as the default regardless of this field's setting.
   */
  is_default_address?: boolean;

  /** Last name. */
  last_name?: string;

  /** Telephone number. */
  phone?: string;

  /** Postal code. */
  postal_code?: string;

  /**
   * Two-character state, province, or territorial abbreviation.
   *
   * For a complete list, see <</core-api/kyc-verification#_valid_state_provincial_and_territorial_abbreviations, Valid state, provincial, and territorial abbreviations>>.
   */
  state?: string;
  zip?: string;
}

/**
 * Contains information about a cardholder.
 */
export interface ICardHolderModel {
  /**
   * Associates the specified account holder group with the cardholder.
   *
   * Send a `GET` request to `/accountholdergroups` to retrieve account holder group tokens.
   */
  account_holder_group_token?: string;

  /** Specifies if the cardholder is in the `ACTIVE` state on the Marqeta platform. */
  active?: boolean;

  /**
   * Cardholder's address.
   *
   * *NOTE:* Required for KYC verification (US-based cardholders only).
   * Cannot perform KYC if set to a PO Box.
   */
  address1?: string;

  /**
   * Additional address information for the cardholder.
   *
   * *NOTE:* Cannot perform KYC if set to a PO Box.
   */
  address2?: string;

  /**
   * Cardholder's date of birth.
   *
   * *NOTE:* Required for KYC verification (US-based cardholders only).
   */
  birth_date?: string;

  /**
   * City where the cardholder resides.
   *
   * *NOTE:* Required for KYC verification (US-based cardholders only).
   */
  city?: string;

  /** Company name. */
  company?: string;

  /** Specifies if the cardholder holds a corporate card. */
  corporate_card_holder?: boolean;

  /**
   * Country where the cardholder resides.
   *
   * *NOTE:* Required for KYC verification (US-based cardholders only).
   */
  country?: string;

  /**
   * Valid email address of the cardholder.
   *
   * This value must be unique among users.
   */
  email?: string;

  /**
   * Cardholder's first name.
   *
   * *NOTE:* Required for KYC verification (US-based cardholders only).
   */
  first_name?: string;

  /** The gender of the cardholder. */
  gender?: 'F' | 'M';

  /** Cardholder's title or prefix: Ms., Mr., Miss, Mrs., and so on. */
  honorific?: string;

  /** The expiration date of the cardholder's identification card. */
  id_card_expiration_date?: string;

  /** Cardholder's identification card number. */
  id_card_number?: string;

  /** One or more objects containing identifications associated with the cardholder. */
  identifications?: IIdentificationRequestModel[];

  /** Cardholder's IP address. */
  ip_address?: string;

  /**
   * Cardholder's last name.
   *
   * *NOTE:* Required for KYC verification (US-based cardholders only).
   */
  last_name?: string;

  /** Associates any additional metadata you provide with the cardholder. */
  metadata?: Record<string, string>;

  /** Cardholder's middle name. */
  middle_name?: string;

  /** Carholder's nationality. */
  nationality?: string;

  /** Any additional information pertaining to the cardholder. */
  notes?: string;

  /**
   * The unique identifier of a `user` or `business` already in the system.
   * Send a `GET` request to `/users` to retrieve `user` tokens or `/businesses` to retrieve `business` tokens.
   *
   * Required if `uses_parent_account = true`.
   * This `user` or `business` is configured as the parent of the current `user`.
   */
  parent_token?: string;

  /** The expiration date of the cardholder's passport. */
  passport_expiration_date?: string;

  /** Cardholder's passport number. */
  passport_number?: string;

  /** Cardholder's `user` account password on the Marqeta platform. */
  password?: string;

  /**
   * Telephone number of the cardholder (including area code), prepended by the `+` symbol and the 1- to 3-digit country calling code.
   * Do not include hyphens, spaces, or parentheses.
   */
  phone?: string;

  /**
   * Postal code of the cardholder's address.
   *
   * *NOTE:* Required for KYC verification (US-based cardholders only).
   */
  postal_code?: string;

  /** The cardholder's Social Security Number. */
  ssn?: string;

  /**
   * State in which the cardholder resides.
   *
   * *NOTE:* <</core-api/kyc-verification#_valid_state_provincial_and_territorial_abbreviations, Valid two-character abbreviation>> required for KYC verification (US-based cardholders only).
   */
  state?: string;

  /**
   * The unique identifier of the cardholder.
   * If you do not include a token, the system generates one automatically.
   * This token is necessary for use in other API calls, so we recommend that rather than let the system generate one, you use a simple string that is easy to remember.
   * This value cannot be updated.
   */
  token?: string;

  /**
   * Indicates whether the child shares balances with the parent (`true`), or the child's balances are independent of the parent (`false`).
   *
   * If set to `true`, must also include a `parent_token` in the request.
   * This value cannot be updated.
   */
  uses_parent_account?: boolean;
}

/**
 * Defines characteristics of the lifecycle of cards of this card product type.
 */
export interface ICardLifeCycle {
  /** A value of `true` indicates that cards of this card product type are active once they are issued. */
  activate_upon_issue?: boolean;

  /**
   * A sequence of three digits that defines various services, differentiates card usage in international or domestic interchange, designates PIN and authorization requirements, and identifies card restrictions.
   * The following values are commonly used:
   *
   * *First digit*
   * * *1* — International interchange OK
   * * *2* — International interchange, use IC (chip) where feasible
   * * *5* — National interchange only except under bilateral agreement
   * * *6* — National interchange only except under bilateral agreement, use IC (chip) where feasible
   * * *7* — No interchange except under bilateral agreement (closed loop)
   * * *9* — Test
   * *Second digit*
   * * *0* — Normal
   * * *2* — Contact issuer via online means
   * * *4* — Contact issuer via online means except under bilateral agreement
   * *Third digit*
   * * *0* — No restrictions, PIN required
   * * *1* — No restrictions
   * * *2* — Goods and services only (no cash)
   * * *3* — ATM only, PIN required
   * * *4* — Cash only
   * * *5* — Goods and services only (no cash), PIN required
   * * *6* — No restrictions, use PIN where feasible
   * * *7* — Goods and services only (no cash), use PIN where feasible
   * @format int32
   */
  card_service_code?: number;

  /** Specifies the length of time after the date of issue for which cards of this card product type are valid. */
  expiration_offset?: IExpirationOffsetWithMinimum;

  /**
   * Normally, the `expiration_offset` is measured from the date of issue.
   * Set this field to `true` to measure `expiration_offset` from the date of activation instead.
   */
  update_expiration_upon_activation?: boolean;
}

export interface ICardMetadata {
  /** Associates customer-injected metadata with the card. */
  metadata?: Record<string, string>;
}

export interface ICardOptions {
  billing_address?: IBillingAddress;
  card_present?: boolean;
  cvv?: string;
  expiration?: string;
}

/**
 * Allows personalized attributes to be added to the card.
 */
export interface ICardPersonalization {
  /** Specifies personalized images that appear on the card carrier. */
  carrier?: ICarrier;

  /** Specifies personalized images that appear on the card. */
  images?: IImages;

  /** Specifies the method for printing personalized text on the card. */
  perso_type?: 'EMBOSS' | 'LASER' | 'FLAT';

  /** Specifies personalized text that appears on the card. */
  text: IText;
}

/**
* Defines the characteristics of the card product.
Configurations are conditionally required based on program setup.

For more information, contact your Marqeta representative.
*/
export interface ICardProductConfig {
  /** Defines characteristics of the lifecycle of cards of this card product type. */
  card_life_cycle?: ICardLifeCycle;

  /** Specifies the destination for overdraft funds. */
  clearing_and_settlement?: IClearingAndSettlement;

  /** Controls characteristics related to digital wallets. */
  digital_wallet_tokenization?: IDigitalWalletTokenization;

  /** Determines physical characteristics of a card, along with its bulk shipment information. */
  fulfillment?: ICardProductFulfillment;

  /** Governs the behavior of JIT Funding. */
  jit_funding?: IJitFunding;

  /** Governs the point of interaction. */
  poi?: IPoi;

  /** Contains information about authorization decisions. */
  selective_auth?: ISelectiveAuth;

  /** Contains information about merchant onboarding. */
  special?: ISpecial;

  /** Controls transactional characteristics of card usage. */
  transaction_controls?: ITransactionControls;
}

/**
 * Determines physical characteristics of a card, along with its bulk shipment information.
 */
export interface ICardProductFulfillment {
  /** If `true`, an all zero code (000) is allowed as a valid value in an authorization request. */
  all_zero_card_security_code?: boolean;

  /**
   * Controls the ability to create cards from this card product; `true` allows and `false` disallows the creation of cards.
   *
   * *NOTE:* The card product's `active` field has no effect on card creation or the behavior of this field.
   */
  allow_card_creation?: boolean;

  /** The prefix of the bank identification number. */
  bin_prefix?: string;

  /** Enables bulk ordering of cards of this card product type using the `/bulkissuances` endpoint. */
  bulk_ship?: boolean;

  /** Allows personalized attributes to be added to the card. */
  card_personalization: ICardPersonalization;

  /** Enables offline PIN verification for EMV ("chip-and-PIN") card payments. */
  enable_offline_pin?: boolean;

  /**
   * Specifies the fulfillment provider.
   *
   * *NOTE:* Expedited processing is available for cards that are fulfilled by link:http://perfectplastic.com/[Perfect Plastic Printing], link:http://www.idemia.com[IDEMIA], and link:https://www.arroweye.com/[Arroweye Solutions].
   * You can expedite an order's processing by using the `expedite` field of the <</core-api/cards, card>> or <</core-api/bulk-card-orders, bulkissuance>> object.
   * Contact your Marqeta representative for information regarding the cost of expedited service.
   */
  fulfillment_provider?:
    | 'PERFECTPLASTIC'
    | 'ARROWEYE'
    | 'IDEMIA'
    | 'IDEMIA_UK'
    | 'IDEMIA_FR'
    | 'IDEMIA_CZ'
    | 'IDEMIA_APAC'
    | 'IDEMIA_PL'
    | 'IDEMIA_AU'
    | 'IDEMIA_LA'
    | 'GEMALTO'
    | 'NITECREST'
    | 'OBERTHUR'
    | 'ALLPAY';

  /** Card fulfillment provider's package ID. */
  package_id?: string;

  /** Specifies the length of the primary account number (PAN). */
  pan_length?: string;

  /** Specifies the physical form cards of this card product type will take. */
  payment_instrument?:
    | 'PHYSICAL_MSR'
    | 'PHYSICAL_ICC'
    | 'PHYSICAL_CONTACTLESS'
    | 'PHYSICAL_COMBO'
    | 'VIRTUAL_PAN';

  /** Specifies the shipping details for the card. */
  shipping?: IShipping;

  /**
   * A value of `true` sets the text in the `fulfillment.card_personalization.text.name_line_1` and `name_line_2` fields to all uppercase letters.
   * A value of `false` leaves the text in its original state.
   */
  uppercase_name_lines?: boolean;
}

export interface ICardProductRequest {
  /**
   * Indicates whether the card product is active.
   *
   * *NOTE:* This field has no effect on the ability to create cards from this card product.
   * Use the `config.fulfillment.allow_card_creation` field to allow/disallow card creation.
   */
  active?: boolean;

  /**
   * Defines the characteristics of the card product.
   * Configurations are conditionally required based on program setup.
   *
   * For more information, contact your Marqeta representative.
   */
  config?: ICardProductConfig;

  /**
   * The end date of the range over which the card product can be active.
   * @format date-time
   */
  end_date?: string;

  /**
   * The name of the card product.
   * We recommend using a unique string.
   */
  name: string;

  /**
   * The date when the card product becomes active.
   * If the start date has passed and the card is set to `active = false`, then the card will not be activated.
   * @format date-time
   */
  start_date: string;

  /**
   * The unique identifier of the card product.
   *
   * If you do not include a token, the system will generate one automatically.
   * This token is required in other API calls, so we recommend that rather than let the system generate one, you use a simple string that is easy to remember.
   * This value cannot be updated.
   */
  token?: string;
}

export interface ICardProductResponse {
  /** Indicates whether the card product is active. */
  active?: boolean;

  /**
   * Defines the characteristics of the card product.
   * Configurations are conditionally required based on program setup.
   *
   * For more information, contact your Marqeta representative.
   */
  config?: ICardProductConfig;

  /**
   * The date and time when the resource was created, in UTC.
   * `2021-10-26T20:03:10Z`, for example.
   * @format date-time
   */
  created_time: string;

  /**
   * The end date of the range over which the card product can be active.
   * @format date-time
   */
  end_date?: string;

  /**
   * The date and time when the resource was last updated, in UTC.
   * `2021-10-26T20:03:15Z`, for example.
   * @format date-time
   */
  last_modified_time: string;

  /** The name of the card product. */
  name: string;

  /**
   * The date and time when the card product becomes active.
   * @format date-time
   */
  start_date: string;

  /** The unique identifier of the card product. */
  token?: string;
}

export interface ICardProductUpdateModel {
  /**
   * Indicates whether the card product is active.
   *
   * *NOTE:* This field has no effect on the ability to create cards from this card product.
   * Use the `config.fulfillment.allow_card_creation` field to allow/disallow card creation.
   */
  active?: boolean;

  /**
   * Defines the characteristics of the card product.
   * Configurations are conditionally required based on program setup.
   *
   * For more information, contact your Marqeta representative.
   */
  config?: ICardProductConfig;

  /** The end date of the range over which the card product can be active. */
  end_date?: string;

  /**
   * The name of the card product.
   * We recommend using a unique string.
   */
  name?: string;

  /**
   * The date the card product becomes active.
   * If the start date has passed and the card is set to `active = false`, then the card will not be activated.
   */
  start_date?: string;
}

export interface ICardRequest {
  /** Defines actions to execute when the card is activated. */
  activation_actions?: IActivationActions;

  /**
   * Associates the card with the specified bulk card order.
   * This field cannot be updated.
   */
  bulk_issuance_token?: string;

  /** The unique identifier of the card product. */
  card_product_token: string;

  /**
   * Set to `true` to request expedited processing of the card by your card fulfillment provider.
   *
   * This expedited service is available for cards fulfilled by link:http://perfectplastic.com/[Perfect Plastic Printing], link:http://www.idemia.com[IDEMIA], and link:https://www.arroweye.com/[Arroweye Solutions].
   * *NOTE:* Contact your Marqeta representative for information regarding the cost of expedited service.
   */
  expedite?: boolean;

  /**
   * Specifies the length of time after the date of issue for which the cards are valid.
   *
   * If this field is not specified, the card uses the `config.card_life_cycle.expiration_offset` of the bulk card order or card product as appropriate.
   */
  expiration_offset?: IExpirationOffset;

  /** Specifies certain physical characteristics of a card, as well as shipment information. */
  fulfillment?: IFulfillment;

  /** Associates customer-injected metadata with the card. */
  metadata?: Record<string, string>;
  new_pan_from_card_token?: string;

  /**
   * Reissues the specified card (known as the "source" card).
   *
   * This field reissues a card by copying the PAN and PIN from the specified source card to the newly created card.
   * The reissued card has the same PAN and PIN as the source card but a new expiration date and CVV2 number.
   * *NOTE:* By default, the source card is automatically terminated when the reissued card is activated.
   * However, if your program is configured for multiple active cards, you can prevent the source card from being automatically terminated by setting the `activation_actions.terminate_reissued_source_card` field to `false`.
   */
  reissue_pan_from_card_token?: string;

  /**
   * The unique identifier of the card.
   *
   * If you do not include a token, the system will generate one automatically.
   * Other API calls will require this token, so we recommend creating a token that is easy to remember rather than letting the system generate one.
   * This value cannot be updated.
   */
  token?: string;

  /**
   * Copies the PIN from the specified card to the newly created card.
   *
   * Both cards must belong to the same user.
   * Populating this field will raise an error if `reissue_pan_from_card_token` is also set.
   */
  translate_pin_from_card_token?: string;

  /** The unique identifier of the authorized user of the card. */
  user_token: string;
}

/**
 * Contains information about the card used in the transaction.
 */
export interface ICardResponse {
  /** Defines actions to execute when the card is activated. */
  activation_actions?: IActivationActions;

  /** The barcode printed on the card, expressed as numerals. */
  barcode: string;

  /** The unique identifier of the bulk card order. */
  bulk_issuance_token?: string;

  /** Unique identifier of the card product. */
  card_product_token: string;

  /** Three-digit card verification value (CVV2) included on the back of the card. */
  chip_cvv_number?: string;

  /**
   * A running count of contactless transactions.
   * You can limit the number of contactless transactions that can be performed without issuing a strong customer authentication (SCA) challenge at the card product level.
   *
   * For more information about strong customer authentication, see <</core-api/card-products, Card Products>>.
   * @format int32
   */
  contactless_exemption_counter?: number;

  /**
   * A running total of funds spent in contactless transactions.
   * You can limit the total amount that can be spent in contactless transactions without issuing a strong customer authentication (SCA) challenge at the card product level.
   *
   * For more information about strong customer authentication, see <</core-api/card-products, Card Products>>.
   */
  contactless_exemption_total_amount?: number;

  /**
   * Date and time when the card was created.
   * @format date-time
   */
  created_time: string;

  /** Three-digit card verification value (CVV2) of the chip, included on the back of the card. */
  cvv_number?: string;

  /** Whether to expedite the card fulfillment order. */
  expedite?: boolean;

  /** Month and year when the card expires. */
  expiration: string;

  /**
   * Date and time when the card expires.
   * @format date-time
   */
  expiration_time: string;

  /** Specifies certain physical characteristics of a card, as well as shipment information. */
  fulfillment?: ICardFulfillmentResponse;

  /** Status of the card fulfillment. */
  fulfillment_status:
    | 'ISSUED'
    | 'ORDERED'
    | 'REORDERED'
    | 'REJECTED'
    | 'SHIPPED'
    | 'DELIVERED'
    | 'DIGITALLY_PRESENTED';

  /**
   * The instrument type of the card:
   *
   * * *PHYSICAL_MSR:* A physical card with a magnetic stripe. This is the default physical card type.
   * * *PHYSICAL_ICC:* A physical card with an integrated circuit, or "chip."
   * * *PHYSICAL_CONTACTLESS:* A physical card that uses radio frequency identification (RFID) or near-field communication (NFC) to enable payment over a secure radio interface.
   * * *PHYSICAL_COMBO:* A physical card with a chip that also supports contactless payments.
   * * *VIRTUAL_PAN:* A virtual card with a PAN.
   */
  instrument_type?:
    | 'PHYSICAL_MSR'
    | 'PHYSICAL_ICC'
    | 'PHYSICAL_CONTACTLESS'
    | 'PHYSICAL_COMBO'
    | 'VIRTUAL_PAN';

  /** Last four digits of the card PAN. */
  last_four: string;

  /**
   * Date and time when the card was last modified.
   * @format date-time
   */
  last_modified_time: string;

  /** Associates customer-provided metadata with the card. */
  metadata?: Record<string, string>;
  new_pan_from_card_token?: string;

  /** Full primary account number (PAN) of the card. */
  pan: string;

  /** Specifies if a PIN was set. */
  pin_is_set: boolean;

  /**
   * Reissues the specified card (known as the "source" card).
   *
   * This field reissues a card by copying the PAN and PIN from the specified source card to the newly created card.
   * The reissued card has the same PAN and PIN as the source card, but a new expiration date and CVV2 number.
   * *NOTE:* By default, the source card is automatically terminated.
   * However, if your program is configured for multiple active cards, you can prevent the source card from being automatically terminated by setting the `activation_actions.terminate_reissued_source_card` field to `false`.
   */
  reissue_pan_from_card_token?: string;

  /** State of the card. */
  state:
    | 'ACTIVE'
    | 'SUSPENDED'
    | 'TERMINATED'
    | 'UNSUPPORTED'
    | 'UNACTIVATED'
    | 'LIMITED';

  /** Reason for the state of the card. */
  state_reason: string;

  /** Unique identifier of the card. */
  token: string;

  /**
   * Token of the source card from which to transfer the PIN.
   *
   * Returned if the card is a reissue or replacement that keeps the source card's PIN.
   */
  translate_pin_from_card_token?: string;

  /** Unique identifier of the cardholder. */
  user_token: string;
}

/**
 * Contains information about a verification check performed on the card's security code.
 */
export interface ICardSecurityCodeVerification {
  /** Contains information about the response, including the response code and response memo. */
  response: IResponse;

  /**
   * Indicates the type of security code.
   * Can have these possible values:
   *
   * * *CVV1* – the security code stored in the magnetic stripe on the card.
   * * *CVV2* – the security code printed on the card.
   * * *ICVV* – the security code stored on the chip of the card.
   * * *DCVV* – a dynamic security code used in some contactless payments when a card or device is tapped against the card reader.
   */
  type: 'CVV1' | 'CVV2' | 'ICVV';
}

export interface ICardTransitionRequest {
  /** Identifies the card whose state will transition. */
  card_token: string;

  /**
   * The mechanism by which the transition was initiated.
   *
   * * *ADMIN* - Indicates that the card transition was initiated through the Marqeta Dashboard.
   * * *API* - Indicates that the card transition was initiated by you through the Core API.
   * Use this value when creating a card transition with an API `POST` request.
   * * *FRAUD* - Indicates that either Marqeta or the card network has determined that the card is fraudulent.
   * * *IVR* - Indicates that the card transition was initiated through your Interactive Voice Response system.
   * * *SYSTEM* - Indicates that the card transition was initiated by Marqeta.
   * For example, Marqeta suspended the card due to excessive failed PIN entries.
   */
  channel: 'API' | 'IVR' | 'FRAUD' | 'ADMIN' | 'SYSTEM';

  /** Additional information about the state change. */
  reason?: string;

  /**
   * A standard code describing the reason for the transition:
   *
   * * *00:* Object activated for the first time
   * * *01:* Requested by you
   * * *02:* Inactivity over time
   * * *03:* This address cannot accept mail or the addressee is unknown
   * * *04:* Negative account balance
   * * *05:* Account under review
   * * *06:* Suspicious activity was identified
   * * *07:* Activity outside the program parameters was identified
   * * *08:* Confirmed fraud was identified
   * * *09:* Matched with an Office of Foreign Assets Control list
   * * *10:* Card was reported lost
   * * *11:* Card information was cloned
   * * *12:* Account or card information was compromised
   * * *13:* Temporary status change while on hold/leave
   * * *14:* Initiated by Marqeta
   * * *15:* Initiated by issuer
   * * *16:* Card expired
   * * *17:* Failed KYC
   * * *18:* Changed to `ACTIVE` because information was properly validated
   * * *19:* Changed to `ACTIVE` because account activity was properly validated
   * * *20:* Change occurred prior to the normalization of reason codes
   * * *21:* Initiated by a third party, often a digital wallet provider
   * * *22:* PIN retry limit reached
   * * *23:* Card was reported stolen
   * * *24:* Address issue
   * * *25:* Name issue
   * * *26:* SSN issue
   * * *27:* DOB issue
   * * *28:* Email issue
   * * *29:* Phone issue
   * * *30:* Account/fulfillment mismatch
   * * *31:* Other reason
   */
  reason_code?:
    | '00'
    | '01'
    | '02'
    | '03'
    | '04'
    | '05'
    | '06'
    | '07'
    | '08'
    | '09'
    | '10'
    | '11'
    | '12'
    | '13'
    | '14'
    | '15'
    | '16'
    | '17'
    | '18'
    | '19'
    | '20'
    | '21'
    | '22'
    | '23'
    | '24'
    | '25'
    | '26'
    | '27'
    | '28'
    | '29'
    | '30'
    | '31';

  /** Specifies the new state. */
  state: 'ACTIVE' | 'SUSPENDED' | 'TERMINATED';

  /**
   * The unique identifier of the card transition.
   *
   * If you do not include a token, the system will generate one automatically.
   * This token is referenced in other API calls, so we recommend that you define a simple string that is easy to remember.
   * This value cannot be updated.
   */
  token?: string;

  /** Contains information about the user. */
  validations?: IValidationsRequest;
}

export interface ICardTransitionResponse {
  /** The barcode printed on the card, expressed as numerals. */
  barcode: string;

  /** The unique identifier of the bulk card order. */
  bulk_issuance_token?: string;
  card?: ICardMetadata;

  /** The unique identifier of the card product. */
  card_product_token: string;

  /** The unique identifier of the card. */
  card_token: string;

  /**
   * The mechanism by which the transition was initiated.
   *
   * * *ADMIN* - Indicates that the card transition was initiated through the Marqeta Dashboard.
   * * *API* - Indicates that the card transition was initiated by you through the Core API.
   * Use this value when creating a card transition with an API `POST` request.
   * * *FRAUD* - Indicates that either Marqeta or the card network has determined that the card is fraudulent.
   * * *IVR* - Indicates that the card transition was initiated through your Interactive Voice Response system.
   * * *SYSTEM* - Indicates that the card transition was initiated by Marqeta.
   * For example, Marqeta suspended the card due to excessive failed PIN entries.
   */
  channel: 'API' | 'IVR' | 'FRAUD' | 'ADMIN' | 'SYSTEM';

  /**
   * The date and time when the resource was created, in UTC.
   * `2021-10-26T20:03:05Z`, for example.
   * @format date-time
   */
  created_time?: string;

  /** A value of `true` indicates that you requested expedited processing of the card from your card fulfillment provider. */
  expedite?: boolean;

  /** The expiration date in `MMyy` format. */
  expiration: string;

  /** The expiration date and time in UTC format. */
  expiration_time: string;

  /** Specifies certain physical characteristics of a card, as well as shipment information. */
  fulfillment?: IFulfillment;

  /**
   * Provides status information about the card related to order and delivery.
   *
   * The possible fulfillment states are:
   * * *ISSUED:* Initial state of all newly created/issued cards
   * * *ORDERED:* Card ordered through card fulfillment provider
   * * *REJECTED:* Card rejected by card fulfillment provider
   * * *SHIPPED:* Card shipped by card fulfillment provider
   * * *DIGITALLY_PRESENTED:* Card digitally presented using the `/cards/{token}/showpan` endpoint; does not affect the delivery of physical cards
   */
  fulfillment_status:
    | 'ISSUED'
    | 'ORDERED'
    | 'REJECTED'
    | 'SHIPPED'
    | 'DELIVERED'
    | 'DIGITALLY_PRESENTED';

  /** The last four digits of the card PAN. */
  last_four: string;

  /** The primary account number (PAN) of the card. */
  pan: string;

  /** Specifies if the personal identification number (PIN) has been set for the card. */
  pin_is_set: boolean;

  /** Additional information about the state change. */
  reason?: string;

  /**
   * A standard code describing the reason for the transition:
   *
   * * *00:* Object activated for the first time
   * * *01:* Requested by you
   * * *02:* Inactivity over time
   * * *03:* This address cannot accept mail or the addressee is unknown
   * * *04:* Negative account balance
   * * *05:* Account under review
   * * *06:* Suspicious activity was identified
   * * *07:* Activity outside the program parameters was identified
   * * *08:* Confirmed fraud was identified
   * * *09:* Matched with an Office of Foreign Assets Control list
   * * *10:* Card was reported lost
   * * *11:* Card information was cloned
   * * *12:* Account or card information was compromised
   * * *13:* Temporary status change while on hold/leave
   * * *14:* Initiated by Marqeta
   * * *15:* Initiated by issuer
   * * *16:* Card expired
   * * *17:* Failed KYC
   * * *18:* Changed to `ACTIVE` because information was properly validated
   * * *19:* Changed to `ACTIVE` because account activity was properly validated
   * * *20:* Change occurred prior to the normalization of reason codes
   * * *21:* Initiated by a third party, often a digital wallet provider
   * * *22:* PIN retry limit reached
   * * *23:* Card was reported stolen
   * * *24:* Address issue
   * * *25:* Name issue
   * * *26:* SSN issue
   * * *27:* DOB issue
   * * *28:* Email issue
   * * *29:* Phone issue
   * * *30:* Account/fulfillment mismatch
   * * *31:* Other reason
   */
  reason_code?:
    | '00'
    | '01'
    | '02'
    | '03'
    | '04'
    | '05'
    | '06'
    | '07'
    | '08'
    | '09'
    | '10'
    | '11'
    | '12'
    | '13'
    | '14'
    | '15'
    | '16'
    | '17'
    | '18'
    | '19'
    | '20'
    | '21'
    | '22'
    | '23'
    | '24'
    | '25'
    | '26'
    | '27'
    | '28'
    | '29'
    | '30'
    | '31';

  /** Reissues the specified card (known as the "source" card). */
  reissue_pan_from_card_token?: string;

  /** Indicates the state of the card. */
  state: 'ACTIVE' | 'SUSPENDED' | 'TERMINATED' | 'UNACTIVATED';

  /** The unique identifier of the card transition. */
  token: string;

  /**
   * This field cannot be set directly using the `/cardtransitions` endpoint.
   * A card transition's `type` is managed by the Marqeta platform, based on the before and after state of the transition, as specified in the request's `state` field.
   *
   * This field appears only when populated by the card fulfillment provider.
   * The `type` field's possible values are:
   * * *state.activated:* Card was activated
   * * *state.reinstated:* Card was reinstated from a suspended state
   * * *state.suspended:* Card was suspended
   * * *state.terminated:* Card was terminated
   * * *fulfillment.digitally_presented:* Card was digitally presented using the `/cards/{token}/showpan` endpoint; does not affect the delivery of physical cards
   * * *fulfillment.issued:* Card was created/issued
   * * *fulfillment.ordered:* Card was ordered from the card fulfillment provider
   * * *fulfillment.rejected:* Card was rejected by the card fulfillment provider
   * * *fulfillment.reordered:* Card was reordered from the card fulfillment provider
   * * *fulfillment.shipped:* Card was shipped by the card fulfillment provider.
   */
  type:
    | 'fulfillment.issued'
    | 'state.activated'
    | 'state.suspended'
    | 'state.reinstated'
    | 'state.terminated'
    | 'state.limited'
    | 'fulfillment.ordered'
    | 'fulfillment.rejected'
    | 'fulfillment.shipped'
    | 'fulfillment.delivered'
    | 'fulfillment.digitally_presented';

  /** Contains customer-provided information about the cardholder that performed the transaction. */
  user?: ICardholderMetadata;

  /** The unique identifier of the cardholder. */
  user_token: string;

  /** Contains information about the user. */
  validations?: IValidationsResponse;
}

export interface ICardUpdateRequest {
  /**
   * Set to `true` to request expedited processing of the card by your card fulfillment provider.
   *
   * This expedited service is available for cards fulfilled by link:http://perfectplastic.com/[Perfect Plastic Printing], link:http://www.idemia.com[IDEMIA], and link:https://www.arroweye.com/[Arroweye Solutions].
   * *NOTE:* Contact your Marqeta representative for information regarding the cost of expedited service.
   */
  expedite?: boolean;

  /** Specifies certain physical characteristics of a card, as well as shipment information. */
  fulfillment?: IFulfillment;
  metadata?: Record<string, string>;

  /** The unique identifier of the card you want to update. */
  token: string;

  /** Specifies the user you want to associate with the card. */
  user_token?: string;
}

/**
* Contains 3-D Secure verification data:

* `electronic_commerce_indicator` – The level of verification performed.
* `verification_result` – The result of the verification.
* `verification_value_created_by` – The transaction participant who determined the verification result.
* `three_ds_message_version` – The 3D Secure message version used for authentication.
* `authentication_method` – The 3D Secure authentication method.
* `authentication_status` – The 3D Secure authentication status.
* `acquirer_exemption` – Indicates a 3D Secure authentication exemption from the acquirer.
* `issuer_exemption` – Indicates a 3D Secure authentication exemption from the issuer.
*/
export interface ICardholderAuthenticationData {
  /**
   * Indicates 3D Secure authentication exemptions from the acquirer.
   * This array is returned if it is included in the transaction data from the card network.
   */
  acquirer_exemption?: string[];

  /** Specifies the 3D Secure authentication method. */
  authentication_method?: string;

  /** Specifies the status of the 3D Secure authentication. */
  authentication_status?: string;

  /** The status of the verification attempt, as provided by a transaction participant. */
  electronic_commerce_indicator?: string;
  issuer_exemption?: string;

  /** Specifies the 3D Secure message version used for authentication. */
  three_ds_message_version?: string;

  /** The result of the verification attempt, as provided by a transaction participant. */
  verification_result?: string;

  /** Transaction participant who determined the verification result. */
  verification_value_created_by?: string;
}

/**
 * Contains GPA balance information for the cardholder.
 */
export interface ICardholderBalance {
  /**
   * Ledger balance minus any authorized transactions that have not yet cleared.
   * Also known as the cardholder's purchasing power.
   * When using JIT Funding, this balance is usually equal to $0.00.
   */
  available_balance: number;

  /** Contains GPA balance information, organized by currency code. */
  balances: Record<string, ICardholderBalance>;

  /** Not currently in use. */
  cached_balance: number;

  /** Not currently in use. */
  credit_balance: number;

  /** Currency of the funds used in the transaction. */
  currency_code: string;

  /** Balance change based on the amount of the transaction. */
  impacted_amount?: number;

  /**
   * The date and time when the resource was last updated, in UTC.
   * `2021-10-26T20:03:05Z`, for example.
   * @format date-time
   */
  last_updated_time: string;

  /**
   * When using standard funding: The funds that are available to spend immediately, including funds from any authorized transactions that have not yet cleared.
   *
   * When using Just-in-Time (JIT) Funding: Authorized funds that are currently on hold, but not yet cleared.
   */
  ledger_balance: number;

  /** ACH loads that have been accepted, but for which the funding time has not yet elapsed. */
  pending_credits: number;
}

/**
* Returns general purpose account (GPA) balances for a user or business. 
This object includes a link to balances of related user GPAs.
*/
export interface ICardholderBalances {
  /** Contains GPA balance information for the cardholder. */
  gpa: ICardholderBalance;

  /** An array of links to balances of related user GPAs. */
  links: ILink[];
}

/**
 * Contains customer-provided information about the cardholder that performed the transaction.
 */
export interface ICardholderMetadata {
  /** Associates customer-provided metadata with the cardholder. */
  metadata?: Record<string, string>;
}

/**
 * This object is deprecated, do not use.
 */
export interface ICardholderMsaBalance {
  available_balance: number;
  balances: Record<string, ICardholderBalance>;
  cached_balance: number;
  campaign_token?: string;
  credit_balance: number;
  currency_code: string;
  impacted_amount?: number;

  /** @format date-time */
  last_updated_time: string;
  ledger_balance: number;
  name: string;
  pending_credits: number;
}

/**
 * Specifies personalized images that appear on the card carrier.
 */
export interface ICarrier {
  /** Image to display on the card carrier. */
  logo_file?: string;

  /** Specifies a thumbnail-sized rendering of the image specified in the `logo_file` field. */
  logo_thumbnail_file?: string;

  /** Specifies a text file containing a custom message to print on the card carrier. */
  message_file?: string;

  /** Specifies a custom message that appears on the card carrier. */
  message_line?: string;

  /** Card carrier template to use. */
  template_id?: string;
}

/**
 * Contains the chargeback object associated with this transaction if a chargeback has been initiated.
 */
export interface IChargebackResponse {
  /**
   * Amount of the chargeback.
   * @min 0.01
   */
  amount: number;

  /** Channel the chargeback came through. */
  channel: 'GATEWAY' | 'GATEWAY_AUTOMATED' | 'ISSUER' | 'ISSUER_AUTOMATED';

  /**
   * Date and time when the chargeback was created.
   * Not returned for transactions when the associated chargeback is in the `INITIATED` state.
   * @format date-time
   */
  created_time: string;

  /** Whether to credit the user for the chargeback amount. */
  credit_user: boolean;

  /**
   * Date and time when the chargeback was last modified.
   * Not returned for transactions when the associated chargeback is in the `INITIATED` state.
   * @format date-time
   */
  last_modified_time: string;

  /** Additional comments about the chargeback. */
  memo?: string;

  /** Network handling the chargeback. */
  network: 'MARQETA' | 'DISCOVER' | 'MASTERCARD' | 'PULSE' | 'VISA';

  /** Network-assigned identifier of the chargeback. */
  network_case_id?: string;

  /** Identifies the standardized reason for the chargeback. */
  reason_code?: string;
  reason_description?:
    | 'SERVICE_NOT_PROVIDED_MERCHANDISE_NOT_RECEIVED'
    | 'CANCELLED_RECURRING_TRANSACTION'
    | 'NOT_AS_DESCRIBED_OR_DEFECTIVE_MERCHANDISE'
    | 'FRAUD_MULTIPLE_TRANSACTIONS'
    | 'FRAUD_TRANSACTION'
    | 'NO_AUTHORIZATION'
    | 'LATE_PRESENTMENT'
    | 'TRANSACTION_NOT_RECOGNIZED'
    | 'INCORRECT_CURRENCY_OR_TRANSACTION_CODE'
    | 'INCORRECT_TRANSACTION_AMOUNT_OR_ACCOUNT_NUMBER'
    | 'NOT_AUTHORIZED_CARD_PRESENT'
    | 'NOT_AUTHORIZED_CARD_ABSENT'
    | 'CREDIT_NOT_PROCESSED'
    | 'NON_RECEIPT_OF_CASH_OR_LOAD_TRANSACTION_VALUE_AT_ATM';

  /** State of the case. */
  state:
    | 'INITIATED'
    | 'REPRESENTMENT'
    | 'PREARBITRATION'
    | 'ARBITRATION'
    | 'CASE_WON'
    | 'CASE_LOST'
    | 'NETWORK_REJECTED'
    | 'WITHDRAWN';

  /** Unique identifier of the chargeback. */
  token: string;

  /** Unique identifier of the transaction being charged back. */
  transaction_token: string;
}

/**
 * Specifies the destination for overdraft funds.
 */
export interface IClearingAndSettlement {
  /**
   * Specifies the destination for overdraft funds.
   *
   * This field does not apply if JIT Funding is enabled.
   */
  overdraft_destination?:
    | 'GPA'
    | 'MSA'
    | 'MERCHANT_CAMPAIGN_ACCOUNT'
    | 'GLOBAL_OVERDRAFT_ACCOUNT';
}

/**
 * Defines program behavior when Commando Mode is enabled.
 */
export interface ICommandoModeEnables {
  /** The unique identifiers of the authorization controls enabled while in Commando Mode. */
  auth_controls?: string[];

  /** If `true`, transactions conducted while in Commando Mode proceed even when the card is suspended; if `false`, transactions conducted while Commando Mode is enabled are declined if the card is suspended. */
  ignore_card_suspended_state?: boolean;

  /** The unique identifier of the program funding source that substitutes for the program gateway funding source upon Commando Mode enablement. */
  program_funding_source: string;

  /** This field not in use. */
  use_cache_balance?: boolean;

  /** The unique identifiers of the velocity controls enabled while in Commando Mode. */
  velocity_controls?: string[];
}

/**
 * Describes the current state object of the Commando Mode control set.
 */
export interface ICommandoModeNestedTransition {
  /** The mechanism that changed the Commando Mode control set's state. */
  channel: 'API' | 'SYSTEM' | 'ADMIN';

  /**
   * Indicates whether Commando Mode is enabled.
   *
   * * If `commando_enabled` is `true` and `COMMANDO_MANUAL` is configured, all transactions are processed via Commando Mode.
   * * If `commando_enabled` is `true` and `COMMANDO_AUTO` is configured, Commando Mode is ready to intervene only when a transaction times out or encounters an error.
   */
  commando_enabled: boolean;

  /** Describes the reason why the current state of the Commando Mode control set was last changed. */
  reason?: string;

  /** Identifies the user who last changed the Commando Mode control set's state. */
  username?: string;
}

export interface ICommandoModeResponse {
  /** Defines program behavior when Commando Mode is enabled. */
  commando_mode_enables?: ICommandoModeEnables;

  /**
   * The date and time when the resource was created, in UTC.
   * @format date-time
   */
  created_time: string;

  /** Describes the current state object of the Commando Mode control set. */
  current_state?: ICommandoModeNestedTransition;

  /**
   * The date and time when the resource was last updated, in UTC.
   * @format date-time
   */
  last_modified_time: string;

  /** The unique identifier of the associated program gateway funding source. */
  program_gateway_funding_source_token?: string;

  /** Specifies which event types automatically enable Commando Mode. */
  real_time_standin_criteria?: IRealTimeStandinCriteria;

  /** The unique identifier of the Commando Mode control set. */
  token?: string;
}

export interface ICommandoModeTransitionResponse {
  /** The unique identifier of the Commando Mode control set. */
  commando_mode_token?: string;

  /**
   * The date and time when the resource was created, in UTC.
   * @format date-time
   */
  created_time: string;

  /** Identifies the user who changed the Commando Mode control set's state. */
  name?: string;

  /** The unique identifier of the Command Mode control set transition object. */
  token?: string;

  /** Describes the current state object of the Commando Mode control set. */
  transition?: ICommandoModeNestedTransition;

  /** Specifies the type of event that triggered the Commando Mode transition, such as a `connection_error` or `response_timeout`. */
  type?: string;
}

/**
 * Allows for configuration options for this group, including control over the expiration of authorizations and automatic increases to the authorization amount.
 */
export interface IConfig {
  /**
   * Controls the expiration of authorizations and automatic increases to the authorization amount for MCCs specified in this group.
   *
   * By default, these authorization controls apply program-wide, meaning that they apply to every card in your program.
   * You can, however, exempt cards associated with any particular card product by setting that card product's `allow_mcc_group_authorization_controls` field to `false`.
   */
  authorization_controls?: IAuthorizationControls;
}

export interface IControlTokenRequest {
  /** The unique identifier of the card for which you want to generate a control token. */
  card_token: string;

  /**
   * Specifies the type of action completed by this request.
   *
   * *WARNING:* Sending a request to this endpoint with a `SHOW_PIN` control token requires PCI DSS compliance.
   * The lifespan of the control token depends on the token type:
   * * *SET_PIN:* 60 minutes
   * * *SHOW_PIN:* 5 minutes
   */
  controltoken_type?: 'SET_PIN' | 'SHOW_PIN';
}

export interface IControlTokenResponse {
  /**
   * The unique value generated as a result of issuing a `POST` request to the `/pins/controltoken` endpoint.
   * This value cannot be updated.
   */
  control_token: string;
}

/**
 * Contains information about currency conversion.
 */
export interface ICurrencyConversion {
  /** Contains information from the card network about currency conversion, including the original currency of the transaction, the amount of the transaction in the original currency, and the conversion rate. */
  network?: INetwork;
}

export interface ICustomerDueDiligenceRequest {
  answer: string;
  question: string;
  token?: string;
}

export interface ICustomerDueDiligenceResponse {
  account_token: string;
  answer: string;
  bank: string;
  question: string;
  token: string;
  type: string;
}

export interface ICustomerDueDiligenceUpdateResponse {
  answer?: string;
}

/**
 * Contains information about the deposit account associated with the cardholder.
 */
export interface IDepositAccount {
  /** Account number assigned to the deposit account. */
  account_number: string;
  allow_immediate_credit?: boolean;

  /** The unique identifier of the business. */
  business_token?: string;

  /** Routing number assigned to the deposit account. */
  routing_number: string;

  /** The unique identifier of the direct deposit account resource. */
  token: string;

  /** The unique identifier of the cardholder. */
  user_token?: string;
}

export interface IDepositAccountUpdateRequest {
  allow_immediate_credit?: boolean;
}

/**
 * Contains information related to the device being provisioned.
 */
export interface IDevice {
  /** Identity number of the device. */
  device_id?: string;

  /** Device's IP address. */
  ip_address?: string;

  /** Language the device is configured to use. */
  language_code?: string;

  /** Geographic coordinates of the device. */
  location?: string;

  /** Name of the device. */
  name?: string;

  /** Device's telephone number. */
  phone_number?: string;

  /** Unique identifier of the device object. */
  token?: string;

  /** Type of device being provisioned. */
  type?: string;
}

/**
* Contains information about the digital wallet that funded the transaction.

Returned for all transactions funded by a digital wallet or related to digital wallet token provisioning.

For more on digital wallets, see the <</core-api/digital-wallets-management, Digital Wallets Management>> API reference and <</developer-guides/digital-wallets-and-tokenization, Digital Wallets and Tokenization>> developer guide.
*/
export interface IDigitalWalletToken {
  /** Contains address verification information. */
  address_verification?: IAddressVerification;

  /** Unique identifier of the card. */
  card_token?: string;

  /**
   * Date and time when the digital wallet token object was created.
   * @format date-time
   */
  created_time?: string;

  /** Contains information related to the device being provisioned. */
  device?: IDevice;

  /**
   * Digital wallet token's provisioning status.
   *
   * For fulfillment status descriptions, see <</core-api/digital-wallets-management#_create_digital_wallet_token_transition, Create Digital Wallet Token Transition>>.
   */
  fulfillment_status?: string;

  /**
   * The Marqeta platform's decision as to whether the digital wallet token should be provisioned.
   *
   * * *0000* – The token should be provisioned.
   * * *token.activation.verification.required* – Provisioning is pending; further action is required for completion.
   * For all other values, check the value of the `fulfillment_status` field to definitively ascertain the provisioning outcome.
   * *NOTE:* The value `invalid.cid` indicates an invalid CVV2 number.
   */
  issuer_eligibility_decision?: string;

  /**
   * Date and time when the digital wallet token object was last modified.
   * @format date-time
   */
  last_modified_time?: string;

  /** Contains additional information about the digital wallet token. */
  metadata?: IDigitalWalletTokenMetadata;

  /**
   * State of the digital wallet token.
   *
   * For state descriptions, see <</developer-guides/managing-the-lifecycle-of-digital-wallet-tokens#_transitioning_token_states, Transitioning Token States>>.
   */
  state?: string;

  /** Reason why the digital wallet token transitioned to its current state. */
  state_reason?: string;

  /** Unique identifier of the digital wallet token. */
  token?: string;

  /** Contains information held and provided by the token service provider (card network). */
  token_service_provider?: ITokenServiceProvider;

  /** Contains information about a cardholder. */
  user?: IUserCardHolderResponse;

  /** Contains information held and provided by the digital wallet provider. */
  wallet_provider_profile?: IWalletProviderProfile;
}

export interface IDigitalWalletTokenAddressVerification {
  /** Set to `true` to enable the address verification system (AVS) for provisioning. */
  validate?: boolean;
}

/**
 * Contains additional information about the digital wallet token.
 */
export interface IDigitalWalletTokenMetadata {
  /**
   * The language specified in the `config.transaction_controls.notification_language` field of the card product:
   * `ces` (Czech), `deu` (German), `eng` (English), `fra` (French), `ita` (Italian), `pol` (Polish), `spa` (Spanish), `swe` (Swedish)
   *
   * The ISO maintains the link:https://www.iso.org/iso-3166-country-codes.html[full list of ISO 3166 two- and three-digit numeric country codes].
   */
  cardproduct_preferred_notification_language?: string;

  /** The unique identifier of the product configuration on the Marqeta platform. */
  issuer_product_config_id?: string;
}

/**
 * Controls characteristics related to digital wallets.
 */
export interface IDigitalWalletTokenization {
  /**
   * Specifies the digital wallet card art identifier for the card product.
   * Digital wallets display the card art after the initial token has been provisioned and activated.
   * Digital wallet card art is updated for all wallets automatically whenever a tokenized card is reissued or replaced.
   *
   * * If your card program is Managed by Marqeta, Marqeta populates this field on your behalf.
   * * If your card program is Powered by Marqeta, you can obtain the correct card art identifier directly from Visa or Mastercard.
   * If this field is left blank, your card product inherits the card art assigned to the account BIN range.
   */
  card_art_id?: string;
  provisioning_controls?: IProvisioningControls;
}

export interface IDirectDepositAccountRequest {
  allow_immediate_credit?: boolean;

  /** Required if 'user_token' is null */
  business_token?: string;

  /** Required if account type = Checking */
  customer_due_diligence?: ICustomerDueDiligenceRequest[];
  token?: string;
  type?: 'DEPOSIT_ACCOUNT' | 'CHECKING' | 'SAVINGS';

  /** Required if 'business_token' is null */
  user_token?: string;
}

export interface IDirectDepositAccountResponse {
  account_number: string;
  allow_immediate_credit: boolean;
  business_token: string;

  /**
   * yyyy-MM-ddTHH:mm:ssZ
   * @format date-time
   */
  created_time: string;

  /**
   * yyyy-MM-ddTHH:mm:ssZ
   * @format date-time
   */
  last_modified_time: string;
  routing_number: string;
  state: string;
  token: string;
  type?: string;
  user_token: string;
}

export interface IDirectDepositAccountTransitionRequest {
  account_token: string;
  channel:
    | 'API'
    | 'IVR'
    | 'FRAUD'
    | 'ADMIN'
    | 'SYSTEM'
    | 'NETWORK'
    | 'PROD_SUPPORT'
    | 'UNSUPPORTED';
  reason?: string;
  state?:
    | 'ACTIVE'
    | 'SUSPENDED'
    | 'TERMINATED'
    | 'UNSUPPORTED'
    | 'UNACTIVATED'
    | 'LIMITED';
  token?: string;
}

export interface IDirectDepositAccountTransitionResponse {
  account_token: string;
  business_token: string;
  channel: string;

  /**
   * yyyy-MM-ddTHH:mm:ssZ
   * @format date-time
   */
  created_time: string;
  reason: string;
  state: string;
  token: string;
  user_token: string;
}

export interface IEchoPingRequest {
  /** The payload of the ping request. */
  payload?: string;

  /** The unique identifier of the ping request. */
  token?: string;
}

export interface IEchoPingResponse {
  id?: string;
  payload?: string;
  success?: boolean;
}

/**
* Specifies the length of time after the date of issue for which the cards are valid.

If this field is not specified, the card uses the `config.card_life_cycle.expiration_offset` of the bulk card order or card product as appropriate.
*/
export interface IExpirationOffset {
  /** Specifies the units for the `value` field. */
  unit?: 'YEARS' | 'MONTHS' | 'DAYS' | 'HOURS' | 'MINUTES' | 'SECONDS';

  /**
   * Specifies the number of time units (as defined by the `unit` field in this object) that this card is valid.
   * In other words, cards expire `value` x `unit` after the date of issue.
   *
   * This number is rounded as follows:
   * * *YEARS* - Rounds up to the last second of the last day of the month of expiration.
   * For example, if the issue date is 1 Jan 2021 and `value = 1`, the cards expire on the last day of Jan 2022.
   * * *MONTHS* - Rounds up to the last second of the last day of the month of expiration.
   * For example, if the issue date is 1 May 2022 and `value = 1`, the cards expire on the last day of June 2022.
   * * *DAYS* - Rounds up to the last second of the day of expiration.
   * * *HOURS*, *MINUTES*, *SECONDS* - No rounding.
   * @format int32
   */
  value?: number;
}

/**
 * Specifies the length of time after the date of issue for which cards of this card product type are valid.
 */
export interface IExpirationOffsetWithMinimum {
  /**
   * Specifies the minimum expiration offset allowed by this card product.
   * If not specified, the `min_offset` equals the `expiration_offset`.
   */
  min_offset?: IMinOffset;

  /** Specifies the units for the `value` field. */
  unit?: 'YEARS' | 'MONTHS' | 'DAYS' | 'HOURS' | 'MINUTES' | 'SECONDS';

  /**
   * Specifies the number of time units (as defined by the `unit` field in this object) that cards of this card product type are valid.
   * In other words, cards expire `value` x `unit` after the date of issue.
   *
   * This number is rounded as follows:
   * * *YEARS* – Rounds up to the last second of the last day of the month of expiration.
   * For example, if the issue date is 1 Jan 2021 and `value = 1`, the cards expire on the last day of Jan 2022.
   * * *MONTHS* – Rounds up to the last second of the last day of the month of expiration.
   * For example, if the issue date is 1 May 2022 and `value = 1`, the cards expire on the last day of June 2022.
   * * *DAYS* – Rounds up to the last second of the day of expiration.
   * * *HOURS*, *MINUTES*, *SECONDS* – No rounding.
   * @format int32
   */
  value?: number;
}

/**
 * Contains information about fees related to the transaction.
 */
export interface IFee {
  /** Indicates whether the fee is active. */
  active: boolean;

  /** Amount of the fee. */
  amount: number;

  /**
   * Date and time when the fee was created.
   * @format date-time
   */
  created_time: string;

  /** The three-digit ISO 4217 currency code. */
  currency_code: string;

  /**
   * Date and time when the fee was last modified.
   * @format date-time
   */
  last_modified_time: string;

  /** Name of the fee. */
  name: string;

  /** Contains information about the assessment of real-time fees. */
  real_time_assessment?: IRealTimeFeeAssessment;

  /** Descriptive metadata about the fee. */
  tags?: string;

  /** Unique identifier of the fee. */
  token: string;
}

/**
 * Contains information about a fee.
 */
export interface IFeeDetail {
  /** Contains information about fees related to the transaction. */
  fee: IFee;

  /** Additional text that describes the fee. */
  memo?: string;

  /** Comma-delimited list of tags describing the fee. */
  tags?: string;

  /** The unique identifier of the fee. */
  token: string;

  /** Unique identifier of the transaction. */
  transaction_token: string;
}

/**
 * Contains attributes that define characteristics of one or more fees.
 */
export interface IFeeModel {
  /** Memo or note describing the fee. */
  memo?: string;

  /** Comma-delimited list of tags describing the fee. */
  tags?: string;

  /** Specifies the fee to add. */
  token: string;
}

export interface IFeeRequest {
  /** Indicates whether the fee is active. */
  active?: boolean;

  /** The amount of the fee. */
  amount: number;

  /** The three-digit ISO 4217 currency code. */
  currency_code: string;

  /** The name of the fee request. */
  name: string;

  /** Controls the assessment of real-time fees. */
  real_time_assessment?: IRealTimeFeeAssessmentRequest;

  /** Descriptive metadata about the fee. */
  tags?: string;

  /**
   * The unique identifier of the fee.
   *
   * If you do not include a token, the system will generate one automatically.
   * This token is necessary for use in other API calls, so we recommend that rather than let the system generate one, you use a simple string that is easy to remember.
   * This value cannot be updated.
   */
  token?: string;
}

export interface IFeeTransferRequest {
  /**
   * Specifies the `business` account holder to which the fee applies.
   *
   * Pass either `business_token` or `user_token`, not both.
   */
  business_token: string;

  /** Contains attributes that define characteristics of one or more fees. */
  fees?: IFeeModel[];

  /** Metadata about the transfer. */
  tags?: string;

  /**
   * The unique identifier of the fee transfer.
   *
   * If you do not include a token, the system will generate one automatically.
   * This token is necessary for use in other API calls, so we recommend that rather than let the system generate one, you use a simple string that is easy to remember.
   * This value cannot be updated.
   */
  token?: string;

  /**
   * Specifies the `user` account holder to which the fee applies.
   *
   * Pass either `user_token` or `business_token`, not both.
   */
  user_token: string;
}

/**
 * Contains information about a fee transfer, including the amount, currency code, and user or business token.
 */
export interface IFeeTransferResponse {
  /**
   * The unique identifier of the `business` account holder.
   * Required if `user_token` is not specified.
   */
  business_token: string;

  /**
   * Date and time when the fee transfer was created.
   * @format date-time
   */
  created_time: string;

  /**
   * List of fees associated with the fee transfer.
   *
   * This array is returned if it exists in the resource.
   */
  fees: IFeeDetail[];

  /** Customer-defined tags for the fee transfer. */
  tags?: string;

  /** Unique identifier of the fee transfer. */
  token: string;

  /**
   * The unique identifier of the `user` account holder.
   * Required if `business_token` is not specified.
   */
  user_token: string;
}

export interface IFeeUpdateRequest {
  /** Indicates whether the fee is active. */
  active?: boolean;

  /** The amount of the fee. */
  amount?: number;

  /** The three-digit ISO 4217 currency code. */
  currency_code?: string;

  /** The name of the fee request. */
  name?: string;

  /** Controls the assessment of real-time fees. */
  real_time_assessment?: IRealTimeFeeAssessmentRequest;

  /** Descriptive metadata about the fee. */
  tags?: string;
}

export interface IFinancialRequestModel {
  amount: number;
  card_acceptor: ICardAcceptorModel;
  card_token: string;
  cash_back_amount?: number;
  is_pre_auth?: boolean;
  mid: string;
  pin?: string;
  transaction_options?: ITransactionOptions;
  webhook?: IWebhook;
}

/**
 * Contains one or more fraud determinations by the card network that apply to either the transaction or the cardholder's account.
 */
export interface IFraudView {
  issuer?: IIssuerFraudView;

  /** Contains network-provided information about fraud determinations. */
  network?: INetworkFraudView;
}

/**
 * Specifies certain physical characteristics of a card, as well as shipment information.
 */
export interface IFulfillment {
  /** Allows personalized attributes to be added to the card. */
  card_personalization: ICardPersonalization;

  /** Specifies the shipping details for the card. */
  shipping?: IShipping;
}

/**
 * Specifies a fulfillment shipping or return address.
 */
export interface IFulfillmentAddressRequest {
  /** Number and street. */
  address1?: string;

  /** Additional address information. */
  address2?: string;

  /** City. */
  city?: string;

  /** Country. */
  country?: string;

  /** First name. */
  first_name?: string;

  /** Last name. */
  last_name?: string;

  /** Middle name. */
  middle_name?: string;

  /** Telephone number. */
  phone?: string;

  /** Postal code. */
  postal_code?: string;

  /** State. */
  state?: string;

  /** United States ZIP code. */
  zip?: string;
}

/**
 * Contains funding information for the transaction, including the funding amount, type, and time.
 */
export interface IFunding {
  /** Amount of funds unloaded and returned to the funding source. */
  amount?: number;

  /** Contains information from the gateway in response to a funding request. */
  gateway_log?: IGatewayLogModel;

  /** Contains funding source information for the transaction, including the funding type and time. */
  source: IFundingSourceModel;

  /** Address information for a cardholder or funding source. */
  source_address?: ICardholderAddressResponse;
}

export interface IFundingAccountResponseModel {
  /**
   * The account identifier appended to the bank account number.
   * This field is returned if it exists in the resource.
   */
  account_suffix?: string;

  /**
   * The type of account.
   * This field is returned if it exists in the resource.
   */
  account_type?: string;

  /**
   * Specifies whether the account is active.
   * This field is returned if it exists in the resource.
   */
  active?: boolean;

  /**
   * The unique identifier of the `business` account holder.
   * This token is returned if a `user_token` is not specified.
   */
  business_token?: string;

  /**
   * The date and time when the resource was created, in UTC.
   * `2022-02-26T20:03:05Z`, for example.
   * @format date-time
   */
  created_time: string;

  /**
   * The date and time when the account was sent for verification, in UTC.
   * `2022-02-26T20:03:05Z`, for example.
   *
   * This field is returned if it exists in the resource.
   * @format date-time
   */
  date_sent_for_verification?: string;

  /**
   * The date and time when the account was verified, in UTC.
   * `2022-02-26T20:03:05Z`, for example.
   *
   * This field is returned if it exists in the resource.
   * @format date-time
   */
  date_verified?: string;

  /**
   * Payment card expiration date.
   * This field is returned if it exists in the resource.
   */
  exp_date?: string;

  /**
   * If there are multiple funding sources, this field specifies which source is used by default in funding calls.
   * If there is only one funding source, the system ignores this field and always uses that source.
   *
   * This field is returned if it exists in the resource.
   */
  is_default_account?: boolean;

  /**
   * The date and time when the resource was last modified, in UTC.
   * `2022-02-26T20:03:05Z`, for example.
   * @format date-time
   */
  last_modified_time: string;
  link_partner_account_reference_token?: string;

  /**
   * The name on the account.
   * This field is returned if it exists in the resource.
   */
  name_on_account?: string;
  partner?: string;

  /**
   * The unique identifier of the funding source.
   * This field is returned if it exists in the resource.
   */
  token?: string;

  /** The funding source type. */
  type?: string;

  /**
   * The unique identifier of the `user` account holder.
   * This token is returned if a `business_token` is not specified.
   */
  user_token?: string;

  /**
   * Free-form text field for holding notes about verification.
   * This field is returned only if `verification_override = true`.
   */
  verification_notes?: string;

  /** Allows the ACH funding source to be used regardless of its verification status. */
  verification_override?: boolean;

  /**
   * The account verification status.
   * This field is returned if it exists in the resource.
   */
  verification_status?: string;
}

/**
 * Contains funding source information for the transaction, including the funding type and time.
 */
export interface IFundingSourceModel {
  /** Whether the funding source is active. */
  active: boolean;

  /**
   * Date and time when the funding source was created.
   * @format date-time
   */
  created_time: string;

  /** Whether the GPA order unload's funding source is the default funding account. */
  is_default_account: boolean;

  /**
   * Date and time when the funding source was last modified.
   * @format date-time
   */
  last_modified_time: string;

  /** Unique identifier of the funding source. */
  token: string;

  /** Funding type of the funding source. */
  type: string;
}

/**
 * Contains information from the gateway in response to a funding request.
 */
export interface IGatewayLogModel {
  /**
   * Length of time in milliseconds the gateway took to respond to a funding request.
   * @format int64
   */
  duration?: number;

  /**
   * Message about the status of the funding request.
   * Useful for determining whether it was approved and completed successfully, declined by the gateway, or timed out.
   */
  message: string;

  /**
   * Customer order number.
   * Same value as `transaction.token`.
   */
  order_number: string;

  /** Contains information on the gateway's response to a funding request. */
  response?: IGatewayResponse;

  /** Whether the gateway sent a response (`true`) or timed out (`false`). */
  timed_out?: boolean;

  /** Customer-defined identifier for the transaction. */
  transaction_id: string;
}

export interface IGatewayProgramCustomHeaderUpdateRequest {
  /**
   * Additional custom information included in the HTTP header.
   * For example, this might contain security information, along with Basic Authentication, when making a JIT Funding request.
   * Custom headers also appear in the associated webhook's notifications.
   */
  custom_header?: Record<string, string>;
}

export interface IGatewayProgramFundingSourceRequest {
  /** Indicates whether the program gateway funding source is active. */
  active?: boolean;

  /** Password for authenticating your environment. */
  basic_auth_password: string;

  /** Username for authenticating your environment. */
  basic_auth_username: string;

  /**
   * Additional custom information included in the HTTP header.
   * For example, this might contain security information, along with Basic Authentication, when making a JIT Funding request.
   * Custom headers also appear in the associated webhook's notifications.
   */
  custom_header?: Record<string, string>;

  /** The name of the program gateway funding source. */
  name: string;

  /**
   * Total timeout in milliseconds for gateway processing.
   * @format int64
   * @min 1000
   * @max 7000
   */
  timeout_millis?: number;

  /**
   * The unique identifier of the program gateway funding source.
   * If you do not include a token, the system will generate one automatically.
   * As this token is necessary for use in other calls, we recommend that you define a simple and easy to remember string rather than letting the system generate a token for you.
   * This value cannot be updated.
   */
  token?: string;

  /** The URL of the gateway endpoint hosted in your environment, to which `POST` requests are submitted by the Marqeta platform. */
  url: string;

  /** Specifies whether or not to use mutual transport layer security (mTLS) authentication for the funding request. */
  use_mtls?: boolean;
}

export interface IGatewayProgramFundingSourceResponse {
  /** The bank account number. */
  account: string;

  /**
   * Indicates whether the program gateway funding source is active.
   * This field is returned if it exists in the resource.
   */
  active?: boolean;

  /** Password for authenticating your environment. */
  basic_auth_password: string;

  /** Username for authenticating your environment. */
  basic_auth_username: string;

  /**
   * The date and time when the resource was created, in UTC.
   * `2022-02-26T20:03:05Z`, for example.
   * @format date-time
   */
  created_time: string;

  /** Custom headers to be passed along with the request. */
  custom_header: Record<string, string>;

  /**
   * The date and time when the resource was last modified, in UTC.
   * `2022-02-26T20:03:05Z`, for example.
   * @format date-time
   */
  last_modified_time: string;
  name: string;

  /**
   * Total timeout in milliseconds for gateway processing.
   * @format int64
   */
  timeout_millis: number;
  token: string;

  /** The URL of the gateway endpoint hosted in your environment, to which `POST` requests are submitted by the Marqeta platform. */
  url: string;

  /** Specifies whether or not to use mutual transport layer security (mTLS) authentication for the funding request. */
  use_mtls: boolean;

  /** The program gateway funding source object version. */
  version: string;
}

export interface IGatewayProgramFundingSourceUpdateRequest {
  /** Indicates whether the program gateway funding source is active. */
  active?: boolean;

  /** Password for authenticating your environment. */
  basic_auth_password: string;

  /** Username for authenticating your environment. */
  basic_auth_username: string;

  /**
   * Additional custom information included in the HTTP header.
   * For example, this might contain security information, along with Basic Authentication, when making a JIT Funding request.
   * Custom headers also appear in the associated webhook's notifications.
   */
  custom_header?: Record<string, string>;

  /** The name of the program gateway funding source. */
  name?: string;

  /**
   * Total timeout in milliseconds for gateway processing.
   * @format int64
   * @min 1000
   * @max 7000
   */
  timeout_millis?: number;

  /** The URL of the gateway endpoint hosted in your environment, to which `POST` requests are submitted by the Marqeta platform. */
  url: string;

  /** Specifies whether or not to use mutual transport layer security (mTLS) authentication for the funding request. */
  use_mtls?: boolean;
}

/**
 * Contains information on the gateway's response to a funding request.
 */
export interface IGatewayResponse {
  /** Code received from the gateway. */
  code: string;

  /** Contains JIT funding gateway response data. */
  data?: IJitProgramResponse;
}

/**
* Contains information about the GPA order. 
See <</core-api/gpa-orders, GPA Orders>> for more information.
*/
export interface IGpa {
  /**
   * Available balance on the card after the reload has completed.
   *
   * This value must be greater than or equal to the value of `trigger_amount`.
   * Note that this is not the same as the amount added to the card, which will vary from reload to reload.
   * @min 0.01
   */
  reload_amount: number;

  /**
   * Threshold that determines when the reload happens.
   *
   * The reload is triggered when the balance drops below this amount.
   * @min 0.01
   */
  trigger_amount: number;
}

export interface IGpaRequest {
  /** The amount to fund. */
  amount: number;

  /**
   * The unique identifier of the business.
   *
   * Pass either a `business` token or a `user` token, not both.
   * Send a `GET` request to `/businesses` to retrieve business tokens.
   */
  business_token?: string;

  /** The three-digit ISO 4217 currency code. */
  currency_code: string;

  /** List of fees associated with the funding transaction. */
  fees?: IFeeModel[];

  /**
   * Identifies the funding source address to use for this order.
   * If your funding source is an ACH account, then a funding source address is not required. If your funding source is a payment card, you must have at least one funding source address in order to create a GPA order.
   * Send a `GET` request to `/fundingsources/addresses/user/{token}` to retrieve addresses for a specific user.
   */
  funding_source_address_token?: string;

  /**
   * Identifies the funding source to use for this order.
   *
   * You don't have to supply a funding source token value in this call if you have a default funding source set up (verify the funding source's `is_default_account` field).
   * If you have only one funding source, then this source is used as the default.
   * If you have multiple funding sources and none are configured as the default, then an error is returned.
   * Send a `GET` request to `/fundingsources/user/{user_token}` to retrieve funding source tokens for a user or to `/fundingsources/business/{business_token}` to retrieve funding source tokens for a business.
   */
  funding_source_token: string;

  /** Additional descriptive text. */
  memo?: string;

  /** Comma-delimited list of tags describing the order. */
  tags?: string;

  /**
   * The unique identifier of the GPA order.
   *
   * If you do not include a token, the system will generate one automatically.
   * This token is necessary for use in other calls, so we recommend that rather than let the system generate one, you use a simple string that is easy to remember.
   * This value cannot be updated.
   */
  token?: string;

  /**
   * The unique identifier of the user.
   *
   * Pass either a `user` token or a `business` token, not both.
   * Send a `GET` request to `/users` to retrieve business tokens.
   */
  user_token?: string;
}

/**
* Contains information about a GPA order, including fees, funding sources, and addresses. 
See <</core-api/gpa-orders, GPA Orders>> for more information.
*/
export interface IGpaResponse {
  /** Amount of the funding transaction. */
  amount: number;

  /**
   * The unique identifier of the `business` account holder.
   * Required if `user_token` is not specified.
   */
  business_token?: string;

  /**
   * Time when the funding transaction was last modified.
   * @format date-time
   */
  created_time: string;

  /** Currency code of the funding transaction. */
  currency_code: string;

  /**
   * List of fees associated with the GPA order.
   *
   * This array is returned if it exists in the resource.
   */
  fees?: IFeeDetail[];

  /** Contains funding information for the transaction, including the funding amount, type, and time. */
  funding: IFunding;

  /** Unique identifier of the funding source address. */
  funding_source_address_token?: string;

  /** Unique identifier of the funding source. */
  funding_source_token: string;

  /**
   * Message about the status of the funding request.
   * Useful for determining whether it was approved and completed successfully, declined by the gateway, or timed out.
   *
   * This field is returned if it exists in the resource.
   */
  gateway_message?: string;

  /**
   * Unique identifier of the JIT Funding request and response.
   *
   * This field is returned if it exists in the resource.
   * @format int64
   */
  gateway_token?: number;

  /** Contains JIT funding details for the transaction. */
  jit_funding?: IJitFundingApi;

  /**
   * Time when the funding transaction was last modified.
   * @format date-time
   */
  last_modified_time: string;

  /** Additional information describing the funding transaction. */
  memo?: string;

  /** Contains information about the response, including the response code and response memo. */
  response: IResponse;

  /** Current status of the funding transaction. */
  state: string;

  /** Custom-defined tags you create that are related to the funding transaction. */
  tags?: string;

  /** Unique identifier of the funding transaction. */
  token: string;

  /** Unique identifier of the transaction being funded. */
  transaction_token: string;

  /**
   * The unique identifier of the `user` account holder.
   * Required if `business_token` is not specified.
   */
  user_token?: string;
}

/**
 * Contains information about a GPA order unload, which unloads a GPA order by returning funds to the funding source.
 */
export interface IGpaReturns {
  /** Amount of funds to return to funding source. */
  amount: number;

  /**
   * Date and time when the GPA order unload was created, in UTC.
   * @format date-time
   */
  created_time: string;

  /** Contains funding information for the transaction, including the funding amount, type, and time. */
  funding: IFunding;

  /** Identifies the funding source used for this GPA order. */
  funding_source_address_token?: string;

  /** Unique identifier of the funding source to which to return funds. */
  funding_source_token: string;

  /** Contains JIT funding details for the transaction. */
  jit_funding?: IJitFundingApi;

  /**
   * Date and time when the GPA order unload was last modified.
   * @format date-time
   */
  last_modified_time: string;

  /** Additional descriptive text. */
  memo?: string;

  /** Identifies the original GPA order. */
  original_order_token?: string;

  /** Contains information about the response, including the response code and response memo. */
  response: IResponse;

  /** Current status of the GPA order unload. */
  state: string;

  /** Comma-delimited list of tags describing the GPA order. */
  tags?: string;

  /** Unique identifier of the GPA order unload. */
  token: string;

  /** Unique identifier of the original funding transaction to unload. */
  transaction_token: string;
}

/**
 * Controls automatic increases to the authorization amount for MCCs specified in this group.
 */
export interface IHoldIncrease {
  /** Controls whether the `value` field represents a fixed amount or a percentage of the authorization amount. */
  type: 'AMOUNT' | 'PERCENT' | 'UP_TO_LIMIT';

  /**
   * Specifies the amount of the automatic increase to the authorization amount.
   *
   * The `type` field controls whether this amount is a fixed amount or a percentage.
   */
  value: number;
}

/**
 * Specifies personalized images that appear on the card.
 */
export interface IImages {
  /** Specifies personalized images that appear on the card. */
  card?: IImagesCard;
  carrier?: IImagesCarrier;

  /** Specifies a PNG image to display in the return address window of envelopes used for sending cards to cardholders. */
  carrier_return_window?: IImagesCarrierReturnWindow;

  /** Specifies a PNG image of the cardholder's signature. */
  signature?: IImagesSignature;
}

/**
 * Specifies personalized images that appear on the card.
 */
export interface IImagesCard {
  /** Specifies a PNG image to display on the card. */
  name?: string;

  /** Specifies the color of the image displayed on the card. */
  thermal_color?: string;
}

/**
 * Specifies a PNG image to display in the return address window of envelopes used for sending cards to cardholders.
 */
export interface IImagesCarrierReturnWindow {
  /** Specifies a PNG image to display in the return-address window of envelopes used for sending cards to cardholders. */
  name?: string;
}

/**
 * Specifies a PNG image of the cardholder's signature.
 */
export interface IImagesSignature {
  /** Specifies a PNG image of the cardholder's signature. */
  name?: string;
}

export interface IInAppProvisioning {
  address_verification?: IDigitalWalletTokenAddressVerification;

  /** A value of `true` enables the type of provisioning controlled by the setting. */
  enabled?: boolean;
}

export interface IIssuerFraudView {
  recommended_action?: string;
  risk_level?: string;
  riskcontrol_tags?: IRiskcontrolTags[];
  rule_violations?: string[];

  /** @format int32 */
  score?: number;
}

/**
 * Contains address verification data consisting of address data entered by the cardholder, address data held by the Marqeta platform, and an assertion by the Marqeta platform as to whether the two sets of data match.
 */
export interface IJitAddressVerification {
  /** Contains address verification data consisting of address data entered by the cardholder, address data held by the Marqeta platform, and an assertion by the Marqeta platform as to whether the two sets of data match. */
  gateway?: IAddressVerificationSource;

  /** Contains address verification data consisting of address data entered by the cardholder, address data held by the Marqeta platform, and an assertion by the Marqeta platform as to whether the two sets of data match. */
  issuer?: IAddressVerificationSource;

  /** Contains address verification information provided by the cardholder or held on file by Marqeta. */
  request?: IAvsInformation;
}

/**
 * Governs the behavior of JIT Funding.
 */
export interface IJitFunding {
  paymentcard_funding_source?: IJitFundingPaymentcardFundingSource;
  program_funding_source?: IJitFundingProgramFundingSource;
  programgateway_funding_source?: IJitFundingProgramgatewayFundingSource;
}

/**
 * Contains JIT funding details for the transaction.
 */
export interface IJitFundingApi {
  /**
   * User who conducted the transaction.
   *
   * Can be a child user configured to share its parent's account balance.
   */
  acting_user_token?: string;

  /** Contains address verification data consisting of address data entered by the cardholder, address data held by the Marqeta platform, and an assertion by the Marqeta platform as to whether the two sets of data match. */
  address_verification?: IJitAddressVerification;

  /**
   * Requested amount of funding.
   *
   * *NOTE:* This field's value can differ from the transaction's top-level `amount` field or any other `amount` field within the transaction.
   * In particular, these fields will differ if the account being funded already has a positive account balance.
   * Associated fees can also cause these fields to differ.
   * @min 0
   */
  amount: number;

  /** Contains GPA balance information for the cardholder. */
  balances?: Record<string, ICardholderBalance>;

  /** The unique identifier of the `business` account holder. */
  business_token?: string;

  /** The reason that the transaction was declined. */
  decline_reason?:
    | 'INVALID_AMOUNT'
    | 'INSUFFICIENT_FUNDS'
    | 'TRANSACTION_NOT_PERMITTED'
    | 'SUSPECTED_FRAUD'
    | 'AMOUNT_LIMIT_EXCEEDED'
    | 'TRANSACTION_COUNT_LIMIT_EXCEEDED'
    | 'DUPLICATE_TRANSACTION'
    | 'INVALID_MERCHANT'
    | 'INVALID_CARD'
    | 'NO_CREDIT_ACCOUNT'
    | 'EXPIRED_CARD'
    | 'NO_CHECKING_ACCOUNT'
    | 'NO_SAVINGS_ACCOUNT'
    | 'STOP_PAYMENT'
    | 'REVOCATION_AUTHORIZATION_ORDER'
    | 'REVOCATION_ALL_AUTHORIZATION_ORDER'
    | 'SOFT_DECLINE_AUTHENTICATION_REQUIRED'
    | 'CLOSED_ACCOUNT';

  /** An array of JIT funding tokens for incremental authorization requests. */
  incremental_authorization_jit_funding_tokens?: string[];

  /** Additional information that describes the JIT funding transaction. */
  memo?: string;

  /** JIT Funding notification type. */
  method:
    | 'pgfs.authorization'
    | 'pgfs.balanceinquiry'
    | 'pgfs.authorization.incremental'
    | 'pgfs.authorization.capture'
    | 'pgfs.authorization.reversal'
    | 'pgfs.auth_plus_capture'
    | 'pgfs.refund'
    | 'pgfs.force_capture'
    | 'pgfs.authorization.capture.chargeback'
    | 'pgfs.authorization.capture.chargeback.reversal'
    | 'pgfs.pindebit.chargeback'
    | 'pgfs.pindebit.chargeback.reversal'
    | 'pgfs.dispute.credit'
    | 'pgfs.dispute.debit'
    | 'pgfs.directdeposit.credit'
    | 'pgfs.directdeposit.debit'
    | 'pgfs.directdeposit.credit.reversal'
    | 'pgfs.directdeposit.debit.reversal'
    | 'pgfs.adjustment.credit'
    | 'pgfs.adjustment.debit'
    | 'pgfs.auth_plus_capture.standin'
    | 'pgfs.authorization.standin'
    | 'pgfs.network.load'
    | 'pgfs.original.credit.authorization'
    | 'pgfs.original.credit.auth_plus_capture'
    | 'pgfs.refund.authorization'
    | 'pgfs.refund.authorization.reversalpgfs.billpayment'
    | 'pgfs.billpayment.capture'
    | 'pgfs.billpayment.reversal'
    | 'pgfs.authorization.account_verification';

  /**
   * Token of the first associated JIT Funding message.
   * Useful for correlating related JIT Funding messages (that is, those associated with the same GPA order).
   * Not included in the first of any set of related messages.
   */
  original_jit_funding_token?: string;

  /** Custom-defined tags you create that are related to the JIT funding transaction. */
  tags?: string;

  /** Unique identifier of the JIT Funding notification. */
  token: string;

  /** Unique identifier of the `user` account holder. */
  user_token: string;
}

export interface IJitFundingPaymentcardFundingSource {
  /**
   * Specifies whether JIT Funding is enabled or disabled for the payment card funding source.
   * A value of `true` indicates that the payment card funding source is enabled and will be debited when swipes occur.
   */
  enabled?: boolean;

  /** Specifies the return destination for refunds in the case of a transaction reversal. */
  refunds_destination?: 'GATEWAY' | 'GPA' | 'WATERFALL';
}

export interface IJitFundingProgramFundingSource {
  /**
   * Specifies whether JIT Funding is enabled or disabled for the program funding source.
   * A value of `true` indicates that the program funding source is enabled and will be debited when swipes occur.
   */
  enabled?: boolean;

  /**
   * The unique identifier of the already existing funding source.
   * Required if JIT Funding is enabled.
   */
  funding_source_token?: string;

  /**
   * Specifies the return destination for refunds in the case of a transaction reversal.
   * `PROGRAM_FUNDING_SOURCE` returns funds to the program funding source.
   * `GPA` returns the funds to the user's GPA.
   */
  refunds_destination?: 'PROGRAM_FUNDING_SOURCE' | 'GPA' | 'WATERFALL';
}

export interface IJitFundingProgramgatewayFundingSource {
  /** If set to `true`, this card product is always funded from this program gateway funding source. */
  always_fund?: boolean;

  /**
   * Specifies whether JIT Funding is enabled or disabled for the program gateway funding source.
   * A value of `true` indicates that the program gateway funding source is enabled and will be debited when swipes occur.
   */
  enabled?: boolean;

  /**
   * The unique identifier of the already existing funding source.
   * Required if JIT Funding is enabled.
   */
  funding_source_token?: string;

  /**
   * Specifies the return destination for refunds in the case of a transaction reversal.
   * In most cases, you should set the value to `GATEWAY`, which returns funds to the program gateway funding source.
   * Setting to `GPA` returns the funds to the user's GPA, which creates a positive account balance and introduces the potential of a transaction being authorized without a JIT Funding request being sent to the gateway.
   */
  refunds_destination?: 'GATEWAY' | 'GPA' | 'WATERFALL';
}

/**
 * Contains JIT funding gateway response data.
 */
export interface IJitProgramResponse {
  /** Contains JIT funding details for the transaction. */
  jit_funding: IJitFundingApi;
}

/**
 * A link to balances of related user GPAs.
 */
export interface ILink {
  /** The URL of the requested `/balances` resource. */
  href: string;

  /** The HTTP method of the link. */
  method: string;

  /** Specifies the relationship between the current resource and the linked resource. */
  rel: string;
}

export interface ILoginRequestModel {
  /** The cardholder's email address. */
  email?: string;

  /** Cardholder's `user` account password on the Marqeta platform. */
  password?: string;

  /** Identifies the cardholder to log in. */
  user_token?: string;
}

export interface ILoginResponseModel {
  /** Contains a cardholder's login access information. */
  access_token?: IAccessTokenResponse;

  /** Contains information about a cardholder. */
  user?: IUserCardHolderResponse;
}

export interface IManualEntry {
  address_verification?: IDigitalWalletTokenAddressVerification;

  /** A value of `true` enables the type of provisioning controlled by the setting. */
  enabled?: boolean;
}

export interface IMccGroupModel {
  /** Indicates if the group is active or inactive. */
  active?: boolean;

  /** Allows for configuration options for this group, including control over the expiration of authorizations and automatic increases to the authorization amount.  */
  config?: IConfig;

  /**
   * The set of merchant category codes that you want to include in this group.
   * For each element, valid characters are 0-9, and the length must be 4 digits.
   * You can also specify a range like "9876-9880".
   * An MCC can belong to more than one group.
   */
  mccs: object[];

  /** The name of the group. */
  name: string;

  /**
   * The unique identifier of the group.
   *
   * If you do not include a token, the system will generate one automatically.
   * This token is necessary for use in other API calls, so we recommend that rather than let the system generate one, you use a simple string that is easy to remember.
   * This value cannot be updated.
   */
  token?: string;
}

export interface IMccGroupUpdateModel {
  /** Indicates whether the MCC group is active or inactive. */
  active?: boolean;

  /** Allows for configuration options for this group, including control over the expiration of authorizations and automatic increases to the authorization amount.  */
  config?: IConfig;

  /**
   * The set of merchant category codes that you want to include in this group.
   * For each element, valid characters are 0-9, and the length must be 4 digits.
   * You can also specify a range like "9876-9880".
   * An MCC can belong to more than one group.
   *
   * Updating the merchant category codes for the group completely replaces the group's existing codes.
   * For example, if the current MCC group is `["1234"]` and you want to add the 2345 code (while retaining the existing code), you must specify `["1234", "2345"]` in this field.
   */
  mccs?: string[];

  /** The name of the MCC group. */
  name?: string;
}

export interface IMerchantCardRequest {
  card_product_token: string;
  expedite?: boolean;

  /**
   * Specifies the length of time after the date of issue for which the cards are valid.
   *
   * If this field is not specified, the card uses the `config.card_life_cycle.expiration_offset` of the bulk card order or card product as appropriate.
   */
  expiration_offset?: IExpirationOffset;
  metadata?: Record<string, string>;
}

export interface IMerchantGroupRequest {
  /** Indicates if the merchant group is active or not. */
  active?: boolean;

  /**
   * A comma-separated list of alphanumeric merchant identifiers.
   * You can include merchant identifiers in multiple merchant groups.
   */
  mids?: string[];

  /** The name of the merchant group. */
  name: string;

  /**
   * The unique identifier of the group.
   *
   * If you do not include a token, the system will generate one automatically.
   * This token is necessary for use in other API calls, so we recommend that rather than let the system generate one, you use a simple string that is easy to remember.
   * This value cannot be updated.
   */
  token?: string;
}

export interface IMerchantGroupResponse {
  /** Indicates if the merchant group is active or not. */
  active?: boolean;

  /**
   * The date and time when the resource was created, in UTC.
   * @format date-time
   */
  created_time?: string;

  /**
   * The date and time when the resource was last modified, in UTC.
   * @format date-time
   */
  last_modified_time?: string;

  /** A comma-separated list of alphanumeric merchant identifiers. */
  mids?: string[];

  /** The name of the merchant group. */
  name?: string;

  /** The unique identifier of the merchant group. */
  token?: string;
}

export interface IMerchantGroupUpdateRequest {
  /** Indicates if the merchant group is active or not. */
  active?: boolean;

  /**
   * A comma-separated list of alphanumeric merchant identifiers.
   * You can include merchant identifiers in multiple merchant groups.
   */
  mids?: string[];

  /** The name of the merchant group. */
  name?: string;
}

/**
 * Deprecated, do not use.
 */
export interface IMerchantResponseModel {
  active?: boolean;
  address1?: string;
  address2?: string;
  city?: string;
  contact?: string;
  contact_email?: string;
  country?: string;

  /**
   * yyyy-MM-ddTHH:mm:ssZ
   * @format date-time
   */
  created_time: string;

  /**
   * yyyy-MM-ddTHH:mm:ssZ
   * @format date-time
   */
  last_modified_time: string;

  /** @format float */
  latitude?: number;

  /** @format float */
  longitude?: number;
  name: string;
  partial_auth_flag?: boolean;
  phone?: string;
  province?: string;
  state?: string;

  /** The unique identifier of the merchant */
  token?: string;
  zip?: string;
}

/**
* Defines the group of merchants to which the velocity control applies.

Populate no more than one field of the `merchant_scope` object. 
If no fields are populated, the velocity control applies to all merchants. 
*/
export interface IMerchantScope {
  /**
   * MCC (Merchant Category Code).
   * Identifies the type of products or services provided by the merchant.
   *
   * Enter a value to control spending on a particular type of product or service.
   */
  mcc?: string;

  /**
   * Token identifying a group of MCCs.
   * Enter a value to control spending on a group of product or service types.
   *
   * Send a `GET` request to `/mccgroups` to retrieve MCC group tokens.
   */
  mcc_group?: string;

  /**
   * Token identifying a group of merchants.
   *
   * Send a `GET` request to `/merchantgroups` retrieve merchant group tokens.
   */
  merchant_group_token?: string;

  /**
   * MID (Merchant ID).
   * The unique identification number of a merchant.
   *
   * Enter a value to control spending with a particular merchant.
   */
  mid?: string;
}

/**
* Specifies the minimum expiration offset allowed by this card product.
If not specified, the `min_offset` equals the `expiration_offset`. 
*/
export interface IMinOffset {
  /** Specifies the units for the `value` field. */
  unit?: 'YEARS' | 'MONTHS' | 'DAYS' | 'HOURS' | 'MINUTES' | 'SECONDS';

  /**
   * Specifies the number of time units (as defined by the `unit` field) that cards of this card product type are valid.
   * In other words, cards expire `value` x `unit` after the date of issue.
   *
   * This number is rounded as follows:
   * * *YEARS* – Rounds up to the last second of the last day of the month of expiration.
   * For example, if the issue date is 1 Jan 2021 and `value = 1`, the cards expire on the last day of Jan 2022.
   * * *MONTHS* – Rounds up to the last second of the last day of the month of expiration.
   * For example, if the issue date is 1 May 2022 and `value = 1`, the cards expire on the last day of June 2022.
   * * *DAYS* – Rounds up to the last second of the day of expiration.
   * * *HOURS*, *MINUTES*, *SECONDS* – No rounding.
   * @format int32
   */
  value?: number;
}

/**
 * Deprecated, do not use.
 */
export interface IMsa {
  campaign_token: string;

  /** @min 0.01 */
  reload_amount: number;

  /** @min 0.01 */
  trigger_amount: number;
}

/**
 * Deprecated, do not use.
 */
export interface IMsaAggregatedBalances {
  available_balance: number;
  balances: Record<string, IMsaAggregatedBalances>;
  cached_balance: number;
  credit_balance: number;

  /** The three-digit ISO 4217 currency code. */
  currency_code: string;
  impacted_amount?: number;

  /** @format date-time */
  last_updated_time: string;
  ledger_balance: number;
  pending_credits: number;
}

/**
 * Deprecated, do not use.
 */
export interface IMsaBalances {
  available_balance: number;
  balances: Record<string, IMsaBalances>;
  cached_balance: number;
  credit_balance: number;
  currency_code: string;
  impacted_amount?: number;

  /** @format date-time */
  last_updated_time: string;
  ledger_balance: number;
  pending_credits: number;
}

/**
 * Deprecated, do not use.
 */
export interface IMsaOrderResponse {
  active: boolean;

  /** Deprecated, do not use. */
  aggregated_balances: IMsaAggregatedBalances;
  business_token?: string;
  campaign_token: string;

  /**
   * yyyy-MM-ddTHH:mm:ssZ
   * @format date-time
   */
  created_time: string;
  currency_code: string;

  /**
   * yyyy-MM-ddThh:mm:ssZ
   * @format date-time
   */
  end_date?: string;

  /** Contains funding information for the transaction, including the funding amount, type, and time. */
  funding: IFunding;

  /**
   * yyyy-MM-ddTHH:mm:ssZ
   * @format date-time
   */
  last_modified_time: string;

  /**
   * yyyy-MM-ddThh:mm:ssZ
   * @format date-time
   */
  last_transaction_date: string;

  /** Deprecated, do not use. */
  order_balances: IMsaBalances;
  purchase_amount: number;
  reward_amount: number;
  reward_trigger_amount: number;

  /**
   * yyyy-MM-ddThh:mm:ssZ
   * @format date-time
   */
  start_date?: string;
  token?: string;
  transaction_token: string;
  unloaded_amount?: number;
  user_token?: string;
}

/**
 * Deprecated, do not use.
 */
export interface IMsaReturns {
  active: boolean;

  /** Deprecated, do not use. */
  aggregated_balances: IMsaAggregatedBalances;
  amount: number;
  business_token?: string;
  campaign_token: string;

  /**
   * yyyy-MM-ddTHH:mm:ssZ
   * @format date-time
   */
  created_time: string;
  currency_code: string;

  /**
   * yyyy-MM-ddThh:mm:ssZ
   * @format date-time
   */
  end_date?: string;

  /** Contains funding information for the transaction, including the funding amount, type, and time. */
  funding: IFunding;

  /**
   * yyyy-MM-ddTHH:mm:ssZ
   * @format date-time
   */
  last_modified_time: string;

  /**
   * yyyy-MM-ddThh:mm:ssZ
   * @format date-time
   */
  last_transaction_date: string;

  /** Deprecated, do not use. */
  order_balances: IMsaBalances;
  original_order_token: string;
  reward_amount: number;
  reward_trigger_amount: number;

  /**
   * yyyy-MM-ddThh:mm:ssZ
   * @format date-time
   */
  start_date?: string;
  token?: string;
  transaction_token: string;
  unloaded_amount?: number;
  user_token?: string;
}

/**
 * Contains information from the card network about currency conversion, including the original currency of the transaction, the amount of the transaction in the original currency, and the conversion rate.
 */
export interface INetwork {
  /**
   * Conversion rate between the origination currency and the settlement currency.
   *
   * Returned when the transaction currency is different from the origination currency.
   */
  conversion_rate?: number;

  /** Indicates whether currency conversion was performed dynamically at the point of sale. */
  dynamic_currency_conversion?: boolean;

  /** Amount of the transaction in the currency in which it originated. */
  original_amount?: number;

  /** Currency type of the origination currency. */
  original_currency_code?: string;

  /** Contains information from the card network about currency conversion at the time of settlement, including the original currency of the transaction, the amount of the transaction in the original currency, and the conversion rate. */
  settlement_data?: ISettlementData;
}

/**
 * Contains card network fees assessed against the cardholder.
 */
export interface INetworkFeeModel {
  /** The amount of the network fee. */
  amount?: number;

  /**
   * Indicates whether the fee is a credit or a debit.
   *
   * * *C* indicates a credit
   * * *D* indicates a debit
   */
  credit_debit?: 'C' | 'D';

  /** The type of fee assessed by the card network. */
  type?:
    | 'ISSUER_FEE'
    | 'SWITCH_FEE'
    | 'PINDEBIT_ASSOC_FEE'
    | 'ACQUIRER_FEE'
    | 'INTERCHANGE_FEE'
    | 'CUR_CONV_CARDHOLDER_FEE'
    | 'CUR_CONV_ISSUER_FEE'
    | 'CROSS_BORDER_ISSUER_FEE';
}

/**
 * Contains network-provided information about fraud determinations.
 */
export interface INetworkFraudView {
  /**
   * _(Visa only)_ Account holder risk condition code evaluated by the card network.
   * A higher score indicates a greater likelihood that the card number is compromised.
   */
  account_risk_score?: string;

  /** _(Visa only)_ Unique code that describes the main driver of the `account_risk_score`. */
  account_risk_score_reason_code?: string;

  /**
   * Network-provided risk score for the transaction.
   * A higher score indicates higher risk.
   * Useful for making authorization decisions.
   * @format int32
   */
  transaction_risk_score?: number;

  /** _(Mastercard only)_ Unique code that describes the main driver of the `transaction_risk_score`. */
  transaction_risk_score_reason_code?: string;

  /** _(Mastercard only)_ Description of the `transaction_risk_score_reason_code`. */
  transaction_risk_score_reason_description?: string;
}

/**
* Contains network-related metadata for the transaction, including details about the card program and the card product.

May be returned if the request uses Transaction Model V2 of the Marqeta Core API. 
Not returned for V1 requests.
*/
export interface INetworkMetadata {
  /**
   * Product identification value assigned by the card network to each card product.
   * Can be used to track card-level activity by individual account number for premium card products.
   */
  product_id?: string;

  /** Program identification number used with `product_id` that identifies the programs associated with a card within a program registered by the issuer with the card network. */
  program_id?: string;

  /** Indicates whether or not the base spend-assessment threshold defined by the card network has been met. */
  spend_qualifier?: string;

  /** Name of the surcharge-free ATM network used to complete the transaction. */
  surcharge_free_atm_network?: string;
}

/**
 * Deprecated, do not use.
 */
export interface IOfferModel {
  active?: boolean;
  campaign_token: string;
  currency_code: string;

  /** @format date-time */
  end_date?: string;
  name: string;
  purchase_amount: number;
  reward_amount: number;
  reward_trigger_amount?: number;

  /** @format date-time */
  start_date?: string;
  token?: string;
}

/**
 * Deprecated, do not use.
 */
export interface IOfferOrderAggregatedBalances {
  available_balance: number;
  balances: Record<string, IOfferOrderAggregatedBalances>;
  cached_balance: number;
  credit_balance: number;
  currency_code: string;
  impacted_amount?: number;

  /** @format date-time */
  last_updated_time: string;
  ledger_balance: number;
  pending_credits: number;
}

/**
 * Deprecated, do not use.
 */
export interface IOfferOrderBalances {
  available_balance: number;
  balances: Record<string, IOfferOrderBalances>;
  cached_balance: number;
  credit_balance: number;
  currency_code: string;
  impacted_amount?: number;

  /** @format date-time */
  last_updated_time: string;
  ledger_balance: number;
  pending_credits: number;
}

/**
 * Deprecated, do not use.
 */
export interface IOfferOrderResponse {
  business_token?: string;

  /**
   * yyyy-MM-ddTHH:mm:ssZ
   * @format date-time
   */
  created_time: string;

  /** Contains funding information for the transaction, including the funding amount, type, and time. */
  funding?: IFunding;

  /**
   * yyyy-MM-ddTHH:mm:ssZ
   * @format date-time
   */
  last_modified_time: string;

  /**
   * yyyy-MM-ddThh:mm:ssZ
   * @format date-time
   */
  last_transaction_date: string;

  /** Deprecated, do not use. */
  offer?: IOfferModel;

  /** Deprecated, do not use. */
  order_aggregated_balances: IOfferOrderAggregatedBalances;

  /** Deprecated, do not use. */
  order_balances: IOfferOrderBalances;
  token: string;
  user_token?: string;
}

export interface IOneTimeRequestModel {
  /**
   * Cardholder's email address.
   *
   * Required when neither the user token nor the admin access token is provided as the Basic Authentication password (case #3).
   */
  email?: string;

  /**
   * Cardholder's `user` account password on the Marqeta platform.
   *
   * Required when neither the user token nor the admin access token is provided as the Basic Authentication password (case #3).
   */
  password?: string;

  /**
   * Identifies the cardholder whose data is accessed.
   * Send a `GET` request to `/users` to retrieve cardholder tokens.
   *
   * Required when the Basic Authentication password is set to an admin access token (case #2).
   */
  user_token?: string;
}

/**
 * Defines the balance threshold and reload amounts.
 */
export interface IOrderScope {
  /**
   * Contains information about the GPA order.
   * See <</core-api/gpa-orders, GPA Orders>> for more information.
   */
  gpa?: IGpa;

  /** Deprecated, do not use. */
  msa?: IMsa;
}

/**
 * Contains information about an original credit transaction (OCT), which enables the cardholder to receive funds on the specified card from an external source via the card network.
 */
export interface IOriginalCredit {
  deferred_hold_by?: 'ABSENT' | 'ORIGINATOR' | 'VISA';

  /** Sender's account from which the OCT draws funds. */
  funding_source?:
    | 'CREDIT'
    | 'DEBIT'
    | 'PREPAID'
    | 'DEPOSIT_ACCOUNT'
    | 'CASH'
    | 'MOBILE_MONEY_ACCOUNT'
    | 'NON_VISA_CREDIT';

  /**
   * Sanctions screening score to assist with meeting Anti-Money Laundering (AML) obligations.
   *
   * Higher scores indicate that the sender's data more closely resembles an entry on the regulatory watchlist.
   * A value of 999 means that no screening score is available.
   */
  screening_score?: string;

  /** The type of account from which the OCT draws funds. */
  sender_account_type?:
    | 'OTHER'
    | 'RTN_BANK_ACCOUNT'
    | 'IBAN'
    | 'CARD_ACCOUNT'
    | 'EMAIL'
    | 'PHONE_NUMBER'
    | 'BANK_ACCOUNT_NUMBER_AND_BANK_IDENTIFICATION_CODE'
    | 'WALLET_ID'
    | 'SOCIAL_NETWORK_ID';

  /** Sender's street address. */
  sender_address?: string;

  /** Sender's city. */
  sender_city?: string;

  /** Sender's country. */
  sender_country?: string;

  /** Full name of the sender. */
  sender_name?: string;

  /** Sender's state. */
  sender_state?: string;

  /** The purpose of the original credit transaction. */
  transaction_purpose?: string;

  /** Type of original credit transaction. */
  transaction_type?:
    | 'ACCOUNT_TO_ACCOUNT'
    | 'PERSON_TO_PERSON'
    | 'WALLET_TRANSFER'
    | 'MONEY_TRANSFER_BY_BANK'
    | 'BUSINESS_TO_BUSINESS'
    | 'DISBURSEMENT'
    | 'GOVERNMENT_DISBURSEMENT'
    | 'GAMBLING_PAYOUT'
    | 'LOYALTY'
    | 'MERCHANT_DISBURSEMENT'
    | 'ONLINE_GAMBLING_PAYOUT'
    | 'PENSION_DISBURSEMENT'
    | 'PREPAID_LOADS'
    | 'CARD_BILL_PAYMENT'
    | 'BILL_PAYMENT'
    | 'CASH_CLAIM'
    | 'CASH_IN'
    | 'CASH_OUT'
    | 'MOBILE_AIR_TIME_PAYMENT'
    | 'MONEY_TRANSFER_BY_MERCHANT'
    | 'FACE_TO_FACE_MERCHANT_PAYMENT'
    | 'GOVERNMENT_PAYMENT'
    | 'PAYMENTS_GOODS_SERVICES'
    | 'FUNDS_TRANSFER'
    | 'GENERAL_BUSINESS_TO_BUSINESS_TRANSFER'
    | 'CASH_DEPOSIT';
}

export interface IOriginalCreditSenderData {
  deferred_hold_by?: 'absent' | 'visa' | 'originator';
  funding_source:
    | 'credit'
    | 'debit'
    | 'prepaid'
    | 'deposit_account'
    | 'cash'
    | 'mobile_money_payment'
    | 'non_visa_credit';
  sender_account_number?: string;
  sender_account_type?:
    | 'other'
    | 'rtn_bank_account'
    | 'iban'
    | 'card_account'
    | 'email'
    | 'phone_number'
    | 'bank_account_number_and_identification_code'
    | 'wallet_id'
    | 'social_network_id';
  sender_address?: string;
  sender_city?: string;
  sender_country?: string;
  sender_name?: string;
  sender_reference_number?: string;
  sender_state?: string;
  transaction_purpose?:
    | 'family_support'
    | 'labor_transfers'
    | 'travel'
    | 'education'
    | 'medical_treatment'
    | 'emergency_need'
    | 'savings'
    | 'gifts'
    | 'other'
    | 'salary'
    | 'lending'
    | 'crypto_currency';
  unique_transaction_reference_number?: string;
  visa_transaction_purpose?: string;
}

export interface IOrignalcreditRequestModel {
  amount: number;
  card_acceptor?: ICardAcceptorModel;
  card_token: string;
  mid: string;
  screening_score?: string;
  sender_data?: IOriginalCreditSenderData;
  transactionPurpose?: string;
  type:
    | 'account_to_account'
    | 'person_to_person'
    | 'prepaid'
    | 'wallet_transfer'
    | 'money_transfer_by_bank'
    | 'business_to_business'
    | 'disbursement'
    | 'government_disbursement'
    | 'gambling_payout'
    | 'loyalty'
    | 'merchant_disbursement'
    | 'online_gambling_payout'
    | 'pension_disbursement'
    | 'prepaid_loads'
    | 'card_bill_payment'
    | 'bill_payment'
    | 'cash_claim'
    | 'cash_in'
    | 'cash_out'
    | 'mobile_air_time_payment'
    | 'money_transfer_by_merchant'
    | 'face_to_face_merchant_payment'
    | 'government_payment'
    | 'payments_goods_services';
  webhook?: IWebhook;
}

/**
 * Allows for configuration of points of interaction other than ecommerce or ATMs, such as points of sale (POS).
 */
export interface IOtherPoi {
  /**
   * If set to `true`, card transactions at points of interaction other than ecommerce or ATMs are allowed.
   * This group includes points of sale (POS).
   */
  allow?: boolean;

  /** If set to `true`, cards of this card product type are required to be present during the transaction, such as in IVR scenarios. */
  card_presence_required?: boolean;

  /** A value of `true` indicates that the cardholder is required to be present, such as in a restaurant where the card is present but the cardholder is not present when the card is swiped. */
  cardholder_presence_required?: boolean;
  track1_discretionary_data?: string;
  track2_discretionary_data?: string;
}

export interface IPanRequest {
  /**
   * The three-digit card verification value (CVV2) included on the back of the card.
   *
   * This value cannot be updated.
   */
  cvv_number?: string;

  /** Card expiration date. */
  expiration?: string;

  /** The PAN of the card whose information you want to retrieve. */
  pan: string;
}

export interface IPanResponse {
  /** The unique identifier of the card. */
  card_token: string;

  /**
   * The date and time when the resource was created, in UTC.
   * `2021-10-26T20:03:15Z`, for example.
   * @format date-time
   */
  created_time: string;

  /**
   * The date and time when the resource was last modified, in UTC.
   * `2021-10-26T20:03:15Z`, for example.
   * @format date-time
   */
  last_modified_time: string;

  /** The unique identifier of the cardholder. */
  user_token: string;
}

export interface IPasswordUpdateModel {
  /** The current password. */
  current_password: string;

  /** The new password. */
  new_password: string;
}

export interface IPaymentCardResponseModel {
  /** The account identifier appended to the payment card number. */
  account_suffix: string;

  /** The type of payment card account. */
  account_type: string;

  /** Specifies whether the account is active. */
  active: boolean;

  /**
   * The unique identifier of the `business` account holder.
   * This token is returned if a `user_token` is not specified.
   */
  business_token?: string;

  /**
   * The date and time when the resource was created, in UTC.
   * `2022-02-26T20:03:05Z`, for example.
   * @format date-time
   */
  created_time: string;

  /** Payment card expiration date. */
  exp_date: string;

  /**
   * If there are multiple funding sources, this field specifies which source is used by default in funding calls.
   * If there is only one funding source, the system ignores this field and always uses that source.
   */
  is_default_account: boolean;

  /**
   * The date and time when the resource was last modified, in UTC.
   * `2022-02-26T20:03:05Z`, for example.
   * @format date-time
   */
  last_modified_time: string;

  /** The unique identifier of the funding source. */
  token: string;

  /** The funding source type. */
  type: string;

  /**
   * The unique identifier of the `user` account holder.
   * This token is returned if a `business_token` is not specified.
   */
  user_token?: string;
}

export interface IPeerTransferRequest {
  /** The amount of the transfer. */
  amount: number;

  /** The three-digit ISO 4217 currency code. */
  currency_code: string;

  /** Additional descriptive text about the transfer. */
  memo?: string;

  /**
   * Specifies the `business` account holder that receives funds.
   *
   * Send a `GET` request to `/businesses` to retrieve business tokens.
   */
  recipient_business_token?: string;

  /**
   * Specifies the `user` account holder that receives funds.
   *
   * Send a `GET` request to `/users` to retrieve user tokens.
   */
  recipient_user_token?: string;

  /**
   * Specifies the `business` account holder that sends funds.
   *
   * Send a `GET` request to `/businesses` to retrieve business tokens.
   */
  sender_business_token?: string;

  /**
   * Specifies the `user` account holder that sends funds.
   *
   * Send a `GET` request to `/users` to retrieve user tokens.
   */
  sender_user_token?: string;

  /** Metadata about the peer transfer. */
  tags?: string;

  /**
   * The unique identifier of the peer transfer request.
   *
   * If you do not include a token, the system will generate one automatically.
   * This token is necessary for use in other API calls, so we recommend that rather than let the system generate one, you use a simple string that is easy to remember.
   * This value cannot be updated.
   */
  token?: string;
}

/**
* Contains information about a peer transfer, including sender and recipient tokens, transfer amount, and currency code. 
See <</core-api/peer-transfers, Peer Transfers>> for more information.
*/
export interface IPeerTransferResponse {
  /** Amount of the peer transfer. */
  amount: number;

  /**
   * Date and time when the peer transfer was created.
   * @format date-time
   */
  created_time: string;

  /** The three-digit ISO 4217 currency code. */
  currency_code: string;

  /** Additional comments about the peer transfer. */
  memo?: string;

  /** Specifies the `business` account holder that receives funds. */
  recipient_business_token?: string;

  /** Specifies the `user` account holder that receives funds. */
  recipient_user_token?: string;

  /** Specifies the `business` account holder that sends funds. */
  sender_business_token?: string;

  /** Specifies the `user` account holder that sends funds. */
  sender_user_token?: string;

  /** Custom-defined tags you create that are related to the peer transfer. */
  tags?: string;

  /** Unique identifier of the peer transfer request. */
  token: string;
}

export interface IPinRequest {
  /**
   * The unique value generated as a result of issuing a `POST` request to the `/pins/controltoken` endpoint.
   * This value cannot be updated.
   */
  control_token: string;

  /** The four-digit number to associate with the card. */
  pin: string;
}

export interface IPinRevealRequest {
  /**
   * The supplemental method used to verify the cardholder's identity before revealing the card's PIN.
   *
   * The possible cardholder verification methods are:
   * * *BIOMETRIC_FACE:* In-app authentication via facial recognition
   * * *BIOMETRIC_FINGERPRINT:* In-app authentication via biometric fingerprint
   * * *LOGIN:* In-app authentication by re-entering the app password
   * * *EXP_CVV:* In-app authentication by entering the card's expiration date and CVV
   * * *OTP:* Two-factor authentication involving a one-time password (OTP)
   * * *OTP_CVV:* Two-factor authentication involving the card's CVV and an OTP
   * * *OTHER:* Authentication that relies on other secure methods
   */
  cardholder_verification_method:
    | 'BIOMETRIC_FACE'
    | 'BIOMETRIC_FINGERPRINT'
    | 'LOGIN'
    | 'EXP_CVV'
    | 'OTP_CVV'
    | 'OTP'
    | 'OTHER';

  /**
   * The unique value generated as a result of issuing a `POST` request to the `/pins/controltoken` endpoint.
   * This value cannot be updated.
   */
  control_token: string;
}

export interface IPingResponse {
  env?: string;
  id?: string;
  revision?: string;
  success?: boolean;
  timestamp?: string;
  version?: string;
}

/**
 * Governs the point of interaction.
 */
export interface IPoi {
  /** A value of `true` enables cards to be used for withdrawing cash at an ATM and for receiving cash back at a point of sale (POS). */
  atm?: boolean;

  /** A value of `true` enables cards to be used for online purchases. */
  ecommerce?: boolean;

  /** Allows for configuration of points of interaction other than ecommerce or ATMs, such as points of sale (POS). */
  other?: IOtherPoi;
}

/**
* Contains information about the point of sale, including details on how the card was presented.

May be returned if the request uses Transaction Model V2 of the Marqeta Core API. 
Not returned for V1 requests. 
*/
export interface IPos {
  /** How the terminal accepts card data. */
  card_data_input_capability?:
    | 'UNKNOWN'
    | 'NO_TERMINAL'
    | 'MAG_STRIPE'
    | 'MAG_STRIPE_CONTACTLESS'
    | 'MAG_STRIPE_KEY_ENTRY'
    | 'CHIP'
    | 'CHIP_CONTACTLESS'
    | 'CHIP_MAG_STRIPE'
    | 'CHIP_MAG_STRIPE_KEY_ENTRY'
    | 'KEY_ENTRY'
    | 'OCR'
    | 'MICR'
    | 'BAR_CODE';

  /** Whether the cardholder was present during the transaction. */
  card_holder_presence?: boolean;

  /** Whether the card was present during the transaction. */
  card_presence?: boolean;

  /** Method used to authenticate the cardholder. */
  cardholder_authentication_method?:
    | 'UNSPECIFIED'
    | 'NON_AUTHENTICATED'
    | 'SIGNATURE'
    | 'PIN'
    | 'ID_VERIFIED';

  /** Country code of the card acceptor or terminal. */
  country_code?: string;

  /** Whether the transaction is an installment payment. */
  is_installment?: boolean;

  /** Whether the transaction is recurring. */
  is_recurring?: boolean;

  /** Method used for capturing the card PAN during the transaction. */
  pan_entry_mode?:
    | 'UNKNOWN'
    | 'MANUAL'
    | 'MAG_STRIPE'
    | 'MAG_STRIPE_CONTACTLESS'
    | 'BAR_CODE'
    | 'OCR'
    | 'MICR'
    | 'CHIP'
    | 'CHIP_CONTACTLESS'
    | 'CARD_ON_FILE'
    | 'CHIP_FALLBACK'
    | 'OTHER';

  /** Whether the card acceptor or terminal is capable of partial approvals. */
  partial_approval_capable?: boolean;

  /**
   * Whether the card acceptor or terminal can capture card PINs.
   *
   * *NOTE:* This field does not indicate whether a PIN was entered.
   */
  pin_entry_mode?: 'UNKNOWN' | 'TRUE' | 'FALSE' | 'DEFECTIVE';

  /** Indicates whether a PIN was presented during the transaction. */
  pin_present?: boolean;

  /** Whether the card acceptor/terminal supports purchase-only approvals. */
  purchase_amount_only?: boolean;

  /** Whether the card acceptor/terminal was attended. */
  terminal_attendance?:
    | 'UNSPECIFIED'
    | 'ATTENDED'
    | 'UNATTENDED'
    | 'NO_TERMINAL';

  /** Card acceptor or terminal identification number. */
  terminal_id?: string;

  /** Location of the card acceptor/terminal. */
  terminal_location?:
    | 'ON_PREMISE'
    | 'OFF_PREMISE_MERCHANT'
    | 'OFF_PREMISE_CARDHOLDER'
    | 'NO_TERMINAL';

  /** Type of card acceptor/terminal. */
  terminal_type?:
    | 'AUTO_DISPENSER_WITH_PIN'
    | 'SELF_SERVICE'
    | 'LIMITED_AMOUNT'
    | 'IN_FLIGHT'
    | 'ECOMMERCE'
    | 'TRANSPONDER';

  /** The ZIP code of the card acceptor or terminal. */
  zip?: string;
}

/**
* Contains configuration fields for a number of controls.

*NOTE:* These controls are in effect only if `kyc_required` is `CONDITIONAL` and the account holder has not yet passed KYC. 
*/
export interface IPreKycControls {
  /**
   * Specifies the maximum ledger balance allowed for members of the account holder group.
   * @min 0.01
   */
  balance_max?: number;

  /**
   * If set to `false`, this control prohibits an account holder's cards from being used at an ATM.
   *
   * *NOTE:* If a card product's `config.poi.atm` field is set to `false`, associated cards are prohibited from being used at an ATM regardless of this control's setting.
   */
  cash_access_enabled?: boolean;

  /**
   * If set to `true`, funds can only be loaded from a program funding source.
   *
   * This restriction applies to GPA orders, peer transfers, and direct deposits, but does not apply to operator adjustments.
   */
  enable_non_program_loads?: boolean;

  /**
   * If set to `false`, this control prohibits an account holder from conducting transactions with a non-domestic country code.
   *
   * *NOTE:* If a card product is configured to prohibit non-domestic transactions, its associated cards are prohibited from such transactions regardless of this control's setting.
   */
  international_enabled?: boolean;

  /**
   * If set to `false`, this control prohibits an account holder's account from being reloaded with funds after an initial load.
   *
   * This restriction applies to GPA orders, peer transfers, and direct deposits, but does not apply to operator adjustments.
   */
  is_reloadable_pre_kyc?: boolean;
}

/**
* Returned for `authorization.clearing` transaction types following a financial advice.

Contains information about the preceding transaction.
*/
export interface IPrecedingTransaction {
  /** Amount of the preceding transaction. */
  amount?: number;

  /** Unique identifier of the preceding transaction. */
  token?: string;
}

/**
 * Information about the program on the Marqeta platform.
 */
export interface IProgram {
  /** The program long code on the Marqeta platform. */
  long_code: string;

  /** The program identifier on the Marqeta platform. */
  program_id: string;

  /** The program short code on the Marqeta platform. */
  short_code: string;
}

export interface IProgramFundingSourceRequest {
  /** Indicates whether the program funding source is active. */
  active?: boolean;

  /** The name of the program funding source. */
  name: string;

  /**
   * The unique identifier of the funding source.
   * If you do not include a token, the system will generate one automatically.
   * As this token is necessary for use in other calls, we recommend that you define a simple and easy to remember string rather than letting the system generate a token for you.
   * This value cannot be updated.
   */
  token?: string;
}

export interface IProgramFundingSourceResponse {
  /** The account identifier. */
  account: string;

  /**
   * Indicates whether the program funding source is active.
   * This field is returned if it exists in the resource.
   */
  active?: boolean;

  /**
   * The date and time when the resource was created, in UTC.
   * `2022-02-26T20:03:05Z`, for example.
   * @format date-time
   */
  created_time: string;

  /**
   * The date and time when the resource was last modified, in UTC.
   * `2022-02-26T20:03:05Z`, for example.
   * @format date-time
   */
  last_modified_time: string;

  /** The name of the program funding source. */
  name: string;

  /** The unique identifier of the funding source. */
  token: string;
}

export interface IProgramFundingSourceUpdateRequest {
  /** Indicates whether the program funding source is active. */
  active?: boolean;

  /** The name of the program funding source. */
  name?: string;
}

export interface IProgramReserveAccountBalance {
  /**
   * Ledger balance minus any authorized transactions that have not yet cleared.
   * When using JIT Funding, this balance is usually equal to $0.00.
   */
  available_balance?: number;

  /** Contains program reserve account balance information, organized by currency code. */
  balances?: Record<string, IProgramReserveAccountBalance>;

  /** Not currently in use. */
  credit_balance?: number;

  /** The three-digit ISO 4217 currency code. */
  currency_code?: string;

  /**
   * When using standard funding: The funds that are available to spend immediately, including funds from any authorized transactions that have not yet cleared.
   * When using Just-in-Time (JIT) Funding: Authorized funds that are currently on hold, but not yet cleared.
   */
  ledger_balance?: number;

  /** ACH loads that have been accepted, but for which the funding time has not yet elapsed. */
  pending_credits?: number;
}

export interface IProgramReserveTransactionResponse {
  /** The amount of the program reserve account credit or debit. */
  amount?: number;

  /**
   * The date and time when the resource was created, in UTC.
   * `2021-10-26T20:03:05Z`, for example.
   * @format date-time
   */
  created_time: string;

  /** The three-digit ISO 4217 currency code. */
  currency_code?: string;

  /**
   * The date and time when the resource was last modified, in UTC.
   * `2021-10-26T20:03:05Z`, for example.
   * @format date-time
   */
  last_modified_time: string;

  /** Memo or note describing the transaction. */
  memo?: string;

  /** The state of the transaction. */
  state?: 'PENDING' | 'COMPLETE';

  /** Comma-delimited list of tags describing the transaction. */
  tags?: string;

  /** The unique identifier of the transaction response. */
  token?: string;

  /** The unique identifier of the transaction. */
  transaction_token?: string;

  /** The type of transaction. */
  type?: 'CREDIT' | 'DEBIT' | 'PENDING_CREDIT' | 'PENDING_DEBIT';
}

export interface IProgramTransfer {
  /** Amount of program transfer. */
  amount: number;

  /**
   * The unique identifier of the business.
   * Pass either a `business` token or a `user` token, not both.
   *
   * Send a `GET` request to `/businesses` to retrieve business tokens.
   */
  business_token?: string;

  /** The three-digit ISO 4217 currency code. */
  currency_code: string;

  /** Contains attributes that define characteristics of one or more fees. */
  fees?: IFeeModel[];

  /** Memo or note describing the program transfer. */
  memo?: string;

  /** Comma-delimited list of tags describing the program transfer. */
  tags?: string;

  /**
   * If you do not include a token, the system will generate one automatically.
   * This token is necessary for use in other API calls, so we recommend that rather than let the system generate one, you use a simple string that is easy to remember.
   * This value cannot be updated.
   */
  token?: string;

  /**
   * Specifies the program transfer type.
   *
   * Send a `GET` request to `/programtransfers/types` to retrieve program transfer type tokens.
   */
  type_token: string;

  /**
   * The unique identifier of the user.
   * Pass either a `user` token or a `business` token, not both.
   *
   * Send a `GET` request to `/users` to retrieve business tokens.
   */
  user_token?: string;
}

/**
 * Contains information about a program transfer, which moves funds from an account holder's GPA to a program funding source.
 */
export interface IProgramTransferResponse {
  /** Amount to be transferred. */
  amount: number;

  /**
   * The unique identifier of the `business` account holder.
   * Required if `user_token` is not specified.
   */
  business_token?: string;

  /**
   * The date and time when the resource was created, in UTC.
   * `2021-10-26T20:03:05Z`, for example.
   * @format date-time
   */
  created_time?: string;

  /** Currency code of the funds to be transferred. */
  currency_code: string;

  /**
   * List of fees associated with the program transfer.
   *
   * This array is returned if it exists in the resource.
   */
  fees?: IFeeDetail[];

  /** Contains JIT funding details for the transaction. */
  jit_funding?: IJitFundingApi;

  /** Additional description of the program transfer. */
  memo?: string;

  /** Custom-defined tags you create that are related to the program transfer. */
  tags?: string;

  /** Unique identifier of the program transfer. */
  token?: string;

  /** The unique identifier of the transaction. */
  transaction_token: string;

  /** Unique identifier of the program transfer type. */
  type_token: string;

  /**
   * The unique identifier of the `user` account holder.
   * Required if `business_token` is not specified.
   */
  user_token?: string;
}

export interface IProgramTransferTypeReponse {
  /**
   * The date and time when the program transfer type object was created, in UTC.
   * `2021-10-26T20:03:05Z`, for example.
   * @format date-time
   */
  created_time?: string;

  /**
   * The date and time when the program transfer type object was last modified, in UTC.
   * `2021-10-26T20:03:05Z`, for example.
   * @format date-time
   */
  last_modified_time?: string;

  /** Memo or note describing the program transfer type. */
  memo?: string;

  /** Identifies the program funding source to which program transfers will be credited. */
  program_funding_source_token: string;

  /** Comma-delimited list of tags describing the program transfer type. */
  tags?: string;

  /** The unique identifier of the program transfer type request object. */
  token: string;
}

export interface IProgramTransferTypeRequest {
  /** Memo or note describing the program transfer type. */
  memo: string;

  /**
   * Identifies the program funding source to which program transfers will be credited.
   *
   * Send a `GET` request to `/fundingsources/program` to retrieve program funding source tokens.
   */
  program_funding_source_token: string;

  /** Comma-delimited list of tags describing the program transfer type. */
  tags?: string;

  /**
   * If you do not include a token, the system will generate one automatically.
   * This token is necessary for use in other API calls, so we recommend that rather than let the system generate one, you use a simple string that is easy to remember.
   * This value cannot be updated.
   */
  token?: string;
}

export interface IProvisioningControls {
  in_app_provisioning?: IInAppProvisioning;
  manual_entry?: IManualEntry;
  wallet_provider_card_on_file?: IWalletProviderCardOnFile;
}

export interface IPushToCardDisburseRequest {
  /**
   * @min 0.01
   * @max 50000
   */
  amount: number;
  currency_code: string;
  memo?: string;
  payment_instrument_token: string;
  soft_descriptor?: IPTCSoftDescriptor;
  tags?: string;
  token?: string;
}

export interface IPushToCardDisbursementResponse {
  amount?: number;

  /**
   * yyyy-MM-ddTHH:mm:ssZ
   * @format date-time
   */
  created_time: string;
  currency_code?: string;

  /**
   * yyyy-MM-ddTHH:mm:ssZ
   * @format date-time
   */
  last_modified_time: string;
  memo?: string;
  payment_instrument_token?: string;
  status?: string;
  tags?: string;
  token?: string;
}

export interface IPushToCardRequest {
  address_1: string;
  address_2?: string;
  city: string;
  country: string;
  cvv: string;
  exp_date: string;
  name_on_card: string;
  pan: string;
  postal_code: string;
  state: string;
  token?: string;
  user_token: string;
}

export interface IPushToCardResponse {
  address_1?: string;
  address_2?: string;
  city?: string;
  country?: string;

  /**
   * yyyy-MM-ddTHH:mm:ssZ
   * @format date-time
   */
  created_time: string;
  exp_date?: string;
  fast_fund_transfer_eligible?: boolean;
  gambling_fund_transfer_eligible?: boolean;
  last_four?: string;

  /**
   * yyyy-MM-ddTHH:mm:ssZ
   * @format date-time
   */
  last_modified_time: string;
  last_name?: string;
  name_on_card?: string;
  postal_code?: string;
  state?: string;
  token?: string;
}

/**
 * Contains information about the assessment of real-time fees.
 */
export interface IRealTimeFeeAssessment {
  /** Enables fee assessments where the transaction acquirer is located in the US. */
  domestic_enabled?: boolean;

  /** Enables fee assessments where the transaction acquirer is located outside the US. */
  international_enabled?: boolean;

  /** Indicates the type of transactions on which the fee is assessed. */
  transaction_type?: string;
}

/**
 * Contains information about a real-time fee group.
 */
export interface IRealTimeFeeGroup {
  /** Whether the real-time fee group is active. */
  active: boolean;

  /**
   * Date and time when the real-time fee group was created.
   * @format date-time
   */
  created_time?: string;

  /** An array of unique fee identifiers. */
  fee_tokens?: string[];

  /**
   * Date and time when the real-time fee group was last modified.
   * @format date-time
   */
  last_modified_time?: string;

  /** Name of the real-time fee group. */
  name: string;

  /** Unique identifier of the real-time fee group. */
  token: string;
}

export interface IRealTimeFeeGroupCreateRequest {
  /** Indicates whether the real-time fee group is active. */
  active?: boolean;

  /**
   * Specifies the fees in this real-time fee group.
   *
   * No two fees in the group can be applicable to the same transaction type (in other words, each fee must have a different value for its `real_time_assessment.transaction_type` field).
   */
  fee_tokens?: string[];

  /** A descriptive name for the real-time fee group. */
  name: string;

  /**
   * The unique identifier of the real-time fee group.
   *
   * If you do not include a token, the system will generate one automatically.
   * This token is necessary for use in other API calls, so we recommend that rather than let the system generate one, you use a simple string that is easy to remember.
   * This value cannot be updated.
   */
  token?: string;
}

export interface IRealTimeFeeGroupRequest {
  /** Indicates whether the real-time fee group is active. */
  active?: boolean;

  /**
   * Specifies the fees in this real-time fee group.
   *
   * No two fees in the group can be applicable to the same transaction type (in other words, each fee must have a different value for its `real_time_assessment.transaction_type` field).
   */
  fee_tokens?: string[];

  /** A descriptive name for the real-time fee group. */
  name?: string;
}

/**
 * Specifies which event types automatically enable Commando Mode.
 */
export interface IRealTimeStandinCriteria {
  /** If `true`, Commando Mode is automatically enabled by events defined in the `real_time_standin_criteria` object; if `false`, Auto Commando Mode is not enabled. */
  enabled?: boolean;

  /** If `true`, an application error (any non-connection, non-timeout error) automatically enables Commando Mode when `real_time_standin_criteria.enabled` is also `true`. */
  include_application_errors?: boolean;

  /** If `true`, a non-timeout connection error automatically enables Commando Mode when `real_time_standin_criteria.enabled` is also `true`. */
  include_connection_errors?: boolean;

  /** If `true`, a gateway response slower than 3000ms automatically enables Commando Mode when `real_time_standin_criteria.enabled` is also `true`. */
  include_response_timeouts?: boolean;
}

export interface IResetUserPasswordEmailModel {
  /** The cardholder's email address. */
  email: string;
}

export interface IResetUserPasswordModel {
  /** The cardholder's new `user` account password on the Marqeta platform. */
  new_password: string;

  /** The unique identifier of the cardholder. */
  user_token: string;
}

/**
 * Contains information about the response, including the response code and response memo.
 */
export interface IResponse {
  /** Information about the relevant velocity control for the transaction, if applicable. */
  additional_information?: string;

  /**
   * Four-digit code corresponding to the outcome of the attempted transaction.
   *
   * `card_security_code_verification.response.code` indicates whether the verification check passed.
   * It can have these possible values:
   * * 0000 – passed
   * * 0001 – did not pass
   */
  code: string;

  /** Information on the outcome of the attempted transaction. */
  memo: string;
}

/**
 * Contains the digital wallet provider's risk assessment for provisioning the digital wallet token.
 */
export interface IRiskAssessment {
  /** Wallet provider's decision as to whether the digital wallet token should be provisioned. */
  score?: string;

  /** Wallet provider's risk assessment version. */
  version?: string;
}

export interface IRiskcontrolTags {
  rule_name?: string;
  tag?: string;
  values?: string[];
}

/**
 * Contains information about authorization decisions.
 */
export interface ISelectiveAuth {
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
  dmd_location_sensitivity?: 0 | 1 | 2 | 3 | 4;

  /** Use `true` to perform regular expression checking on the description received in the authorization. */
  enable_regex_search_chain?: boolean;

  /**
   * * *0* — Inactive
   * * *1* — Active (attempts to authorize a merchant that does not have a recognized MID by matching other pieces of information)
   * * *2* — Logging and notification (checks the transaction and logs results, but does not authorize)
   *
   * Selective authorization applies to transactions that are limited to specific merchants.
   * Matching requirements for authorization are set by the `dmd_location_sensitivity` field.
   * @format int32
   */
  sa_mode?: 0 | 1 | 2;
}

/**
 * Contains information from the card network about currency conversion at the time of settlement, including the original currency of the transaction, the amount of the transaction in the original currency, and the conversion rate.
 */
export interface ISettlementData {
  /** The settled amount. */
  amount?: number;

  /**
   * Returned when the transaction currency is different from the origination currency.
   *
   * Conversion rate between the origination currency and the settlement currency.
   */
  conversion_rate?: number;

  /** The ISO 4217 code of the currency used in the transaction. */
  currency_code?: string;
}

/**
 * Specifies the shipping details for the card.
 */
export interface IShipping {
  /**
   * Adds the specified value as a C/O (care of) line to the mailing carrier.
   *
   * *NOTE:* This field overrides the equivalent field on the associated card product.
   */
  care_of_line?: string;

  /** Specifies the shipping service. */
  method?:
    | 'LOCAL_MAIL'
    | 'LOCAL_MAIL_PACKAGE'
    | 'GROUND'
    | 'TWO_DAY'
    | 'OVERNIGHT'
    | 'INTERNATIONAL'
    | 'FEDEX_EXPEDITED'
    | 'FEDEX_REGULAR'
    | 'UPS_EXPEDITED'
    | 'UPS_REGULAR'
    | 'USPS_EXPEDITED'
    | 'USPS_REGULAR';

  /** Specifies a fulfillment shipping or return address. */
  recipient_address?: IFulfillmentAddressRequest;

  /** Specifies a fulfillment shipping or return address. */
  return_address?: IFulfillmentAddressRequest;
}

export interface ISimulationResponseModel {
  raw_iso8583?: Record<string, object>;
  transaction?: ITransactionModel;
}

/**
 * Contains information about merchant onboarding.
 */
export interface ISpecial {
  /** A value of `true` indicates cards of this card product type can be used for merchant onboarding. */
  merchant_on_boarding?: boolean;
}

/**
 * Defines the group of users to which the velocity control applies.
 */
export interface ISpendControlAssociation {
  /**
   * The unique identifier of the card product.
   *
   * Pass either `card_product_token` or `user_token`, not both.
   */
  card_product_token?: string;

  /**
   * The unique identifier of the cardholder.
   *
   * Pass either `card_product_token` or `user_token`, not both.
   */
  user_token?: string;
}

/**
 * Contains tax identification information.
 */
export interface ISsnResponseModel {
  /** National Identification Number. */
  nin?: string;

  /** Social Insurance Number. */
  sin?: string;

  /** Social Security Number. */
  ssn?: string;

  /** Taxpayer Identification Number. */
  tin?: string;
}

/**
 * Deprecated, do not use.
 */
export interface IStoreResponseModel {
  active?: boolean;
  address1: string;
  address2?: string;
  city: string;
  contact?: string;
  contact_email?: string;
  country?: string;

  /**
   * yyyy-MM-ddTHH:mm:ssZ
   * @format date-time
   */
  created_time: string;
  keyed_auth_cvv_enforced?: boolean;

  /**
   * yyyy-MM-ddTHH:mm:ssZ
   * @format date-time
   */
  last_modified_time: string;

  /** @format float */
  latitude?: number;

  /** @format float */
  longitude?: number;
  merchant_token: string;
  mid: string;
  name: string;
  network_mid?: string;
  partial_approval_capable?: boolean;

  /** 1 char max */
  partial_auth_flag?: boolean;
  phone?: string;
  postal_code?: string;
  province?: string;
  state: string;

  /** The unique identifier of the merchant */
  token?: string;
  zip?: string;
}

/**
 * Contains information about Strong Customer Authentication (SCA) behavior for contactless point-of-sale (POS) and low-value payment (LVP) e-commerce transactions.
 */
export interface IStrongCustomerAuthenticationLimits {
  /**
   * Specifies the cumulative limit of transactions the cardholder can perform before receiving an SCA challenge.
   *
   * A value of `0` in this field means that the cumulative amount spent in contactless POS transactions performed by the cardholder does not impact the decision of whether or not an SCA challenge is served.
   */
  sca_contactless_cumulative_amount_limit?: number;

  /**
   * Specifies the maximum allowable amount for a single contactless point-of-sale (POS) transaction, above which the cardholder receives a strong customer authentication (SCA) challenge.
   *
   * A value of `0` in this field means that the amount of any single contactless POS transaction performed by the cardholder does not impact the decision of whether or not an SCA challenge is served.
   */
  sca_contactless_transaction_limit?: number;

  /**
   * Specifies the number of contactless POS transactions the cardholder can perform before receiving an SCA challenge.
   *
   * A value of `0` in this field means that the number of contactless POS transactions performed by the cardholder does not impact the decision of whether or not an SCA challenge is served.
   * @format int32
   */
  sca_contactless_transactions_count_limit?: number;

  /**
   * Specifies the currency type for contactless POS transactions.
   *
   * This field is required if either the `sca_contactless_transaction_limit` field or the `sca_contactless_cumulative_amount_limit` field in this object contains a value, even if that value is `0`.
   */
  sca_contactless_transactions_currency?: string;

  /**
   * Specifies the cumulative limit of LVP e-commerce transactions the cardholder can perform before receiving an SCA challenge.
   *
   * For example, if you set the value of this field to `100.00`, your cardholder can perform two transactions for `30.00` and two transactions for `20.00` before receiving an SCA challenge.
   * If you leave this field blank, the cumulative amount spent in LVP e-commerce transactions performed by the cardholder does not impact the decision of whether or not an SCA challenge is served.
   */
  sca_lvp_cumulative_amount_limit?: number;

  /**
   * Specifies the maximum allowable amount for a single low-value payment (LVP) e-commerce transaction, above which the cardholder receives a strong customer authentication (SCA) challenge.
   *
   * If you leave this field blank, the amount of any single LVP e-commerce transaction performed by the cardholder does not impact the decision of whether or not an SCA challenge is served.
   */
  sca_lvp_transaction_limit?: number;

  /**
   * Specifies the number of LVP e-commerce transactions the cardholder can perform before receiving an SCA challenge.
   *
   * If you leave this field blank, the total number of LVP e-commerce transactions performed by the cardholder does not impact the decision of whether or not an SCA challenge is served.
   * @format int32
   */
  sca_lvp_transactions_count_limit?: number;

  /**
   * Specifies the currency type for LVP e-commerce transaction limits.
   *
   * This field is required if any one of the `sca_lvp_transaction_limit`, `sca_lvp_cumulative_amount_limit`, or `sca_lvp_transactions_count_limit` fields in this object contains a value, even if that value is `0`.
   */
  sca_lvp_transactions_currency?: string;
}

/**
 * Deprecated, do not use.
 */
export interface ITerminalModel {
  card_presence?: string;
  cardholder_presence?: string;
  channel?: string;
  partial_approval_capable?: string;
  pin_present?: string;
  processing_type?: string;
  tid?: string;
}

/**
 * Specifies personalized text that appears on the card.
 */
export interface IText {
  name_line_1: ITextValue;
  name_line_2?: ITextValue;
  name_line_3?: ITextValue;
}

export interface ITextValue {
  /** Specifies a line of personalized text that appears on the card. */
  value?: string;
}

export interface ITokenRequest {
  /** Payment card account number. */
  account_number: string;

  /**
   * The unique identifier of the `business` account holder.
   * This token is required if the `user_token` is not included.
   */
  business_token?: string;

  /** Payment card CVV2 number. */
  cvv_number: string;

  /** Payment card expiration date. */
  exp_date: string;

  /**
   * If there are multiple funding sources, this field specifies which source is used by default in funding calls.
   * If there is only one funding source, the system ignores this field and always uses that source.
   */
  is_default_account?: boolean;

  /** Postal code of the account holder (user or business). */
  postal_code?: string;

  /**
   * The unique identifier of the funding account.
   * If you do not include a token, the system will generate one automatically.
   * As this token is necessary for use in other calls, we recommend that you define a simple and easy to remember string rather than letting the system generate a token for you.
   * This value cannot be updated.
   */
  token?: string;

  /**
   * The unique identifier of the `user` account holder.
   * This token is required if the `business_token` is not included.
   */
  user_token?: string;
  zip?: string;
}

/**
 * Contains information held and provided by the token service provider (card network).
 */
export interface ITokenServiceProvider {
  /** The unique value representing a tokenization request (Mastercard only). */
  correlation_id?: string;

  /** Unique identifier of the digital wallet token PAN within the card network. */
  pan_reference_id: string;

  /** _(Mastercard only)_ Represents the confidence level in the digital wallet token. */
  token_assurance_level?: string;

  /** Digital wallet's decision as to whether the digital wallet token should be provisioned. */
  token_eligibility_decision?: string;

  /** Expiration date of the digital wallet token. */
  token_expiration?: string;

  /** Primary account number (PAN) of the digital wallet token. */
  token_pan?: string;

  /** Unique identifier of the digital wallet token within the card network. */
  token_reference_id?: string;

  /**
   * Unique numerical identifier of the token requestor within the card network.
   * These ID numbers map to `token_requestor_name` field values as follows:
   *
   * *Mastercard*
   * * 50110030273 – `APPLE_PAY`
   * * 50120834693 – `ANDROID_PAY`
   * * 50139059239 – `SAMSUNG_PAY`
   * *Visa*
   * * 40010030273 – `APPLE_PAY`
   * * 40010075001 – `ANDROID_PAY`
   * * 40010043095 – `SAMSUNG_PAY`
   * * 40010075196 – `MICROSOFT_PAY`
   * * 40010075338 – `VISA_CHECKOUT`
   * * 40010075449 – `FACEBOOK`
   * * 40010075839 – `NETFLIX`
   * * 40010077056 – `FITBIT_PAY`
   * * 40010069887 – `GARMIN_PAY`
   */
  token_requestor_id?: string;

  /** Name of the token requestor within the card network. */
  token_requestor_name?: string;

  /** Token score assigned by the digital wallet. */
  token_score?: string;

  /** Type of the digital wallet token. */
  token_type?: string;
}

export interface ITokenUpdateRequest {
  /** Indicates whether the card funding source is active. */
  active?: boolean;

  /** The expiration date for the payment card. */
  exp_date: string;

  /**
   * If there are multiple funding sources, this field specifies which source is used by default in funding calls.
   * If there is only one funding source, the system ignores this field and always uses that source.
   */
  is_default_account?: boolean;
}

/**
 * Contains information about the merchant.
 */
export interface ITransactionCardAcceptor {
  /**
   * Card acceptor's address.
   * May be returned if the request uses Transaction Model V1 of the Marqeta Core API.
   * Not returned for V2 requests.
   */
  address?: string;

  /** Card acceptor's city. */
  city?: string;

  /**
   * Card acceptor's country code.
   * May be returned if the request uses Transaction Model V2 of the Marqeta Core API.
   * Not returned for V1 requests.
   */
  country_code?: string;
  independent_sales_organization_id?: string;

  /** Merchant category code (MCC). */
  mcc?: string;

  /** An array of `mcc_groups`. */
  mcc_groups?: string[];

  /** The merchant identifier. */
  mid?: string;

  /** Card acceptor's name. */
  name?: string;

  /** The merchant identifier on the card network. */
  network_mid?: string;
  payment_facilitator_id?: string;

  /** Deprecated, do not use. */
  poi?: ITerminalModel;

  /** Card acceptor's postal code. */
  postal_code?: string;

  /**
   * Two-character state, province, or territorial abbreviation.
   *
   * For a complete list of valid state and province abbreviations, see <</core-api/kyc-verification#_valid_state_provincial_and_territorial_abbreviations, Valid state, provincial, and territorial abbreviations>>.
   */
  state?: string;
  sub_merchant_id?: string;
}

/**
 * Controls transactional characteristics of card usage.
 */
export interface ITransactionControls {
  /**
   * Set to `accept_us_only` to allow transactions only within the US.
   *
   * Set to `decline_ofac_countries` to allow international transactions except with countries that the Financial Action Task Force (FATF) and Office of Foreign Assets Control (OFAC) have identified as high risk.
   * Users with the Admin role can create and update additional lists of accepted countries for transactions at the `/acceptedcountries` endpoint.
   * See <</core-api/accepted-countries, Accepted Countries>>.
   */
  accepted_countries_token?: string;
  address_verification?: IAvsControls;

  /** Indicates whether to allow transactions where an EMV chip-enabled card was processed using the magstripe as fallback. */
  allow_chip_fallback?: boolean;

  /**
   * *WARNING:* This field is deprecated and will be unsupported in a future release.
   *
   * Allows cardholders to define a PIN as they complete their first PIN-debit transaction.
   */
  allow_first_pin_set_via_financial_transaction?: boolean;

  /**
   * A value of `true` allows transactions to be authorized using GPA funds.
   *
   * *NOTE:* For most programs, this field should be set to `true`.
   */
  allow_gpa_auth?: boolean;

  /**
   * The <</core-api/mcc-groups, MCC group>> `authorization_controls` object allows you to automatically increase authorization holds and to specify authorization expiration times based on merchant type.
   * By default, these settings apply to all cards in your program.
   * You can, however, exempt cards associated with a particular card product by setting this field to `false`.
   *
   * *NOTE:* Partial authorizations are disallowed if this field is set to `true`.
   */
  allow_mcc_group_authorization_controls?: boolean;

  /**
   * Indicates whether card network loads are allowed.
   * The associated card's state must be `ACTIVE` or the load will be rejected.
   */
  allow_network_load?: boolean;

  /**
   * Indicates whether card network loads are allowed.
   * Sets the associated card's state to `ACTIVE` if its current state is `INACTIVE`.
   */
  allow_network_load_card_activation?: boolean;

  /**
   * Indicates whether quasi-cash transactions are allowed.
   * In a quasi-cash transaction, the cardholder purchases an item that can be directly converted to cash, such as traveler's checks, money orders, casino chips, or lottery tickets.
   */
  allow_quasi_cash?: boolean;

  /** A value of `true` indicates that the cards of this card product type require an Integrated Circuit Card. */
  always_require_icc?: boolean;

  /** A value of `true` indicates that the cards of this card product type require a PIN. */
  always_require_pin?: boolean;
  enable_credit_service?: boolean;

  /**
   * Set to `true` to enable partial authorizations.
   *
   * When this setting is `false` and the requested authorization amount exceeds available funds, the transaction is declined.
   * When this setting is `true` and the requested authorization amount exceeds available funds, the transaction is authorized for the amount of available funds.
   */
  enable_partial_auth_approval?: boolean;

  /**
   * Allows transactions to be approved even if the card's `state = SUSPENDED`.
   * When this field is set to `true`, the card behaves as if its `state = ACTIVE`.
   */
  ignore_card_suspended_state?: boolean;

  /**
   * Specifies the language for 3D Secure and digital wallet token notifications sent to cardholders under this card program.
   * By default, notifications are sent in English.
   * You can also send notifications to your cardholders in Czech, French, Italian, German, Polish, Spanish, and Swedish.
   *
   * To specify the language for OTP notifications at the user level, see <</core-api/users#_the_metadata_object, the metadata object>>.
   * Languages set at the user level take precedence over the language set at the card product level.
   */
  notification_language?: string;

  /**
   * The token of the merchant group that you want to exempt from quasi-cash transaction authorization control, allowing your cardholders to conduct quasi-cash transactions.
   * In a quasi-cash transaction, the cardholder purchases an item that can be directly converted to cash, such as traveler's checks, money orders, casino chips, or lottery tickets.
   *
   * You can specify a merchant group token in addition to whatever merchant identifiers you listed in the `quasi_cash_exempt_mids` field, if any.
   */
  quasi_cash_exempt_merchant_group_token?: string;

  /**
   * A comma-separated list of merchant identifiers that you want to exempt from quasi-cash transaction authorization control, allowing your cardholders to conduct quasi-cash transactions.
   * In a quasi-cash transaction, the cardholder purchases an item that can be directly converted to cash, such as traveler's checks, money orders, casino chips, or lottery tickets.
   */
  quasi_cash_exempt_mids?: string;

  /** A value of `true` indicates that if `card_presence_required` is `true`, the card's security code is required. */
  require_card_not_present_card_security_code?: boolean;

  /** Contains information about Strong Customer Authentication (SCA) behavior for contactless point-of-sale (POS) and low-value payment (LVP) e-commerce transactions. */
  strong_customer_authentication_limits?: IStrongCustomerAuthenticationLimits;
}

/**
* Contains merchant-provided metadata related to the transaction, including details about lodging- and transit-related purchases.

May be returned if the request uses Transaction Model V2 of the Marqeta Core API.
Not returned for V1 requests. 
*/
export interface ITransactionMetadata {
  /** Contains information about airline-related transactions. */
  airline?: IAirline;

  /**
   * Number of days the pre-authorization is in effect.
   * @format int32
   */
  authorization_life_cycle?: number;

  /** Whether the transaction is cross-border, i.e., when the merchant and the cardholder are located in two different countries. */
  cross_border_transaction?: boolean;
  is_deferred_authorization?: boolean;

  /** Whether the transaction is a lodging or vehicle rental. */
  is_lodging_auto_rental?: boolean;

  /**
   * Date and time when the lodging check-in or vehicle rental began.
   * @format date-time
   */
  lodging_auto_rental_start_date?: string;

  /** Indicates the type of mail or telephone order transaction. */
  moto_indicator?:
    | 'UNKNOWN'
    | 'MANUAL'
    | 'RECURRING'
    | 'INSTALLMENT'
    | 'OTHERS';

  /** Channel from which the transaction was originated. */
  payment_channel?: 'OTHER' | 'ATM' | 'ECOMMERCE' | 'MAIL' | 'PHONE' | 'MOTO';

  /** Industry for which the transaction was originated. */
  transaction_category?:
    | 'RETAIL_SALE'
    | 'BILL_PAY'
    | 'HOTEL'
    | 'HEALTH_CARE'
    | 'RESTAURANT'
    | 'AUTO_RENTAL'
    | 'AIRLINE'
    | 'PAYMENT'
    | 'HOSPITALIZATION_COLLEGE'
    | 'PHONE_MAIL_ECOMMERCE'
    | 'ATM'
    | 'TRANSIT';

  /** Contains merchant-provided, transit-related metadata related to the transaction. */
  transit?: ITransit;
}

export interface ITransactionModel {
  account_funding?: IAccountFunding;

  /** Contains information about the merchant's financial institution. */
  acquirer?: IAcquirer;

  /**
   * Indicates the amount of the acquirer fee.
   * Account holders are sometimes charged an acquirer fee for card use at ATMs, fuel dispensers, and so on.
   */
  acquirer_fee_amount?: number;

  /**
   * Acquirer-assigned unique identifier of the transaction.
   * Useful for settlement and reconciliation.
   */
  acquirer_reference_id?: string;

  /**
   * Unique identifier of the user who conducted the transaction.
   * This might be a child user configured to share its parent's account balance.
   */
  acting_user_token: string;

  /** Contains address verification data consisting of address data entered by the cardholder, address data held by the Marqeta platform, and an assertion by the Marqeta platform as to whether the two sets of data match. */
  address_verification?: IAddressVerificationModel;
  advice_reason_code?: string;
  advice_reason_details?: string;

  /** Amount of the transaction. */
  amount: number;

  /** Amount to release following a financial advice. */
  amount_to_be_released?: number;

  /** Unique identifier assigned to an authorization, printed on the receipt at point of sale. */
  approval_code?: string;

  /**
   * Contains information about an auto reload.
   * See <</core-api/auto-reload,Auto Reloads>> for more information.
   *
   * Returned if an auto reload was executed.
   */
  auto_reload?: IAutoReloadModel;

  /** The batch number of the transaction. */
  batch_number?: string;

  /** Contains customer-provided information about the business that funded the transaction. */
  business?: IBusinessMetadata;

  /** Unique identifier of the business that owns the account that funded the transaction. */
  business_token?: string;

  /** Contains information about the card used in the transaction. */
  card?: ICardResponse;

  /** Contains information about the merchant. */
  card_acceptor?: ITransactionCardAcceptor;

  /** Contains information about a cardholder. */
  card_holder_model?: IUserCardHolderResponse;
  card_product_token?: string;

  /** Contains information about a verification check performed on the card's security code. */
  card_security_code_verification?: ICardSecurityCodeVerification;

  /**
   * Unique identifier of the card.
   * Useful when a single account holder has multiple cards.
   */
  card_token?: string;

  /**
   * Contains 3-D Secure verification data:
   *
   * * `electronic_commerce_indicator` – The level of verification performed.
   * * `verification_result` – The result of the verification.
   * * `verification_value_created_by` – The transaction participant who determined the verification result.
   * * `three_ds_message_version` – The 3D Secure message version used for authentication.
   * * `authentication_method` – The 3D Secure authentication method.
   * * `authentication_status` – The 3D Secure authentication status.
   * * `acquirer_exemption` – Indicates a 3D Secure authentication exemption from the acquirer.
   * * `issuer_exemption` – Indicates a 3D Secure authentication exemption from the issuer.
   */
  cardholder_authentication_data?: ICardholderAuthenticationData;

  /**
   * Amount of cash back requested by the cardholder during the transaction.
   * Included in the total transaction amount.
   */
  cash_back_amount?: number;

  /** Contains the chargeback object associated with this transaction if a chargeback has been initiated. */
  chargeback?: IChargebackResponse;

  /** A sequence number that identifies a specific clearing message among multiple clearing messages for an authorization. */
  clearing_record_sequence_number?: string;

  /**
   * Date and time when the Marqeta platform created the transaction entry, in UTC format.
   * For example, when Marqeta processed the clearing record for a refund.
   * @format date-time
   */
  created_time?: string;

  /** Currency type of the transaction. */
  currency_code?: string;

  /** Contains information about currency conversion. */
  currency_conversion?: ICurrencyConversion;

  /**
   * Contains information about the digital wallet that funded the transaction.
   *
   * Returned for all transactions funded by a digital wallet or related to digital wallet token provisioning.
   * For more on digital wallets, see the <</core-api/digital-wallets-management, Digital Wallets Management>> API reference and <</developer-guides/digital-wallets-and-tokenization, Digital Wallets and Tokenization>> developer guide.
   */
  digital_wallet_token?: IDigitalWalletToken;

  /** Contains information about a direct deposit. */
  direct_deposit?: IDepositDepositResponse;

  /** Contains information about a disputed transaction. */
  dispute?: IDisputeModel;

  /**
   * Duration of the transaction on Marqeta's servers, in milliseconds.
   * @format int32
   */
  duration?: number;

  /** The enhanced commercial card data token for the transaction. */
  enhanced_data_token?: string;

  /** Contains information about fees related to the transaction. */
  fee?: IFee;

  /** Contains information about a fee transfer, including the amount, currency code, and user or business token. */
  fee_transfer?: IFeeTransferResponse;

  /**
   * List of fees associated with the transaction.
   *
   * This array is returned if it exists in the resource.
   */
  fees?: INetworkFeeModel[];

  /** Contains one or more fraud determinations by the card network that apply to either the transaction or the cardholder's account. */
  fraud?: IFraudView;

  /** Specifies the account type for ATM transactions. */
  from_account?: string;

  /** Contains GPA balance information for the cardholder. */
  gpa?: ICardholderBalance;

  /**
   * Contains information about a GPA order, including fees, funding sources, and addresses.
   * See <</core-api/gpa-orders, GPA Orders>> for more information.
   */
  gpa_order?: IGpaResponse;

  /** Contains information about a GPA order unload, which unloads a GPA order by returning funds to the funding source. */
  gpa_order_unload?: IGpaReturns;

  /** Sequential identifier of the transaction. */
  identifier: string;

  /** An array of incremental authorization transaction tokens. */
  incremental_authorization_transaction_tokens?: string[];

  /** Indicates if the transaction is a pre-authorization. */
  is_preauthorization?: boolean;

  /** The international service assessment indicator indicates if an ISA fee is applicable to the transaction. */
  isaIndicator?:
    | 'MULTI_CURRENCY'
    | 'SINGLE_CURRENCY'
    | 'REBATE_CANCELLED'
    | 'MULTI_CURRENCY_NON_US_COUNTRIES'
    | 'SINGLE_CURRENCY_PAID_BY_ISSUER'
    | 'NO_CHARGE_ASSESSED';

  /**
   * The amount of interchange charged by the card issuer.
   * @format double
   */
  issuer_interchange_amount?: number;

  /** Unique identifier of the Marqeta platform server that received the transaction from the card network. */
  issuer_payment_node?: string;

  /** Date and time when the Marqeta platform received the transaction from the card network, in UTC. */
  issuer_received_time?: string;

  /** Deprecated, do not use. */
  merchant?: IMerchantResponseModel;

  /** Deprecated, do not use. */
  msa_order_unload?: IMsaReturns;

  /**
   * MSA orders are no longer supported.
   * Do not use.
   */
  msa_orders?: IMsaOrderResponse[];

  /**
   * If an authorization has multiple clearing transactions, this field displays their total number.
   * For example, if an authorization has four clearing transactions, the sequence count is `04`.
   */
  multi_clearing_sequence_count?: string;

  /**
   * If an authorization has multiple clearing transactions, this field displays the sequence number for the clearing transaction.
   * For example, if this is the second clearing transaction of four, the sequence number is `02`.
   */
  multi_clearing_sequence_number?: string;

  /** Indicates which card network was used to complete the transactions. */
  network?: string;

  /**
   * Contains network-related metadata for the transaction, including details about the card program and the card product.
   *
   * May be returned if the request uses Transaction Model V2 of the Marqeta Core API.
   * Not returned for V1 requests.
   */
  network_metadata?: INetworkMetadata;

  /**
   * Network-assigned unique identifier of the transaction.
   * Useful for settlement and reconciliation.
   */
  network_reference_id?: string;

  /**
   * Offer orders are no longer supported.
   * Do not use.
   */
  offer_orders?: IOfferOrderResponse[];

  /** Contains information about an original credit transaction (OCT), which enables the cardholder to receive funds on the specified card from an external source via the card network. */
  original_credit?: IOriginalCredit;

  /**
   * Contains information about a peer transfer, including sender and recipient tokens, transfer amount, and currency code.
   * See <</core-api/peer-transfers, Peer Transfers>> for more information.
   */
  peer_transfer?: IPeerTransferResponse;

  /** Indicates whether the transaction is credit or debit. */
  polarity?: 'CREDIT' | 'DEBIT' | 'PENDING_CREDIT' | 'PENDING_DEBIT';

  /**
   * Contains information about the point of sale, including details on how the card was presented.
   *
   * May be returned if the request uses Transaction Model V2 of the Marqeta Core API.
   * Not returned for V1 requests.
   */
  pos?: IPos;

  /**
   * Returned for final transaction types.
   *
   * Unique identifier of the preceding related transaction.
   * Useful for identifying the transaction that preceded the current one.
   * For example, `authorization`, a temporary transaction type, precedes and is completed by `authorization.clearing`, a final transaction type.
   * In this case, the `authorization` token is returned with this field.
   * For which transaction types are temporary or final, see <</core-api/event-types#_transaction_events, Transaction events in Event Types>>.
   */
  preceding_related_transaction_token?: string;

  /**
   * Returned for `authorization.clearing` transaction types following a financial advice.
   *
   * Contains information about the preceding transaction.
   */
  preceding_transaction?: IPrecedingTransaction;

  /** Information about the program on the Marqeta platform. */
  program?: IProgram;

  /** Contains information about a program transfer, which moves funds from an account holder's GPA to a program funding source. */
  program_transfer?: IProgramTransferResponse;

  /** Contains information about a real-time fee group. */
  real_time_fee_group?: IRealTimeFeeGroup;

  /** Merchant-requested amount, including any fees. */
  request_amount?: number;

  /** Contains information about the response, including the response code and response memo. */
  response?: IResponse;

  /**
   * Date and time when funds were moved for a transaction, in UTC.
   * For example, in the case of a refund, when funds were credited to the cardholder.
   * @format date-time
   */
  settlement_date?: string;

  /**
   * Indicates which party approved a transaction: the card network using stand-in processing, or Marqeta using Commando Mode.
   * Returned only when a transaction is approved.
   */
  standin_approved_by?: string;

  /** Indicates which party approved a transaction: the card network using stand-in processing, or Marqeta using Commando Mode. */
  standin_by?: string;

  /** Indicates why the card network handled a transaction requiring stand-in processing. */
  standin_reason?: string;

  /**
   * Current state of the transaction.
   * For more information about the `state` field, see <</developer-guides/about-transactions#_the_transaction_lifecycle, The transaction lifecycle>>.
   */
  state: 'PENDING' | 'CLEARED' | 'COMPLETION' | 'DECLINED' | 'ERROR' | 'ALL';

  /** Deprecated, do not use. */
  store?: IStoreResponseModel;

  /**
   * Indicates which subnetwork was used to complete the transaction.
   * Possible values include the following:
   *
   * * *VISANET* – Used for VisaNet signature-based transactions.
   * * *VISANETDEBIT* – Used for VisaNet Debit PIN-based transaction.
   * * *VISAINTERLINK* – Used for Visa Interlink PIN-based transactions.
   * * *VISAPLUS* – Used for ATM withdrawals on Visa.
   * * *MAESTRO* – Used for PIN-based transactions on Mastercard.
   * * *CIRRUS* – Used for ATM withdrawals on Mastercard.
   * * *MASTERCARDDEBIT* – Used for signature-based transactions on Mastercard.
   * * *GATEWAY_JIT* – Used for Gateway JIT Funding transactions.
   * * *MANAGED_JIT* – Used for Managed JIT Funding transactions or for transactions that occur while Commando Mode is enabled.
   */
  subnetwork?: string;

  /**
   * Unique identifier of the transaction, formatted as a UUID.
   *
   * *NOTE:* For subsequent related transactions, this token value appears as the `preceding_related_transaction_token`.
   */
  token: string;

  /** Additional transaction attributes. */
  transaction_attributes?: Record<string, string>;

  /**
   * Contains merchant-provided metadata related to the transaction, including details about lodging- and transit-related purchases.
   *
   * May be returned if the request uses Transaction Model V2 of the Marqeta Core API.
   * Not returned for V1 requests.
   */
  transaction_metadata?: ITransactionMetadata;

  /**
   * Transaction event type.
   * For more information about the `type` field, see <</core-api/event-types#_transaction_events, Transaction events>>.
   */
  type:
    | 'gpa.credit'
    | 'gpa.credit.pending'
    | 'gpa.credit.pending.reversal'
    | 'gpa.credit.reversal'
    | 'gpa.credit.networkload'
    | 'gpa.credit.networkload.reversal'
    | 'gpa.debit.networkload'
    | 'gpa.debit'
    | 'gpa.debit.pending'
    | 'gpa.debit.pending.reversal'
    | 'gpa.grant'
    | 'gpa.credit.issueroperator'
    | 'gpa.debit.issueroperator'
    | 'gpa.credit.chargeback'
    | 'gpa.credit.chargeback.reversal'
    | 'gpa.credit.billpayment'
    | 'gpa.credit.authorization.billpayment'
    | 'gpa.credit.authorization.billpayment.reversal'
    | 'msa.credit.pending'
    | 'msa.credit.pending.reversal'
    | 'msa.credit.reversal'
    | 'msa.credit'
    | 'msa.debit.pending'
    | 'msa.debit.pending.reversal'
    | 'msa.debit'
    | 'msa.credit.chargeback'
    | 'msa.credit.chargeback.reversal'
    | 'authorization'
    | 'authorization.advice'
    | 'authorization.reversal'
    | 'authorization.clearing'
    | 'authorization.reversal.issuerexpiration'
    | 'dispute.credit'
    | 'dispute.debit'
    | 'authorization.clearing.chargeback'
    | 'authorization.clearing.chargeback.reversal'
    | 'refund'
    | 'pindebit.atm.withdrawal'
    | 'pindebit.balanceinquiry'
    | 'pindebit.cashback'
    | 'pindebit'
    | 'programreserve.credit'
    | 'programreserve.debit'
    | 'fee.charge.pending'
    | 'fee.charge'
    | 'fee.charge.pending.refund'
    | 'funds.expire'
    | 'reward.earn'
    | 'transfer.peer'
    | 'transfer.fee'
    | 'account.credit'
    | 'account.debit'
    | 'balanceinquiry'
    | 'authorization.atm.withdrawal'
    | 'authorization.clearing.atm.withdrawal'
    | 'authorization.cashback'
    | 'authorization.clearing.cashback'
    | 'transfer.program'
    | 'authorization.quasi.cash'
    | 'authorization.clearing.quasi.cash'
    | 'authorization.incremental'
    | 'gpa.credit.authorization'
    | 'gpa.credit.authorization.reversal'
    | 'gpa.debit.reversal'
    | 'original.credit.authorization'
    | 'original.credit.authorization.reversal'
    | 'original.credit.authorization.clearing'
    | 'original.credit.auth_plus_capture'
    | 'original.credit.auth_plus_capture.reversal'
    | 'refund.authorization'
    | 'refund.authorization.advice'
    | 'refund.authorization.clearing'
    | 'refund.authorization.reversal'
    | 'token.activation-request'
    | 'token.advice'
    | 'pindebit.authorization'
    | 'pindebit.authorization.clearing'
    | 'pindebit.authorization.reversal'
    | 'pindebit.authorization.reversal.issuerexpiration'
    | 'authorization.standin'
    | 'authorization.clearing.chargeback.completed'
    | 'authorization.clearing.chargeback.provisional.credit'
    | 'authorization.clearing.chargeback.provisional.debit'
    | 'authorization.clearing.chargeback.writeoff'
    | 'directdeposit.credit'
    | 'directdeposit.credit.pending'
    | 'directdeposit.credit.reject'
    | 'directdeposit.credit.pending.reversal'
    | 'directdeposit.credit.reversal'
    | 'directdeposit.debit'
    | 'directdeposit.debit.pending'
    | 'directdeposit.debit.reject'
    | 'directdeposit.debit.reversal'
    | 'directdeposit.debit.pending.reversal'
    | 'fee.charge.reversal'
    | 'pindebit.chargeback'
    | 'pindebit.chargeback.completed'
    | 'pindebit.chargeback.provisional.credit'
    | 'pindebit.chargeback.provisional.debit'
    | 'pindebit.chargeback.reversal'
    | 'pindebit.chargeback.writeoff'
    | 'pindebit.credit.adjustment'
    | 'pindebit.quasicash'
    | 'pindebit.refund'
    | 'pindebit.refund.reversal'
    | 'pindebit.reversal'
    | 'pindebit.transfer'
    | 'pushtocard.debit'
    | 'pushtocard.reversal'
    | 'unknown';

  /** Contains customer-provided information about the cardholder that performed the transaction. */
  user?: ICardholderMetadata;

  /** Unique identifier of the user who owns the account that funded the transaction; subsequent related transactions retain the same `user_token`, even if the card used to complete the transaction moves to another user. */
  user_token?: string;

  /**
   * Date and time when the user initiated the transaction, in UTC.
   * For example, when a merchant performed the original authorization for a refund.
   * @format date-time
   */
  user_transaction_time?: string;
}

export interface ITransactionOptions {
  additional_data?: string;
  card_expiration_date_yymm?: string;

  /** @format int32 */
  database_transaction_timeout?: number;
  encryption_key_id?: string;
  is_async?: boolean;
  pre_auth_time_limit?: string;
  send_expiration_date?: boolean;
  send_track_data?: boolean;

  /** @format int64 */
  transaction_timeout_threshold_seconds?: number;
  transaction_token?: string;
}

/**
 * Contains merchant-provided, transit-related metadata related to the transaction.
 */
export interface ITransit {
  /** Type of transit transaction. */
  transaction_type?:
    | 'PRE_FUNDED'
    | 'REAL_TIME_AUTHORIZED'
    | 'POST_AUTHORIZED_AGGREGATED'
    | 'AUTHORIZED_AGGREGATED_SPLIT_CLEARING'
    | 'OTHER'
    | 'DEBIT_RECOVERY';

  /** Mode of transportation. */
  transportation_mode?:
    | 'BUS'
    | 'TRAIN'
    | 'WATER_BORNE_VEHICLE'
    | 'TOLL'
    | 'PARKING'
    | 'TAXI'
    | 'PARA_TRANSIT'
    | 'SELF_DRIVE_VEHICLE'
    | 'COACH'
    | 'LOCOMOTIVE'
    | 'POWERED_MOTOR_VEHICLE'
    | 'TRAILER'
    | 'INTER_CITY'
    | 'CABLE_CAR';
}

export interface IUnloadRequestModel {
  /** The amount of funds to unload (i.e., to return to the funding source). */
  amount: number;

  /**
   * Identifies the funding source to use for this GPA unload order.
   *
   * Send a `GET` request to `/fundingsources/addresses/user/{token}` to retrieve addresses for a specific user.
   */
  funding_source_address_token?: string;

  /** Additional descriptive text about the GPA unload. */
  memo?: string;

  /** Identifies the original GPA order. */
  original_order_token: string;

  /** Comma-delimited list of tags describing the GPA unload order. */
  tags?: string;

  /**
   * The unique identifier of the GPA unload order.
   *
   * If you do not include a token, the system will generate one automatically.
   * This token is necessary for use in other calls, so we recommend that rather than let the system generate one, you use a simple string that is easy to remember.
   * This value cannot be updated.
   */
  token?: string;
}

/**
 * Associates each card with a user.
 */
export interface IUserAssociation {
  /**
   * Set to `true` to associate all cards with the same user.
   * Set to `false` to associate each card with a different user.
   * When set to `false`, users are generated automatically and associated with the cards.
   */
  single_inventory_user?: boolean;

  /**
   * If `single_inventory_user=true`, use this field to specify the token of an existing user.
   * All cards in the order will be associated with this user.
   */
  single_inventory_user_token?: string;
}

/**
 * Contains information about a cardholder.
 */
export interface IUserCardHolderResponse {
  /** Associates the specified account holder group with the cardholder. */
  account_holder_group_token?: string;

  /** Specifies if the cardholder is in the `ACTIVE` state on the Marqeta platform. */
  active?: boolean;

  /** Cardholder's address. */
  address1?: string;

  /** Additional address information for the cardholder. */
  address2?: string;

  /** Contains the cardholder's email address and password information. */
  authentication?: IAuthentication;

  /** Cardholder's date of birth. */
  birth_date?: string;

  /** The unique identifier of the `business` resource. */
  business_token?: string;

  /** City where the cardholder resides. */
  city?: string;

  /** Company name. */
  company?: string;

  /** Specifies if the cardholder holds a corporate card. */
  corporate_card_holder?: boolean;

  /** Country where the cardholder resides. */
  country?: string;

  /**
   * The date and time when the resource was created, in UTC.
   * @format date-time
   */
  created_time: string;

  /** Valid email address of the cardholder. */
  email?: string;

  /** Cardholder's first name. */
  first_name?: string;

  /** Cardholder's gender. */
  gender?: 'F' | 'M';

  /** Cardholder's title or prefix: Ms., Mr., Miss, Mrs., and so on. */
  honorific?: string;

  /** The expiration date of the cardholder's identification card. */
  id_card_expiration_date?: string;

  /** The cardholder's identification card number. */
  id_card_number?: string;

  /** One or more objects containing identifications associated with the cardholder. */
  identifications?: IIdentificationResponseModel[];

  /** Cardholder's IP address. */
  ip_address?: string;

  /**
   * The date and time when the resource was last updated, in UTC.
   * @format date-time
   */
  last_modified_time: string;

  /** Cardholder's last name. */
  last_name?: string;

  /** Associates any additional metadata you provide with the cardholder. */
  metadata?: Record<string, string>;

  /** Cardholder's middle name. */
  middle_name?: string;

  /** Cardholder's nationality. */
  nationality?: string;

  /** Any additional information pertaining to the cardholder. */
  notes?: string;

  /** The unique identifier of a `user` or `business` already in the system. */
  parent_token?: string;

  /** The expiration date of the cardholder's passport. */
  passport_expiration_date?: string;

  /** Cardholder's passport number. */
  passport_number?: string;

  /** Cardholder's `user` account password on the Marqeta platform. */
  password?: string;

  /** Cardholder's telephone number. */
  phone?: string;

  /** Postal code of the cardholder's address. */
  postal_code?: string;

  /** The cardholder's Social Security Number. */
  ssn?: string;

  /** State in which the cardholder resides. */
  state?: string;

  /** Specifies the status of the cardholder on the Marqeta platform. */
  status?: 'UNVERIFIED' | 'LIMITED' | 'ACTIVE' | 'SUSPENDED' | 'CLOSED';

  /** The unique identifier of the cardholder. */
  token?: string;

  /** Indicates whether the child shares balances with the parent (`true`), or the child's balances are independent of the parent (`false`). */
  uses_parent_account?: boolean;

  /** ZIP code of the cardholder's address. */
  zip?: string;
}

export interface IUserCardHolderSearchModel {
  /**
   * Performs a match on the specified deposit account number.
   * Send a `GET` request to `/directdeposits/accounts/{user_token}` to retrieve the deposit account number for a specific cardholder.
   */
  dda?: string;

  /** Performs a non-case-sensitive, exact match on the cardholder's `email` field. */
  email?: string;

  /**
   * Performs a non-case-sensitive match on the cardholder's `first_name` field.
   * Matching is partial on the beginning of the name.
   * For example, a match on "Alex" returns both "Alex" and "Alexander".
   */
  first_name?: string;

  /**
   * Performs a non-case-sensitive match on the cardholder's `last_name` field.
   * Matching is partial on the beginning of the name.
   * For example, a match on "Smith" returns both "Smith" and "Smithfield".
   */
  last_name?: string;

  /** Performs a match on the cardholder's `phone` field. */
  phone?: string;

  /** Performs a match on the cardholder's identification number. */
  ssn?: string;
}

export interface IVelocityControlBalanceResponse {
  /** Indicates whether the velocity control is active. */
  active?: boolean;

  /**
   * Maximum monetary sum that can be cleared within the time period defined by the `velocity_window` field.
   * @min 0
   */
  amount_limit: number;

  /** If set to `true`, only approved transactions are subject to control. */
  approvals_only?: boolean;

  /** Defines the group of users to which the velocity control applies. */
  association?: ISpendControlAssociation;

  /** Specifies the available balances of the velocity controls associated with a user. */
  available: IAvailable;

  /** The three-character ISO 4217 currency code. */
  currency_code: string;

  /** If set to `true`, cashbacks from a point of sale are subject to control. */
  include_cashback?: boolean;

  /** If set to `true`, original credit transactions are subject to control. */
  include_credits?: boolean;

  /** If set to `true`, purchases are subject to control. */
  include_purchases?: boolean;

  /** If set to `true`, transfers are subject to control. */
  include_transfers?: boolean;

  /** If set to `true`, ATM withdrawals are subject to control. */
  include_withdrawals?: boolean;

  /**
   * Defines the group of merchants to which the velocity control applies.
   *
   * Populate no more than one field of the `merchant_scope` object.
   * If no fields are populated, the velocity control applies to all merchants.
   */
  merchant_scope?: IMerchantScope;

  /** A description of how the velocity control restricts spending, for example, "Max spend of $500 per day" or "Max spend of $5000 per month for non-exempt employees". */
  name?: string;

  /** The unique identifier of the velocity control. */
  token?: string;

  /**
   * Maximum number of times a card can be used within the time period defined by the `velocity_window` field.
   * @format int32
   * @min -1
   */
  usage_limit?: number;

  /**
   * Defines the time period to which the `amount_limit` and `usage_limit` fields apply:
   *
   * * *DAY* – one day; days begin at 00:00:00 UTC.
   * * *WEEK* – one week; weeks begin Mondays at 00:00:00 UTC.
   * * *MONTH* – one month; months begin on the first day of month at 00:00:00 UTC.
   * * *LIFETIME* – forever; time period never expires.
   * * *TRANSACTION* – a single transaction.
   */
  velocity_window: 'DAY' | 'WEEK' | 'MONTH' | 'LIFETIME' | 'TRANSACTION';
}

export interface IVelocityControlRequest {
  /**
   * Indicates whether the velocity control is active.
   * If the control will be used for Commando Mode, set to `false` and then enable it using `commando_mode_enables`.
   * See <</core-api/commando-mode#_update_commando_mode_control_set, Update Commando Mode control set>>.
   */
  active?: boolean;

  /**
   * Maximum monetary sum that can be cleared within the time period defined by the `velocity_window` field.
   * @min 0
   */
  amount_limit: number;

  /** If set to `true`, only approved transactions are subject to control. */
  approvals_only?: boolean;

  /** Defines the group of users to which the velocity control applies. */
  association?: ISpendControlAssociation;

  /** The three-character ISO 4217 currency code. */
  currency_code: string;

  /** If set to `true`, cashbacks from a point of sale are subject to control. */
  include_cashback?: boolean;

  /** If set to `true`, original credit transactions are subject to control. */
  include_credits?: boolean;

  /** If set to `true`, purchases are subject to control. */
  include_purchases?: boolean;

  /** If set to `true`, transfers are subject to control. */
  include_transfers?: boolean;

  /** If set to `true`, ATM withdrawals are subject to control. */
  include_withdrawals?: boolean;

  /**
   * Defines the group of merchants to which the velocity control applies.
   *
   * Populate no more than one field of the `merchant_scope` object.
   * If no fields are populated, the velocity control applies to all merchants.
   */
  merchant_scope?: IMerchantScope;

  /**
   * A description of how the velocity control restricts spending, for example, "Max spend of $500 per day" or "Max spend of $5000 per month for non-exempt employees".
   *
   * Ensure that the description you provide here adequately captures the kind of restriction exerted by this velocity control, because the Marqeta platform will send this information to you in a webhook in the event that the transaction authorization attempt is declined by the velocity control.
   * *NOTE:* This field is very important.
   * If your program has multiple velocity controls in place, it is not always clear which one prevented the transaction from being approved.
   * Adding specific details to this field gives you more contextual information when debugging or monitoring declined authorization attempts.
   */
  name?: string;

  /**
   * The unique identifier of the velocity control.
   *
   * If you do not include a token, the system will generate one automatically.
   * This token is necessary for use in other API calls, so we recommend that rather than let the system generate one, you use a simple string that is easy to remember.
   * This value cannot be updated.
   */
  token?: string;

  /**
   * Maximum number of times a card can be used within the time period defined by the `velocity_window` field.
   *
   * If `velocity_window` is set to `TRANSACTION`, do not include a `usage_limit` in your request.
   * Set to `-1` to indicate that the card can be used an unlimited number of times.
   * @format int32
   * @min -1
   */
  usage_limit?: number;

  /**
   * Defines the time period to which the `amount_limit` and `usage_limit` fields apply:
   *
   * * *DAY* – one day; days begin at 00:00:00 UTC.
   * * *WEEK* – one week; weeks begin Mondays at 00:00:00 UTC.
   * * *MONTH* – one month; months begin on the first day of month at 00:00:00 UTC.
   * * *LIFETIME* – forever; time period never expires.
   * * *TRANSACTION* – a single transaction.
   * *NOTE:* If set to `DAY`, `WEEK`, or `MONTH`, the velocity control takes effect retroactively from the beginning of the specified period.
   * The amount and usage data already collected within the first period is counted toward the limits.
   * *NOTE:* Editing any of the following fields on a velocity control resets its usage and amount count to 0:
   * * `merchant_scope.mcc`
   * * `merchant_scope.mid`
   * * `merchant_scope.mcc_group`
   * * `association.user_token`
   * * `association.card_product_token`
   * * `velocity_window`
   */
  velocity_window: 'DAY' | 'WEEK' | 'MONTH' | 'LIFETIME' | 'TRANSACTION';
}

export interface IVelocityControlResponse {
  /** Indicates whether the velocity control is active. */
  active?: boolean;

  /**
   * Maximum monetary sum that can be cleared within the time period defined by the `velocity_window` field.
   * @min 0
   */
  amount_limit: number;

  /** If set to `true`, only approved transactions are subject to control. */
  approvals_only?: boolean;

  /** Defines the group of users to which the velocity control applies. */
  association?: ISpendControlAssociation;

  /** The three-character ISO 4217 currency code. */
  currency_code: string;

  /** If set to `true`, cashbacks from a point of sale are subject to control. */
  include_cashback?: boolean;

  /** If set to `true`, original credit transactions are subject to control. */
  include_credits?: boolean;

  /** If set to `true`, purchases are subject to control. */
  include_purchases?: boolean;

  /** If set to `true`, transfers are subject to control. */
  include_transfers?: boolean;

  /** If set to `true`, ATM withdrawals are subject to control. */
  include_withdrawals?: boolean;

  /**
   * Defines the group of merchants to which the velocity control applies.
   *
   * Populate no more than one field of the `merchant_scope` object.
   * If no fields are populated, the velocity control applies to all merchants.
   */
  merchant_scope?: IMerchantScope;

  /** A description of how the velocity control restricts spending, for example, "Max spend of $500 per day" or "Max spend of $5000 per month for non-exempt employees". */
  name?: string;

  /** The unique identifier of the velocity control. */
  token?: string;

  /**
   * Maximum number of times a card can be used within the time period defined by the `velocity_window` field.
   * @format int32
   * @min -1
   */
  usage_limit?: number;

  /**
   * Defines the time period to which the `amount_limit` and `usage_limit` fields apply:
   *
   * * *DAY* – one day; days begin at 00:00:00 UTC.
   * * *WEEK* – one week; weeks begin Mondays at 00:00:00 UTC.
   * * *MONTH* – one month; months begin on the first day of month at 00:00:00 UTC.
   * * *LIFETIME* – forever; time period never expires.
   * * *TRANSACTION* – a single transaction.
   */
  velocity_window: 'DAY' | 'WEEK' | 'MONTH' | 'LIFETIME' | 'TRANSACTION';
}

export interface IVelocityControlUpdateRequest {
  /** Indicates whether the velocity control is active. */
  active?: boolean;

  /**
   * Maximum monetary sum that can be cleared within the time period defined by the `velocity_window` field.
   * @min 0
   */
  amount_limit?: number;

  /** If set to `true`, only approved transactions are subject to control. */
  approvals_only?: boolean;

  /** Defines the group of users to which the velocity control applies. */
  association?: ISpendControlAssociation;

  /** The three-character ISO 4217 currency code. */
  currency_code?: string;

  /** If set to `true`, cashbacks from a point of sale are subject to control. */
  include_cashback?: boolean;

  /** If set to `true`, original credit transactions are subject to control. */
  include_credits?: boolean;

  /** If set to `true`, purchases are subject to control. */
  include_purchases?: boolean;

  /** If set to `true`, transfers are subject to control. */
  include_transfers?: boolean;

  /** If set to `true`, ATM withdrawals are subject to control. */
  include_withdrawals?: boolean;

  /**
   * Defines the group of merchants to which the velocity control applies.
   *
   * Populate no more than one field of the `merchant_scope` object.
   * If no fields are populated, the velocity control applies to all merchants.
   */
  merchant_scope?: IMerchantScope;

  /**
   * A description of how the velocity control restricts spending, for example, "Max spend of $500 per day" or "Max spend of $5000 per month for non-exempt employees".
   *
   * Ensure that the description you provide here adequately captures the kind of restriction exerted by this velocity control, because the Marqeta platform will send this information to you in a webhook in the event that the transaction authorization attempt is declined by the velocity control.
   * *NOTE:* This field is very important.
   * If your program has multiple velocity controls in place, it is not always clear which one prevented the transaction from being approved.
   * Adding specific details to this field gives you more contextual information when debugging or monitoring declined authorization attempts.
   */
  name?: string;

  /** The unique identifier of the velocity control resource. */
  token: string;

  /**
   * Maximum number of times a card can be used within the time period defined by the `velocity_window` field.
   *
   * If `velocity_window` is set to `TRANSACTION`, do not include a `usage_limit` in your request.
   * @format int32
   * @min -1
   */
  usage_limit?: number;

  /**
   * Defines the time period to which the `amount_limit` and `usage_limit` fields apply:
   *
   * * *DAY* – one day; days begin at 00:00:00 UTC.
   * * *WEEK* – one week; weeks begin Mondays at 00:00:00 UTC.
   * * *MONTH* – one month; months begin on the first day of month at 00:00:00 UTC.
   * * *QUARTER* - three months; quarters begin on January 1, April 1, July 1, and October 1 at 00:00:00 UTC.
   * * *YEAR* - twelve months; years begin on January 1 at 00:00:00 UTC.
   * * *LIFETIME* – forever; time period never expires.
   * * *TRANSACTION* – a single transaction.
   * *NOTE:* If set to `DAY`, `WEEK`, `MONTH`, `QUARTER`, or `YEAR,` the velocity control takes effect retroactively from the beginning of the specified period.
   * The amount and usage data already collected within the first period is counted toward the limits.
   * *NOTE:* Editing any of the following fields on a velocity control resets its usage and amount count to 0:
   * * `merchant_scope.mcc`
   * * `merchant_scope.mid`
   * * `merchant_scope.mcc_group`
   * * `association.user_token`
   * * `association.card_product_token`
   * * `velocity_window`
   */
  velocity_window?:
    | 'DAY'
    | 'WEEK'
    | 'MONTH'
    | 'QUARTER'
    | 'YEAR'
    | 'LIFETIME'
    | 'TRANSACTION';
}

export interface IWalletProviderCardOnFile {
  address_verification?: IDigitalWalletTokenAddressVerification;

  /** A value of `true` enables the type of provisioning controlled by the setting. */
  enabled?: boolean;
}

/**
 * Contains information held and provided by the digital wallet provider.
 */
export interface IWalletProviderProfile {
  /** Contains information related to the cardholder and provided by the digital wallet provider. */
  account?: IAccount;

  /** Score from the device. */
  device_score?: string;

  /** Source from which the digital wallet provider obtained the card PAN. */
  pan_source?: string;

  /**
   * Reason for the wallet provider's provisioning decision.
   *
   * * *01* – Cardholder's wallet account is too new relative to launch.
   * * *02* – Cardholder's wallet account is too new relative to provisioning request.
   * * *03* – Cardholder's wallet account/card pair is newer than date threshold.
   * * *04* – Changes made to account data within the account threshold.
   * * *05* – Suspicious transactions linked to this account.
   * * *06* – Account has not had activity in the last year.
   * * *07* – Suspended cards in the secure element.
   * * *08* – Device was put in lost mode in the last seven days for longer than the duration threshold.
   * * *09* – The number of provisioning attempts on this device in 24 hours exceeds threshold.
   * * *0A* – There have been more than the threshold number of different cards attempted at provisioning to this phone in 24 hours.
   * * *0B* – The card provisioning attempt contains a distinct name in excess of the threshold.
   * * *0C* – The device score is less than 3.
   * * *0D* – The account score is less than 4.
   * * *0E* – Device provisioning location outside of the cardholder's wallet account home country.
   * * *0G* – Suspect fraud.
   */
  reason_code?: string;

  /** An array of recommendation reasons from the digital wallet provider. */
  recommendation_reasons?: string[];

  /** Contains the digital wallet provider's risk assessment for provisioning the digital wallet token. */
  risk_assessment?: IRiskAssessment;
}

export interface IWebhook {
  /** Valid URL */
  endpoint: string;

  /** Authentication password */
  password: string;

  /** Authentication secret */
  secret?: string;

  /** Authentication username */
  username: string;
}

export interface IWebhookBaseModel {
  /** Indicates whether the webhook is active. */
  active?: boolean;

  /** Contains the configuration information for the webhook. */
  config: IWebhookConfigModel;

  /**
   * Specifies the types of events for which notifications are sent.
   *
   * The wildcard character `\*` indicates that you receive all webhook notifications, or all notifications of a specified category.
   * For example, `\*` indicates that you receive all webhook notifications; `transaction.*` indicates that you receive all `transaction` webhook notifications.
   * *NOTE:* You can only use the wildcard character with the _base_ type events, not subcategories.
   * For example, you cannot subscribe to `cardtransition.fulfillment.\*` events, but you can subscribe to `cardtransition.*`.
   */
  events: string[];

  /** Descriptive name of the webhook. */
  name: string;
}

/**
 * Contains the configuration information for the webhook.
 */
export interface IWebhookConfigModel {
  /** Password for accessing your webhook endpoint. */
  basic_auth_password: string;

  /** Username for accessing your webhook endpoint. */
  basic_auth_username: string;

  /** Custom headers to be passed along with the request. */
  custom_header?: Record<string, string>;

  /**
   * A randomly chosen string used for implementing HMAC-SHA1.
   *
   * HMAC-SHA1 provides an added layer of security by authenticating the message and validating message integrity.
   * Using this functionality requires that your webhook endpoint verify the message signature.
   * For information about implementing this functionality, see <</developer-guides/signature-verification, Signature Verification>>.
   */
  secret?: string;

  /** URL of your webhook endpoint. */
  url: string;

  /** Set to `true` to use MTLS for the webhook. */
  use_mtls?: boolean;
}

export interface IWebhookPingModel {
  /** An array of ping requests to your webhook endpoint. */
  pings: IEchoPingRequest[];
}

export interface IWebhookRequestModel {
  /** Indicates whether the webhook is active. */
  active?: boolean;

  /** Contains the configuration information for the webhook. */
  config: IWebhookConfigModel;

  /**
   * Specifies the types of events for which notifications are sent.
   *
   * The wildcard character `\*` indicates that you receive all webhook notifications, or all notifications of a specified category.
   * For example, `\*` indicates that you receive all webhook notifications; `transaction.*` indicates that you receive all `transaction` webhook notifications.
   * *NOTE:* You can only use the wildcard character with the _base_ type events, not subcategories.
   * For example, you cannot subscribe to `cardtransition.fulfillment.\*` events, but you can subscribe to `cardtransition.*`.
   */
  events: string[];

  /** Descriptive name of the webhook. */
  name: string;

  /** Unique identifier of the webhook. */
  token?: string;
}

export interface IWebhookResponseModel {
  /**
   * Indicates whether the webhook is active.
   * This field is returned if you included it in your webhook.
   */
  active?: boolean;

  /** Contains the configuration information for the webhook. */
  config: IWebhookConfigModel;

  /**
   * Date and time when the webhook event was created, in UTC.
   * @format date-time
   */
  created_time?: string;

  /**
   * Specifies the types of events for which notifications are sent.
   *
   * The wildcard character `\*` indicates that you receive all webhook notifications, or all notifications of a specified category.
   * For example, `\*` indicates that you receive all webhook notifications; `transaction.*` indicates that you receive all `transaction` webhook notifications.
   * *NOTE:* You can only use the wildcard character with the _base_ type events, not subcategories.
   * For example, you cannot subscribe to `cardtransition.fulfillment.\*` events, but you can subscribe to `cardtransition.*`.
   */
  events: string[];

  /**
   * Date and time when the associated object was last modified, in UTC.
   * @format date-time
   */
  last_modified_time?: string;

  /** Descriptive name of the webhook. */
  name: string;

  /** The unique identifier of the webhook. */
  token?: string;
}

export interface IWithdrawalRequestModel {
  account_type?: 'checking' | 'savings' | 'credit';
  amount: number;
  card_acceptor?: ICardAcceptorModel;
  card_token: string;
  mid: string;
  pin?: string;
  webhook?: IWebhook;
}
