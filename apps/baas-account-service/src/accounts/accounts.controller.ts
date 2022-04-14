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
}                             from '@nestjs/common'

import { AccountsService }    from './accounts.service'
import { CreateAccountDto }   from './dto/create-account.dto'
import { UpdateAccountDto }   from './dto/update-account.dto'

/**
 * @class AccountsController
 */
@Controller({path: 'accounts', version: '1'})
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post()
  createV1(@Body() createAccountDto: CreateAccountDto) {
    return this.accountsService.create(createAccountDto);
  }

  @Get()
  findAllV1() {
    return this.accountsService.findAll();
  }

  @Get(':accountId')
  findOneV1(@Param('accountId', ParseUUIDPipe) accountId: string) {
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
  removeV1(@Param('accountId', ParseUUIDPipe) accountId: string) {
    return this.accountsService.remove(accountId);
  }
}
