//-----------------------------------------------------------------------------
// apps/baas-customer-service/src/customers/customers.module.ts
//-----------------------------------------------------------------------------
import { Module }               from '@nestjs/common'

import { CustomersService }     from './customers.service'
import { CustomersController }  from './customers.controller'

@Module({
  imports:      [],
  controllers:  [CustomersController],
  providers:    [CustomersService]
})
export class CustomersModule {}
