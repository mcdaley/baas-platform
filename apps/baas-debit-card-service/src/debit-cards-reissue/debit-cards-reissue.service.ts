//----------------------------------------------------------------------------------
// apps/baas-debit-card-service/src/debit-card-reissue/debit-card-reissue.service.ts
//----------------------------------------------------------------------------------
import { Injectable }                 from '@nestjs/common'

import { CreateDebitCardsReissueDto } from './dto/create-debit-cards-reissue.dto'

import { WinstonLoggerService }       from '@app/winston-logger'
import { CoreDebitCardSimulator }     from '@app/core-simulator'

/**
 * @class DebitCardsReissueService
 */
@Injectable()
export class DebitCardsReissueService {
  constructor(
    private readonly coreService: CoreDebitCardSimulator,
    private readonly logger:      WinstonLoggerService,
  ) {}
  
  /**
   * @method create
   */
  async create(
    debitCardId:               string,
    createDebitCardsReissueDto: CreateDebitCardsReissueDto
  ) {
    try {
      const debitCard = await this.coreService.reissueDebitCard(debitCardId, createDebitCardsReissueDto)
      const result    = {
        debit_card: debitCard,
      }

      return result
    }
    catch(error) {
      throw(error)
    }
  }
} // end of class DebitCardsReissueServce
