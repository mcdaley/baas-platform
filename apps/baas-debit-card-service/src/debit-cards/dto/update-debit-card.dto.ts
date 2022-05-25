//-----------------------------------------------------------------------------
// apps/baas-debit-card-service/src/debit-cards/dto/update-debit-card.dto.ts
//-----------------------------------------------------------------------------
import { 
  IsAlphanumeric, 
  IsEnum, 
  IsInt, 
  IsNumber, 
  IsOptional, 
  IsString,
  Length, 
  Matches, 
  MaxLength, 
}                               from 'class-validator'
import { 
  CardStatus, 
  IUpdateDebitCardDto, 
}                               from '@app/baas-interfaces'

/**
 * @class UpdateDebitCardDto
 */
export class UpdateDebitCardDto implements IUpdateDebitCardDto {
  @IsOptional()
  @IsString()
  @MaxLength(64)
  name_on_card?:        string

  @IsOptional()
  @IsString()
  card_number?:         string

  @IsOptional()
  @IsString()
  @Matches(/^\d{2}\/\d{2}$/)
  expiration_date?:     string

  @IsOptional()
  @IsString()
  @Length(3)
  cvv?:                 string

  @IsOptional()
  @IsEnum(CardStatus)
  status?:              CardStatus

  @IsOptional()
  @IsAlphanumeric()
  @Length(4)
  pin?:                 string

  @IsOptional()
  @IsNumber()
  atm_daily?:           number

  @IsOptional()
  @IsNumber()
  pos_daily?:           number

  @IsOptional()
  @IsInt()
  daily_transactions?:  number

  //* blocks?:          IDebitCardsBlock[]
}
