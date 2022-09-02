//---------------------------------------------------------------------------------------
// apps/core-bank-simulator/src/accounts/blocks/accounts-blocks.controller.ts
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

import { AccountsBlocksService }        from './accounts-blocks.service'
import { CreateAccountsBlockDto }       from '../dto/create-accounts-block.dto'

import { IdempotencyKey }               from '@app/baas-errors'

/**
 * @class AccountsBlocksController
 */
@Controller({path: 'accounts/:accountId/blocks', version: '1'}) 
export class AccountsBlocksController {
  constructor(
    private readonly accountBlocksService: AccountsBlocksService,
  ) {}

  /**
   * @method createV1
   */
  @Post()
  createV1(
    @Param('accountId', ParseUUIDPipe) accountId: string,
    @Body() createAccountBlockDto: CreateAccountsBlockDto) 
  {
    return this.accountBlocksService.create(accountId, createAccountBlockDto)
  }

  @Get()
  findAllV1(@Param('accountId', ParseUUIDPipe) accountId: string) {
    return this.accountBlocksService.findAll(accountId)
  }

  @Delete(':accountBlockId')
  @HttpCode(204)
  removeV1(
    @Param('accountId',      ParseUUIDPipe) accountId:      string,
    @Param('accountBlockId', ParseUUIDPipe) accountBlockId: string
  ) {
    return this.accountBlocksService.remove(accountId, accountBlockId)
  }
} // end of class AccountBlocksController
