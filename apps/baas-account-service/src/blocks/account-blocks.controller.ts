//-----------------------------------------------------------------------------
// apps/baas-account-service/src/blocks/account-blocks.controller.ts
//-----------------------------------------------------------------------------
import { 
  Body,
  Controller, 
  Delete,
  Get, 
  HttpCode,
  Param,   
  ParseUUIDPipe,
  Post,
}                                 from '@nestjs/common'

import { AccountBlocksService }   from './account-blocks.service'
import { CreateAccountBlockDto }  from './dto/create-account-block.dto'

import { 
  CustomerId, 
  IdempotencyKey, 
  TenantId, 
  BaaSRequestHeaders,
  IBaaSRequestHeaders,
}                                 from '@app/baas-errors'

/**
 * @class AccountBlocksController
 */
@Controller({path: 'accounts/:accountId/blocks', version: '1'}) 
export class AccountBlocksController {
  constructor(
    private readonly accountBlocksService: AccountBlocksService,
  ) {}

  /**
   * @method createV1
   */
  @Post()
  createV1(
    @BaaSRequestHeaders() requestHeaders: IBaaSRequestHeaders,
    @Param('accountId', ParseUUIDPipe) accountId: string,
    @Body() createAccountBlockDto: CreateAccountBlockDto) 
  {
    return this.accountBlocksService.create(
      accountId, createAccountBlockDto, requestHeaders
    )
  }

  /**
   * @method findAllV1
   */
  @Get()
  findAllV1(
    @BaaSRequestHeaders() requestHeaders: IBaaSRequestHeaders,
    @Param('accountId', ParseUUIDPipe) accountId: string) 
  {
    return this.accountBlocksService.findAll(accountId, requestHeaders)
  }

  @Delete(':accountBlockId')
  removeV1(
    @BaaSRequestHeaders() requestHeaders: IBaaSRequestHeaders,
    @Param('accountId',      ParseUUIDPipe) accountId:      string,
    @Param('accountBlockId', ParseUUIDPipe) accountBlockId: string) 
  {
    return this.accountBlocksService.remove(accountId, accountBlockId, requestHeaders)
  }
} // end of class AccountBlocksController
