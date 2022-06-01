//-----------------------------------------------------------------------------
// apps/core-bank-simulator/src/customers/customers.module.ts
//-----------------------------------------------------------------------------
import { Module }                   from '@nestjs/common'
import { CustomersService }         from './customers.service'
import { CustomersController }      from './customers.controller'
import { CoreCustomersDBService }   from '../core-bank-db/core-customers-db.service'

@Module({
  controllers:  [CustomersController],
  providers:    [CustomersService, CoreCustomersDBService]
})
export class CustomersModule {}
