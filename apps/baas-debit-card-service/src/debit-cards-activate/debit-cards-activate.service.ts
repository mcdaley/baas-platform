//-----------------------------------------------------------------------------
// apps/baas=debit-card-service/src/debit-cards-activate/debit-cards-activate.service.ts
//-----------------------------------------------------------------------------
import { Injectable }               from '@nestjs/common'
import { ConfigService }            from '@nestjs/config'
import axios                        from 'axios'

import { WinstonLoggerService }     from '@app/winston-logger'
import { CoreDebitCardSimulator }   from '@app/core-simulator'
import { CardStatus, IDebitCard, IUpdateDebitCardStatus } from '@app/baas-interfaces'

/**
 * @class DebitCardsActivateService
 */
@Injectable()
export class DebitCardsActivateService {
  constructor(
    private readonly configService:     ConfigService,
    private readonly logger:            WinstonLoggerService,
    private readonly debitCardService:  CoreDebitCardSimulator
  ) {}

  /**
   * Activate the debit card by changing the card status to 'active'
   * @method update
   */
  async update(debitCardId: string) : Promise<IDebitCard> {
    try {
      // Set card status to active
      const updateDebitCardStatusDto : IUpdateDebitCardStatus = {
        status: CardStatus.Active
      }

      const url      = `${this.configService.get('bankSimulatorDebitCardsUrl')}/${debitCardId}`
      const response = await axios.patch(url, updateDebitCardStatusDto)
      const result   = <IDebitCard>response.data
      
      return  result
    }
    catch(error) {
      throw(error)
    }
  }
} // end of class DebitCardsActivateService
