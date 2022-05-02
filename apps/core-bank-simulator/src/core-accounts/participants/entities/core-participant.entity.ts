//----------------------------------------------------------------------------------------------
// apps/core-bank-simulator/src/core-accounts/participants/entities/core-participant.entity.ts
//----------------------------------------------------------------------------------------------
import { 
  ParticipantRole,
  IParticipant,  
}                       from '@app/baas-interfaces'

/**
 * @class CoreParticipant
 */
export class CoreParticipant implements IParticipant {
  participant_customer_id:  string
  participant_role:         ParticipantRole
}