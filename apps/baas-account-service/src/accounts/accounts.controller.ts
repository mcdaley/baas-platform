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

import { AccountsService }        from './accounts.service'
import { CreateAccountDto }       from './dto/create-account.dto'
import { UpdateAccountDto }       from './dto/update-account.dto'

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

  @Post()
  createV1(@Body() createAccountDto: CreateAccountDto) {
    this.logger.log(`POST /v1/accounts`)
    return this.accountsService.create(createAccountDto);
  }

  @Get()
  findAllV1() {
    return this.accountsService.findAll();
  }

  @Get(':accountId')
  findOneV1(@Param('accountId', ParseUUIDPipe) accountId: string) {
    this.logger.log(`GET /v1/accounts/${accountId}`)
    
    return this.accountsService.findOne(accountId);
  }

  @Patch(':accountId')
  updateV1(
    @Param('accountId', ParseUUIDPipe) accountId: string, 
    @Body() updateAccountDto: UpdateAccountDto) 
  {
    return this.accountsService.update(accountId, updateAccountDto);
  }

  @Delete(':accountId')
  @HttpCode(204)
  removeV1(@Param('accountId', ParseUUIDPipe) accountId: string) {
    return this.accountsService.remove(accountId);
  }
}
