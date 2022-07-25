//-----------------------------------------------------------------------------
// apps/baas-account-servce/src/participants/dto/create-participant.dto.ts
//-----------------------------------------------------------------------------
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
 * @class CreateParticipantDto
 */
export class CreateParticipantDto implements ICreateParticipantDto {
  @IsNotEmpty()
  @IsUUID()
  customer_id:  string
  
  @IsNotEmpty()
  @IsEnum(ParticipantRole)
  participant_role:         ParticipantRole
}