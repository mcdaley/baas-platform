//-----------------------------------------------------------------------------
// apps/core-bank-simulator/src/core-accounts/core-accounts.module.ts
//-----------------------------------------------------------------------------
import { Module }                 from '@nestjs/common'

import { CoreAccountsService }    from './core-accounts.service'
import { CoreAccountsController } from './core-accounts.controller'
import { CoreAccountsDBService }  from '../core-bank-db/core-accounts-db.service'

@Module({
  controllers:  [CoreAccountsController],
  providers:    [CoreAccountsService, CoreAccountsDBService]
})
export class CoreAccountsModule {}
