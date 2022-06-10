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

import { ICardholderBalances, ICardholderMsaBalance } from './data-contracts';
import { HttpClient, RequestParams } from './http-client';

export class Balances<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description Use this endpoint to return general purpose account (GPA) balances for a user or a business. The response object includes a link to balances of related user GPAs.
   *
   * @tags Balances
   * @name GetBalancesToken
   * @summary Retrieve GPA balances
   * @request GET:/balances/{token}
   */
  getBalancesToken = (token: string, params: RequestParams = {}) =>
    this.request<ICardholderBalances, void>({
      path: `/balances/${token}`,
      method: 'GET',
      format: 'json',
      ...params,
    });
  /**
   * @description This endpoint is deprecated, do not use.
   *
   * @tags deprecated
   * @name GetBalancesTokenMsas
   * @summary Returns a merchant-specific account balance
   * @request GET:/balances/{token}/msas
   */
  getBalancesTokenMsas = (
    token: string,
    query?: { count?: number; start_index?: number; sort_by?: 'name' },
    params: RequestParams = {},
  ) =>
    this.request<ICardholderMsaBalance, void>({
      path: `/balances/${token}/msas`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    });
}
