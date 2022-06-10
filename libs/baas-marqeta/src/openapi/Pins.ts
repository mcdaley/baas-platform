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
  IControlTokenRequest,
  IControlTokenResponse,
  IPinRequest,
  IPinRevealRequest,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Pins<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description Creates or updates a PIN for an existing card. If you want to manage a card's PIN, first create a new control token for the card by sending a `POST` request to `/pins/controltoken`, and then use that token to update the PIN. You must create a card before you can manage a PIN. Unless PIN reveal functionality has been enabled for your program, you cannot retrieve a PIN that has previously been created. If the PIN has been forgotten, you must either update the card's PIN or create a new card and PIN. If you have enabled PIN reveal functionality for your program, you can send a `POST` request to the `/pins/reveal` endpoint to retrieve an existing PIN. See <<reveal_pin, Reveal PIN>> on this page for details. [WARNING] Sending a request to this endpoint requires PCI DSS compliance. You must comply with PCI DSS data security requirements if you want to store, transmit, or process sensitive card data such as the cardholder's primary account number (PAN), personal identification number (PIN), and card expiration date.
   *
   * @tags PINs
   * @name PutPins
   * @summary Create or update PIN
   * @request PUT:/pins
   */
  putPins = (data?: IPinRequest, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/pins`,
      method: 'PUT',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Creates a control token necessary when creating or updating a card's PIN. Creating, updating, or revealing a card's PIN is a two-step process. You must first create the control token that is required to create the PIN, and then you create, update, or reveal the PIN itself. The lifespan of the control token in a production environment is either five minutes or one hour from creation, depending on the token type. If multiple tokens are requested for a single card, only the most recent one is valid. Once redeemed, a token cannot be reused.
   *
   * @tags PINs
   * @name PostPinsControltoken
   * @summary Create PIN control token
   * @request POST:/pins/controltoken
   */
  postPinsControltoken = (
    data?: IControlTokenRequest,
    params: RequestParams = {},
  ) =>
    this.request<IControlTokenResponse, void>({
      path: `/pins/controltoken`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description Reveals the PIN of an existing, active card. *WARNING:* Only use this endpoint to access a PIN in order to reveal it to its cardholder. Do not use this endpoint for the purpose of storing a PIN at any location. Sending a request to this endpoint requires PCI DSS compliance. You must comply with PCI DSS data security requirements if you want to store, transmit, or process sensitive card data such as the cardholder's primary account number (PAN), personal identification number (PIN), and card expiration date. If you want instead to update a card's PIN, send a `PUT` request to the `/pins` endpoint. See <<create_or_update_pin, Create or Update PIN>> on this page for details. Revealing a card's PIN is a two-step process. You must first create a new control token for the card by sending a `POST` request to `/pins/controltoken`, and then use that token to reveal the PIN.
   *
   * @tags PINs
   * @name RevealPins
   * @summary Reveal PIN
   * @request POST:/pins/reveal
   */
  revealPins = (data?: IPinRevealRequest, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/pins/reveal`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
}
