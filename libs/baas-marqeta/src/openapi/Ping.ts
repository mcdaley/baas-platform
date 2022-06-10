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
  IEchoPingRequest,
  IEchoPingResponse,
  IPingResponse,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Ping<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description Tests if the Marqeta server is available and responsive.
   *
   * @tags ping
   * @name GetPing
   * @summary Returns a heartbeat to the consumer
   * @request GET:/ping
   */
  getPing = (params: RequestParams = {}) =>
    this.request<IPingResponse, void>({
      path: `/ping`,
      method: 'GET',
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags ping
   * @name PostPing
   * @summary Echo test for sending payload to server
   * @request POST:/ping
   */
  postPing = (data?: IEchoPingRequest, params: RequestParams = {}) =>
    this.request<IEchoPingResponse, void>({
      path: `/ping`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
}
