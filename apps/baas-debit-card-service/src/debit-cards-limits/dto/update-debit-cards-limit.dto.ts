//---------------------------------------------------------------------------------------
// apps/baas-debit-card-service/src/debit-cards-limits/update-debits-card-limit.dto.ts
//---------------------------------------------------------------------------------------
import {
  IsNumber, 
  IsOptional, 
}                                     from 'class-validator'

import { IUpdateDebitCardsLimitDto }  from '@app/baas-interfaces'

/**
 * UpdateDebitCardLimitDto
 */
export class UpdateDebitCardsLimitDto implements IUpdateDebitCardsLimitDto {
  @IsOptional()
  @IsNumber() 
  atm_daily:          number
  
  @IsOptional()
  @IsNumber()
  pos_daily:          number
  
  @IsOptional()
  @IsNumber()
  daily_transactions: number
}
