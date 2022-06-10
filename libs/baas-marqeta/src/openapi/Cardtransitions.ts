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
  ICardTransitionListResponse,
  ICardTransitionRequest,
  ICardTransitionResponse,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Cardtransitions<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description Creates a card state transition to set the state of an existing card. If your system uses IVR, you can send a `POST` request to `/cards/getbypan` to retrieve a card token, which you can then use in your `POST` request to `/cardtransitions`. It may not be possible to move a card from one user to another once the card has been activated.
   *
   * @tags Card Transitions
   * @name PostCardtransitions
   * @summary Create card transition
   * @request POST:/cardtransitions
   */
  postCardtransitions = (
    data?: ICardTransitionRequest,
    params: RequestParams = {},
  ) =>
    this.request<ICardTransitionResponse, void>({
      path: `/cardtransitions`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description Retrieves a list of the transitions for a specific card. This endpoint supports <</core-api/field-filtering, field filtering>> and <</core-api/sorting-and-pagination, pagination>>.
   *
   * @tags Card Transitions
   * @name GetCardtransitionsCardToken
   * @summary List transitions for card
   * @request GET:/cardtransitions/card/{token}
   */
  getCardtransitionsCardToken = (
    token: string,
    query?: {
      count?: number;
      start_index?: number;
      fields?: string;
      sort_by?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<ICardTransitionListResponse, void>({
      path: `/cardtransitions/card/${token}`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    });
  /**
   * @description Retrieves a specific card transition. This endpoint supports <</core-api/field-filtering, field filtering>>.
   *
   * @tags Card Transitions
   * @name GetCardtransitionsToken
   * @summary Retrieve card transition
   * @request GET:/cardtransitions/{token}
   */
  getCardtransitionsToken = (
    token: string,
    query?: { fields?: string },
    params: RequestParams = {},
  ) =>
    this.request<ICardTransitionResponse, void>({
      path: `/cardtransitions/${token}`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    });
}
