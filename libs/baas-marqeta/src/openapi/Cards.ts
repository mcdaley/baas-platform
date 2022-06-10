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
  ICardListResponse,
  ICardRequest,
  ICardResponse,
  ICardUpdateRequest,
  IMerchantCardRequest,
  IPanRequest,
  IPanResponse,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Cards<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description Retrieves an array of cards whose PANs end in the four digits specified by the `last_four` query parameter. This endpoint supports <</core-api/field-filtering, field filtering>>, <</core-api/object-expansion, object expansion>>, <</core-api/sorting-and-pagination, sorting, and pagination>>.
   *
   * @tags Cards
   * @name GetCards
   * @summary List cards by last 4 digits of PAN
   * @request GET:/cards
   */
  getCards = (
    query: {
      count?: number;
      start_index?: number;
      last_four: string;
      fields?: string;
      sort_by?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<ICardListResponse, void>({
      path: `/cards`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    });
  /**
   * @description Creates a card. Create the user and card product before you create the card. You create a card using the `user_token` of the user who will own the card and the `card_product_token` of the card product that will control the card. [TIP] By default, newly created cards are inactive and must be explicitly activated (see <</core-api/cards#_create_card_transition, Create Card Transition>> for information on activating cards). To create cards that are activated upon issue, configure your card product's `config.card_life_cycle.activate_upon_issue` field (see <</core-api/card-products, Card Products>>). Send a `POST` request to `/pins/controltoken` to set the card's PIN if your program requires PIN numbers (for example, for EMV cards); this action updates the `pin_is_set` field to `true`. See <</core-api/pins#_create_or_update_pin, Create or Update PIN>> for details. You can use optional query parameters to show the PAN and CVV2 number in the response. If `show_pan` and `show_cvv_number` are set to `true`, the fulfillment state of the card is `DIGITALLY_PRESENTED` instead of the typical initial state of `ISSUED`. This fulfillment state does not affect the delivery of physical cards. This endpoint requires PCI DSS compliance if `show_pan` and `show_cvv_number` are set to `true`. You must comply with PCI DSS data security requirements if you store, transmit, or process sensitive card data.
   *
   * @tags Cards
   * @name PostCards
   * @summary Create card
   * @request POST:/cards
   */
  postCards = (
    query?: { show_cvv_number?: boolean; show_pan?: boolean },
    data?: ICardRequest,
    params: RequestParams = {},
  ) =>
    this.request<ICardResponse, void>({
      path: `/cards`,
      method: 'POST',
      query: query,
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description Retrieves a card by its barcode. This endpoint supports <</core-api/field-filtering, field filtering>> and <</core-api/object-expansion, object expansion>>.
   *
   * @tags Cards
   * @name GetCardsBarcodeBarcode
   * @summary Retrieve card by barcode
   * @request GET:/cards/barcode/{barcode}
   */
  getCardsBarcodeBarcode = (
    barcode: string,
    query?: { fields?: string },
    params: RequestParams = {},
  ) =>
    this.request<ICardResponse, void>({
      path: `/cards/barcode/${barcode}`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    });
  /**
   * @description Retrieves the `user_token` and `card_token` for a PAN (card number). In the case of a reissued card, where multiple cards share the same PAN, the information for the most recently issued card is returned. This request is useful in IVR scenarios where a user has telephoned and identifies the card by the PAN. The retrieval of these tokens is implemented as a `POST` request because supplying the PAN in the request body is more secure than supplying it in the URL (as would be required with a `GET`). [WARNING] Sending a request to this endpoint requires PCI DSS compliance. You must comply with PCI DSS data security requirements if you want to store, transmit, or process sensitive card data such as the cardholder's primary account number (PAN), personal identification number (PIN), and card expiration date.
   *
   * @tags Cards
   * @name PostCardsGetbypan
   * @summary Retrieve card by PAN
   * @request POST:/cards/getbypan
   */
  postCardsGetbypan = (data?: IPanRequest, params: RequestParams = {}) =>
    this.request<IPanResponse, void>({
      path: `/cards/getbypan`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description Deprecated endpoint, do not use.
   *
   * @tags deprecated
   * @name GetCardsMerchantMerchanttoken
   * @summary Returns a merchant onboarding card
   * @request GET:/cards/merchant/{merchant_token}
   */
  getCardsMerchantMerchanttoken = (
    merchantToken: string,
    query?: { fields?: string },
    params: RequestParams = {},
  ) =>
    this.request<ICardResponse, void>({
      path: `/cards/merchant/${merchantToken}`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    });
  /**
   * @description Deprecated endpoint, do not use.
   *
   * @tags deprecated
   * @name PostCardsMerchantMerchanttoken
   * @summary Creates a merchant onboarding card
   * @request POST:/cards/merchant/{merchant_token}
   */
  postCardsMerchantMerchanttoken = (
    merchantToken: string,
    data?: IMerchantCardRequest,
    params: RequestParams = {},
  ) =>
    this.request<ICardResponse, void>({
      path: `/cards/merchant/${merchantToken}`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description Deprecated endpoint, do not use.
   *
   * @tags deprecated
   * @name GetCardsMerchantMerchanttokenShowpan
   * @summary Returns a specific card - PAN visible
   * @request GET:/cards/merchant/{merchant_token}/showpan
   */
  getCardsMerchantMerchanttokenShowpan = (
    merchantToken: string,
    query?: { fields?: string; show_cvv_number?: boolean },
    params: RequestParams = {},
  ) =>
    this.request<ICardResponse, void>({
      path: `/cards/merchant/${merchantToken}/showpan`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    });
  /**
   * @description Retrieves a list of the cards associated with a specific user. This endpoint supports <</core-api/field-filtering, field filtering,>> <</core-api/sorting-and-pagination, pagination>>, and <</core-api/object-expansion, object expansion>>.
   *
   * @tags Cards
   * @name GetCardsUserToken
   * @summary List cards for user
   * @request GET:/cards/user/{token}
   */
  getCardsUserToken = (
    token: string,
    query?: {
      count?: number;
      start_index?: number;
      fields?: string;
      sort_by?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<ICardListResponse, void>({
      path: `/cards/user/${token}`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    });
  /**
   * @description Retrieves a card by the card hash with the PAN visible.
   *
   * @tags deprecated
   * @name GetCardsCardHashShowpan
   * @summary Retrieve card by hash with PAN visible
   * @request GET:/cards/{card_hash}/showpanbyhash
   */
  getCardsCardHashShowpan = (
    cardHash: string,
    query?: { fields?: string; show_cvv_number?: boolean },
    params: RequestParams = {},
  ) =>
    this.request<ICardResponse, void>({
      path: `/cards/${cardHash}/showpanbyhash`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    });
  /**
   * @description Retrieves a specific card. This endpoint supports <</core-api/field-filtering, field filtering>> and <</core-api/object-expansion, object expansion>>.
   *
   * @tags Cards
   * @name GetCardsToken
   * @summary Retrieve card
   * @request GET:/cards/{token}
   */
  getCardsToken = (
    token: string,
    query?: { fields?: string; expand?: string },
    params: RequestParams = {},
  ) =>
    this.request<ICardResponse, void>({
      path: `/cards/${token}`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    });
  /**
   * @description Updates the details of an existing card.
   *
   * @tags Cards
   * @name PutCardsToken
   * @summary Update card
   * @request PUT:/cards/{token}
   */
  putCardsToken = (
    token: string,
    data?: ICardUpdateRequest,
    params: RequestParams = {},
  ) =>
    this.request<ICardResponse, void>({
      path: `/cards/${token}`,
      method: 'PUT',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description Retrieves a PAN (card number). For security reasons, the PAN is not fully visible on the card resource returned by `GET` `/cards/{token}`. This endpoint supports <</core-api/field-filtering, field filtering>> and <</core-api/object-expansion, object expansion>>.
   *
   * @tags Cards
   * @name GetCardsTokenShowpan
   * @summary Show card PAN
   * @request GET:/cards/{token}/showpan
   */
  getCardsTokenShowpan = (
    token: string,
    query?: { fields?: string; show_cvv_number?: boolean },
    params: RequestParams = {},
  ) =>
    this.request<ICardResponse, void>({
      path: `/cards/${token}/showpan`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    });
}
