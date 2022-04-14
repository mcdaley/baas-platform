//-----------------------------------------------------------------------------
// apps/baas-account-service/src/bass-account-service.module.ts
//-----------------------------------------------------------------------------
import { Module }                         from '@nestjs/common'

import { BaasAccountServiceController }   from './baas-account-service.controller'
import { BaasAccountServiceService }      from './baas-account-service.service'

import { AccountsModule }                 from './accounts/accounts.module'

@Module({
  imports:      [
    AccountsModule,
  ],
  controllers:  [BaasAccountServiceController],
  providers:    [BaasAccountServiceService],
})
export class BaasAccountServiceModule {}
