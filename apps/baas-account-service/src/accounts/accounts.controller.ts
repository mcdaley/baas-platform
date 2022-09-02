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

/**
 * @class AccountsController
 */
@Controller({path: 'accounts', version: '1'})
export class AccountsController {
  constructor(
    private readonly accountsService: AccountsService,
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
    return this.accountsService.remove(accountId, customerId, tenantId)
  }
}
