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
  ICardProductListResponse,
  ICardProductRequest,
  ICardProductResponse,
  ICardProductUpdateModel,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Cardproducts<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description Use this endpoint to list existing card products. This endpoint supports <</core-api/sorting-and-pagination, pagination>>.
   *
   * @tags Card Products
   * @name GetCardproducts
   * @summary List card products
   * @request GET:/cardproducts
   */
  getCardproducts = (
    query?: { count?: number; start_index?: number; sort_by?: string },
    params: RequestParams = {},
  ) =>
    this.request<ICardProductListResponse, void>({
      path: `/cardproducts`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    });
  /**
   * @description Use this endpoint to create a card product. The card product request contains a set of fields that provide basic information about the card product, such as name, active status, and start and end dates. Configuration information is contained in the `config` object, which contains sub-elements whose fields control the features and behavior of the card product. The elements are referred to collectively as the card product "configuration," and as such are contained in a `config` object.
   *
   * @tags Card Products
   * @name PostCardproducts
   * @summary Create card product
   * @request POST:/cardproducts
   */
  postCardproducts = (data: ICardProductRequest, params: RequestParams = {}) =>
    this.request<ICardProductResponse, void>({
      path: `/cardproducts`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description Use this endpoint to retrieve a specific card product.
   *
   * @tags Card Products
   * @name GetCardproductsToken
   * @summary Retrieve card product
   * @request GET:/cardproducts/{token}
   */
  getCardproductsToken = (token: string, params: RequestParams = {}) =>
    this.request<ICardProductResponse, void>({
      path: `/cardproducts/${token}`,
      method: 'GET',
      format: 'json',
      ...params,
    });
  /**
   * @description Use this endpoint to update a card product. Only values of fields in the request are modified; all others are left unchanged.
   *
   * @tags Card Products
   * @name PutCardproductsToken
   * @summary Update card product
   * @request PUT:/cardproducts/{token}
   */
  putCardproductsToken = (
    token: string,
    data: ICardProductUpdateModel,
    params: RequestParams = {},
  ) =>
    this.request<ICardProductResponse, void>({
      path: `/cardproducts/${token}`,
      method: 'PUT',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
}
