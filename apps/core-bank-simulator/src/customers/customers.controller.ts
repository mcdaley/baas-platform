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
import { WinstonLoggerService }     from '@app/winston-logger'

/**
 * @class CustomersController
 */
@Controller({path: 'customers', version: '1'})
export class CustomersController {
  constructor(
    private readonly customersService: CustomersService,
    private readonly logger:           WinstonLoggerService
  ) {}

  @Post()
  create(
    @TenantId()       tenantId:       string,
    @IdempotencyKey() idempotencyKey: string,
    @Body() createCustomerDto: CreateCustomerDto) {
    this.logger.log(`POST /core/api/v1/customers, body= %o`, createCustomerDto)
    return this.customersService.create(createCustomerDto, tenantId, idempotencyKey);
  }

  @Get()
  findAll(@TenantId() tenantId: string) {
    this.logger.log(`GET /core/api/v1/customers`)
    return this.customersService.findAll(tenantId);
  }

  @Get(':customerId')
  findOne(
    @TenantId() tenantId: string,
    @Param('customerId', ParseUUIDPipe) customerId: string) 
  {
    this.logger.log(`GET /core/api/v1/customers/${customerId}`)
    return this.customersService.findOne(customerId, tenantId);
  }

  @Patch(':customerId')
  update(
    @TenantId() tenantId: string,
    @Param('customerId', ParseUUIDPipe) customerId: string, 
    @Body() updateCustomerDto: UpdateCustomerDto) 
  {
    this.logger.log(`PATCH /core/api/v1/customers/${customerId}, body= %o`, updateCustomerDto)
    return this.customersService.update(customerId, updateCustomerDto, tenantId);
  }

  @Delete(':customerId')
  @HttpCode(204)
  remove(
    @TenantId() tenantId: string,
    @Param('customerId', ParseUUIDPipe) customerId: string) 
  {
    this.logger.log(`DELETE /core/api/v1/customers/${customerId}`)
    return this.customersService.remove(customerId, tenantId);
  }
}
