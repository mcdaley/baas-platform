//-----------------------------------------------------------------------------
// apps/baas-account-service/src/accounts/accounts.module.ts
//-----------------------------------------------------------------------------
import { Module }               from '@nestjs/common'

import { AccountsService }      from './accounts.service'
import { AccountsController }   from './accounts.controller'

@Module({
  controllers:  [AccountsController],
  providers:    [AccountsService]
})
export class AccountsModule {}
