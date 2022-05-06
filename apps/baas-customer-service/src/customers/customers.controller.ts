//-----------------------------------------------------------------------------
// apps/baas-customer-service/src/customers/customers.controller.ts
//-----------------------------------------------------------------------------
import { 
  Body,
  Controller, 
  Delete,
  Get, 
  HttpCode,
  Param,
  ParseUUIDPipe,
  Patch,  
  Post, 
  Put, 
}                                 from '@nestjs/common'

import { CustomersService }       from './customers.service'
import { CreateCustomerDto }      from './dto/create-customer.dto'
import { UpdateCustomerDto }      from './dto/update-customer.dto'

import { WinstonLoggerService }   from '@app/winston-logger'
import { IdempotencyKey }         from '@app/baas-errors'
import { ICustomerListResponse, ICustomerResponse } from '@app/baas-interfaces'

/**
 * @class CustomersController
 */
@Controller({path: 'customers', version: '1'})
export class CustomersController {
  constructor(
    private readonly customersService:  CustomersService, 
    private readonly logger:            WinstonLoggerService,
  ) {}

  @Post()
  createV1(
    @IdempotencyKey() idempotencyKey: string,
    @Body() createCustomerDto: CreateCustomerDto ) : Promise<ICustomerResponse>
  {
    this.logger.log(`POST /v1/customers, createCustomerDto= %o`, createCustomerDto)
    this.logger.log(`IdempotencyKey= %s`, idempotencyKey)

    return this.customersService.create(createCustomerDto)
  }

  @Get()
  findAllV1() : Promise<ICustomerListResponse> {
    this.logger.log(`GET /v1/customers`)
    return this.customersService.findAll();
  }

  @Get(':customerId')
  findOneV1(@Param('customerId', ParseUUIDPipe) customerId: string) : Promise<ICustomerResponse> {
    this.logger.log(`GET /v1/customers/${customerId}`)
    return this.customersService.findOne(customerId);
  }

  @Patch(':customerId')
  updateV1(
    @IdempotencyKey() idempotencyKey: string,
    @Param('customerId', ParseUUIDPipe) customerId: string, 
    @Body() updateCustomerDto: UpdateCustomerDto) : Promise<ICustomerResponse>
  {
    this.logger.log(`PATCH /v1/customers/${customerId}, updateCustomerDto= %o`, updateCustomerDto)
    return this.customersService.update(customerId, updateCustomerDto);
  }

  @Delete(':customerId')
  @HttpCode(204)
  removeV1(@Param('customerId', ParseUUIDPipe) customerId: string) {
    this.logger.log(`DELETE /v1/customers/${customerId}`)
    return this.customersService.remove(customerId);
  }
}
