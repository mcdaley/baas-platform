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
  IWebhookBaseModel,
  IWebhookPingModel,
  IWebhookRequestModel,
  IWebhookResponseModel,
  IWebhookResponseModelListResponse,
  IWebhookUpdateCustomHeaderRequest,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Webhooks<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description Returns an array of all webhooks. This endpoint supports <</core-api/field-filtering, field filtering>>, <</core-api/sorting-and-pagination, sorting>>, and <</core-api/sorting-and-pagination, pagination>>.
   *
   * @tags Webhooks Management
   * @name GetWebhooks
   * @summary List webhooks
   * @request GET:/webhooks
   */
  getWebhooks = (
    query?: {
      active?: boolean;
      count?: number;
      start_index?: number;
      fields?: string;
      sort_by?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<IWebhookResponseModelListResponse, void>({
      path: `/webhooks`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    });
  /**
   * @description Creates a webhook.
   *
   * @tags Webhooks Management
   * @name PostWebhooks
   * @summary Create webhook
   * @request POST:/webhooks
   */
  postWebhooks = (data?: IWebhookRequestModel, params: RequestParams = {}) =>
    this.request<IWebhookResponseModel, void>({
      path: `/webhooks`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description Adds or updates a webhook's custom HTTP headers.
   *
   * @tags Webhooks Management
   * @name PutWebhooksCustomheadersToken
   * @summary Updates a specific webhook configuration with custom headers
   * @request PUT:/webhooks/customheaders/{token}
   */
  putWebhooksCustomheadersToken = (
    token: string,
    data?: IWebhookUpdateCustomHeaderRequest,
    params: RequestParams = {},
  ) =>
    this.request<IWebhookResponseModel, void>({
      path: `/webhooks/customheaders/${token}`,
      method: 'PUT',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description Retrieves a webhook.
   *
   * @tags Webhooks Management
   * @name GetWebhooksToken
   * @summary Retrieve webhook
   * @request GET:/webhooks/{token}
   */
  getWebhooksToken = (token: string, params: RequestParams = {}) =>
    this.request<IWebhookResponseModel, void>({
      path: `/webhooks/${token}`,
      method: 'GET',
      format: 'json',
      ...params,
    });
  /**
   * @description Updates a webhook.
   *
   * @tags Webhooks Management
   * @name PutWebhooksToken
   * @summary Update webhook
   * @request PUT:/webhooks/{token}
   */
  putWebhooksToken = (
    token: string,
    data?: IWebhookBaseModel,
    params: RequestParams = {},
  ) =>
    this.request<IWebhookResponseModel, void>({
      path: `/webhooks/${token}`,
      method: 'PUT',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description Pings webhook endpoint. Send a ping request to your webhook endpoint to validate credentials and connectivity. Your webhook endpoint must be configured to respond. *Configuring your webhook endpoint* This subsection describes the ping request that your webhook endpoint should expect and its expected response. When the Marqeta platform receives the ping request, it sends a `POST` request containing the following body to the URL of your webhook endpoint: [#ping-webhook-sample] [source,json] ---- { "pings": [ { "token": "marqeta", "payload": "healthcheck" } ] } ---- To indicate that it is functioning properly, your webhook endpoint must respond with a status code of "200" (see <</developer-guides/signature-verification, Signature Verification>> for a code example that identifies a ping request). The response can optionally include a link:http://www.json.org/[JSON, window="_blank"]-formatted body, for example: [#ping-webhook-sample-2] [source,json] ---- {"my_endpoint_status": "alive"} ---- The Marqeta platform then responds to its requestor by echoing, as-is, the response code and body received from your webhook endpoint. *Using the ping facility* To ping a webhook endpoint, send a `POST` request to `/webhooks/{token}/ping` and use the `token` path parameter to specify the webhook to ping. Include an empty, JSON-formatted body in the request, that is: [#ping-webhook-sample-3] [source,json] ---- {} ---- The following chain of actions occurs during a successful ping: . The Marqeta platform receives the ping request (`POST` to `/webhooks/{token}/ping`). . The Marqeta platform sends a request to your webhook endpoint. . Your webhook endpoint responds with a status code of "200" and an optional body. . The Marqeta platform responds to its requestor by echoing, as-is, the response code and body received from your webhook endpoint. [NOTE] If the customer-hosted endpoint fails to respond within five seconds, the Marqeta platform times out the request and responds with the following message body (where `<optional message>` represents additional details you can choose to include in the response): [#ping-webhook-sample-4] [source,json] ---- { "error_message": "Webhook operation failed " + <optional message>, "error_code": "422600" } ---- Failed pings are not automatically retried.
   *
   * @tags Webhooks Management
   * @name PostWebhooksTokenPing
   * @summary Ping webhook
   * @request POST:/webhooks/{token}/ping
   */
  postWebhooksTokenPing = (token: string, params: RequestParams = {}) =>
    this.request<IWebhookPingModel, void>({
      path: `/webhooks/${token}/ping`,
      method: 'POST',
      format: 'json',
      ...params,
    });
  /**
   * @description Resends an event notification to your webhook endpoint. Although you send this request as a `POST`, all parameters are passed in the URL and the body is empty. The event notification is resent to your webhook endpoint and also returned in the response to this request.
   *
   * @tags Webhooks Management
   * @name PostWebhooksTokenEventtypeEventtoken
   * @summary Resend event notification
   * @request POST:/webhooks/{token}/{event_type}/{event_token}
   */
  postWebhooksTokenEventtypeEventtoken = (
    token: string,
    eventType:
      | 'chargebacktransition'
      | 'digitalwallettokentransition'
      | 'cardtransition'
      | 'usertransition'
      | 'businesstransition'
      | 'transaction',
    eventToken: string,
    params: RequestParams = {},
  ) =>
    this.request<void, void>({
      path: `/webhooks/${token}/${eventType}/${eventToken}`,
      method: 'POST',
      ...params,
    });
}
