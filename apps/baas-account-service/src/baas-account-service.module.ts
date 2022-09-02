//-----------------------------------------------------------------------------
// apps/baas-account-service/src/bass-account-service.module.ts
//-----------------------------------------------------------------------------
import { Module }                         from '@nestjs/common'
import { ConfigModule }                   from '@nestjs/config'
import { APP_INTERCEPTOR }                from '@nestjs/core'

import { configuration, validate  }       from './config/configuration'
import { BaasAccountServiceController }   from './baas-account-service.controller'
import { BaasAccountServiceService }      from './baas-account-service.service'

import { AccountsModule }                 from './accounts/accounts.module'
import { ParticipantsModule }             from './participants/participants.module'
import { AccountBlocksModule }            from './blocks/account-blocks.module'

import { 
  WinstonLoggerModule,
  WinstonLoggerInterceptor, 
}                                         from '@app/winston-logger'

@Module({
  imports:      [
    ConfigModule.forRoot({
      envFilePath:  `./.env.${process.env.NODE_ENV}`,
      isGlobal:     true,
      load:         [configuration],
      validate,
    }),
    AccountsModule,
    ParticipantsModule,
    AccountBlocksModule,
    WinstonLoggerModule,
  ],
  controllers:  [BaasAccountServiceController],
  providers:    [
    BaasAccountServiceService,
    { 
      provide:  APP_INTERCEPTOR,
      useClass: WinstonLoggerInterceptor
    }
  ],
})
export class BaasAccountServiceModule {}
