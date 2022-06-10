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
  ICommandoModeListResponse,
  ICommandoModeResponse,
  ICommandoModeTransitionListResponse,
  ICommandoModeTransitionResponse,
} from './data-contracts';
import { HttpClient, RequestParams } from './http-client';

export class Commandomodes<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description Retrieve a list of Commando Mode control sets. This endpoint supports <</core-api/field-filtering, field filtering>> and <</core-api/sorting-and-pagination, pagination>>.
   *
   * @tags Commando Mode
   * @name GetCommandomodes
   * @summary List Commando Mode control sets
   * @request GET:/commandomodes
   */
  getCommandomodes = (
    query?: { count?: number; start_index?: number; sort_by?: string },
    params: RequestParams = {},
  ) =>
    this.request<ICommandoModeListResponse, void>({
      path: `/commandomodes`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    });
  /**
   * @description Retrieve a specific Commando Mode control set transition.
   *
   * @tags Commando Mode
   * @name GetCommandomodesTransitionsToken
   * @summary Retrieve Commando Mode transition
   * @request GET:/commandomodes/transitions/{token}
   */
  getCommandomodesTransitionsToken = (
    token: string,
    params: RequestParams = {},
  ) =>
    this.request<ICommandoModeTransitionResponse, void>({
      path: `/commandomodes/transitions/${token}`,
      method: 'GET',
      format: 'json',
      ...params,
    });
  /**
   * @description Retrieve a list of Commando Mode transitions for a specific control set. This endpoint supports <</core-api/field-filtering, field filtering>> and <</core-api/sorting-and-pagination, pagination>>.
   *
   * @tags Commando Mode
   * @name GetCommandomodesCommandomodetokenTransitions
   * @summary List Commando Mode transitions set
   * @request GET:/commandomodes/{commandomode_token}/transitions
   */
  getCommandomodesCommandomodetokenTransitions = (
    commandomodeToken: string,
    query?: { count?: number; start_index?: number; sort_by?: string },
    params: RequestParams = {},
  ) =>
    this.request<ICommandoModeTransitionListResponse, void>({
      path: `/commandomodes/${commandomodeToken}/transitions`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    });
  /**
   * @description Retrieve a specific Commando Mode control set.
   *
   * @tags Commando Mode
   * @name GetCommandomodesToken
   * @summary Retrieve Commando Mode control set
   * @request GET:/commandomodes/{token}
   */
  getCommandomodesToken = (token: string, params: RequestParams = {}) =>
    this.request<ICommandoModeResponse, void>({
      path: `/commandomodes/${token}`,
      method: 'GET',
      format: 'json',
      ...params,
    });
}
