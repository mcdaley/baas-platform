//-----------------------------------------------------------------------------
// apps/baas-debit-cards-service/src/debit-cards-blocks/dto/create-debit-cards-block.dto.ts
//-----------------------------------------------------------------------------
import { IsEnum, IsNotEmpty }   from 'class-validator'

import { 
  BlockReason, 
  ICreateDebitCardsBlockDto, 
}                               from '@app/baas-interfaces'

/**
 * @class CreateDebitCardsBlockDto
 */
export class CreateDebitCardsBlockDto implements ICreateDebitCardsBlockDto {
  @IsNotEmpty()
  @IsEnum(BlockReason)
  block_reason:   BlockReason
}
