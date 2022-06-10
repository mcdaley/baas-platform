//-----------------------------------------------------------------------------
// apps/marqeta-adapter/src/card-products/dto/card-product-config.dto.ts
//-----------------------------------------------------------------------------
import { IsOptional, ValidateNested }   from "class-validator"

import { CardLifeCycleDto }             from "./card-life-cycle.dto"
import { ClearingAndSettlementDto }     from "./clearing-and-settlement.dto"
import { DigitalWalletTokenizationDto } from "./digital-wallet-tokenization.dto"
import { CardProductFulfillmentDto }    from "./card-product-fulfillment.dto"

import { JitFundingDto }                from "./jit-funding.dto"
import { PoiDto }                       from "./poi.dto"
import { SelectiveAuthDto }             from "./selective-auth.dto"
import { SpecialDto }                   from "./special.dto"
import { TransactionControlsDto }       from "./transaction-controls.dto"

import { ICardProductConfig }           from "@app/baas-marqeta"

/**
 * @class CreateCardProductDto
 */
export class CardProductConfigDto implements ICardProductConfig {
  @IsOptional()
  @ValidateNested()
  card_life_cycle?: CardLifeCycleDto

  @IsOptional()
  @ValidateNested()
  clearing_and_settlement?: ClearingAndSettlementDto

  @IsOptional()
  @ValidateNested()
  digital_wallet_tokenization?: DigitalWalletTokenizationDto

  @IsOptional()
  @ValidateNested()
  fulfillment?: CardProductFulfillmentDto

  @IsOptional()
  @ValidateNested()
  jit_funding?: JitFundingDto

  @IsOptional()
  @ValidateNested()
  poi?: PoiDto

  @IsOptional()
  @ValidateNested()
  selective_auth?: SelectiveAuthDto

  @IsOptional()
  @ValidateNested()
  special?: SpecialDto

  @IsOptional()
  @ValidateNested()
  transaction_controls?: TransactionControlsDto
}
