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
import { DebitCardBlock }           from '../entities/debit-card-block.entity'

import { WinstonLoggerService }     from '@app/winston-logger'

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
    private readonly logger:                 WinstonLoggerService,
  ) {}

  /**
   * @method createV1
   */
  @Post()
  createV1(
    @Param('debitCardId', ParseUUIDPipe) debitCardId: string,
    @Body() createDebitCardBlockDto: CreateDebitCardBlockDto) 
  {
     this.logger.log(
       `POST /core/api/v1/debit-cards/${debitCardId}/blocks, createDebitCardBlockDto= %o`, 
       createDebitCardBlockDto
     )
     return this.debitCardBlocksService.create(debitCardId, createDebitCardBlockDto)
  }

  /**
   * @method findAllV1
   */
  @Get()
  findAllV1(@Param('debitCardId', ParseUUIDPipe) debitCardId: string) {
    this.logger.log(`GET /core/api/v1/debit-cards/${debitCardId}/debitCardBlocks`)
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
    this.logger.log(`DELETE /core/api/v1/debit-cards/${debitCardId}/blocks/${debitCardBlockId}`)
    return this.debitCardBlocksService.remove(debitCardId, debitCardBlockId)
  }
}