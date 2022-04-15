//-----------------------------------------------------------------------------
// apps/baas-account-service/src/bass-account-service.module.ts
//-----------------------------------------------------------------------------
import { Module }                         from '@nestjs/common'
import { ConfigModule }                   from '@nestjs/config'

import { configuration, validate  }       from './config/configuration'
import { BaasAccountServiceController }   from './baas-account-service.controller'
import { BaasAccountServiceService }      from './baas-account-service.service'

import { AccountsModule }                 from './accounts/accounts.module'

@Module({
  imports:      [
    ConfigModule.forRoot({
      envFilePath:  `./.env.${process.env.NODE_ENV}`,
      isGlobal:     true,
      load:         [configuration],
      validate,
    }),
    AccountsModule,
  ],
  controllers:  [BaasAccountServiceController],
  providers:    [BaasAccountServiceService],
})
export class BaasAccountServiceModule {}
