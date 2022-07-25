//----------------------------------------------------------------------------------
// apps/core-bank-simulator/src/accounts/entities/participant.entity.ts
//----------------------------------------------------------------------------------
import { 
  ParticipantRole,
  IParticipant,  
}                       from '@app/baas-interfaces'

/**
 * @class Participant
 */
export class Participant implements IParticipant {
  customer_id:  string
  participant_role:         ParticipantRole
  created_at:               Date
  updated_at:               Date
}