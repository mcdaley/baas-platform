//-----------------------------------------------------------------------------
// apps/core-bank-simulator/src/debit-cards/dto/create-debit-card-block.dto.ts
//-----------------------------------------------------------------------------
import { 
  IsEnum,
  IsNotEmpty,
}                               from 'class-validator'

import {
  BlockReason,
  ICreateDebitCardsBlockDto
}                               from '@app/baas-interfaces'

/**
 * @class CreateDebitCardBlockDto
 */
export class CreateDebitCardBlockDto implements ICreateDebitCardsBlockDto {
  @IsNotEmpty()
  @IsEnum(BlockReason)
  block_reason:   BlockReason
}