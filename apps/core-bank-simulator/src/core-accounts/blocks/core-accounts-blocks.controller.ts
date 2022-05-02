//---------------------------------------------------------------------------------------
// apps/core-bank-simulator/src/core-accounts/blocks/core-accounts-blocks.controller.ts
//---------------------------------------------------------------------------------------
import { 
  Body,
  Controller, 
  Delete,
  Get, 
  HttpCode,
  Param,   
  ParseUUIDPipe,
  Post,
}                                       from '@nestjs/common'

import { CoreAccountsBlocksService }    from './core-accounts-blocks.service'
import { CreateCoreAccountsBlockDto }   from './dto/create-core-accounts-block.dto'

import { IdempotencyKey }               from '@app/baas-errors'
import { WinstonLoggerService }         from '@app/winston-logger'

/**
 * @class CoreAccountsBlocksController
 */
@Controller({path: 'core-accounts/:accountId/core-blocks', version: '1'}) 
export class CoreAccountsBlocksController {
  constructor(
    private readonly accountBlocksService: CoreAccountsBlocksService,
    private readonly logger:               WinstonLoggerService
  ) {}

  /**
   * @method createV1
   */
  @Post()
  createV1(
    @Param('accountId', ParseUUIDPipe) accountId: string,
    @Body() createAccountBlockDto: CreateCoreAccountsBlockDto) 
  {
    this.logger.log(
      `POST /v1/core-accounts/${accountId}/core-blocks, createAccountBlockDto= %o`, 
      createAccountBlockDto
    )
    return this.accountBlocksService.create(accountId, createAccountBlockDto)
  }

  @Get()
  findAllV1(@Param('accountId', ParseUUIDPipe) accountId: string) {
    this.logger.log(`GET /v1/core-accounts/${accountId}/core-blocks`)
    return this.accountBlocksService.findAll(accountId)
  }

  @Delete(':accountBlockId')
  @HttpCode(204)
  removeV1(
    @Param('accountId',      ParseUUIDPipe) accountId:      string,
    @Param('accountBlockId', ParseUUIDPipe) accountBlockId: string
  ) {
    this.logger.log(`DELETE /v1/core-accounts/${accountId}/core-blocks/${accountBlockId}`)
    return this.accountBlocksService.remove(accountId, accountBlockId)
  }
} // end of class AccountBlocksController
