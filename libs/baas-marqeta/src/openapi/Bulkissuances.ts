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
  IBulkCardOrderListResponse,
  IBulkIssuanceRequest,
  IBulkIssuanceResponse,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Bulkissuances<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description Use this endpoint to list existing bulk card orders. This endpoint supports <</core-api/sorting-and-pagination, pagination and sorting>>.
   *
   * @tags Bulk Card Orders
   * @name GetBulkissuances
   * @summary List bulk card orders
   * @request GET:/bulkissuances
   */
  getBulkissuances = (
    query?: { count?: number; start_index?: number; sort_by?: string },
    params: RequestParams = {},
  ) =>
    this.request<IBulkCardOrderListResponse, void>({
      path: `/bulkissuances`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    });
  /**
   * @description Use this endpoint to order physical cards in bulk. A new bulk card order creates new cards or users, generally within about a day. Before creating a bulk card order, set the `config.fulfillment.bulk_ship` field of the associated card product to `true`. *To associate all cards with the same user:* * Set `user_association.single_inventory_user=true` * Set `user_association.single_inventory_user_token` equal to the token of an existing user. The bulk card order automatically populates the database with the specified card objects. Values for the card `token` fields are generated in the format `card-numericPostfix`, where `numericPostfix` is a randomly generated number that is added for each new card that is generated. *To associate each card with a unique user:* Set `user_association.single_inventory_user=false`. Both the cards and their associated users are automatically generated. Values for the user `token` fields are generated in the format `user-numericPostfix`. The `numericPostfix` values for cards and their associated users match. This value is also printed on the physical cards if the `name_line_1_numeric_postfix` field is set to `true`.
   *
   * @tags Bulk Card Orders
   * @name PostBulkissuances
   * @summary Create bulk card order
   * @request POST:/bulkissuances
   */
  postBulkissuances = (
    data?: IBulkIssuanceRequest,
    params: RequestParams = {},
  ) =>
    this.request<IBulkIssuanceResponse, void>({
      path: `/bulkissuances`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description Use this endpoint to retrieve a specific bulk card order.
   *
   * @tags Bulk Card Orders
   * @name GetBulkissuancesToken
   * @summary Retrieve bulk card order
   * @request GET:/bulkissuances/{token}
   */
  getBulkissuancesToken = (token: string, params: RequestParams = {}) =>
    this.request<IBulkIssuanceResponse, void>({
      path: `/bulkissuances/${token}`,
      method: 'GET',
      format: 'json',
      ...params,
    });
}
