//-----------------------------------------------------------------------------
// apps/core-bank-simulator/src/accounts/accounts.module.ts
//-----------------------------------------------------------------------------
import { Module }                 from '@nestjs/common'

import { AccountsService }        from './accounts.service'
import { AccountsController }     from './accounts.controller'
import { CoreAccountsDBService }  from '../core-bank-db/core-accounts-db.service'

@Module({
  controllers:  [AccountsController],
  providers:    [AccountsService, CoreAccountsDBService]
})
export class AccountsModule {}
