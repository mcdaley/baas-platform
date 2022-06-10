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

import { IFeeTransferRequest, IFeeTransferResponse } from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Feetransfers<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description Use this endpoint to create a fee transfer. You must pass in either `user_token` or `business_token` to associate a user or business with the fee transfer. This is an all-or-nothing operation. When more than one fee is present, you must assess either all fees, or no fees. [NOTE] This feature is currently in beta and subject to change. It also requires additional activation steps. To learn more about the Beta program for this feature and about activating it for your program, contact your Marqeta representative.
   *
   * @tags Fee Transfers
   * @name PostFeetransfers
   * @summary Create fee transfer
   * @request POST:/feetransfers
   */
  postFeetransfers = (data?: IFeeTransferRequest, params: RequestParams = {}) =>
    this.request<IFeeTransferResponse, void>({
      path: `/feetransfers`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description Use this endpoint to retrieve a specific fee transfer. Include the fee transfer `token` path parameter to specify the fee transfer to return.
   *
   * @tags Fee Transfers
   * @name GetFeetransfersToken
   * @summary Retrieve fee transfer
   * @request GET:/feetransfers/{token}
   */
  getFeetransfersToken = (token: string, params: RequestParams = {}) =>
    this.request<IFeeTransferResponse, void>({
      path: `/feetransfers/${token}`,
      method: 'GET',
      format: 'json',
      ...params,
    });
}
