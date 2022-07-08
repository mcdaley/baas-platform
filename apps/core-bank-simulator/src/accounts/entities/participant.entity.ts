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
  participant_customer_id:  string
  participant_role:         ParticipantRole
}