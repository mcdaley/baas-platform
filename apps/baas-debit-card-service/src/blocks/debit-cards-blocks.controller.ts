//---------------------------------------------------------------------------------------
// apps/baas-debit-cards-service/src/blocks/debit-cards-blocks.controller.ts
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

import { 
  CustomerId,
  TenantId,
  IdempotencyKey,
  BaaSRequestHeaders,
  IBaaSRequestHeaders, 
}                                   from '@app/baas-errors'

/**
 * @class DebitCardsBlocksController
 */
@Controller({path: 'debit-cards/:debitCardId/blocks', version: '1'})
export class DebitCardsBlocksController {
  /**
   * @constructor
   */
  constructor(
    private readonly debitCardsBlocksService: DebitCardsBlocksService,
  ) {}

  /**
   * @method createV1
   */
  @Post()
  createV1(
    @BaaSRequestHeaders() requestHeaders: IBaaSRequestHeaders,
    @Param('debitCardId', ParseUUIDPipe) debitCardId: string,
    @Body() createDebitCardsBlockDto: CreateDebitCardsBlockDto
  ) {
    return this.debitCardsBlocksService.create(
      debitCardId, createDebitCardsBlockDto, requestHeaders
    )
  }

  /**
   * @method findAllV1
   */
  @Get()
  findAllV1(
    @BaaSRequestHeaders() requestHeaders: IBaaSRequestHeaders,
    @Param('debitCardId', ParseUUIDPipe) debitCardId: string) 
  {
    return this.debitCardsBlocksService.findAll(debitCardId, requestHeaders)
  }

  /**
   * @method removeV1
   */
  @Delete(':blockId')
  removeV1(
    @BaaSRequestHeaders() requestHeaders: IBaaSRequestHeaders,
    @Param('debitCardId', ParseUUIDPipe) debitCardId: string,
    @Param('blockId',     ParseUUIDPipe) blockId: string
  ) {
    return this.debitCardsBlocksService.remove(debitCardId, blockId, requestHeaders);
  }
}
