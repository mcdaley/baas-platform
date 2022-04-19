//-----------------------------------------------------------------------------
// apps/baas-debit-card-service/src/debit-card-pin/debit-card-pin.service.ys
//-----------------------------------------------------------------------------
import { Injectable }               from '@nestjs/common'

import { CreateDebitCardsPinDto }   from './dto/create-debit-cards-pin.dto'

import { WinstonLoggerService }     from '@app/winston-logger'
import { CoreDebitCardSimulator }   from '@app/core-simulator'

/**
 * @class DebitCardsPinService
 */
@Injectable()
export class DebitCardsPinService {
  constructor(
    private readonly logger:            WinstonLoggerService,
    private readonly debitCardService:  CoreDebitCardSimulator,
  ) {}

  async create(debitCardId: string, createDebitCardsPinDto: CreateDebitCardsPinDto) {
    this.logger.log(`Debit card id=[${debitCardId}], create pin= %o`, createDebitCardsPinDto)
    
    try {
      const  result = await this.debitCardService.createDebitCardsPin(debitCardId, createDebitCardsPinDto)
      return result
    }
    catch(error) {
      throw(error)
    }
  }
} // end of class DebitCardsPinService
