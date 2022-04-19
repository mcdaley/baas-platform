//-----------------------------------------------------------------------------
// apps/baas-debit-card-service/src/debit-cards-limits/debit-cards-limits.service.ts
//-----------------------------------------------------------------------------
import { Injectable }               from '@nestjs/common'
import { UpdateDebitCardsLimitDto } from './dto/update-debit-cards-limit.dto'

import { WinstonLoggerService }     from '@app/winston-logger'
import { CoreDebitCardSimulator }   from '@app/core-simulator'

@Injectable()
export class DebitCardsLimitsService {
  constructor(
    private readonly logger:      WinstonLoggerService,
    private readonly coreService: CoreDebitCardSimulator,
  ) {}

  /**
   * Fetch a debit card's limits.
   * @method findAll
   */
  async findAll(debitCardId: string) {
    try {
      const limits = await this.coreService.findAllDebitCardsLimits(debitCardId)
      const result = {
        limits: limits
      }
      return result
    }
    catch(error) {
      throw(error)
    }
  }

  /**
   * Update a debit card's limits.
   * 
   * @method update
   */
  async update(debitCardId: string, updateDebitCardsLimitDto: UpdateDebitCardsLimitDto) {
    try {
      const limits = await this.coreService.updateDebitCardsLimits(
        debitCardId, updateDebitCardsLimitDto
      )

      const result = {
        limits: limits
      }
      return result
    }
    catch(error) {
      throw(error)
    }
  }
}
