//-----------------------------------------------------------------------------
// apps/marqeta-adapter/src/card-products/dto/card-product-config.dto.ts
//-----------------------------------------------------------------------------
import { IsOptional, ValidateNested }   from "class-validator"
import { Type }                         from 'class-transformer'

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
  @Type(() => CardLifeCycleDto)
  card_life_cycle?: CardLifeCycleDto

  @IsOptional()
  @ValidateNested()
  @Type(() => ClearingAndSettlementDto)
  clearing_and_settlement?: ClearingAndSettlementDto

  @IsOptional()
  @ValidateNested()
  @Type(() => DigitalWalletTokenizationDto)
  digital_wallet_tokenization?: DigitalWalletTokenizationDto

  @IsOptional()
  @ValidateNested()
  @Type(() => CardProductFulfillmentDto)
  fulfillment?: CardProductFulfillmentDto

  @IsOptional()
  @ValidateNested()
  @Type(() => JitFundingDto)
  jit_funding?: JitFundingDto

  @IsOptional()
  @ValidateNested()
  @Type(() => PoiDto)
  poi?: PoiDto

  @IsOptional()
  @ValidateNested()
  @Type(() => SelectiveAuthDto)
  selective_auth?: SelectiveAuthDto

  @IsOptional()
  @ValidateNested()
  @Type(() => SpecialDto)
  special?: SpecialDto

  @IsOptional()
  @ValidateNested()
  @Type(() => TransactionControlsDto)
  transaction_controls?: TransactionControlsDto
}
