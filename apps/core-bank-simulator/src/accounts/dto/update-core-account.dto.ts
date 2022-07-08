//-----------------------------------------------------------------------------
// apps/core-bank-simulator/src/accounts/dto/update-account.dto.ts
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

import { CreateParticipantDto }     from './create-participant.dto'
import { Participant }              from '../entities/participant.entity'

import { 
  AccountStatus, 
  IUpdateAccountDto, 
}                                   from '@app/baas-interfaces'

/**
 * @class UpdateAccountDto
 */
export class UpdateAccountDto implements IUpdateAccountDto {
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
  
  /////////////////////////////////////////////////////////////////////////////
  // TODO: 07/08/2022
  // Remove the "participants" from the UpdateAccountDto as the update logic
  // is implemented in the "Participants" controller and service.
  /////////////////////////////////////////////////////////////////////////////
  @IsOptional()
  @IsArray()
  @ValidateNested()
  @Type(() => CreateParticipantDto)
  participants: Participant[]
}