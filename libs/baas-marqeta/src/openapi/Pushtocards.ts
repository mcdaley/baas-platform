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
  IPushToCardDisburseListResponse,
  IPushToCardDisbursementResponse,
  IPushToCardDisburseRequest,
  IPushToCardListResponse,
  IPushToCardRequest,
  IPushToCardResponse,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Pushtocards<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags push to card
   * @name GetPushtocardsDisburse
   * @summary Lists all push-to-card disbursements
   * @request GET:/pushtocards/disburse
   */
  getPushtocardsDisburse = (
    query?: {
      count?: number;
      fields?: string;
      start_index?: number;
      sort_by?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<IPushToCardDisburseListResponse, void>({
      path: `/pushtocards/disburse`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags push to card
   * @name PostPushtocardsDisburse
   * @summary Initiates a push-to-card money disbursement
   * @request POST:/pushtocards/disburse
   */
  postPushtocardsDisburse = (
    data?: IPushToCardDisburseRequest,
    params: RequestParams = {},
  ) =>
    this.request<IPushToCardDisbursementResponse, void>({
      path: `/pushtocards/disburse`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags push to card
   * @name GetPushtocardsDisburseToken
   * @summary Returns a specific push-to-card disbursement
   * @request GET:/pushtocards/disburse/{token}
   */
  getPushtocardsDisburseToken = (
    token: string,
    query?: { fields?: string },
    params: RequestParams = {},
  ) =>
    this.request<IPushToCardDisbursementResponse, void>({
      path: `/pushtocards/disburse/${token}`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags push to card
   * @name GetPushtocardsPaymentcard
   * @summary Returns all push-to-card payment card details
   * @request GET:/pushtocards/paymentcard
   */
  getPushtocardsPaymentcard = (
    query: {
      count?: number;
      user_token: string;
      fields?: string;
      start_index?: number;
      sort_by?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<IPushToCardListResponse, void>({
      path: `/pushtocards/paymentcard`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags push to card
   * @name PostPushtocardsPaymentcard
   * @summary Adds an external card to which funds will be pushed
   * @request POST:/pushtocards/paymentcard
   */
  postPushtocardsPaymentcard = (
    data?: IPushToCardRequest,
    params: RequestParams = {},
  ) =>
    this.request<IPushToCardResponse, void>({
      path: `/pushtocards/paymentcard`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags push to card
   * @name GetPushtocardsPaymentcardToken
   * @summary Returns a specific paymentcard object
   * @request GET:/pushtocards/paymentcard/{token}
   */
  getPushtocardsPaymentcardToken = (
    token: string,
    query?: { fields?: string },
    params: RequestParams = {},
  ) =>
    this.request<IPushToCardResponse, void>({
      path: `/pushtocards/paymentcard/${token}`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    });
}
