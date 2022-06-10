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
  ITransactionModel,
  ITransactionModelListResponse,
} from './data-contracts';
import { HttpClient, RequestParams } from './http-client';

export class Transactions<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description List all transactions. By default, this endpoint returns transactions conducted within the last 30 days. To return transactions older than 30 days, you must include the `start_date` and `end_date` query parameters in your request. By default, `GET /transactions` returns transactions having either `PENDING` or `COMPLETION` states. This endpoint supports <</core-api/field-filtering, field filtering>> and <</core-api/sorting-and-pagination, pagination>>.
   *
   * @tags Transactions
   * @name GetTransactions
   * @summary List transactions
   * @request GET:/transactions
   */
  getTransactions = (
    query?: {
      count?: number;
      start_index?: number;
      fields?: string;
      sort_by?:
        | '-created_time'
        | 'created_time'
        | '-user_transaction_time'
        | 'user_transaction_time';
      start_date?: string;
      end_date?: string;
      type?: string;
      user_token?: string;
      business_token?: string;
      acting_user_token?: string;
      card_token?: string;
      merchant_token?: string;
      campaign_token?: string;
      state?: string;
      version?: string;
      verbose?: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.request<ITransactionModelListResponse, void>({
      path: `/transactions`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    });
  /**
   * @description List transactions for a specific funding source. By default, this endpoint returns transactions conducted within the last 30 days. To return transactions older than 30 days, you must include the `start_date` and `end_date` query parameters in your request. By default, `GET /transactions/fundingsource/{funding_source_token}` returns transactions having either `PENDING` or `COMPLETION` states. This endpoint supports <</core-api/field-filtering, field filtering>> and <</core-api/sorting-and-pagination, pagination>>.
   *
   * @tags Transactions
   * @name GetTransactionsFundingsourceFundingsourcetoken
   * @summary List transactions for a funding account
   * @request GET:/transactions/fundingsource/{funding_source_token}
   */
  getTransactionsFundingsourceFundingsourcetoken = (
    fundingSourceToken: string,
    query?: {
      count?: number;
      start_index?: number;
      fields?: string;
      sort_by?:
        | '-created_time'
        | 'created_time'
        | '-user_transaction_time'
        | 'user_transaction_time';
      start_date?: string;
      end_date?: string;
      type?: string;
      polarity?: 'CREDIT' | 'DEBIT' | 'PENDING_CREDIT' | 'PENDING_DEBIT';
      version?: string;
      verbose?: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.request<ITransactionModelListResponse, void>({
      path: `/transactions/fundingsource/${fundingSourceToken}`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    });
  /**
   * @description Retrieve a specific transaction. Include the `token` path parameter to identify the transaction. [NOTE] Transactions are not available in real time via this endpoint, and typically appear after 30 seconds. On occasion, a transaction may require up to four hours to appear.
   *
   * @tags Transactions
   * @name GetTransactionsToken
   * @summary Retrieve transaction
   * @request GET:/transactions/{token}
   */
  getTransactionsToken = (
    token: string,
    query?: { fields?: string; version?: string; verbose?: boolean },
    params: RequestParams = {},
  ) =>
    this.request<ITransactionModel, void>({
      path: `/transactions/${token}`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    });
  /**
   * @description List all transactions related to the specified transaction. By default, this endpoint returns transactions conducted within the last 30 days. To return transactions older than 30 days, you must include the `start_date` and `end_date` query parameters in your request. By default, this endpoint returns transactions of any state. To return transactions in specific states, you must include the `state` query parameter in your request. This endpoint supports <</core-api/field-filtering, field filtering>> and <</core-api/sorting-and-pagination, pagination>>.
   *
   * @tags Transactions
   * @name GetTransactionsTokenRelated
   * @summary List related transactions
   * @request GET:/transactions/{token}/related
   */
  getTransactionsTokenRelated = (
    token: string,
    query?: {
      count?: number;
      start_index?: number;
      fields?: string;
      sort_by?:
        | '-created_time'
        | 'created_time'
        | '-user_transaction_time'
        | 'user_transaction_time';
      start_date?: string;
      end_date?: string;
      type?: string;
      state?: string;
      version?: string;
      verbose?: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.request<ITransactionModelListResponse, void>({
      path: `/transactions/${token}/related`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    });
}
