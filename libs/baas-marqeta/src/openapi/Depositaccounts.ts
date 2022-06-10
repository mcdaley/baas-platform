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
  ICustomerDueDiligenceResponse,
  ICustomerDueDiligenceUpdateResponse,
  IDepositAccountUpdateRequest,
  IDirectDepositAccountListResponse,
  IDirectDepositAccountRequest,
  IDirectDepositAccountResponse,
  IDirectDepositAccountTransitionRequest,
  IDirectDepositAccountTransitionResponse,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Depositaccounts<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags direct deposit accounts
   * @name CreateAccount
   * @summary Creates new direct deposit account for cardholder.
   * @request POST:/depositaccounts
   */
  createAccount = (
    data: IDirectDepositAccountRequest,
    params: RequestParams = {},
  ) =>
    this.request<IDirectDepositAccountResponse, void>({
      path: `/depositaccounts`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags direct deposit accounts
   * @name GetUserForDirectDepositAccount
   * @summary Get User for Plain Text Account Number
   * @request GET:/depositaccounts/account/{account_number}/user
   */
  getUserForDirectDepositAccount = (
    accountNumber: string,
    params: RequestParams = {},
  ) =>
    this.request<IDirectDepositAccountResponse, void>({
      path: `/depositaccounts/account/${accountNumber}/user`,
      method: 'GET',
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags direct deposit accounts
   * @name CreateTransition
   * @summary Creates new transition for a direct deposit account.
   * @request POST:/depositaccounts/transitions
   */
  createTransition = (
    data: IDirectDepositAccountTransitionRequest,
    params: RequestParams = {},
  ) =>
    this.request<IDirectDepositAccountTransitionResponse, void>({
      path: `/depositaccounts/transitions`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags direct deposit accounts
   * @name GetDirectDepositAccountTransition
   * @summary Get direct deposit account transition.
   * @request GET:/depositaccounts/transitions/{token}
   */
  getDirectDepositAccountTransition = (
    token: string,
    params: RequestParams = {},
  ) =>
    this.request<IDirectDepositAccountTransitionResponse, void>({
      path: `/depositaccounts/transitions/${token}`,
      method: 'GET',
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags direct deposit accounts
   * @name GetUserDirectDepositAccounts
   * @summary List all specific direct deposit accounts.
   * @request GET:/depositaccounts/user/{token}
   */
  getUserDirectDepositAccounts = (
    token: string,
    query?: {
      count?: number;
      start_index?: number;
      sort_by?: string;
      state?:
        | 'ACTIVE'
        | 'SUSPENDED'
        | 'TERMINATED'
        | 'UNSUPPORTED'
        | 'UNACTIVATED'
        | 'LIMITED';
    },
    params: RequestParams = {},
  ) =>
    this.request<IDirectDepositAccountListResponse, void>({
      path: `/depositaccounts/user/${token}`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags direct deposit accounts
   * @name GetDirectDepositAccount
   * @summary Get direct deposit account.
   * @request GET:/depositaccounts/{token}
   */
  getDirectDepositAccount = (token: string, params: RequestParams = {}) =>
    this.request<IDirectDepositAccountResponse, void>({
      path: `/depositaccounts/${token}`,
      method: 'GET',
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags direct deposit accounts
   * @name Update
   * @summary Update direct deposit account.
   * @request PUT:/depositaccounts/{token}
   */
  update = (
    token: string,
    data: IDepositAccountUpdateRequest,
    params: RequestParams = {},
  ) =>
    this.request<IDirectDepositAccountResponse, void>({
      path: `/depositaccounts/${token}`,
      method: 'PUT',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags direct deposit accounts
   * @name GetCddInfo
   * @summary Get direct deposit account transition list for card holder.
   * @request GET:/depositaccounts/{token}/cdd
   */
  getCddInfo = (token: string, params: RequestParams = {}) =>
    this.request<ICustomerDueDiligenceResponse, void>({
      path: `/depositaccounts/${token}/cdd`,
      method: 'GET',
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags direct deposit accounts
   * @name UpdateCddInfo
   * @summary Update CDD answers for Direct Deposit Account
   * @request PUT:/depositaccounts/{token}/cdd/{cddtoken}
   */
  updateCddInfo = (
    token: string,
    cddtoken: string,
    data: ICustomerDueDiligenceUpdateResponse,
    params: RequestParams = {},
  ) =>
    this.request<ICustomerDueDiligenceResponse, void>({
      path: `/depositaccounts/${token}/cdd/${cddtoken}`,
      method: 'PUT',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags direct deposit accounts
   * @name GetTransitionList
   * @summary Get direct deposit account transition list for card holder.
   * @request GET:/depositaccounts/{user_token}/transitions
   */
  getTransitionList = (
    userToken: string,
    query?: { count?: number; start_index?: number; sort_by?: string },
    params: RequestParams = {},
  ) =>
    this.request<IDirectDepositAccountTransitionResponse, void>({
      path: `/depositaccounts/${userToken}/transitions`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    });
}
