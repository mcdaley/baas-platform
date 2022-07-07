//-----------------------------------------------------------------------------
// apps/core-bank-simulator/src/customers/customers.module.ts
//-----------------------------------------------------------------------------
import { Module }                   from '@nestjs/common'
import { TypeOrmModule }            from '@nestjs/typeorm'

import { CustomersService }         from './customers.service'
import { CustomersController }      from './customers.controller'
import { Customer }                 from './entities/customer.entity'
import { Address }                  from './entities/address.entity'
import { CoreCustomersDBService }   from '../core-bank-db/core-customers-db.service'

@Module({
  imports:      [TypeOrmModule.forFeature([Customer, Address])],
  controllers:  [CustomersController],
  providers:    [CustomersService, CoreCustomersDBService]
})
export class CustomersModule {}
