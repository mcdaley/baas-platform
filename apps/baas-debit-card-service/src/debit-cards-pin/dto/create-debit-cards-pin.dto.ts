//---------------------------------------------------------------------------------------
// apps/baas-debit-card-service/src/debit-cards-pin/dto/create-debit-cards-pin.dto.ts
//---------------------------------------------------------------------------------------
import { 
  IsNotEmpty,
  IsNumberString,
  Length,
}                                   from 'class-validator'

import { ICreateDebitCardsPinDto }  from '@app/baas-interfaces'

/**
 * @class CreateDebitCardsPinDto
 */
export class CreateDebitCardsPinDto implements ICreateDebitCardsPinDto {
  @IsNotEmpty()
  @IsNumberString()
  @Length(4)
  pin:  string
}
