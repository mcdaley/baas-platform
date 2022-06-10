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
  IRealTimeFeeGroup,
  IRealTimeFeeGroupCreateRequest,
  IRealTimeFeeGroupListResponse,
  IRealTimeFeeGroupRequest,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Realtimefeegroups<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description Use this endpoint to list existing real-time fee groups. This endpoint supports <</core-api/field-filtering, field filtering>> and <</core-api/sorting-and-pagination, pagination>>.
   *
   * @tags Real-Time Fee Groups
   * @name GetRealtimefeegroups
   * @summary List real-time fee groups
   * @request GET:/realtimefeegroups
   */
  getRealtimefeegroups = (
    query?: {
      count?: number;
      start_index?: number;
      fields?: string;
      sort_by?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<IRealTimeFeeGroupListResponse, void>({
      path: `/realtimefeegroups`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    });
  /**
   * @description Use this endpoint to create a real-time fee group.
   *
   * @tags Real-Time Fee Groups
   * @name PostRealtimefeegroups
   * @summary Create real-time fee group
   * @request POST:/realtimefeegroups
   */
  postRealtimefeegroups = (
    data?: IRealTimeFeeGroupCreateRequest,
    params: RequestParams = {},
  ) =>
    this.request<IRealTimeFeeGroup, void>({
      path: `/realtimefeegroups`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description Use this endpoint to retrieve a specific real-time fee group. Include the real-time fee group `token` path parameter to specify the real-time fee group to return.
   *
   * @tags Real-Time Fee Groups
   * @name GetRealtimefeegroupsToken
   * @summary Retrieve real-time fee group
   * @request GET:/realtimefeegroups/{token}
   */
  getRealtimefeegroupsToken = (token: string, params: RequestParams = {}) =>
    this.request<IRealTimeFeeGroup, void>({
      path: `/realtimefeegroups/${token}`,
      method: 'GET',
      format: 'json',
      ...params,
    });
  /**
   * @description Use this endpoint to update a real-time fee group. Include the real-time fee group `token` path parameter to specify the real-time fee group to update.
   *
   * @tags Real-Time Fee Groups
   * @name PutRealtimefeegroupsToken
   * @summary Update real-time fee group
   * @request PUT:/realtimefeegroups/{token}
   */
  putRealtimefeegroupsToken = (
    token: string,
    data?: IRealTimeFeeGroupRequest,
    params: RequestParams = {},
  ) =>
    this.request<IRealTimeFeeGroup, void>({
      path: `/realtimefeegroups/${token}`,
      method: 'PUT',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
}
