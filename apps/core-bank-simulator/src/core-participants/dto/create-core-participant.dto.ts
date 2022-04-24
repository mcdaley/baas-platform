//----------------------------------------------------------------------------------
// apps/core-bank-simulator/src/core-participants/dto/create-core-participant.dto.ts
//----------------------------------------------------------------------------------
import { 
  IsEnum,
  IsNotEmpty,
  IsUUID,
}                             from 'class-validator'

import { 
  ParticipantRole, 
  ICreateParticipantDto,
}                             from '@app/baas-interfaces'

/**
 * @class CreateCoreParticipantDto
 */
export class CreateCoreParticipantDto implements ICreateParticipantDto {
  @IsNotEmpty()
  @IsUUID()
  participant_customer_id:  string
  
  @IsNotEmpty()
  @IsEnum(ParticipantRole)
  participant_role:         ParticipantRole
}