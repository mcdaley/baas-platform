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

import { TenantId }           from '@app/baas-errors'

/**
 * @class AccountsController
 */
@Controller({path: 'accounts', version: '1'})
export class AccountsController {
  constructor(
    private readonly accountsService: AccountsService,
  ) {}

  @Post()
  createV1(
    @TenantId() tenantId: string,
    @Body() createAccountDto: CreateAccountDto) 
  {
    return this.accountsService.create(createAccountDto, tenantId);
  }

  @Get()
  findAllV1() {
    return this.accountsService.findAll();
  }

  @Get(':accountId')
  findOneV1(@Param('accountId', ParseUUIDPipe) accountId: string) {
    return this.accountsService.findOne(accountId)
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
