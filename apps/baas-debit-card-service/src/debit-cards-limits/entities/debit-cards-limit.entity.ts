//---------------------------------------------------------------------------------------
// apps/baas-debit-card-service/src/debit-cards-limits/update-debit-cards-limit.entity.ts
//---------------------------------------------------------------------------------------
import { IDebitCardsLimit }   from '@app/baas-interfaces'

/**
 * @class DebitCardsLimit
 */
 export class DebitCardsLimit implements IDebitCardsLimit {
  atm_daily:          number
  pos_daily:          number
  daily_transactions: number
}
