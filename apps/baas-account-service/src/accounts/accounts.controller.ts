//-----------------------------------------------------------------------------
// apps/baas-account-service/src/accounts/accounts.controller.ts
//-----------------------------------------------------------------------------
import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Head,
  Patch, 
  Param,
  ParseUUIDPipe,
  Delete,
  HttpCode, 
}                                 from '@nestjs/common'

import { AccountsService }        from './accounts.service'
import { CreateAccountDto }       from './dto/create-account.dto'
import { UpdateAccountDto }       from './dto/update-account.dto'

import { 
  TenantId,
  CustomerId,
  IdempotencyKey, 
}                                 from '@app/baas-errors'
import { WinstonLoggerService }   from '@app/winston-logger'

/**
 * @class AccountsController
 */
@Controller({path: 'accounts', version: '1'})
export class AccountsController {
  constructor(
    private readonly accountsService: AccountsService,
    private readonly logger:          WinstonLoggerService
  ) {}

  /**
   * @method createV1
   */
  @Post()
  createV1(
    @CustomerId()     customerId:       string,
    @TenantId()       tenantId:         string,
    @IdempotencyKey() idempotencyKey:   string,
    @Body()           createAccountDto: CreateAccountDto) 
  {
    this.logger.log(`POST /v1/accounts`)
    return this.accountsService.create(createAccountDto, customerId, tenantId, idempotencyKey);
  }

  /**
   * @method findAllV1
   */
  @Get()
  findAllV1(
    @CustomerId() customerId: string,
    @TenantId()   tenantId:   string) 
  {
    return this.accountsService.findAll(customerId, tenantId);
  }

  /**
   * @method findOneV1
   */
  @Get(':accountId')
  findOneV1(
    @CustomerId() customerId: string,
    @TenantId()   tenantId:   string,
    @Param('accountId', ParseUUIDPipe) accountId: string) 
  {
    this.logger.log(`GET /v1/accounts/${accountId}`)
    
    return this.accountsService.findOne(accountId, customerId, tenantId);
  }

  /**
   * @method updateV1
   */
  @Patch(':accountId')
  updateV1(
    @CustomerId()     customerId:     string,
    @TenantId()       tenantId:       string,
    @IdempotencyKey() idempotencyKey: string,
    @Param('accountId', ParseUUIDPipe) accountId: string,
    @Body() updateAccountDto: UpdateAccountDto) 
  {
    this.logger.log(`PATCH /v1/accounts/${accountId}, body= %o`, updateAccountDto)
    return this.accountsService.update(
      accountId, updateAccountDto, customerId, tenantId, idempotencyKey
    )
  }

  /**
   * @method removeV1
   */
  @Delete(':accountId')
  @HttpCode(204)
  removeV1(
    @CustomerId() customerId: string,
    @TenantId()   tenantId:   string,
    @Param('accountId', ParseUUIDPipe) accountId: string) 
  {
    this.logger.log(`DELETE /v1/accounts/${accountId}`)
    return this.accountsService.remove(accountId, customerId, tenantId)
  }
}
