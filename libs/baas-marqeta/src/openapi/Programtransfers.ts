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
  IProgramTransfer,
  IProgramTransferListResponse,
  IProgramTransferResponse,
  IProgramTransferTypeListResponse,
  IProgramTransferTypeReponse,
  IProgramTransferTypeRequest,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Programtransfers<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description Use this endpoint to list all program transfers. To narrow your result set to program transfers of a particular type or that are associated with a particular account holder, include the appropriate parameters from the following Query Parameters table. This endpoint also supports <</core-api/field-filtering, field filtering>>, <</core-api/sorting-and-pagination, pagination>>, and <</core-api/sorting-and-pagination, sorting>>.
   *
   * @tags Program Transfers
   * @name GetProgramtransfers
   * @summary List program transfers
   * @request GET:/programtransfers
   */
  getProgramtransfers = (
    query?: {
      count?: number;
      start_index?: number;
      fields?: string;
      sort_by?: string;
      user_token?: string;
      business_token?: string;
      type_token?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<IProgramTransferListResponse, void>({
      path: `/programtransfers`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    });
  /**
   * @description Use this endpoint to create a program transfer. Add the program transfer details to the body of the request in link:http://www.json.org/[JSON] format. Include either `user_token` or `business_token` in the message body to specify the account holder whose GPA will be debited by the program transfer. The user or business must already exist. A program transfer is an all-or-nothing operation. If the GPA has insufficient funds to cover both the amount of the program transfer and all attached fees, then no funds are transferred.
   *
   * @tags Program Transfers
   * @name PostProgramtransfers
   * @summary Transfers to a program funding source
   * @request POST:/programtransfers
   */
  postProgramtransfers = (
    data?: IProgramTransfer,
    params: RequestParams = {},
  ) =>
    this.request<IProgramTransferResponse, void>({
      path: `/programtransfers`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description Use this endpoint to list all program transfer types. This endpoint supports <</core-api/field-filtering, field filtering>>, <</core-api/sorting-and-pagination, pagination>>, and <</core-api/sorting-and-pagination, sorting>>.
   *
   * @tags Program Transfers
   * @name GetProgramtransfersTypes
   * @summary List program transfer types
   * @request GET:/programtransfers/types
   */
  getProgramtransfersTypes = (
    query?: {
      count?: number;
      start_index?: number;
      fields?: string;
      sort_by?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<IProgramTransferTypeListResponse, void>({
      path: `/programtransfers/types`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    });
  /**
   * @description Use this endpoint to create a program transfer type. Add the program transfer details to the body of the request in link:http://www.json.org/[JSON] format. You are required to pass in a `program_funding_source_token` to associate a program funding source with the program transfer type. You must therefore create a program funding source before creating a program transfer type.
   *
   * @tags Program Transfers
   * @name PostProgramtransfersTypes
   * @summary Create program transfer type
   * @request POST:/programtransfers/types
   */
  postProgramtransfersTypes = (
    data?: IProgramTransferTypeRequest,
    params: RequestParams = {},
  ) =>
    this.request<IProgramTransferTypeReponse, void>({
      path: `/programtransfers/types`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description Use this endpoint to retrieve a specific program transfer. Include the `type_token` path parameter to indicate the program transfer type to return.
   *
   * @tags Program Transfers
   * @name GetProgramtransfersTypesTypetoken
   * @summary Retrieve program transfer type
   * @request GET:/programtransfers/types/{type_token}
   */
  getProgramtransfersTypesTypetoken = (
    typeToken: string,
    params: RequestParams = {},
  ) =>
    this.request<IProgramTransferTypeReponse, void>({
      path: `/programtransfers/types/${typeToken}`,
      method: 'GET',
      format: 'json',
      ...params,
    });
  /**
   * @description Use this endpoint to update a program transfer type. Include the `type_token` path parameter to indicate the program transfer type to update. Add the modified detail parameters to the body of the request in link:http://www.json.org/[JSON] format. Only values of parameters in the request are modified; all others are left unchanged.
   *
   * @tags Program Transfers
   * @name PutProgramtransfersTypesTypetoken
   * @summary Update program transfer type
   * @request PUT:/programtransfers/types/{type_token}
   */
  putProgramtransfersTypesTypetoken = (
    typeToken: string,
    data?: IProgramTransferTypeRequest,
    params: RequestParams = {},
  ) =>
    this.request<IProgramTransferTypeReponse, void>({
      path: `/programtransfers/types/${typeToken}`,
      method: 'PUT',
      body: data,
      format: 'json',
      ...params,
    });
  /**
   * @description Use this endpoint to retrieve a specific program transfer. Include the program transfer `token` path parameter to specify the program transfer to retrieve.
   *
   * @tags Program Transfers
   * @name GetProgramtransfersToken
   * @summary Retrieve program transfer
   * @request GET:/programtransfers/{token}
   */
  getProgramtransfersToken = (token: string, params: RequestParams = {}) =>
    this.request<IProgramTransferResponse, void>({
      path: `/programtransfers/${token}`,
      method: 'GET',
      format: 'json',
      ...params,
    });
}
