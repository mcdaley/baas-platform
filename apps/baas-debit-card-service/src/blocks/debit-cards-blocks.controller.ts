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
  IdempotencyKey 
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
    @CustomerId()     customerId:     string,
    @TenantId()       tenantId:       string,
    @IdempotencyKey() idempotencyKey: string,
    @Param('debitCardId', ParseUUIDPipe) debitCardId: string,
    @Body() createDebitCardsBlockDto: CreateDebitCardsBlockDto
  ) {
    return this.debitCardsBlocksService.create(
      debitCardId, createDebitCardsBlockDto, customerId, tenantId, idempotencyKey
    )
  }

  /**
   * @method findAllV1
   */
  @Get()
  findAllV1(
    @CustomerId() customerId: string,
    @TenantId()   tenantId:   string,
    @Param('debitCardId', ParseUUIDPipe) debitCardId: string) 
  {
    return this.debitCardsBlocksService.findAll(debitCardId, customerId, tenantId)
  }

  /**
   * @method removeV1
   */
  @Delete(':blockId')
  removeV1(
    @CustomerId() customerId: string,
    @TenantId()   tenantId:   string,
    @Param('debitCardId', ParseUUIDPipe) debitCardId: string,
    @Param('blockId',     ParseUUIDPipe) blockId: string
  ) {
    return this.debitCardsBlocksService.remove(debitCardId, blockId, customerId, tenantId);
  }
}
