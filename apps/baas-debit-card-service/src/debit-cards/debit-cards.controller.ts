//-----------------------------------------------------------------------------
// apps/baas-debit-card-service/src/debit-cards/debit-cards.controller.ts
//-----------------------------------------------------------------------------
import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete,
  ParseUUIDPipe, 
}                                 from '@nestjs/common'

import { DebitCardsService }      from './debit-cards.service'
import { CreateDebitCardDto }     from './dto/create-debit-card.dto'
import { UpdateDebitCardDto }     from './dto/update-debit-card.dto'

import { IdempotencyKey }         from '@app/baas-errors'
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

  @Post()
  createV1(
    @IdempotencyKey() idempotencyKey: string,
    @Body() createDebitCardDto: CreateDebitCardDto
  ) {
    this.logger.log(`POST /v1/debit-cards, createDebitCardDto= %o`, createDebitCardDto)
    return this.debitCardsService.create(createDebitCardDto);
  }

  @Get()
  findAllV1() {
    this.logger.log(`GET /v1/debit-cards`)
    return this.debitCardsService.findAll()
  }

  @Get(':debitCardId')
  findOneV1(@Param('debitCardId', ParseUUIDPipe) debitCardId: string) {
    this.logger.log(`GET /v1/debit-cards/${debitCardId}`)
    return this.debitCardsService.findOne(debitCardId)
  }

  //* @Patch(':debitCardId')
  //* updateV1(
  //*   @Param('debitCardId', ParseUUIDPipe) debitCardId: string, 
  //*   @Body() updateDebitCardDto: UpdateDebitCardDto
  //* ) {
  //*   this.logger.log(
  //*     `PATCH /v1/debit-cards/${debitCardId}, updateDebitCardDto= %o`, updateDebitCardDto
  //*   )
  //*   return this.debitCardsService.update(debitCardId, updateDebitCardDto);
  //* }

  //* @Delete(':debitCardId')
  //* removeV1(@Param('debitCardId', ParseUUIDPipe) debitCardId: string) {
  //*   this.logger.log(`DELETE /v1/debit-cards/${debitCardId}`)
  //*   return this.debitCardsService.remove(debitCardId)
  //* }
}
