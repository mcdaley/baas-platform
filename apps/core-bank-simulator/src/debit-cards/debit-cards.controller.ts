//-----------------------------------------------------------------------------
// apps/core-bank-simulator/src/debit-cards/debit-cards.controller.ts
//-----------------------------------------------------------------------------
import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  ParseUUIDPipe
}                                 from '@nestjs/common'

import { DebitCardsService }      from './debit-cards.service'
import { CreateDebitCardDto }     from './dto/create-debit-card.dto'
import { UpdateDebitCardDto }     from './dto/update-debit-card.dto'

import { WinstonLoggerService }   from '@app/winston-logger'

/**
 * @class DebitCardsController
 */
@Controller({path: 'debit-cards', version: '1'})
export class DebitCardsController {
  constructor(
    private readonly debitCardsService: DebitCardsService,
    private readonly logger:            WinstonLoggerService,
  ) {}

  /**
   * @method createV1
   */
  @Post()
  createV1(@Body() createDebitCardDto: CreateDebitCardDto) {
    this.logger.log(`POST /core/api/v1/debit-cards, createDebitCardDto= %o`, createDebitCardDto)
    return this.debitCardsService.create(createDebitCardDto);
  }

  /**
   * @method findallV1
   */
  @Get()
  findAllV1() {
    this.logger.log(`GET /core/api/v1/debit-cards`)
    return this.debitCardsService.findAll()
  }

  /**
   * @method findOneV1
   */
  @Get(':debitCardId')
  findOneV1(@Param('debitCardId', ParseUUIDPipe) debitCardId: string) 
  {
    this.logger.log(`GET /core/api/v1/debit-cards/${debitCardId}`)
    return this.debitCardsService.findOne(debitCardId)
  }

  /**
   * @method updateV1
   */
  @Patch(':debitCardId')
  updateV1(
    @Param('debitCardId', ParseUUIDPipe) debitCardId: string, 
    @Body() updateDebitCardDto: UpdateDebitCardDto) 
  {
    this.logger.log(
      `PATCH /core/api/v1/debit-cards/${debitCardId}, updateDebitCardDto = %o`, 
      updateDebitCardDto
    )
    return this.debitCardsService.update(debitCardId, updateDebitCardDto);
  }

  /**
   * @method removeV1
   */
  @Delete(':debitCardId')
  removeV1(@Param('debitCardId', ParseUUIDPipe) debitCardId: string) 
  {
    this.logger.log(`DELETE /core/api/v1/debit-cards/${debitCardId}`)
    return this.debitCardsService.remove(debitCardId);
  }
}
