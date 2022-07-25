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
}                                 from '@app/baas-errors'
import { WinstonLoggerService }   from '@app/winston-logger'

/**
 * @class AccountBlocksController
 */
@Controller({path: 'accounts/:accountId/blocks', version: '1'}) 
export class AccountBlocksController {
  constructor(
    private readonly accountBlocksService: AccountBlocksService,
    private readonly logger:               WinstonLoggerService
  ) {}

  /**
   * @method createV1
   */
  @Post()
  createV1(
    @CustomerId()     customerId:     string,
    @TenantId()       tenantId:       string,
    @IdempotencyKey() idempotencyKey: string,
    @Param('accountId', ParseUUIDPipe) accountId: string,
    @Body() createAccountBlockDto: CreateAccountBlockDto) 
  {
    this.logger.log(
      `POST /v1/accounts/${accountId}/blocks, createAccountBlockDto= %o`, 
      createAccountBlockDto
    )
    return this.accountBlocksService.create(
      accountId, createAccountBlockDto, customerId, tenantId, idempotencyKey
    )
  }

  /**
   * @method findAllV1
   */
  @Get()
  findAllV1(
    @CustomerId() customerId: string,
    @TenantId()   tenantId:   string,
    @Param('accountId', ParseUUIDPipe) accountId: string) 
  {
    this.logger.log(`GET /v1/accounts/${accountId}/blocks`)
    return this.accountBlocksService.findAll(accountId, customerId, tenantId)
  }

  @Delete(':accountBlockId')
  removeV1(
    @CustomerId() customerId: string,
    @TenantId()   tenantId:   string,
    @Param('accountId',      ParseUUIDPipe) accountId:      string,
    @Param('accountBlockId', ParseUUIDPipe) accountBlockId: string) 
  {
    this.logger.log(`DELETE /v1/accounts/${accountId}/blocks/${accountBlockId}`)
    return this.accountBlocksService.remove(accountId, accountBlockId, customerId, tenantId)
  }
} // end of class AccountBlocksController
