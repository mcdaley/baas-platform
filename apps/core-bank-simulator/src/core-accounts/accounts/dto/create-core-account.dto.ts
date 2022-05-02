//-----------------------------------------------------------------------------
// apps/core-bank-simulator/src/core-accounts/dto/create-core-account.dto.ts
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

import { CreateCoreParticipantDto } from '../../participants/dto/create-core-participant.dto'
import { CoreParticipant }          from '../../participants/entities/core-participant.entity'

import { 
  AccountType,
  ICreateAccountDto 
}                                   from '@app/baas-interfaces'

/**
 * @class CreateCoreAccountDto
 */
export class CreateCoreAccountDto implements ICreateAccountDto {
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
  @Type(() => CreateCoreParticipantDto)
  participants: CoreParticipant[]
}
