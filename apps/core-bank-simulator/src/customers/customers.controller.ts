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
  create(@Body() createCustomerDto: CreateCustomerDto) {
    this.logger.log(`POST /core/api/v1/customers, body= %o`, createCustomerDto)
    return this.customersService.create(createCustomerDto);
  }

  @Get()
  findAll() {
    this.logger.log(`GET /core/api/v1/customers`)
    return this.customersService.findAll();
  }

  @Get(':customerId')
  findOne(@Param('customerId', ParseUUIDPipe) customerId: string) {
    this.logger.log(`GET /core/api/v1/customers/${customerId}`)
    return this.customersService.findOne(customerId);
  }

  @Patch(':customerId')
  update(@Param('customerId', ParseUUIDPipe) customerId: string, @Body() updateCustomerDto: UpdateCustomerDto) {
    this.logger.log(`PATCH /core/api/v1/customers/${customerId}, body= %o`, updateCustomerDto)
    return this.customersService.update(customerId, updateCustomerDto);
  }

  @Delete(':customerId')
  @HttpCode(204)
  remove(@Param('customerId', ParseUUIDPipe) customerId: string) {
    this.logger.log(`DELETE /core/api/v1/customers/${customerId}`)
    return this.customersService.remove(customerId);
  }
}
