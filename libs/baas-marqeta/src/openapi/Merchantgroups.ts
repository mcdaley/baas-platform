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
  IMerchantGroupListResponse,
  IMerchantGroupRequest,
  IMerchantGroupResponse,
  IMerchantGroupUpdateRequest,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Merchantgroups<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description To return an array of all merchant groups, send a `GET` request to the `/merchantgroups` endpoint. To return an array of all merchant groups that include a specific merchant identifier, send a `GET` request to the `/merchantgroups` endpoint that includes the merchant identifier in the query parameters.
   *
   * @tags Merchant Groups
   * @name GetMerchantGroups
   * @summary List merchant groups
   * @request GET:/merchantgroups
   */
  getMerchantGroups = (
    query?: {
      mid?: string;
      count?: number;
      start_index?: number;
      sort_by?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<IMerchantGroupListResponse, void>({
      path: `/merchantgroups`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    });
  /**
   * @description To create a merchant group, send a `POST` request to the `/merchantgroups` endpoint.
   *
   * @tags Merchant Groups
   * @name PostMerchantGroup
   * @summary Create merchant group
   * @request POST:/merchantgroups
   */
  postMerchantGroup = (
    data?: IMerchantGroupRequest,
    params: RequestParams = {},
  ) =>
    this.request<IMerchantGroupResponse, void>({
      path: `/merchantgroups`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description To retrieve a specific merchant group, send a `GET` request to the `/merchantgroups/{token}` endpoint. Include the merchant group `token` path parameter to specify the merchant group to return.
   *
   * @tags Merchant Groups
   * @name GetMerchantGroup
   * @summary Retrieve merchant group
   * @request GET:/merchantgroups/{token}
   */
  getMerchantGroup = (token: string, params: RequestParams = {}) =>
    this.request<IMerchantGroupResponse, void>({
      path: `/merchantgroups/${token}`,
      method: 'GET',
      format: 'json',
      ...params,
    });
  /**
   * @description To update a merchant group, send a `PUT` request to the `/merchantgroups/{token}` endpoint. Include the merchant group `token` path parameter to specify the merchant group to update.
   *
   * @tags Merchant Groups
   * @name PutMerchantGroupsToken
   * @summary Update merchant group
   * @request PUT:/merchantgroups/{token}
   */
  putMerchantGroupsToken = (
    token: string,
    data: IMerchantGroupUpdateRequest,
    params: RequestParams = {},
  ) =>
    this.request<IMerchantGroupResponse, void>({
      path: `/merchantgroups/${token}`,
      method: 'PUT',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
}
