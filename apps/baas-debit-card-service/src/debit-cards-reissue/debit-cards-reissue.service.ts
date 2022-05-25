//----------------------------------------------------------------------------------
// apps/baas-debit-card-service/src/debit-card-reissue/debit-card-reissue.service.ts
//----------------------------------------------------------------------------------
import { Injectable }                 from '@nestjs/common'

import { CreateDebitCardsReissueDto } from './dto/create-debit-cards-reissue.dto'

import { WinstonLoggerService }       from '@app/winston-logger'

/**
 * @class DebitCardsReissueService
 */
@Injectable()
export class DebitCardsReissueService {
  constructor(
    private readonly logger:      WinstonLoggerService,
  ) {}
  
  /**
   * @method create
   */
  create(
    debitCardId:               string,
    createDebitCardsReissueDto: CreateDebitCardsReissueDto) 
  {
    try {
      const debitCard = {
        message: "Reissue card is not implemented yet"
      }
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
