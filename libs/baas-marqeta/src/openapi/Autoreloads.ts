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
  IAutoReloadListResponse,
  IAutoReloadModel,
  IAutoReloadResponseModel,
  IAutoReloadUpdateModel,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Autoreloads<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description Use this endpoint to list auto reloads configured for the program or for a specific card product, user, or business. This endpoint supports <</core-api/field-filtering, field filtering>> and <</core-api/sorting-and-pagination, pagination>>.
   *
   * @tags Auto Reload
   * @name GetAutoreloads
   * @summary List auto reloads
   * @request GET:/autoreloads
   */
  getAutoreloads = (
    query?: {
      card_product?: string;
      user_token?: string;
      business_token?: string;
      count?: number;
      start_index?: number;
      fields?: string;
      sort_by?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<IAutoReloadListResponse, void>({
      path: `/autoreloads`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    });
  /**
   * @description Use this endpoint to create an auto reload.
   *
   * @tags Auto Reload
   * @name PostAutoreloads
   * @summary Create auto reload
   * @request POST:/autoreloads
   */
  postAutoreloads = (data: IAutoReloadModel, params: RequestParams = {}) =>
    this.request<IAutoReloadResponseModel, void>({
      path: `/autoreloads`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description Use this endpoint to retrieve a specific auto reload object.
   *
   * @tags Auto Reload
   * @name GetAutoreloadsToken
   * @summary Retrieve auto reload
   * @request GET:/autoreloads/{token}
   */
  getAutoreloadsToken = (
    token: string,
    query?: { fields?: string },
    params: RequestParams = {},
  ) =>
    this.request<IAutoReloadResponseModel, void>({
      path: `/autoreloads/${token}`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    });
  /**
   * @description Use this endpoint to update an auto reload. Only values of parameters in the request are modified; all others are left unchanged.
   *
   * @tags Auto Reload
   * @name PutAutoreloadsToken
   * @summary Update auto reload
   * @request PUT:/autoreloads/{token}
   */
  putAutoreloadsToken = (
    token: string,
    data: IAutoReloadUpdateModel,
    params: RequestParams = {},
  ) =>
    this.request<IAutoReloadResponseModel, void>({
      path: `/autoreloads/${token}`,
      method: 'PUT',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
}
