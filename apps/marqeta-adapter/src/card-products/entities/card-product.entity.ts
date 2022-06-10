
//-----------------------------------------------------------------------------
// apps/marqeta-adapter/src/card-products/entitites/card-product.entity.ts
//-----------------------------------------------------------------------------
import { CardProductConfigDto } from "../dto/card-product-config.dto"

import { ICardProductResponse } from "@app/baas-marqeta"

/**
 * @class CardProduct
 */
export class CardProduct implements ICardProductResponse {
  /** Indicates whether the card product is active. */
  active?: boolean;

  /**
   * Defines the characteristics of the card product.
   * Configurations are conditionally required based on program setup.
   *
   * For more information, contact your Marqeta representative.
   */
  config?: CardProductConfigDto

  /**
   * The date and time when the resource was created, in UTC.
   * `2021-10-26T20:03:10Z`, for example.
   * @format date-time
   */
  created_time: string;

  /**
   * The end date of the range over which the card product can be active.
   * @format date-time
   */
  end_date?: string;

  /**
   * The date and time when the resource was last updated, in UTC.
   * `2021-10-26T20:03:15Z`, for example.
   * @format date-time
   */
  last_modified_time: string;

  /** The name of the card product. */
  name: string;

  /**
   * The date and time when the card product becomes active.
   * @format date-time
   */
  start_date: string;

  /** The unique identifier of the card product. */
  token?: string;
}

