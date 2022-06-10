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
  IProgramReserveAccountBalance,
  IProgramReserveTransactionListResponse,
} from './data-contracts';
import { HttpClient, RequestParams } from './http-client';

export class Programreserve<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description Use this endpoint to return balances for your program reserve account.
   *
   * @tags Program Reserve
   * @name GetProgramreserveBalances
   * @summary Retrieve reserve account balances
   * @request GET:/programreserve/balances
   */
  getProgramreserveBalances = (params: RequestParams = {}) =>
    this.request<IProgramReserveAccountBalance, void>({
      path: `/programreserve/balances`,
      method: 'GET',
      format: 'json',
      ...params,
    });
  /**
   * @description Use this endpoint to return a list of credits and debits made to your program reserve account. This endpoint supports <</core-api/sorting-and-pagination, sorting and pagination>>.
   *
   * @tags Program Reserve
   * @name GetProgramreserveTransactions
   * @summary List program reserve transactions
   * @request GET:/programreserve/transactions
   */
  getProgramreserveTransactions = (
    query?: { count?: number; start_index?: number; sort_by?: string },
    params: RequestParams = {},
  ) =>
    this.request<IProgramReserveTransactionListResponse, void>({
      path: `/programreserve/transactions`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    });
}
