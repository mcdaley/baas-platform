//-----------------------------------------------------------------------------
// apps/baas-debit-card-service/src/debit-cards-cancel/debit-cards-cancel.service.ts
//-----------------------------------------------------------------------------
import { Injectable }             from '@nestjs/common'

import { WinstonLoggerService }   from '@app/winston-logger'
import { CoreDebitCardSimulator } from '@app/core-simulator'


/**
 * @class DebitCardsCancelService
 */
@Injectable()
export class DebitCardsCancelService {
  constructor(
    private readonly logger:            WinstonLoggerService,
    private readonly debitCardService:  CoreDebitCardSimulator,
  ) {}
  
  async remove(debitCardId: string) {
    try {
      const  result = await this.debitCardService.cancelDebitCard(debitCardId)
      return result
    }
    catch(error) {
      throw(error)
    }
  }
}
