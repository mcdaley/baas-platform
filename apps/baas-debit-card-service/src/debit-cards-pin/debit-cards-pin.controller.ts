//----------------------------------------------------------------------------------
// apps/baas-debit-card-service/src/debit-cards-pin/debit-cards-pin.controller.ts
//----------------------------------------------------------------------------------
import { 
  Controller, 
  Post, 
  Body, 
  Patch, 
  Param, 
  ParseUUIDPipe,
  HttpCode,
  Put,
}                                   from '@nestjs/common'

import { DebitCardsPinService }     from './debit-cards-pin.service'
import { CreateDebitCardsPinDto }   from './dto/create-debit-cards-pin.dto'
import { UpdateDebitCardsPinDto }   from './dto/update-debit-cards-pin.dto'

import { WinstonLoggerService }     from '@app/winston-logger'

/**
 * @class DebitCardsPinController
 */
@Controller({path: 'debit-cards/:debitCardId/pin', version: '1'})
export class DebitCardsPinController {
  constructor(
    private readonly debitCardPinService: DebitCardsPinService,
    private readonly logger:              WinstonLoggerService,
  ) {}

  /**
   * @method updateV1
   */
  @Put()
  @HttpCode(204)
  updateV1(
    @Param('debitCardId', ParseUUIDPipe) debitCardId: string,
    @Body() debitCardsPinDto: CreateDebitCardsPinDto
  ) {
    // Create or update the pin
    this.logger.log(`PUT /v1/debit-cards/${debitCardId}/pin, body= %o`, debitCardsPinDto)
    return this.debitCardPinService.create(debitCardId, debitCardsPinDto);
  }
} // end of class DebitCardsPinController
