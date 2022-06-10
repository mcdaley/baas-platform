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
  IAuthControlExemptMidsListResponse,
  IAuthControlExemptMidsRequest,
  IAuthControlExemptMidsResponse,
  IAuthControlExemptMidsUpdateRequest,
  IAuthControlListResponse,
  IAuthControlRequest,
  IAuthControlResponse,
  IAuthControlUpdateRequest,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Authcontrols<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description List all authorization controls associated with a specific user or card product, or list all authorization controls defined in your program. Include either a `user` or a `card_product` query parameter to indicate the user or card product whose associated authorization controls you want to retrieve (do not include both). To list all authorization controls for your program, omit the `user` and `card_product` query parameters from your request.
   *
   * @tags Authorization Controls
   * @name GetAuthcontrols
   * @summary List authorization controls
   * @request GET:/authcontrols
   */
  getAuthcontrols = (
    query?: {
      card_product?: string;
      user?: string;
      count?: number;
      start_index?: number;
      fields?: string;
      sort_by?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<IAuthControlListResponse, void>({
      path: `/authcontrols`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    });
  /**
   * @description Limit where a user can make transactions to a single merchant or group of merchants. If multiple authorization controls apply to the same user, the limits of all controls are combined.
   *
   * @tags Authorization Controls
   * @name PostAuthcontrols
   * @summary Create authorization control
   * @request POST:/authcontrols
   */
  postAuthcontrols = (data: IAuthControlRequest, params: RequestParams = {}) =>
    this.request<IAuthControlResponse, void>({
      path: `/authcontrols`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description Retrieve a list of all merchant (MID) exemptions.
   *
   * @tags Authorization Controls
   * @name GetAuthcontrolsExemptmids
   * @summary List merchant identifier (MID) exemptions
   * @request GET:/authcontrols/exemptmids
   */
  getAuthcontrolsExemptmids = (
    query?: {
      card_product?: string;
      user?: string;
      count?: number;
      start_index?: number;
      fields?: string;
      sort_by?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<IAuthControlExemptMidsListResponse, void>({
      path: `/authcontrols/exemptmids`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    });
  /**
   * @description Exempt an individual merchant from authorization controls by merchant identifier (MID). Transactions originating from this MID ignore any otherwise applicable authorization controls. [NOTE] You can create MID exemptions in your user sandbox. However, you must work with your Marqeta representative to create MID exemptions in a production environment.
   *
   * @tags Authorization Controls
   * @name PostAuthcontrolsExemptmids
   * @summary Create a merchant identifier (MID) exemption
   * @request POST:/authcontrols/exemptmids
   */
  postAuthcontrolsExemptmids = (
    data: IAuthControlExemptMidsRequest,
    params: RequestParams = {},
  ) =>
    this.request<IAuthControlExemptMidsResponse, void>({
      path: `/authcontrols/exemptmids`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description Retrieve a merchant (MID) exemption.
   *
   * @tags Authorization Controls
   * @name GetAuthcontrolsExemptmidsToken
   * @summary Retrieve a merchant identifier (MID) exemption
   * @request GET:/authcontrols/exemptmids/{token}
   */
  getAuthcontrolsExemptmidsToken = (
    token: string,
    params: RequestParams = {},
  ) =>
    this.request<IAuthControlExemptMidsResponse, void>({
      path: `/authcontrols/exemptmids/${token}`,
      method: 'GET',
      format: 'json',
      ...params,
    });
  /**
   * @description Update a merchant identifier exemption.
   *
   * @tags Authorization Controls
   * @name PutAuthcontrolsExemptmidsToken
   * @summary Update a merchant identifier (MID) exemption
   * @request PUT:/authcontrols/exemptmids/{token}
   */
  putAuthcontrolsExemptmidsToken = (
    token: string,
    data?: IAuthControlExemptMidsUpdateRequest,
    params: RequestParams = {},
  ) =>
    this.request<void, void>({
      path: `/authcontrols/exemptmids/${token}`,
      method: 'PUT',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Retrieve a specific authorization control.
   *
   * @tags Authorization Controls
   * @name GetAuthcontrolsToken
   * @summary Retrieve authorization control
   * @request GET:/authcontrols/{token}
   */
  getAuthcontrolsToken = (
    token: string,
    query?: { fields?: string },
    params: RequestParams = {},
  ) =>
    this.request<IAuthControlResponse, void>({
      path: `/authcontrols/${token}`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    });
  /**
   * @description Update a specific authorization control.
   *
   * @tags Authorization Controls
   * @name PutAuthcontrolsToken
   * @summary Update authorization control
   * @request PUT:/authcontrols/{token}
   */
  putAuthcontrolsToken = (
    token: string,
    data: IAuthControlUpdateRequest,
    params: RequestParams = {},
  ) =>
    this.request<IAuthControlResponse, void>({
      path: `/authcontrols/${token}`,
      method: 'PUT',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
}
