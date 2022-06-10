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

import { IPeerTransferRequest, IPeerTransferResponse } from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Peertransfers<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description Use this endpoint to request a peer transfer (i.e., a movement of funds from the GPA of an account holder to another account belonging to the same account holder). Add the source details to the body of the request in link:http://www.json.org/[JSON] format. When creating a peer transfer request, you must pass in both a token to identify the fee sender (either `sender_user_token` or `sender_business_token`) and a token to identify the fee recipient (either `recipient_user_token` or `recipient_business_token`). The sender and recipient objects must already exist. [NOTE] This feature is disabled by default and requires activation by Marqeta.   + + This feature enables you to transfer or reallocate funds where the `sender_*\_token` and the `recipient_*\_token` belong to the same account holder. It does not allow you to transfer or reallocate funds between different account holders. Contact your Marqeta representative for more information.
   *
   * @tags Peer Transfers
   * @name PostPeertransfers
   * @summary Performs a peer transfer between two accounts held by the same account holder
   * @request POST:/peertransfers
   */
  postPeertransfers = (
    data?: IPeerTransferRequest,
    params: RequestParams = {},
  ) =>
    this.request<IPeerTransferResponse, void>({
      path: `/peertransfers`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description Use this endpoint to list peer transfers sent or received by a particular account holder. Include a user or business token as a path parameter to identify the account holder whose transfers you want to list. This endpoint supports <</core-api/field-filtering, field filtering>> and <</core-api/sorting-and-pagination, pagination>>.
   *
   * @tags Peer Transfers
   * @name GetPeertransfersUserUserorbusinesstoken
   * @summary Returns all peer transfers for a user
   * @request GET:/peertransfers/user/{user_or_business_token}
   */
  getPeertransfersUserUserorbusinesstoken = (
    userOrBusinessToken: string,
    query?: { count?: number; start_index?: number; fields?: string },
    params: RequestParams = {},
  ) =>
    this.request<IPeerTransferResponse, void>({
      path: `/peertransfers/user/${userOrBusinessToken}`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    });
  /**
   * @description Use this endpoint to list peer transfers sent by an account holder. Include a user or business token as a path parameter to identify the recipient. This endpoint supports <</core-api/field-filtering, field filtering>> and <</core-api/sorting-and-pagination, pagination>>.
   *
   * @tags Peer Transfers
   * @name GetPeertransfersUserUserorbusinesstokenRecipient
   * @summary Returns received peer transfers for a user
   * @request GET:/peertransfers/user/{user_or_business_token}/recipient
   */
  getPeertransfersUserUserorbusinesstokenRecipient = (
    userOrBusinessToken: string,
    query?: { count?: number; start_index?: number; fields?: string },
    params: RequestParams = {},
  ) =>
    this.request<IPeerTransferResponse, void>({
      path: `/peertransfers/user/${userOrBusinessToken}/recipient`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    });
  /**
   * @description Use this endpoint to list peer transfers sent by an account holder. Include a user or business token as a path parameter to identify the sender. This endpoint supports <</core-api/field-filtering, field filtering>> and <</core-api/sorting-and-pagination, pagination>>.
   *
   * @tags Peer Transfers
   * @name GetPeertransfersUserUserorbusinesstokenSender
   * @summary Returns sent peer transfers for a user
   * @request GET:/peertransfers/user/{user_or_business_token}/sender
   */
  getPeertransfersUserUserorbusinesstokenSender = (
    userOrBusinessToken: string,
    query?: { count?: number; start_index?: number; fields?: string },
    params: RequestParams = {},
  ) =>
    this.request<IPeerTransferResponse, void>({
      path: `/peertransfers/user/${userOrBusinessToken}/sender`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    });
  /**
   * @description Use this endpoint to retrieve a peer transfer request. Include the peer transfer `token` as a path parameter in the URL to identify the peer transfer to return.
   *
   * @tags Peer Transfers
   * @name GetPeertransfersToken
   * @summary Returns details of a previous transfer
   * @request GET:/peertransfers/{token}
   */
  getPeertransfersToken = (token: string, params: RequestParams = {}) =>
    this.request<IPeerTransferResponse, void>({
      path: `/peertransfers/${token}`,
      method: 'GET',
      format: 'json',
      ...params,
    });
}
