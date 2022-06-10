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
  IBusinessTransitionListResponse,
  IBusinessTransitionRequest,
  IBusinessTransitionResponse,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Businesstransitions<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description This endpoint enables you to change a business' status, depending on your role and the previous status change. By changing a business' status, you can control the business' capabilities and the setting of the `business.active` field. The `business.active` field is `true` if your business is in the `LIMITED` or `ACTIVE` state, and `false` if your business is in the `UNVERIFIED` state. You cannot control the value of the `business.active` field directly. [cols=",2a,2a"] |=== | The business.status field | Description | Business limitations | Unverified | Initial status of a newly created business belonging to an `accountholdergroup` where KYC is always required. | Cannot load funds. *The business.active field:*   + `false` *Allowable transitions:*   + `ACTIVE`, `SUSPENDED`, `CLOSED` | Limited | Initial status of a newly created business belonging to an `accountholdergroup` where KYC is conditionally required. | Restricted by rules in `accountholdergroups.pre_kyc_controls`. *The business.active field:*   + `true` *Allowable transitions:*   + `ACTIVE`, `SUSPENDED`, `CLOSED` | Active | Status of a business that has passed KYC; initial status of a newly created business belonging to an `accountholdergroup` where KYC is never required. | None. *The business.active field:*   + `true` *Allowable transitions:*   + `SUSPENDED`, `CLOSED` | Suspended | The business is temporarily inactive. *NOTE:* Transitioning a suspended business to the `ACTIVE` status is restricted, based on your role and the details of the previous status change. | Cannot load funds or activate cards. *The business.active field:*   + `false` *Allowable transitions:*   + `ACTIVE`, `LIMITED`, `UNVERIFIED`, `CLOSED` | Closed | The business is permanently inactive. *NOTE:* `CLOSED` is a terminal status. In exceptional cases, you can transition a business from `CLOSED` to another status, depending on your role and the details of the previous status change. Contact your Marqeta representative for more information. | Cannot load funds. *The business.active field:*   + `false` *Allowable transitions:*   + `ACTIVE`, `LIMITED`, `UNVERIFIED`, `SUSPENDED` |=== [NOTE] The Marqeta platform transitions a business' status in response to certain events. For example, a business with an `UNVERIFIED` status transitions to `ACTIVE` when the business passes KYC.
   *
   * @tags Business Transitions
   * @name PostBusinesstransitions
   * @summary Create business transition
   * @request POST:/businesstransitions
   */
  postBusinesstransitions = (
    data?: IBusinessTransitionRequest,
    params: RequestParams = {},
  ) =>
    this.request<IBusinessTransitionResponse, void>({
      path: `/businesstransitions`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description List all transitions for a given business.
   *
   * @tags Business Transitions
   * @name GetBusinesstransitionsBusinessBusinesstoken
   * @summary List business transitions
   * @request GET:/businesstransitions/business/{business_token}
   */
  getBusinesstransitionsBusinessBusinesstoken = (
    businessToken: string,
    query?: {
      count?: number;
      start_index?: number;
      fields?: string;
      sort_by?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<IBusinessTransitionListResponse, void>({
      path: `/businesstransitions/business/${businessToken}`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    });
  /**
   * @description Use this endpoint to retrieve a business transition.
   *
   * @tags Business Transitions
   * @name GetBusinesstransitionsToken
   * @summary Retrieve business transition
   * @request GET:/businesstransitions/{token}
   */
  getBusinesstransitionsToken = (
    token: string,
    query?: { fields?: string },
    params: RequestParams = {},
  ) =>
    this.request<IBusinessTransitionResponse, void>({
      path: `/businesstransitions/${token}`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    });
}
