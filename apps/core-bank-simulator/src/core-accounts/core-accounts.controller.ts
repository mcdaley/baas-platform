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

import { CoreAccountsService }    from './core-accounts.service'
import { CreateCoreAccountDto }   from './dto/create-core-account.dto'
import { UpdateCoreAccountDto }   from './dto/update-core-account.dto'

import { WinstonLoggerService }   from '@app/winston-logger'

/**
 * @class AccountsController
 */
@Controller({path: 'core-accounts', version: '1'})
export class CoreAccountsController {
  constructor(
    private readonly accountsService: CoreAccountsService,
    private readonly logger:          WinstonLoggerService
  ) {}

  @Post()
  createV1(@Body() createAccountDto: CreateCoreAccountDto) {
    this.logger.log(`POST /v1/accounts`)
    return this.accountsService.create(createAccountDto);
  }

  @Get()
  findAllV1() {
    this.logger.log(`GET /v1/accounts`)
    return this.accountsService.findAll();
  }

  @Get(':accountId')
  findOneV1(@Param('accountId', ParseUUIDPipe) accountId: string) {
    this.logger.log(`GET /v1/accounts/${accountId}`)
    return this.accountsService.findOne(accountId)
  }

  @Patch(':accountId')
  updateV1(
    @Param('accountId', ParseUUIDPipe) accountId: string, 
    @Body() updateAccountDto: UpdateCoreAccountDto) 
  {
    this.logger.log(`PATCH /v1/accounts/${accountId}, body= %o`, updateAccountDto)
    return this.accountsService.update(accountId, updateAccountDto);
  }

  @Delete(':accountId')
  @HttpCode(204)
  removeV1(@Param('accountId', ParseUUIDPipe) accountId: string) {
    this.logger.log(`DELETE /v1/accounts/${accountId}`)
    return this.accountsService.remove(accountId);
  }
}
