//-----------------------------------------------------------------------------
// apps/core-bank-simulator/src/core-customers/core-customers.module.ts
//-----------------------------------------------------------------------------
import { Module }                   from '@nestjs/common'
import { CoreCustomersService }     from './core-customers.service'
import { CoreCustomersController }  from './core-customers.controller'
import { CoreCustomersDBService }   from '../../core-bank-db/core-customers-db.service'

@Module({
  controllers:  [CoreCustomersController],
  providers:    [CoreCustomersService, CoreCustomersDBService]
})
export class CoreCustomersModule {}
