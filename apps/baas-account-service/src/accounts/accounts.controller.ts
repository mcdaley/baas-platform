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
  BaaSRequestHeaders,
  IBaaSRequestHeaders,
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
    @BaaSRequestHeaders() requestHeaders:   IBaaSRequestHeaders,
    @Body()               createAccountDto: CreateAccountDto) 
  {
    return this.accountsService.create(createAccountDto, requestHeaders);
  }

  /**
   * @method findAllV1
   */
  @Get()
  findAllV1(
    @BaaSRequestHeaders() requestHeaders: IBaaSRequestHeaders) 
  {
    return this.accountsService.findAll(requestHeaders);
  }

  /**
   * @method findOneV1
   */
  @Get(':accountId')
  findOneV1(
    @BaaSRequestHeaders() requestHeaders: IBaaSRequestHeaders,
    @Param('accountId', ParseUUIDPipe) accountId: string) 
  { 
    return this.accountsService.findOne(accountId, requestHeaders);
  }

  /**
   * @method updateV1
   */
  @Patch(':accountId')
  updateV1(
    @BaaSRequestHeaders() requestHeaders: IBaaSRequestHeaders,
    @Param('accountId', ParseUUIDPipe) accountId: string,
    @Body() updateAccountDto: UpdateAccountDto) 
  {
    return this.accountsService.update(
      accountId, updateAccountDto, requestHeaders
    )
  }

  /**
   * @method removeV1
   */
  @Delete(':accountId')
  @HttpCode(204)
  removeV1(
    @BaaSRequestHeaders() requestHeaders: IBaaSRequestHeaders,
    @Param('accountId', ParseUUIDPipe) accountId: string) 
  {
    return this.accountsService.remove(accountId, requestHeaders)
  }
}
