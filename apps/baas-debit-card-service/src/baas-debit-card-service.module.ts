//-----------------------------------------------------------------------------
// apps/baas-debit-card-service/src/baas-debit-service.module.ts
//-----------------------------------------------------------------------------
import { Module }                         from '@nestjs/common'
import { ConfigModule }                   from '@nestjs/config'
import { APP_INTERCEPTOR }                from '@nestjs/core'

import { configuration, validate }        from './config/configuration'
import { BaasDebitCardServiceController } from './baas-debit-card-service.controller'
import { BaasDebitCardServiceService }    from './baas-debit-card-service.service'

import { DebitCardsModule }               from './debit-cards/debit-cards.module'
import { DebitCardsReissueModule }        from './debit-cards-reissue/debit-cards-reissue.module'
import { DebitCardsBlocksModule }         from './blocks/debit-cards-blocks.module'

import { 
  WinstonLoggerModule,
  WinstonLoggerInterceptor,
}                                         from '@app/winston-logger'
import { 
  RequestIdAsyncLocalStorageModule, 
  RequestIdInterceptor, 
}                                         from '@app/baas-async-local-storage'

/**
 * @class BaasDebitCardServiceModule
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:  `./.env.${process.env.NODE_ENV}`,
      isGlobal:     true,
      load:         [configuration],
      validate,
    }), 
    DebitCardsModule,
    DebitCardsReissueModule,
    DebitCardsBlocksModule,
    WinstonLoggerModule,
    RequestIdAsyncLocalStorageModule.forRoot(),
  ],
  controllers:  [BaasDebitCardServiceController],
  providers:    [
    BaasDebitCardServiceService,
    {
      provide:  APP_INTERCEPTOR,
      useClass: RequestIdInterceptor
    },
    { 
      provide:  APP_INTERCEPTOR,
      useClass: WinstonLoggerInterceptor
    }
  ],
})
export class BaasDebitCardServiceModule {}
