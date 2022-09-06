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
}                                 from '@nestjs/common'

import { CustomersService }       from './customers.service'
import { CreateCustomerDto }      from './dto/create-customer.dto'
import { UpdateCustomerDto }      from './dto/update-customer.dto'

import { 
  BaaSRequestHeaders,
  IBaaSRequestHeaders,
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
    @BaaSRequestHeaders() requestHeaders: IBaaSRequestHeaders,
    @Body()               createCustomerDto: CreateCustomerDto ) : Promise<ICustomerResponse>
  {
    return this.customersService.create(createCustomerDto, requestHeaders)
  }

  /**
   * @method findAllV1
   */
  @Get()
  findAllV1(
    @BaaSRequestHeaders() requestHeaders: IBaaSRequestHeaders) : Promise<ICustomerListResponse> 
  {
    return this.customersService.findAll(requestHeaders);
  }

  /**
   * @method findOneV1
   */
  @Get(':customerId')
  findOneV1(
    @BaaSRequestHeaders() requestHeaders: IBaaSRequestHeaders,
    @Param('customerId', ParseUUIDPipe) customerId: string) : Promise<ICustomerResponse> 
  {
    return this.customersService.findOne(customerId, requestHeaders);
  }

  /**
   * @method updateV1
   */
  @Patch(':customerId')
  updateV1(
    @BaaSRequestHeaders() requestHeaders: IBaaSRequestHeaders,
    @Param('customerId', ParseUUIDPipe) customerId: string, 
    @Body() updateCustomerDto: UpdateCustomerDto) : Promise<ICustomerResponse>
  {    
    return this.customersService.update(customerId, updateCustomerDto, requestHeaders)
  }

  /**
   * @method removeV1
   */
  @Delete(':customerId')
  @HttpCode(204)
  removeV1(
    @BaaSRequestHeaders() requestHeaders: IBaaSRequestHeaders,
    @Param('customerId', ParseUUIDPipe) customerId: string) 
  {
    return this.customersService.remove(customerId, requestHeaders);
  }
}
