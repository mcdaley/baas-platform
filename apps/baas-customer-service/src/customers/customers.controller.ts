//-----------------------------------------------------------------------------
// apps/baas-customer-service/src/customers/customers.controller.ts
//-----------------------------------------------------------------------------
import { 
  Body,
  Controller, 
  Delete,
  Get, 
  Header, 
  HttpCode,
  Param,
  ParseUUIDPipe,
  Patch,  
  Post, 
  Put,
  UseInterceptors, 
}                                 from '@nestjs/common'

import { CustomersService }       from './customers.service'
import { CreateCustomerDto }      from './dto/create-customer.dto'
import { UpdateCustomerDto }      from './dto/update-customer.dto'

import { 
  IdempotencyKey, 
  TenantId,
}                                 from '@app/baas-errors'
import { 
  ICustomerListResponse, 
  ICustomerResponse 
}                                 from '@app/baas-interfaces'
import { WinstonLoggerService }   from '@app/winston-logger'

/**
 * @class CustomersController
 */
@Controller({path: 'customers', version: '1'})
export class CustomersController {
  constructor(
    private readonly customersService:  CustomersService, 
    private readonly logger:            WinstonLoggerService,
  ) {}

  /**
   * @method createV1
   */
  @Post()
  createV1(
    @TenantId()       tenantId:          string,
    @IdempotencyKey() idempotencyKey:    string,
    @Body()           createCustomerDto: CreateCustomerDto ) : Promise<ICustomerResponse>
  {
    this.logger.log({
      message:  `POST /v1/customers`, 
      body:     createCustomerDto,
    })
    const requestHeaders = {
      'Tenant-Id':       tenantId,
      'Idempotency-Key': idempotencyKey,
    }

    return this.customersService.create(createCustomerDto, requestHeaders)
  }

  /////////////////////////////////////////////////////////////////////////////
  // TODO: 07/18/2022
  // Remove the TenantId middleware and replace it with the TenantId
  // decorator. I need the Tenant-Id sent to the Core server, but I cannot 
  // add it to the body of GET and DELETE requests since they do not have
  // a request body, thus it makes sense to pass it to the core as a 
  // header.
  //
  // See if I can build the request header using values of decorators that 
  // I expect, e.g., Tenant-Id, Customer-Id, and Idempotency-Key.
  //
  // Take a look at mambu apis to see how it expects to see the branch_id.
  /////////////////////////////////////////////////////////////////////////////

  /**
   * @method findAllV1
   */
  @Get()
  findAllV1(@TenantId() tenantId: string) : Promise<ICustomerListResponse> {
    this.logger.log({
      message: `GET /v1/customers`
    })
    const requestHeaders = {
      'Tenant-Id': tenantId,
    }
    return this.customersService.findAll(requestHeaders);
  }

  /**
   * @method findOneV1
   */
  @Get(':customerId')
  findOneV1(
    @TenantId() tenantId: string,
    @Param('customerId', ParseUUIDPipe) customerId: string) : Promise<ICustomerResponse> 
  {
    this.logger.log({
      message: `GET /v1/customers/${customerId}`
    })
    const requestHeaders = {
      'Tenant-Id': tenantId,
    }
    return this.customersService.findOne(customerId, requestHeaders);
  }

  /**
   * @method updateV1
   */
  @Patch(':customerId')
  updateV1(
    @TenantId() tenantId: string,
    @IdempotencyKey() idempotencyKey: string,
    @Param('customerId', ParseUUIDPipe) customerId: string, 
    @Body() updateCustomerDto: UpdateCustomerDto) : Promise<ICustomerResponse>
  {
    this.logger.log({
      message: `PATCH /v1/customers/${customerId}`, 
      body:     updateCustomerDto
    })
    const requestHeaders = {
      'Tenant-Id':       tenantId,
      'Idempotency-Key': idempotencyKey,
    }
    return this.customersService.update(customerId, updateCustomerDto, requestHeaders)
  }

  /**
   * @method removeV1
   */
  @Delete(':customerId')
  @HttpCode(204)
  removeV1(
    @TenantId() tenantId: string,
    @Param('customerId', ParseUUIDPipe) customerId: string) 
  {
    this.logger.log({
      message: `DELETE /v1/customers/${customerId}`
    })
    const requestHeaders = {
      'Tenant-Id':       tenantId,
    }
    return this.customersService.remove(customerId, requestHeaders);
  }
}
