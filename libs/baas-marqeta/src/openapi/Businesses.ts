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
  IBusinessCardholder,
  IBusinessCardHolderListResponse,
  IBusinessCardHolderResponse,
  IBusinessCardHolderUpdate,
  IDDARequest,
  ISsnResponseModel,
  IUserCardHolderListResponse,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Businesses<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description To return an array of all businesses, send a `GET` request to the `/businesses` endpoint. To narrow your result set to businesses that match a particular legal or fictitious name, include the appropriate parameters from the following query parameters table. This endpoint also supports <</core-api/field-filtering, field filtering>> and <</core-api/sorting-and-pagination, sorting and pagination>>.
   *
   * @tags Businesses
   * @name GetBusinesses
   * @summary List businesses
   * @request GET:/businesses
   */
  getBusinesses = (
    query?: {
      count?: number;
      start_index?: number;
      business_name_dba?: string;
      business_name_legal?: string;
      search_type?: string;
      fields?: string;
      sort_by?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<IBusinessCardHolderListResponse, void>({
      path: `/businesses`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    });
  /**
   * @description Create a business. The initial status of a newly created business depends on the <</core-api/kyc-verification, Know Your Customer (KYC) requirements>> of the program or associated <</core-api/account-holder-groups, account holder group>>. [cols="1,1,1,1"] |=== | KYC Required | Initial Business State | Business Active on Creation | Business Limitations | Always | `UNVERIFIED` | No | Cannot load funds. | Conditionally | `LIMITED` | No | Restricted by rules in `accountholdergroups.pre_kyc_controls`. | Never | `ACTIVE` | Required | None. |=== To change or track the history of a business' status, use the `/businesstransitions` endpoint. For more information on status changes, see <<create_business_transition, Create Business Transition>>. For information about configuring the required fields for KYC verification, see <</core-api/kyc-verification#_perform_kyc, Perform KYC>>.
   *
   * @tags Businesses
   * @name PostBusinesses
   * @summary Create business
   * @request POST:/businesses
   */
  postBusinesses = (data?: IBusinessCardholder, params: RequestParams = {}) =>
    this.request<IBusinessCardHolderResponse, void>({
      path: `/businesses`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description To search for one or more businesses, send a `POST` request to the `/businesses/lookup` endpoint. Include in the message body any parameters by which you want to query. This endpoint supports <</core-api/field-filtering, field filtering>> and <</core-api/sorting-and-pagination, pagination>>.
   *
   * @tags Businesses
   * @name PostBusinessesLookup
   * @summary Search businesses
   * @request POST:/businesses/lookup
   */
  postBusinessesLookup = (data?: IDDARequest, params: RequestParams = {}) =>
    this.request<IBusinessCardholder, void>({
      path: `/businesses/lookup`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description To return an array of all child cardholders of a particular business, send a `GET` request to the `/businesses/{parent_token}/children` endpoint. Include the `parent_token` as a URL path parameter. This endpoint supports <</core-api/field-filtering, field filtering>>.
   *
   * @tags Businesses
   * @name GetBusinessesParenttokenChildren
   * @summary List business children
   * @request GET:/businesses/{parent_token}/children
   */
  getBusinessesParenttokenChildren = (
    parentToken: string,
    query?: {
      count?: number;
      start_index?: number;
      fields?: string;
      sort_by?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<IUserCardHolderListResponse, void>({
      path: `/businesses/${parentToken}/children`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    });
  /**
   * @description To retrieve a specific business, send a `GET` request to the `/businesses/{token}` endpoint. Include the business `token` path parameter to specify the business to return. This endpoint supports <</core-api/field-filtering, field filtering>> and <</core-api/sorting-and-pagination, sorting and pagination>>.
   *
   * @tags Businesses
   * @name GetBusinessesToken
   * @summary Retrieve business
   * @request GET:/businesses/{token}
   */
  getBusinessesToken = (
    token: string,
    query?: { fields?: string },
    params: RequestParams = {},
  ) =>
    this.request<IBusinessCardHolderResponse, void>({
      path: `/businesses/${token}`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    });
  /**
   * @description To update a business, send a `PUT` request to `/businesses/{token}`. Use the `token` path parameter to specify the business to update. Include the business details to update in link:http://www.json.org/[JSON, window="_blank"] format in the body of the request. Only values of parameters in the request are modified; all others are left unchanged.
   *
   * @tags Businesses
   * @name PutBusinessesToken
   * @summary Update business
   * @request PUT:/businesses/{token}
   */
  putBusinessesToken = (
    token: string,
    data: IBusinessCardHolderUpdate,
    params: RequestParams = {},
  ) =>
    this.request<IBusinessCardholder, void>({
      path: `/businesses/${token}`,
      method: 'PUT',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description To retrieve the government-issued identification number of a business' proprietor, send a `GET` request to the `/businesses/{token}/ssn` endpoint. Include the `token` path parameter to specify the business whose identification number (SSN, TIN, NIN, SIN) you want to return. You can indicate whether to return the full number or the last four digits only.
   *
   * @tags Businesses
   * @name GetBusinessesTokenSsn
   * @summary Retrieve business identification number
   * @request GET:/businesses/{token}/ssn
   */
  getBusinessesTokenSsn = (
    token: string,
    query?: { full_ssn?: boolean },
    params: RequestParams = {},
  ) =>
    this.request<ISsnResponseModel, void>({
      path: `/businesses/${token}/ssn`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    });
}
