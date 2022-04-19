//--------------------------------------------------------------------------------------
// apps/baas-debit-card-service/src/debit-cards-pin/entities/debit-cards-pin.entity.ts
//--------------------------------------------------------------------------------------
import { IDebitCardsPin }   from '@app/baas-interfaces'

/**
 * @class DebitCardsPin
 */
 export class DebitCardsPin implements IDebitCardsPin{
  pin:  string
}
