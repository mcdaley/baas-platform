//-----------------------------------------------------------------------------
// apps/baas-account-service/src/accounts/accounts.module.ts
//-----------------------------------------------------------------------------
import { Module }               from '@nestjs/common'

import { AccountsService }      from './accounts.service'
import { AccountsController }   from './accounts.controller'

import { CoreSimulatorService } from '@app/core-simulator'

@Module({
  controllers:  [AccountsController],
  providers:    [AccountsService, CoreSimulatorService]
})
export class AccountsModule {}
