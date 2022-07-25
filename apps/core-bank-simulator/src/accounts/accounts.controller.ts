//-----------------------------------------------------------------------------
// apps/baas-account-service/src/accounts/accounts.controller.ts
//-----------------------------------------------------------------------------
import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param,
  ParseUUIDPipe,
  Delete,
  HttpCode, 
}                                 from '@nestjs/common'

import { AccountsService }    from './accounts.service'
import { CreateAccountDto }   from './dto/create-core-account.dto'
import { UpdateAccountDto }   from './dto/update-core-account.dto'

import { WinstonLoggerService }   from '@app/winston-logger'
import { TenantId } from '@app/baas-errors'

/**
 * @class AccountsController
 */
@Controller({path: 'accounts', version: '1'})
export class AccountsController {
  constructor(
    private readonly accountsService: AccountsService,
    private readonly logger:          WinstonLoggerService
  ) {}

  @Post()
  createV1(
    @TenantId() tenantId: string,
    @Body() createAccountDto: CreateAccountDto) 
  {
    this.logger.log(`POST /core/api/v1/accounts`)
    return this.accountsService.create(createAccountDto, tenantId);
  }

  @Get()
  findAllV1() {
    this.logger.log(`GET /core/api/v1/accounts`)
    return this.accountsService.findAll();
  }

  @Get(':accountId')
  findOneV1(@Param('accountId', ParseUUIDPipe) accountId: string) {
    this.logger.log(`GET /core/api/v1/accounts/${accountId}`)
    return this.accountsService.findOne(accountId)
  }

  @Patch(':accountId')
  updateV1(
    @Param('accountId', ParseUUIDPipe) accountId: string, 
    @Body() updateAccountDto: UpdateAccountDto) 
  {
    this.logger.log(`PATCH /core/api/v1/accounts/${accountId}, body= %o`, updateAccountDto)
    return this.accountsService.update(accountId, updateAccountDto);
  }

  @Delete(':accountId')
  @HttpCode(204)
  removeV1(@Param('accountId', ParseUUIDPipe) accountId: string) {
    this.logger.log(`DELETE /core/api/v1/accounts/${accountId}`)
    return this.accountsService.remove(accountId);
  }
}
