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
  IUserTransitionListResponse,
  IUserTransitionRequest,
  IUserTransitionResponse,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Usertransitions<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description This endpoint enables you to change a user's status, depending on your role and the previous status change. By changing a user's status, you can control the user's capabilities and the setting of the `user.active` field. You cannot control `user.active` directly. [cols="2,4a,4a"] |=== | user.status Field | Description | User Limitations | `UNVERIFIED` | Initial status of a new user belonging to an account holder group where KYC is always required.  + *Allowable Transitions:*  + `ACTIVE`, `CLOSED` | Cannot load funds or activate cards.  + *user.active Field:*  + `false` | `LIMITED` | Initial status of a new user belonging to an account holder group where KYC is conditionally required.  + *Allowable Transitions:*  + `ACTIVE`, `SUSPENDED`, `CLOSED` | Restricted by rules in `accountholdergroups.pre_kyc_controls`.  + *user.active Field:*  + `true` | `ACTIVE` | Status of a user who has passed KYC, or initial status of a new user belonging to an account holder group where KYC is never required.  + *Allowable Transitions:*  + `SUSPENDED`, `CLOSED`, `UNVERIFIED` | None.  + *user.active Field:*  + `true` | `SUSPENDED` | The user is temporarily inactive. Transitioning a suspended user to the `ACTIVE` status is restricted, based on your role and the details of the previous status change.  + *Allowable Transitions:*  + `ACTIVE`, `LIMITED`, `UNVERIFIED`, `CLOSED` | Cannot load funds or activate cards.  + *user.active Field:*  + `false` | `CLOSED` | The user is permanently inactive. In general, the `CLOSED` status should be terminal. For exceptional cases, you can transition a user to other statuses, depending on your role and the details of the previous status change. Contact your Marqeta representative for more information.  + *Allowable Transitions:*  + `ACTIVE`, `LIMITED`, `UNVERIFIED`, `SUSPENDED` | Cannot load funds or activate cards.  + *user.active Field:*  + `false` |=== [NOTE] The Marqeta platform transitions a user's status in response to certain events. For example, a user in the `UNVERIFIED` status is transitioned to `ACTIVE` when the user passes KYC verification.
   *
   * @tags User Transitions
   * @name PostUsertransitions
   * @summary Create user transition
   * @request POST:/usertransitions
   */
  postUsertransitions = (
    data?: IUserTransitionRequest,
    params: RequestParams = {},
  ) =>
    this.request<IUserTransitionResponse, void>({
      path: `/usertransitions`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description List all transitions for a given user.
   *
   * @tags User Transitions
   * @name GetUsertransitionsUserUsertoken
   * @summary List transitions for user
   * @request GET:/usertransitions/user/{user_token}
   */
  getUsertransitionsUserUsertoken = (
    userToken: string,
    query?: {
      count?: number;
      start_index?: number;
      fields?: string;
      sort_by?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<IUserTransitionListResponse, void>({
      path: `/usertransitions/user/${userToken}`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    });
  /**
   * @description Retrieve a user transition.
   *
   * @tags User Transitions
   * @name GetUsertransitionsToken
   * @summary Retrieve user transition
   * @request GET:/usertransitions/{token}
   */
  getUsertransitionsToken = (
    token: string,
    query?: { fields?: string },
    params: RequestParams = {},
  ) =>
    this.request<IUserTransitionResponse, void>({
      path: `/usertransitions/${token}`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    });
}
