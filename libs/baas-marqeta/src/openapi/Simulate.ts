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
  IAuthorizationAdviceModel,
  IAuthRequestModel,
  IBalanceInquiryRequestModel,
  IClearingModel,
  IDepositDepositResponse,
  IDirectDepositRequest,
  IFinancialRequestModel,
  IOrignalcreditRequestModel,
  IReversalModel,
  ISimulationResponseModel,
  IWithdrawalRequestModel,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Simulate<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags simulate
   * @name PostSimulateAuthorization
   * @summary Simulates an authorization
   * @request POST:/simulate/authorization
   */
  postSimulateAuthorization = (
    data?: IAuthRequestModel,
    params: RequestParams = {},
  ) =>
    this.request<ISimulationResponseModel, void>({
      path: `/simulate/authorization`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags simulate
   * @name PostSimulateAuthorizationAdvice
   * @summary Simulates an authorization advice transaction
   * @request POST:/simulate/authorization/advice
   */
  postSimulateAuthorizationAdvice = (
    data?: IAuthorizationAdviceModel,
    params: RequestParams = {},
  ) =>
    this.request<ISimulationResponseModel, void>({
      path: `/simulate/authorization/advice`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags simulate
   * @name PostSimulateClearing
   * @summary Simulates a clearing/settlement transaction
   * @request POST:/simulate/clearing
   */
  postSimulateClearing = (data?: IClearingModel, params: RequestParams = {}) =>
    this.request<ISimulationResponseModel, void>({
      path: `/simulate/clearing`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags simulate
   * @name PostSimulateDirectdeposits
   * @summary Simulates the creation of direct deposit
   * @request POST:/simulate/directdeposits
   */
  postSimulateDirectdeposits = (
    data: IDirectDepositRequest,
    params: RequestParams = {},
  ) =>
    this.request<IDepositDepositResponse, void>({
      path: `/simulate/directdeposits`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags simulate
   * @name PostSimulateFinancial
   * @summary Simulates a financial request (PIN debit) transaction with optional cash back
   * @request POST:/simulate/financial
   */
  postSimulateFinancial = (
    data: IFinancialRequestModel,
    params: RequestParams = {},
  ) =>
    this.request<ISimulationResponseModel, void>({
      path: `/simulate/financial`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags simulate
   * @name PostSimulateFinancialAdvice
   * @summary Simulates a financial advice transaction
   * @request POST:/simulate/financial/advice
   */
  postSimulateFinancialAdvice = (
    data: IAuthorizationAdviceModel,
    params: RequestParams = {},
  ) =>
    this.request<ISimulationResponseModel, void>({
      path: `/simulate/financial/advice`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags simulate
   * @name PostSimulateFinancialBalanceinquiry
   * @summary Simulates a balance inquiry
   * @request POST:/simulate/financial/balanceinquiry
   */
  postSimulateFinancialBalanceinquiry = (
    data: IBalanceInquiryRequestModel,
    params: RequestParams = {},
  ) =>
    this.request<ISimulationResponseModel, void>({
      path: `/simulate/financial/balanceinquiry`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags simulate
   * @name PostSimulateFinancialOriginalcredit
   * @summary Simulates an orignal credit transaction
   * @request POST:/simulate/financial/originalcredit
   */
  postSimulateFinancialOriginalcredit = (
    data: IOrignalcreditRequestModel,
    params: RequestParams = {},
  ) =>
    this.request<ISimulationResponseModel, void>({
      path: `/simulate/financial/originalcredit`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags simulate
   * @name PostSimulateFinancialWithdrawal
   * @summary Simulates an ATM withdrawal transaction
   * @request POST:/simulate/financial/withdrawal
   */
  postSimulateFinancialWithdrawal = (
    data: IWithdrawalRequestModel,
    params: RequestParams = {},
  ) =>
    this.request<ISimulationResponseModel, void>({
      path: `/simulate/financial/withdrawal`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags simulate
   * @name PostSimulateReversal
   * @summary Simulates a reversal transaction
   * @request POST:/simulate/reversal
   */
  postSimulateReversal = (data?: IReversalModel, params: RequestParams = {}) =>
    this.request<ISimulationResponseModel, void>({
      path: `/simulate/reversal`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
}
