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
  IAccountHolderGroupListResponse,
  IAccountHolderGroupRequest,
  IAccountHolderGroupResponse,
  IAccountHolderGroupUpdateRequest,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Accountholdergroups<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description Use this endpoint to return an array of all account holder groups.
   *
   * @tags Account Holder Groups
   * @name GetAccountholdergroups
   * @summary List account holder groups
   * @request GET:/accountholdergroups
   */
  getAccountholdergroups = (
    query?: { count?: number; start_index?: number; sort_by?: string },
    params: RequestParams = {},
  ) =>
    this.request<IAccountHolderGroupListResponse, void>({
      path: `/accountholdergroups`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    });
  /**
   * @description Use this endpoint to create an account holder group.
   *
   * @tags Account Holder Groups
   * @name PostAccountholdergroups
   * @summary Create account holder group
   * @request POST:/accountholdergroups
   */
  postAccountholdergroups = (
    data: IAccountHolderGroupRequest,
    params: RequestParams = {},
  ) =>
    this.request<IAccountHolderGroupResponse, void>({
      path: `/accountholdergroups`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description Use this endpoint to retrieve a specific account holder group.
   *
   * @tags Account Holder Groups
   * @name GetAccountholdergroupsToken
   * @summary Retrieve account holder group
   * @request GET:/accountholdergroups/{token}
   */
  getAccountholdergroupsToken = (token: string, params: RequestParams = {}) =>
    this.request<IAccountHolderGroupResponse, void>({
      path: `/accountholdergroups/${token}`,
      method: 'GET',
      format: 'json',
      ...params,
    });
  /**
   * @description Use this endpoint to update a specific account holder group. Only values of parameters in the request are modified; all others are left unchanged. To update a specific account holder group, send a `PUT` request to the `/accountholdergroups/{token}` endpoint. Use the `token` path parameter to specify the account holder group to update. Include the account holder group details to update in link:http://json.org[JSON] format in the body of the request. [NOTE] While you can update account holder groups that you create, the default group is restricted and requires special permissions to update.
   *
   * @tags Account Holder Groups
   * @name PutAccountholdergroupsToken
   * @summary Update account holder group
   * @request PUT:/accountholdergroups/{token}
   */
  putAccountholdergroupsToken = (
    token: string,
    data: IAccountHolderGroupUpdateRequest,
    params: RequestParams = {},
  ) =>
    this.request<IAccountHolderGroupResponse, void>({
      path: `/accountholdergroups/${token}`,
      method: 'PUT',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
}
