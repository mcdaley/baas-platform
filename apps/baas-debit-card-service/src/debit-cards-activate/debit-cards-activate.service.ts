//-----------------------------------------------------------------------------
// apps/baas=debit-card-service/src/debit-cards-activate/debit-cards-activate.service.ts
//-----------------------------------------------------------------------------
import { Injectable }               from '@nestjs/common'

import { WinstonLoggerService }     from '@app/winston-logger'
import { CoreDebitCardSimulator }   from '@app/core-simulator'

/**
 * @class DebitCardsActivateService
 */
@Injectable()
export class DebitCardsActivateService {
  constructor(
    private readonly logger:            WinstonLoggerService,
    private readonly debitCardService:  CoreDebitCardSimulator
  ) {}

  /**
   * @method create
   */
  async create(debitCardId: string) {
    try {
      const   result = await this.debitCardService.activateDebitCard(debitCardId)
      return  null
    }
    catch(error) {
      throw(error)
    }
  }
} // end of class DebitCardsActivateService
