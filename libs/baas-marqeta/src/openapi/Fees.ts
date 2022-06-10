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
  IFee,
  IFeeListResponse,
  IFeeRequest,
  IFeeUpdateRequest,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Fees<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description Use this endpoint to list existing fees. This endpoint supports <</core-api/field-filtering, field filtering>> and <</core-api/sorting-and-pagination, pagination>>.
   *
   * @tags Fees
   * @name GetFees
   * @summary List fees
   * @request GET:/fees
   */
  getFees = (
    query?: {
      count?: number;
      start_index?: number;
      fields?: string;
      sort_by?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<IFeeListResponse, void>({
      path: `/fees`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    });
  /**
   * @description Use this endpoint to create a fee. Add the source details to the body of the request in link:http://www.json.org/[JSON] format.
   *
   * @tags Fees
   * @name PostFees
   * @summary Create fee
   * @request POST:/fees
   */
  postFees = (data?: IFeeRequest, params: RequestParams = {}) =>
    this.request<IFee, void>({
      path: `/fees`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description Use this endpoint to retrieve a fee. Include the `token` path parameter to specify the fee to return.
   *
   * @tags Fees
   * @name GetFeesToken
   * @summary Retrieve fee
   * @request GET:/fees/{token}
   */
  getFeesToken = (token: string, params: RequestParams = {}) =>
    this.request<IFee, void>({
      path: `/fees/${token}`,
      method: 'GET',
      format: 'json',
      ...params,
    });
  /**
   * @description Use this endpoint to update a fee. Include the `token` as a path parameter to indicate the fee to update.
   *
   * @tags Fees
   * @name PutFeesToken
   * @summary Update fee
   * @request PUT:/fees/{token}
   */
  putFeesToken = (
    token: string,
    data?: IFeeUpdateRequest,
    params: RequestParams = {},
  ) =>
    this.request<IFee, void>({
      path: `/fees/${token}`,
      method: 'PUT',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
}
