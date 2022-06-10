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
  IGpaRequest,
  IGpaResponse,
  IGpaReturns,
  IGPAUnloadListResponse,
  IUnloadRequestModel,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Gpaorders<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description Use this endpoint to create an order to fund an account holder's GPA. You can assess a <</core-api/fees, fee>> while funding a GPA by using the optional `fees` array to attach one or more fee resources to the GPA order. When you create a GPA order, the GPA is first credited for the fees, then debited at funding time.
   *
   * @tags GPA Orders
   * @name PostGpaorders
   * @summary Create GPA order
   * @request POST:/gpaorders
   */
  postGpaorders = (data?: IGpaRequest, params: RequestParams = {}) =>
    this.request<IGpaResponse, void>({
      path: `/gpaorders`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description Use this endpoint to list all GPA unloads or GPA unloads associated with a specific user or business. This endpoint supports <</core-api/field-filtering, field filtering>> and <</core-api/sorting-and-pagination, pagination>>.
   *
   * @tags GPA Orders
   * @name GetGpaordersUnloads
   * @summary List GPA unloads
   * @request GET:/gpaorders/unloads
   */
  getGpaordersUnloads = (
    query?: {
      count?: number;
      start_index?: number;
      fields?: string;
      sort_by?: string;
      user_token?: string;
      business_token?: string;
      original_order_token?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<IGPAUnloadListResponse, void>({
      path: `/gpaorders/unloads`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    });
  /**
   * @description Use this endpoint to unload a GPA order. Unloading a GPA order returns funds to the funding source. A GPA unload must be tied to an original GPA order and can be used to return the amount of the original order or a lesser amount.
   *
   * @tags GPA Orders
   * @name PostGpaordersUnloads
   * @summary Create GPA unload
   * @request POST:/gpaorders/unloads
   */
  postGpaordersUnloads = (
    data?: IUnloadRequestModel,
    params: RequestParams = {},
  ) =>
    this.request<IGpaReturns, void>({
      path: `/gpaorders/unloads`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description Use this endpoint to retrieve a specific GPA unload.
   *
   * @tags GPA Orders
   * @name GetGpaordersUnloadsUnloadtoken
   * @summary Retrieve GPA unload
   * @request GET:/gpaorders/unloads/{unload_token}
   */
  getGpaordersUnloadsUnloadtoken = (
    unloadToken: string,
    params: RequestParams = {},
  ) =>
    this.request<IGpaReturns, void>({
      path: `/gpaorders/unloads/${unloadToken}`,
      method: 'GET',
      format: 'json',
      ...params,
    });
  /**
   * @description Use this endpoint to retrieve a GPA order.
   *
   * @tags GPA Orders
   * @name GetGpaordersToken
   * @summary Retrieve GPA order
   * @request GET:/gpaorders/{token}
   */
  getGpaordersToken = (token: string, params: RequestParams = {}) =>
    this.request<IGpaResponse, void>({
      path: `/gpaorders/${token}`,
      method: 'GET',
      format: 'json',
      ...params,
    });
}
