//-----------------------------------------------------------------------------
// apps/core-bank-simulator/src/core-accounts/dto/update-core-account.dto.ts
//-----------------------------------------------------------------------------
import { 
  IsArray, 
  IsEnum, 
  IsOptional, 
  IsString, 
  MaxLength, 
  ValidateNested 
}                                   from 'class-validator'
import { Type }                     from 'class-transformer'
import { PartialType }              from '@nestjs/mapped-types'

import { CreateCoreParticipantDto } from '../../participants/dto/create-core-participant.dto'
import { CoreParticipant }          from '../../participants/entities/core-participant.entity'

import { 
  AccountStatus, 
  IUpdateAccountDto, 
}                                   from '@app/baas-interfaces'

/**
 * @class UpdateCoreAccountDto
 */
export class UpdateCoreAccountDto implements IUpdateAccountDto {
  @IsOptional()
  @IsEnum(AccountStatus)
  account_status?:          AccountStatus
  
  @IsOptional()
  @IsString()
  account_status_reason?:   string

  @IsOptional()
  @IsString()
  @MaxLength(128)
  name?:                    string
  
  @IsOptional()
  @IsString()
  @MaxLength(128)
  nickname?:                string
  
  @IsOptional()
  @IsArray()
  @ValidateNested()
  @Type(() => CreateCoreParticipantDto)
  participants: CoreParticipant[]
}