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
  TenantId 
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
    @TenantId()       tenantId:       string,
    @IdempotencyKey() idempotencyKey: string,
    @Body() createCustomerDto: CreateCustomerDto) {
    return this.customersService.create(createCustomerDto, tenantId, idempotencyKey);
  }

  @Get()
  findAll(@TenantId() tenantId: string) {
    return this.customersService.findAll(tenantId);
  }

  @Get(':customerId')
  findOne(
    @TenantId() tenantId: string,
    @Param('customerId', ParseUUIDPipe) customerId: string) 
  {
    return this.customersService.findOne(customerId, tenantId);
  }

  @Patch(':customerId')
  update(
    @TenantId() tenantId: string,
    @Param('customerId', ParseUUIDPipe) customerId: string, 
    @Body() updateCustomerDto: UpdateCustomerDto) 
  {
    return this.customersService.update(customerId, updateCustomerDto, tenantId);
  }

  @Delete(':customerId')
  @HttpCode(204)
  remove(
    @TenantId() tenantId: string,
    @Param('customerId', ParseUUIDPipe) customerId: string) 
  {
    return this.customersService.remove(customerId, tenantId);
  }
}
