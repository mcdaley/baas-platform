//-----------------------------------------------------------------------------
// apps/baas-account-service/src/accounts/accounts.module.ts
//-----------------------------------------------------------------------------
import { Module }               from '@nestjs/common'

import { AccountsService }      from './accounts.service'
import { AccountsController }   from './accounts.controller'
import { CustomersService }     from '../customers/customers.service'

@Module({
  controllers:  [AccountsController],
  providers:    [AccountsService, CustomersService]
})
export class AccountsModule {}
