//--------------------------------------------------------------------------------------
// apps/core-bank-simulator/src/customers/customers.controller.ts
//--------------------------------------------------------------------------------------
import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete,
  HttpCode,
  ParseUUIDPipe, 
}                                   from '@nestjs/common'

import { CustomersService }         from './customers.service'
import { CreateCustomerDto }        from './dto/create-customer.dto'
import { UpdateCustomerDto }        from './dto/update-customer.dto'

import { 
  IdempotencyKey, 
  TenantId,
  BaaSRequestHeaders,
  IBaaSRequestHeaders,
}                                   from '@app/baas-errors'

/**
 * @class CustomersController
 */
@Controller({path: 'customers', version: '1'})
export class CustomersController {
  constructor(
    private readonly customersService: CustomersService,
  ) {}

  @Post()
  create(
    @BaaSRequestHeaders() requestHeaders: IBaaSRequestHeaders,
    @Body() createCustomerDto: CreateCustomerDto) 
  {
    return this.customersService.create(createCustomerDto, requestHeaders);
  }

  @Get()
  findAll(@BaaSRequestHeaders() requestHeaders: IBaaSRequestHeaders) {
    return this.customersService.findAll(requestHeaders);
  }

  @Get(':customerId')
  findOne(
    @BaaSRequestHeaders() requestHeaders: IBaaSRequestHeaders,
    @Param('customerId', ParseUUIDPipe) customerId: string) 
  {
    return this.customersService.findOne(customerId, requestHeaders);
  }

  @Patch(':customerId')
  update(
    @BaaSRequestHeaders() requestHeaders: IBaaSRequestHeaders,
    @Param('customerId', ParseUUIDPipe) customerId: string, 
    @Body() updateCustomerDto: UpdateCustomerDto) 
  {
    return this.customersService.update(customerId, updateCustomerDto, requestHeaders);
  }

  @Delete(':customerId')
  @HttpCode(204)
  remove(
    @BaaSRequestHeaders() requestHeaders: IBaaSRequestHeaders,
    @Param('customerId', ParseUUIDPipe) customerId: string) 
  {
    return this.customersService.remove(customerId, requestHeaders);
  }
}
