//-----------------------------------------------------------------------------
// apps/core-bank-simulator/src/accounts/dto/create-account.dto.ts
//-----------------------------------------------------------------------------
import { 
  IsEnum,
  IsNotEmpty,
  ValidateNested,
  IsArray,
  IsString,
  IsOptional,
}                                   from 'class-validator'
import { Type }                     from 'class-transformer'

import { CreateParticipantDto }     from '../participants/dto/create-participant.dto'
import { Participant }              from '../participants/entities/participant.entity'

import { 
  AccountType,
  ICreateAccountDto 
}                                   from '@app/baas-interfaces'

/**
 * @class CreateAccountDto
 */
export class CreateAccountDto implements ICreateAccountDto {
  @IsNotEmpty()
  @IsEnum(AccountType)
  account_type:     AccountType

  @IsNotEmpty()
  @IsString()
  name_on_account:  string

  @IsNotEmpty()
  @IsString()
  name:             string

  @IsOptional()
  @IsString()
  nickname?:        string

  @IsNotEmpty()
  @IsArray()
  @ValidateNested()
  @Type(() => CreateParticipantDto)
  participants: Participant[]
}
