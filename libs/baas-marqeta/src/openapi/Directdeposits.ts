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
  IDepositAccount,
  IDepositAccountUpdateRequest,
  IDepositDepositResponse,
  IDirectDepositListResponse,
  IDirectDepositTransitionListResponse,
  IDirectDepositTransitionRequest,
  IDirectDepositTransitionResponse,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Directdeposits<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags direct deposits
   * @name GetDirectdeposits
   * @summary Retrieves a list of all direct deposit records for your program.
   * @request GET:/directdeposits
   */
  getDirectdeposits = (
    query?: {
      count?: number;
      start_index?: number;
      reversed_after_grace_period?: boolean;
      user_token?: string;
      business_token?: string;
      direct_deposit_state?: 'PENDING' | 'APPLIED' | 'REVERSED' | 'REJECTED';
      start_settlement_date?: string;
      end_settlement_date?: string;
      sort_by?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<IDirectDepositListResponse, void>({
      path: `/directdeposits`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags direct deposits
   * @name GetDirectdepositsAccountsUserorbusinesstoken
   * @summary Returns an account and routing number which can be used for direct deposit
   * @request GET:/directdeposits/accounts/{user_or_business_token}
   */
  getDirectdepositsAccountsUserorbusinesstoken = (
    userOrBusinessToken: string,
    params: RequestParams = {},
  ) =>
    this.request<IDepositAccount, void>({
      path: `/directdeposits/accounts/${userOrBusinessToken}`,
      method: 'GET',
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags direct deposits
   * @name PutDirectdepositsAccountsUserorbusinesstoken
   * @summary Updates a specific direct deposit account
   * @request PUT:/directdeposits/accounts/{user_or_business_token}
   */
  putDirectdepositsAccountsUserorbusinesstoken = (
    userOrBusinessToken: string,
    data: IDepositAccountUpdateRequest,
    params: RequestParams = {},
  ) =>
    this.request<IDepositAccount, void>({
      path: `/directdeposits/accounts/${userOrBusinessToken}`,
      method: 'PUT',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags direct deposits
   * @name GetDirectdepositsTransitions
   * @summary Returns a list of direct deposit transitions
   * @request GET:/directdeposits/transitions
   */
  getDirectdepositsTransitions = (
    query?: {
      count?: number;
      user_token?: string;
      business_token?: string;
      direct_deposit_token?: string;
      start_index?: number;
      sort_by?: string;
      states?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<IDirectDepositTransitionListResponse, void>({
      path: `/directdeposits/transitions`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags direct deposits
   * @name PostDirectdepositsTransitions
   * @summary Creates a direct deposit transition
   * @request POST:/directdeposits/transitions
   */
  postDirectdepositsTransitions = (
    data?: IDirectDepositTransitionRequest,
    params: RequestParams = {},
  ) =>
    this.request<IDirectDepositTransitionResponse, void>({
      path: `/directdeposits/transitions`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags direct deposits
   * @name GetDirectdepositsTransitionsToken
   * @summary Returns a direct deposit transition
   * @request GET:/directdeposits/transitions/{token}
   */
  getDirectdepositsTransitionsToken = (
    token: string,
    params: RequestParams = {},
  ) =>
    this.request<IDirectDepositTransitionResponse, void>({
      path: `/directdeposits/transitions/${token}`,
      method: 'GET',
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags direct deposits
   * @name GetDirectdepositsToken
   * @summary Returns a direct deposit entry
   * @request GET:/directdeposits/{token}
   */
  getDirectdepositsToken = (token: string, params: RequestParams = {}) =>
    this.request<IDepositDepositResponse, void>({
      path: `/directdeposits/${token}`,
      method: 'GET',
      format: 'json',
      ...params,
    });
}
