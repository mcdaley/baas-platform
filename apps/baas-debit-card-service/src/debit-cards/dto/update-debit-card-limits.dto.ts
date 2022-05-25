//----------------------------------------------------------------------------------
// app/baas-debit-card-service/src/debit-cards/dto/update-debit-card-limits.dto.ts
//----------------------------------------------------------------------------------
import {
  IsNumber, 
  IsOptional, 
}                                     from 'class-validator'

import { IUpdateDebitCardsLimitDto }  from '@app/baas-interfaces'

/**
 * UpdateDebitCardLimitDto
 */
export class UpdateDebitCardLimitsDto implements IUpdateDebitCardsLimitDto {
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