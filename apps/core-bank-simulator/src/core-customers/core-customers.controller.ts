//-----------------------------------------------------------------------------
// apps/core-bank-simulator/src/core-customers/core-customers.controller.ts
//-----------------------------------------------------------------------------
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

import { CoreCustomersService }     from './core-customers.service'
import { CreateCoreCustomerDto }    from './dto/create-core-customer.dto'
import { UpdateCoreCustomerDto }    from './dto/update-core-customer.dto'

import { WinstonLoggerService }     from '@app/winston-logger'

/**
 * @class CoreCustomersController
 */
@Controller({path: 'core-customers', version: '1'})
export class CoreCustomersController {
  constructor(
    private readonly customersService: CoreCustomersService,
    private readonly logger:           WinstonLoggerService
  ) {}

  @Post()
  create(@Body() createCoreCustomerDto: CreateCoreCustomerDto) {
    this.logger.log(`POST /v1/core-customers, body= %o`, createCoreCustomerDto)
    return this.customersService.create(createCoreCustomerDto);
  }

  @Get()
  findAll() {
    this.logger.log(`GET /v1/core-customers`)
    return this.customersService.findAll();
  }

  @Get(':customerId')
  findOne(@Param('customerId', ParseUUIDPipe) customerId: string) {
    this.logger.log(`GET /v1/core-customers/${customerId}`)
    return this.customersService.findOne(customerId);
  }

  @Patch(':customerId')
  update(@Param('customerId', ParseUUIDPipe) customerId: string, @Body() updateCoreCustomerDto: UpdateCoreCustomerDto) {
    this.logger.log(`PATCH /v1/core-customers/${customerId}, body= %o`, updateCoreCustomerDto)
    return this.customersService.update(customerId, updateCoreCustomerDto);
  }

  @Delete(':customerId')
  @HttpCode(204)
  remove(@Param('customerId', ParseUUIDPipe) customerId: string) {
    this.logger.log(`DELETE /v1/core-customers/${customerId}`)
    return this.customersService.remove(customerId);
  }
}
