//----------------------------------------------------------------------------------
// apps/baas-debit-card-service/src/debit-cards/dto/update-debit-card-pin.dto.ts
//----------------------------------------------------------------------------------
import { 
  IsNotEmpty,
  IsNumberString,
  Length,
}                                   from 'class-validator'

import { IUpdateDebitCardsPinDto }  from '@app/baas-interfaces'

/**
 * @class UpdateDebitCardsPinDto
 */
export class UpdateDebitCardPinDto implements IUpdateDebitCardsPinDto {
  @IsNotEmpty()
  @IsNumberString()
  @Length(4)
  pin:  string
}