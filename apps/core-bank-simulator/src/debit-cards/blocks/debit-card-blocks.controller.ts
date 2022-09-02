//----------------------------------------------------------------------------------
// apps/core-bank-simulator/src/debit-cards/blocks/debit-card-blocks.controller.ts
//----------------------------------------------------------------------------------
import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  ParseUUIDPipe,
  HttpCode,
  HttpStatus
}                                   from '@nestjs/common'

import { DebitCardBlocksService }   from './debit-card-blocks.service'
import { CreateDebitCardBlockDto }  from '../dto/create-debit-card-block.dto'

/**
 * @class DebitCardBlocksController
 */
@Controller({path: 'debit-cards/:debitCardId/blocks', version: '1'})
export class DebitCardBlocksController {
  /**
   * @constructor
   */
  constructor(
    private readonly debitCardBlocksService: DebitCardBlocksService,
  ) {}

  /**
   * @method createV1
   */
  @Post()
  createV1(
    @Param('debitCardId', ParseUUIDPipe) debitCardId: string,
    @Body() createDebitCardBlockDto: CreateDebitCardBlockDto) 
  {
     return this.debitCardBlocksService.create(debitCardId, createDebitCardBlockDto)
  }

  /**
   * @method findAllV1
   */
  @Get()
  findAllV1(@Param('debitCardId', ParseUUIDPipe) debitCardId: string) {
    return this.debitCardBlocksService.findAll(debitCardId)
  }
 
  /**
   * @method removeV1
   */
  @Delete(':debitCardBlockId')
  removeV1(
    @Param('debitCardId',      ParseUUIDPipe) debitCardId: string,
    @Param('debitCardBlockId', ParseUUIDPipe) debitCardBlockId: string
  ) {
    return this.debitCardBlocksService.remove(debitCardId, debitCardBlockId)
  }
}