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

import {
  IACHListResponse,
  IAchModel,
  IAchResponseModel,
  IAchVerificationModel,
  IBaseAchRequestModel,
  IBaseAchResponseModel,
  ICardholderAddressListResponse,
  ICardHolderAddressModel,
  ICardholderAddressResponse,
  ICardHolderAddressUpdateModel,
  IFundingAccountListResponse,
  IGatewayProgramCustomHeaderUpdateRequest,
  IGatewayProgramFundingSourceRequest,
  IGatewayProgramFundingSourceResponse,
  IGatewayProgramFundingSourceUpdateRequest,
  IPaymentCardResponseModel,
  IProgramFundingSourceRequest,
  IProgramFundingSourceResponse,
  IProgramFundingSourceUpdateRequest,
  ITokenRequest,
  ITokenUpdateRequest,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Fundingsources<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description Create an ACH funding source for an existing account holder. Specify the account holder of the funding source by passing a user or business token. When adding an ACH funding source, a small amount is deposited in the bank account as a test. The test deposit should be reflected in the account after two to three business days. You must then make an API call to verify the deposit amount in order to activate the ACH account. See <<verify_or_update_ach_source, Verify or Update ACH Funding Source>> on this page for more information. The response body returns details about the account, including the verification status. Possible ACH verification status values include `VERIFICATION_PENDING`, `ACH_VERIFIED`, and `ACH_FAILED`.
   *
   * @tags Account Holder Funding Sources
   * @name PostFundingsourcesAch
   * @summary Create ACH source
   * @request POST:/fundingsources/ach
   */
  postFundingsourcesAch = (data?: IAchModel, params: RequestParams = {}) =>
    this.request<IAchResponseModel, void>({
      path: `/fundingsources/ach`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description Retrieve a specific ACH funding source. The response body returns details about the account, including the verification status. Possible ACH verification status values are: `VERIFICATION_PENDING`, `ACH_VERIFIED`, and `ACH_FAILED`.
   *
   * @tags Account Holder Funding Sources
   * @name GetFundingsourcesAchFundingsourcetoken
   * @summary Retrieve ACH source
   * @request GET:/fundingsources/ach/{funding_source_token}
   */
  getFundingsourcesAchFundingsourcetoken = (
    fundingSourceToken: string,
    params: RequestParams = {},
  ) =>
    this.request<IAchResponseModel, void>({
      path: `/fundingsources/ach/${fundingSourceToken}`,
      method: 'GET',
      format: 'json',
      ...params,
    });
  /**
   * @description Verify or update an ACH funding source. If you are verifying the ACH source, include the verification amounts in the body of the request. ACH verification will fail if the verification amounts are not entered in the correct order. `verify_amount1` must match the first deposit amount, and `verify_amount2` must match the second. If you are updating the ACH source, include the `active` field instead. The `active` field is the only field you can update.
   *
   * @tags Account Holder Funding Sources
   * @name PutFundingsourcesAchFundingsourcetoken
   * @summary Verify or update ACH source
   * @request PUT:/fundingsources/ach/{funding_source_token}
   */
  putFundingsourcesAchFundingsourcetoken = (
    fundingSourceToken: string,
    data?: IAchVerificationModel,
    params: RequestParams = {},
  ) =>
    this.request<IAchResponseModel, void>({
      path: `/fundingsources/ach/${fundingSourceToken}`,
      method: 'PUT',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description In your sandbox environment, retrieve the amounts used to verify the association with your ACH account. Use this endpoint for testing purposes only. In production, verification amounts are retrieved from the bank statement of the account holder.
   *
   * @tags Account Holder Funding Sources
   * @name GetFundingsourcesAchFundingsourcetokenVerificationamounts
   * @summary Retrieve ACH verification amounts
   * @request GET:/fundingsources/ach/{funding_source_token}/verificationamounts
   */
  getFundingsourcesAchFundingsourcetokenVerificationamounts = (
    fundingSourceToken: string,
    params: RequestParams = {},
  ) =>
    this.request<IAchVerificationModel, void>({
      path: `/fundingsources/ach/${fundingSourceToken}/verificationamounts`,
      method: 'GET',
      format: 'json',
      ...params,
    });
  /**
   * @description Use this endpoint to create an address resource. When creating the address, you must pass the token of either an existing user in the `user_token` field or an existing business in the `business_token` field. Do not pass both.
   *
   * @tags Addresses
   * @name PostFundingsourcesAddresses
   * @summary Create address
   * @request POST:/fundingsources/addresses
   */
  postFundingsourcesAddresses = (
    data?: ICardHolderAddressModel,
    params: RequestParams = {},
  ) =>
    this.request<ICardholderAddressResponse, void>({
      path: `/fundingsources/addresses`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description Use this endpoint to list existing addresses for a business. This endpoint supports <</core-api/field-filtering, field filtering>>.
   *
   * @tags Addresses
   * @name GetFundingsourcesAddressesBusinessBusinesstoken
   * @summary Lists all addresses for a business
   * @request GET:/fundingsources/addresses/business/{business_token}
   */
  getFundingsourcesAddressesBusinessBusinesstoken = (
    businessToken: string,
    query?: { fields?: string },
    params: RequestParams = {},
  ) =>
    this.request<ICardholderAddressListResponse, void>({
      path: `/fundingsources/addresses/business/${businessToken}`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    });
  /**
   * @description Use this endpoint to list existing addresses for a user. This endpoint supports <</core-api/field-filtering, field filtering>>.
   *
   * @tags Addresses
   * @name GetFundingsourcesAddressesUserUsertoken
   * @summary Lists all addresses for a user
   * @request GET:/fundingsources/addresses/user/{user_token}
   */
  getFundingsourcesAddressesUserUsertoken = (
    userToken: string,
    query?: { fields?: string },
    params: RequestParams = {},
  ) =>
    this.request<ICardholderAddressListResponse, void>({
      path: `/fundingsources/addresses/user/${userToken}`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    });
  /**
   * @description Use this endpoint to retrieve a funding source address.
   *
   * @tags Addresses
   * @name GetFundingsourcesAddressesFundingsourceaddresstoken
   * @summary Retrieve address
   * @request GET:/fundingsources/addresses/{funding_source_address_token}
   */
  getFundingsourcesAddressesFundingsourceaddresstoken = (
    fundingSourceAddressToken: string,
    params: RequestParams = {},
  ) =>
    this.request<ICardholderAddressResponse, void>({
      path: `/fundingsources/addresses/${fundingSourceAddressToken}`,
      method: 'GET',
      format: 'json',
      ...params,
    });
  /**
   * @description Use this endpoint to update an address. Only values of parameters in the request are modified; all others are left unchanged.
   *
   * @tags Addresses
   * @name PutFundingsourcesAddressesFundingsourceaddresstoken
   * @summary Updates the account holder address for a funding source
   * @request PUT:/fundingsources/addresses/{funding_source_address_token}
   */
  putFundingsourcesAddressesFundingsourceaddresstoken = (
    fundingSourceAddressToken: string,
    data?: ICardHolderAddressUpdateModel,
    params: RequestParams = {},
  ) =>
    this.request<ICardholderAddressResponse, void>({
      path: `/fundingsources/addresses/${fundingSourceAddressToken}`,
      method: 'PUT',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description List funding sources associated with a specific business. This endpoint supports <</core-api/field-filtering, field filtering>>.
   *
   * @tags Account Holder Funding Sources
   * @name GetFundingsourcesBusinessBusinesstoken
   * @summary List sources for business
   * @request GET:/fundingsources/business/{business_token}
   */
  getFundingsourcesBusinessBusinesstoken = (
    businessToken: string,
    query?: { type?: string; fields?: string },
    params: RequestParams = {},
  ) =>
    this.request<IFundingAccountListResponse, void>({
      path: `/fundingsources/business/${businessToken}`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    });
  /**
   * @description Create a payment card funding source for an existing account holder. This endpoint returns the card type and the last four digits of the card, and then sets the `active_ field` to `true`. Marqeta retains only a tokenized representation of the card number. [NOTE] This endpoint is only available to its current users.
   *
   * @tags Account Holder Funding Sources
   * @name PostFundingsourcesPaymentcard
   * @summary Create payment card source
   * @request POST:/fundingsources/paymentcard
   */
  postFundingsourcesPaymentcard = (
    data?: ITokenRequest,
    params: RequestParams = {},
  ) =>
    this.request<IPaymentCardResponseModel, void>({
      path: `/fundingsources/paymentcard`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description Retrieve a specific payment card funding source. [NOTE] This endpoint is only available to its current users.
   *
   * @tags Account Holder Funding Sources
   * @name GetFundingsourcesPaymentcardFundingsourcetoken
   * @summary Retrieve payment card source
   * @request GET:/fundingsources/paymentcard/{funding_source_token}
   */
  getFundingsourcesPaymentcardFundingsourcetoken = (
    fundingSourceToken: string,
    params: RequestParams = {},
  ) =>
    this.request<IPaymentCardResponseModel, void>({
      path: `/fundingsources/paymentcard/${fundingSourceToken}`,
      method: 'GET',
      format: 'json',
      ...params,
    });
  /**
   * @description Update a payment card funding source. Only the values of parameters in the request are modified; all others are left unchanged. [NOTE] This endpoint is only available to its current users.
   *
   * @tags Account Holder Funding Sources
   * @name PutFundingsourcesPaymentcardFundingsourcetoken
   * @summary Update payment card source
   * @request PUT:/fundingsources/paymentcard/{funding_source_token}
   */
  putFundingsourcesPaymentcardFundingsourcetoken = (
    fundingSourceToken: string,
    data: ITokenUpdateRequest,
    params: RequestParams = {},
  ) =>
    this.request<IPaymentCardResponseModel, void>({
      path: `/fundingsources/paymentcard/${fundingSourceToken}`,
      method: 'PUT',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description Create a program funding source.
   *
   * @tags Program Funding Sources
   * @name PostFundingsourcesProgram
   * @summary Create program source
   * @request POST:/fundingsources/program
   */
  postFundingsourcesProgram = (
    data?: IProgramFundingSourceRequest,
    params: RequestParams = {},
  ) =>
    this.request<IProgramFundingSourceResponse, void>({
      path: `/fundingsources/program`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description List ACH program funding sources.
   *
   * @tags Program Funding Sources
   * @name GetfundingsourcesProgramAch
   * @summary List ACH program sources
   * @request GET:/fundingsources/program/ach
   */
  getfundingsourcesProgramAch = (
    query?: {
      count?: number;
      start_index?: number;
      fields?: string;
      sort_by?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<IACHListResponse, void>({
      path: `/fundingsources/program/ach`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    });
  /**
   * @description Create an ACH program funding source.
   *
   * @tags Program Funding Sources
   * @name PostFundingsourcesProgramAch
   * @summary Create ACH program source
   * @request POST:/fundingsources/program/ach
   */
  postFundingsourcesProgramAch = (
    data?: IBaseAchRequestModel,
    params: RequestParams = {},
  ) =>
    this.request<IBaseAchResponseModel, void>({
      path: `/fundingsources/program/ach`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description Retrieve a specific program funding source, whether active or inactive.
   *
   * @tags Program Funding Sources
   * @name GetFundingsourcesProgramToken
   * @summary Retrieve program source
   * @request GET:/fundingsources/program/{token}
   */
  getFundingsourcesProgramToken = (token: string, params: RequestParams = {}) =>
    this.request<IProgramFundingSourceResponse, void>({
      path: `/fundingsources/program/${token}`,
      method: 'GET',
      format: 'json',
      ...params,
    });
  /**
   * @description Update a program funding source. Only the values of parameters specified in the request are modified; all others are left unchanged.
   *
   * @tags Program Funding Sources
   * @name PutFundingsourcesProgramToken
   * @summary Update program source
   * @request PUT:/fundingsources/program/{token}
   */
  putFundingsourcesProgramToken = (
    token: string,
    data?: IProgramFundingSourceUpdateRequest,
    params: RequestParams = {},
  ) =>
    this.request<IProgramFundingSourceResponse, void>({
      path: `/fundingsources/program/${token}`,
      method: 'PUT',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description Creates a program gateway funding source. A program gateway funding source is a transaction relay that, when configured, allows you to approve or decline transactions in real time.
   *
   * @tags Program Gateway Funding Sources
   * @name PostFundingsourcesProgramgateway
   * @summary Create program gateway source
   * @request POST:/fundingsources/programgateway
   */
  postFundingsourcesProgramgateway = (
    data?: IGatewayProgramFundingSourceRequest,
    params: RequestParams = {},
  ) =>
    this.request<IGatewayProgramFundingSourceResponse, void>({
      path: `/fundingsources/programgateway`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description Adds or updates custom HTTP headers for a specific program gateway funding source.
   *
   * @tags Program Gateway Funding Sources
   * @name PutFundingsourcesProgramgatewayCustomheadersToken
   * @summary Update program gateway source custom headers
   * @request PUT:/fundingsources/programgateway/customheaders/{token}
   */
  putFundingsourcesProgramgatewayCustomheadersToken = (
    token: string,
    data?: IGatewayProgramCustomHeaderUpdateRequest,
    params: RequestParams = {},
  ) =>
    this.request<IGatewayProgramFundingSourceResponse, void>({
      path: `/fundingsources/programgateway/customheaders/${token}`,
      method: 'PUT',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description Retrieves a specific program gateway funding source.
   *
   * @tags Program Gateway Funding Sources
   * @name GetFundingsourcesProgramgatewayToken
   * @summary Retrieve program gateway source
   * @request GET:/fundingsources/programgateway/{token}
   */
  getFundingsourcesProgramgatewayToken = (
    token: string,
    params: RequestParams = {},
  ) =>
    this.request<IGatewayProgramFundingSourceResponse, void>({
      path: `/fundingsources/programgateway/${token}`,
      method: 'GET',
      format: 'json',
      ...params,
    });
  /**
   * @description Updates a program gateway funding source. Only the values of parameters specified in the request are modified; all others are left unchanged.
   *
   * @tags Program Gateway Funding Sources
   * @name PutFundingsourcesProgramgatewayToken
   * @summary Update program gateway source
   * @request PUT:/fundingsources/programgateway/{token}
   */
  putFundingsourcesProgramgatewayToken = (
    token: string,
    data?: IGatewayProgramFundingSourceUpdateRequest,
    params: RequestParams = {},
  ) =>
    this.request<IGatewayProgramFundingSourceResponse, void>({
      path: `/fundingsources/programgateway/${token}`,
      method: 'PUT',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description List funding sources associated with a specific user. This endpoint supports <</core-api/field-filtering, field filtering>>.
   *
   * @tags Account Holder Funding Sources
   * @name GetFundingsourcesUserUsertoken
   * @summary List sources for user
   * @request GET:/fundingsources/user/{user_token}
   */
  getFundingsourcesUserUsertoken = (
    userToken: string,
    query?: { type?: string; fields?: string },
    params: RequestParams = {},
  ) =>
    this.request<IFundingAccountListResponse, void>({
      path: `/fundingsources/user/${userToken}`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    });
  /**
   * @description Configure either an ACH funding source or a payment card funding source as the default funding source. A default funding source is used when you omit the `funding_source_token` field from funding requests, such as a `POST` request to `/gpaorders`. Note that the first funding source you create is automatically set as the default (`is_default_source=true`).
   *
   * @tags Account Holder Funding Sources
   * @name PutFundingsourcesFundingsourcetokenDefault
   * @summary Configures a default funding source
   * @request PUT:/fundingsources/{funding_source_token}/default
   */
  putFundingsourcesFundingsourcetokenDefault = (
    fundingSourceToken: string,
    params: RequestParams = {},
  ) =>
    this.request<IPaymentCardResponseModel, void>({
      path: `/fundingsources/${fundingSourceToken}/default`,
      method: 'PUT',
      format: 'json',
      ...params,
    });
}
