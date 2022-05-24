//---------------------------------------------------------------------------------------
// apps/baas-debit-cards-service/src/debit-cards-blocks/debit-cards-blocks.controller.ts
//---------------------------------------------------------------------------------------
import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete,
  ParseUUIDPipe, 
}                                   from '@nestjs/common'

import { DebitCardsBlocksService }  from './debit-cards-blocks.service'
import { CreateDebitCardsBlockDto } from './dto/create-debit-cards-block.dto'

import { WinstonLoggerService }   from '@app/winston-logger'
import { IdempotencyKey } from '@app/baas-errors'

/**
 * @class DebitCardsBlocksController
 */
@Controller({path: 'debit-cards/:debitCardId/blocks', version: '1'})
export class DebitCardsBlocksController {
  constructor(
    private readonly debitCardsBlocksService: DebitCardsBlocksService,
    private readonly logger:                  WinstonLoggerService
  ) {}

  @Post()
  createV1(
    @IdempotencyKey() idempotencyKey: string,
    @Param('debitCardId', ParseUUIDPipe) debitCardId: string,
    @Body() createDebitCardsBlockDto: CreateDebitCardsBlockDto
  ) {
    this.logger.log(
      `POST /v1/debit-cards/${debitCardId}/blocks, createDebitCardsBlockDto= %o`, 
      createDebitCardsBlockDto
    )
    return this.debitCardsBlocksService.create(debitCardId, createDebitCardsBlockDto);
  }

  @Get()
  findAllV1(@Param('debitCardId', ParseUUIDPipe) debitCardId: string) {
    this.logger.log(`GET /v1/debit-cards/${debitCardId}/blocks`)
    return this.debitCardsBlocksService.findAll(debitCardId)
  }

  @Delete(':blockId')
  removeV1(
    @IdempotencyKey() idempotencyKey: string,
    @Param('debitCardId', ParseUUIDPipe) debitCardId: string,
    @Param('blockId',     ParseUUIDPipe) blockId: string
  ) {
    this.logger.log(`DELETE /v1/debit-cards/${debitCardId}/blocks/${blockId}`)
    return this.debitCardsBlocksService.remove(debitCardId, blockId);
  }
}
