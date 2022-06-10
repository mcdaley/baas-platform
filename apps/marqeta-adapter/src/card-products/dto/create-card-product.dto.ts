//-----------------------------------------------------------------------------
// apps/marqeta-adapter/src/card-products/dto/create-card-product.dto.ts
//-----------------------------------------------------------------------------
import { 
  IsBoolean, 
  IsNotEmpty, 
  IsOptional, 
  IsString, 
  Length, 
  Matches, 
  ValidateNested, 
}                                       from "class-validator"

import { CardProductConfigDto }         from "./card-product-config.dto"

import { ICardProductRequest }          from "@app/baas-marqeta"

/**
 * @class CreateCardProductDto
 */
export class CreateCardProductDto implements ICardProductRequest {
  /**
   * Indicates whether the card product is active.
   */
  @IsOptional()
  @IsBoolean()
  active?: boolean;

  /**
   * Defines the characteristics of the card product.
   * Configurations are conditionally required based on program setup.
   */
  /////////////////////////////////////////////////////////////////////////////
  // BUG: 6/8/2022
  // The "@ValdateNested()" is not working. When optional nested fields are
  // defined then it reports a validation error.
  /////////////////////////////////////////////////////////////////////////////
  @IsOptional()
  //** @ValidateNested()
  config?: CardProductConfigDto

  /**
   * The end date of the range over which the card product can be active.
   * @format yyyy-DD-mm
   */
  @IsOptional()
  @IsString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/)
  end_date?: string;

  /**
   * The name of the card product. We recommend using a unique string.
   */
  @IsString()
  @IsNotEmpty()
  @Length(1, 40)
  name: string;

  /**
   * The date when the card product becomes active.
   * If the start date has passed and the card is set to `active = false`, then the card will not be activated.
   * @format yyyy-DD-mm
   */
  @IsOptional()
  @IsString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/)
  start_date: string

  /**
   * The unique identifier of the card product.
   *
   * If you do not include a token, the system will generate one automatically.
   * This token is required in other API calls, so we recommend that rather than let the system generate one, you use a simple string that is easy to remember.
   * This value cannot be updated.
   */
  @IsOptional()
  @IsString()
  @Length(1, 36)
  token?: string;
}
