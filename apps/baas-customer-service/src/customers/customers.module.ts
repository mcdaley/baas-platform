//-----------------------------------------------------------------------------
// apps/baas-customer-service/src/customers/customers.module.ts
//-----------------------------------------------------------------------------
import { Module }               from '@nestjs/common'
//* import { HttpModule }           from '@nestjs/axios'

import { CustomersService }     from './customers.service'
import { CustomersController }  from './customers.controller'

//* import { MambuCustomerService } from '@app/core-simulator'

@Module({
  imports:      [],
  controllers:  [CustomersController],
  providers:    [CustomersService]
})
export class CustomersModule {}
