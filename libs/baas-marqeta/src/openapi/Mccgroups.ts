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
  IMCCGroupListResponse,
  IMccGroupModel,
  IMccGroupUpdateModel,
} from './data-contracts';
import { HttpClient, RequestParams } from './http-client';

export class Mccgroups<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description Use this endpoint to list all MCC groups defined in your program or list MCC groups that contain a specified code. This endpoint supports <</core-api/field-filtering, field filtering>> and <</core-api/sorting-and-pagination, pagination>>.
   *
   * @tags MCC Groups
   * @name GetMccgroups
   * @summary List MCC groups
   * @request GET:/mccgroups
   */
  getMccgroups = (
    query?: {
      mcc?: string;
      count?: number;
      start_index?: number;
      sort_by?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<IMCCGroupListResponse, void>({
      path: `/mccgroups`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    });
  /**
   * @description Use this endpoint to create an MCC group.
   *
   * @tags MCC Groups
   * @name PostMccgroups
   * @summary Create MCC group
   * @request POST:/mccgroups
   */
  postMccgroups = (data: IMccGroupModel, params: RequestParams = {}) =>
    this.request<IMccGroupModel, void>({
      path: `/mccgroups`,
      method: 'POST',
      body: data,
      format: 'json',
      ...params,
    });
  /**
   * @description Use this endpoint to retrieve a specific MCC group.
   *
   * @tags MCC Groups
   * @name GetMccgroupsToken
   * @summary Retrieve MCC group
   * @request GET:/mccgroups/{token}
   */
  getMccgroupsToken = (token: string, params: RequestParams = {}) =>
    this.request<IMccGroupModel, void>({
      path: `/mccgroups/${token}`,
      method: 'GET',
      format: 'json',
      ...params,
    });
  /**
   * @description Use this endpoint to update an MCC group. Include the `token` path parameter to identify the MCC group to update. You must pass all the merchant category codes you want included in the group, including existing ones you want to retain.
   *
   * @tags MCC Groups
   * @name PutMccgroupsToken
   * @summary Update MCC group
   * @request PUT:/mccgroups/{token}
   */
  putMccgroupsToken = (
    token: string,
    data: IMccGroupUpdateModel,
    params: RequestParams = {},
  ) =>
    this.request<IMccGroupUpdateModel, void>({
      path: `/mccgroups/${token}`,
      method: 'PUT',
      body: data,
      format: 'json',
      ...params,
    });
}
