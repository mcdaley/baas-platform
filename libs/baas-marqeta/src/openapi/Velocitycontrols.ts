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
  IVelocityControlBalanceListResponse,
  IVelocityControlListResponse,
  IVelocityControlRequest,
  IVelocityControlResponse,
  IVelocityControlUpdateRequest,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Velocitycontrols<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description Retrieves a list of all the velocity controls associated with a specific user or card product, or lists all the velocity controls defined for your program. Include either a `user` or a `card_product` query parameter to indicate the user or card product whose associated velocity controls you want to retrieve (do not include both). To list all velocity controls for your program, omit the `user` and `card_product` query parameters from your request. This endpoint supports <</core-api/field-filtering, field filtering>> and <</core-api/sorting-and-pagination, pagination>>.
   *
   * @tags Velocity Controls
   * @name GetVelocitycontrols
   * @summary List velocity controls
   * @request GET:/velocitycontrols
   */
  getVelocitycontrols = (
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
    this.request<IVelocityControlListResponse, void>({
      path: `/velocitycontrols`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    });
  /**
   * @description Limits how much and how frequently a user can spend funds. If multiple velocity controls apply to the same user, the user cannot exceed any of the defined spending limits. [TIP] You can create program-level controls in the sandbox environment. However, you must work with your Marqeta representative to create program-level controls in a production environment.
   *
   * @tags Velocity Controls
   * @name PostVelocitycontrols
   * @summary Create velocity control
   * @request POST:/velocitycontrols
   */
  postVelocitycontrols = (
    data: IVelocityControlRequest,
    params: RequestParams = {},
  ) =>
    this.request<IVelocityControlResponse, void>({
      path: `/velocitycontrols`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description Retrieves a list of the available balances of the velocity controls associated with a user. Depending on the control, the balance can include an available monetary amount, the number of transactions remaining, and the number of days remaining in the time window. This endpoint supports <</core-api/field-filtering, field filtering>> and <</core-api/sorting-and-pagination, pagination>>.
   *
   * @tags Velocity Controls
   * @name GetVelocitycontrolsUserUsertokenAvailable
   * @summary List user velocity control balances
   * @request GET:/velocitycontrols/user/{user_token}/available
   */
  getVelocitycontrolsUserUsertokenAvailable = (
    userToken: string,
    query?: {
      count?: number;
      start_index?: number;
      fields?: string;
      sort_by?: string;
      force_dto?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<IVelocityControlBalanceListResponse, void>({
      path: `/velocitycontrols/user/${userToken}/available`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    });
  /**
   * @description Retrieves a specific velocity control.
   *
   * @tags Velocity Controls
   * @name GetVelocitycontrolsToken
   * @summary Returns a specific velocity control
   * @request GET:/velocitycontrols/{token}
   */
  getVelocitycontrolsToken = (
    token: string,
    query?: { fields?: string },
    params: RequestParams = {},
  ) =>
    this.request<IVelocityControlResponse, void>({
      path: `/velocitycontrols/${token}`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    });
  /**
   * @description Updates a specific velocity control.
   *
   * @tags Velocity Controls
   * @name PutVelocitycontrolsToken
   * @summary Update velocity control
   * @request PUT:/velocitycontrols/{token}
   */
  putVelocitycontrolsToken = (
    token: string,
    data: IVelocityControlUpdateRequest,
    params: RequestParams = {},
  ) =>
    this.request<IVelocityControlResponse, void>({
      path: `/velocitycontrols/${token}`,
      method: 'PUT',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
}
