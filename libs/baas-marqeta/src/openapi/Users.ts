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
  IAccessTokenResponse,
  ICardHolderModel,
  ILoginRequestModel,
  ILoginResponseModel,
  IOneTimeRequestModel,
  IPasswordUpdateModel,
  IResetUserPasswordEmailModel,
  IResetUserPasswordModel,
  ISsnResponseModel,
  IUserCardHolderListResponse,
  IUserCardHolderResponse,
  IUserCardHolderSearchModel,
  IUserCardHolderUpdateModel,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Users<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description To return an array of all of a program's users, send a `GET` request to the `/users` endpoint. This endpoint supports <</core-api/field-filtering, field filtering>> and <</core-api/sorting-and-pagination, pagination>>. To narrow your result set to users that match certain criteria, see the <<search_users,Search users>> endpoint. The `business_token` field is conditionally returned in the response (it cannot be set through the API). You can use this field in conjunction with the `parent_token` field to determine whether the user has a parent or grandparent that is a business: [cols="1,1,1"] |=== | parent_token | business_token | Description | Not populated | Not populated | User does not have a parent. | Populated | Not populated | User's parent is a user. | Populated; matches `business_token` | Populated; matches `parent_token` | User's parent is a business. | Populated; does not match `business_token` | Populated; does not match `parent_token` | User's parent is a user and the parent's parent is a business. |===
   *
   * @tags Users
   * @name GetUsers
   * @summary List users
   * @request GET:/users
   */
  getUsers = (
    query?: {
      count?: number;
      start_index?: number;
      search_type?: string;
      fields?: string;
      sort_by?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<IUserCardHolderListResponse, void>({
      path: `/users`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    });
  /**
   * @description This endpoint enables you to create a user. A new user's initial status depends on the <</core-api/kyc-verification, Know Your Customer (KYC) requirements>> of the program or associated <</core-api/account-holder-groups, account holder group>>. [cols="1,1,1,1"] |=== | KYC Required | Initial User Status | User Active on Creation | User Limitations | Always | `UNVERIFIED` | Optional | Cannot load funds; cannot activate cards. | Conditionally | `LIMITED` | Optional | Restricted by rules in `accountholdergroups.pre_kyc_controls`. | Never | `ACTIVE` | Required | None. |=== To change or track the history of a user's status, see the `/usertransitions` endpoint. For more information on status changes, see <<create_user_transition, Create User Transition>> on this page. To perform KYC verification on users, the `user` object must have the following fields configured: * `first_name` * `last_name` * `address1` (cannot be a PO Box) * `city` * `state` * `postal_code` * `country` * `birth_date` * `identifications` [NOTE] The `identifications` requirement depends on your program's configuration. To determine if you should provide a full or abbreviated identification number, contact your Marqeta representative. KYC verification requires the full Social Security Number (SSN) of the user. To create a child user, you must identify the parent user or business and decide whether the child user shares an account with the parent. The parent must be an existing user or business. On the child user, set the `parent_token` field to the value of the parent's `token` field. If either the parent or the parent's parent is a business, a `business_token` field is added to the user. This field's value is set to the token of either the parent or grandparent (whichever is the business). The `uses_parent_account` field determines whether the child shares balances with the parent (`true`) or whether the child balances are independent of the parent (`false`). If you do not specify a value for `uses_parent_account`, it is set to `false` by default (the user does not share the parent's balance) and returned in the response body. This field cannot be updated, so you must decide upon creation whether the child user shares the parent balance. Sharing an account with a parent user affects how the child user interacts with cards as follows: * A child user cannot spend funds if its parent is not active. * An active child user can activate cards, whether the parent is active or not.
   *
   * @tags Users
   * @name PostUsers
   * @summary Create user
   * @request POST:/users
   */
  postUsers = (data?: ICardHolderModel, params: RequestParams = {}) =>
    this.request<IUserCardHolderResponse, void>({
      path: `/users`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description To change a user password, send a `POST` request to the `/users/auth/changepassword` endpoint and include the `current_password` and `new_password` in link:http://www.json.org/[JSON, window="_blank"] format in the body of the request. This endpoint operates in the context of a currently logged-in user. A successful password change returns an empty response body with a response code of `204 No Content`.
   *
   * @tags Users
   * @name PostUsersAuthChangepassword
   * @summary Updates a user password
   * @request POST:/users/auth/changepassword
   */
  postUsersAuthChangepassword = (
    data: IPasswordUpdateModel,
    params: RequestParams = {},
  ) =>
    this.request<void, void>({
      path: `/users/auth/changepassword`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description To log in a user and return a user access token, send a `POST` request to the `/users/auth/login` endpoint and include the user details in link:http://www.json.org/[JSON, window="_blank"] format in the body of the request. [TIP] To check a user's credentials without logging out the user, call the `/users/auth/onetime` endpoint.
   *
   * @tags Users
   * @name PostUsersAuthLogin
   * @summary Log in user
   * @request POST:/users/auth/login
   */
  postUsersAuthLogin = (
    data?: ILoginRequestModel,
    params: RequestParams = {},
  ) =>
    this.request<ILoginResponseModel, void>({
      path: `/users/auth/login`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description To log out a user, send a `POST` request to the `/users/auth/logout` endpoint. A successful logout returns an empty response body with a response code of `204 No Content`.
   *
   * @tags Users
   * @name PostUsersAuthLogout
   * @summary Logs out a user
   * @request POST:/users/auth/logout
   */
  postUsersAuthLogout = (params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/users/auth/logout`,
      method: 'POST',
      ...params,
    });
  /**
   * @description This endpoint returns a single-use access token. This type of token authorizes a single request to access API endpoints and data associated with a particular user. A single-use access token differs from a user access token (as returned by `POST` `/users/auth/login`) only in the number of times it can be used. To return a single-use access token, send a `POST` request to the `/users/auth/onetime` endpoint. Provide one of these sets of input data: * *Case #1* – Application token and user access token * *Case #2* – Application token, admin access token, and user token * *Case #3* – Application token, user's Marqeta password, and user's email address In each case, provide the application token as the HTTP Basic Authentication username in the request header's Authorization field. When applicable, provide the user access token or admin access token as the HTTP Basic Authentication password. When applicable, provide the user token or user's Marqeta password and email address in link:http://www.json.org/[JSON, window="_blank"] format in the request body. Before instantiating an embedded Marqeta widget, call this endpoint to obtain the single-use access token required as input (cases #1 and #2). This endpoint is also useful when you want to check a user's credentials before performing a sensitive operation without having to log out the user (case #3). [NOTE] Calling this endpoint and returning a single-use access token does not invalidate the user's current user access token.
   *
   * @tags Users
   * @name PostUsersAuthOnetime
   * @summary Create single-use token
   * @request POST:/users/auth/onetime
   */
  postUsersAuthOnetime = (
    data?: IOneTimeRequestModel,
    params: RequestParams = {},
  ) =>
    this.request<IAccessTokenResponse, void>({
      path: `/users/auth/onetime`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description The first step in resetting a user's password is to request a password reset token. Send a `POST` request to the `/users/auth/resetpassword` endpoint and include the user's email address in link:http://www.json.org/[JSON, window="_blank"] format in the body of the request. This request generates and sends an email message containing the `user_token` and `password_reset_token` to the user's email address. You must customize the email message with a link that passes the `user_token` and `password_reset_token` to a web page where a subsequent request updates the password. A successful request returns an empty response body with a response code of `204 No Content`.
   *
   * @tags Users
   * @name PostUsersAuthResetpassword
   * @summary Request user password reset token
   * @request POST:/users/auth/resetpassword
   */
  postUsersAuthResetpassword = (
    data?: IResetUserPasswordEmailModel,
    params: RequestParams = {},
  ) =>
    this.request<void, void>({
      path: `/users/auth/resetpassword`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description To reset the user's password, send a `POST` request to the `/users/auth/resetpassword/{token}` endpoint. Include the `user_token` and `new_password` in link:http://www.json.org/[JSON, window="_blank"] format in the body of the request. Include the `password_reset_token` as a path parameter. A successful password reset returns an empty response body with a response code of `204 No Content`.
   *
   * @tags Users
   * @name PostUsersAuthResetpasswordToken
   * @summary Reset user password
   * @request POST:/users/auth/resetpassword/{token}
   */
  postUsersAuthResetpasswordToken = (
    token: string,
    data?: IResetUserPasswordModel,
    params: RequestParams = {},
  ) =>
    this.request<void, void>({
      path: `/users/auth/resetpassword/${token}`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description The first step in verifying a cardholder's email address is to request an email verification token. To request an email verification token, send a `POST` request to the `/users/auth/verifyemail` endpoint. No input parameters are required because this operation is performed in the context of an authenticated user. This request generates and sends an email message containing the email verification token to the user's email address. The email message must be customized with a link that passes the email verification token to a web page where a subsequent request verifies the email address. You set up the subsequent request in step 2. A successful request returns an empty response body with a response code of `204 No Content`.
   *
   * @tags Users
   * @name PostUsersAuthVerifyemail
   * @summary Request email verification token
   * @request POST:/users/auth/verifyemail
   */
  postUsersAuthVerifyemail = (params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/users/auth/verifyemail`,
      method: 'POST',
      ...params,
    });
  /**
   * @description To verify the email address, send a `POST` request to the `/users/auth/verifyemail/{email_verification_token}` endpoint. Include the `email_verification_token` as a path parameter. A successful email verification returns an empty response body with a response code of `204 No Content`.
   *
   * @tags Users
   * @name PostUsersAuthVerifyemailToken
   * @summary Verify email address
   * @request POST:/users/auth/verifyemail/{token}
   */
  postUsersAuthVerifyemailToken = (token: string, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/users/auth/verifyemail/${token}`,
      method: 'POST',
      ...params,
    });
  /**
   * @description To search for one or more users, send a `POST` request to the `/users/lookup` endpoint. Include in the message body any parameters by which you want to query. This endpoint supports <</core-api/field-filtering, field filtering>> and <</core-api/sorting-and-pagination, pagination>>.
   *
   * @tags Users
   * @name PostUsersLookup
   * @summary Search users
   * @request POST:/users/lookup
   */
  postUsersLookup = (
    query?: {
      count?: number;
      start_index?: number;
      search_type?: string;
      fields?: string;
      sort_by?: string;
    },
    data?: IUserCardHolderSearchModel,
    params: RequestParams = {},
  ) =>
    this.request<IUserCardHolderListResponse, void>({
      path: `/users/lookup`,
      method: 'POST',
      query: query,
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description To retrieve users who are children of a parent user or business, send a `GET` request to the `/users/{parent_token}/children` endpoint. Include the parent's user or business token as a URL path parameter. The `business_token` field is conditionally returned in the response (it cannot be set through the API). You can use this field in conjunction with the `parent_token` field to determine whether the user has a parent or grandparent that is a business: [cols="1,1,1"] |=== | parent_token | business_token | Description | Not populated | Not populated | User does not have a parent. | Populated | Not populated | User's parent is a user. | Populated; matches `business_token` | Populated; matches `parent_token` | User's parent is a business. | Populated; does not match `business_token` | Populated; does not match `parent_token` | User's parent is a user and the parent's parent is a business. |=== This endpoint supports <</core-api/field-filtering, field filtering>>.
   *
   * @tags Users
   * @name GetUsersParenttokenChildren
   * @summary List user child accounts
   * @request GET:/users/{parent_token}/children
   */
  getUsersParenttokenChildren = (
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
      path: `/users/${parentToken}/children`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    });
  /**
   * @description To retrieve a specific user, send a `GET` request to the `/users/{token}` endpoint. Include the user `token` path parameter to specify the user to return. The `business_token` field is conditionally returned in the response (it cannot be set through the API). You can use this field in conjunction with the `parent_token` field to determine whether the user has a parent or grandparent that is a business: [cols="1,1,1"] |=== | parent_token | business_token | Description | Not populated | Not populated | User does not have a parent. | Populated | Not populated | User's parent is a user. | Populated; matches `business_token` | Populated; matches `parent_token` | User's parent is a business. | Populated; does not match `business_token` | Populated; does not match `parent_token` | User's parent is a user and the parent's parent is a business. |=== This endpoint supports <</core-api/field-filtering, field filtering>>.
   *
   * @tags Users
   * @name GetUsersToken
   * @summary Retrieve user
   * @request GET:/users/{token}
   */
  getUsersToken = (
    token: string,
    query?: { fields?: string },
    params: RequestParams = {},
  ) =>
    this.request<IUserCardHolderResponse, void>({
      path: `/users/${token}`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    });
  /**
   * @description To update a specific `user` resource, send a `PUT` request to the `/users/{token}` endpoint. Include the user `token` path parameter to specify the user to update.
   *
   * @tags Users
   * @name PutUsersToken
   * @summary Update user
   * @request PUT:/users/{token}
   */
  putUsersToken = (
    token: string,
    data: IUserCardHolderUpdateModel,
    params: RequestParams = {},
  ) =>
    this.request<ICardHolderModel, void>({
      path: `/users/${token}`,
      method: 'PUT',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description To retrieve the government-issued identification number for a user, send a `GET` request to the `/users/{token}/ssn` endpoint. Include the `token` path parameter to specify the user whose identification number (SSN, TIN, NIN, SIN) you wish to return. You can indicate whether to return the full number or the last four digits only.
   *
   * @tags Users
   * @name GetUsersTokenSsn
   * @summary Retrieve user identification number
   * @request GET:/users/{token}/ssn
   */
  getUsersTokenSsn = (
    token: string,
    query?: { full_ssn?: boolean },
    params: RequestParams = {},
  ) =>
    this.request<ISsnResponseModel, void>({
      path: `/users/${token}/ssn`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    });
}
