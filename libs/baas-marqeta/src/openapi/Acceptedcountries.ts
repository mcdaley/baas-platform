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
  IAcceptedCountriesListResponse,
  IAcceptedCountriesModel,
} from './data-contracts';
import { HttpClient, RequestParams } from './http-client';

export class Acceptedcountries<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description Retrieve a list of `acceptedcountries` objects.
   *
   * @tags Accepted Countries
   * @name GetAcceptedcountries
   * @summary List accepted countries objects
   * @request GET:/acceptedcountries
   */
  getAcceptedcountries = (
    query?: {
      count?: number;
      start_index?: number;
      name?: string;
      whitelist?: boolean;
      search_type?: string;
      fields?: string;
      sort_by?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<IAcceptedCountriesListResponse, void>({
      path: `/acceptedcountries`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    });
  /**
   * @description Retrieve a specific `acceptedcountries` object. Send a `GET` request to the `/acceptedcountries` endpoint to retrieve existing `acceptedcountries` object tokens.
   *
   * @tags Accepted Countries
   * @name GetAcceptedcountriesToken
   * @summary Retrieve an accepted countries object
   * @request GET:/acceptedcountries/{token}
   */
  getAcceptedcountriesToken = (
    token: string,
    query?: { fields?: string },
    params: RequestParams = {},
  ) =>
    this.request<IAcceptedCountriesModel, void>({
      path: `/acceptedcountries/${token}`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    });
}
