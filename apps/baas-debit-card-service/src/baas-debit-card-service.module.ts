//-----------------------------------------------------------------------------
// apps/baas-debit-card-service/src/baas-debit-service.module.ts
//-----------------------------------------------------------------------------
import { Module }                         from '@nestjs/common'
import { ConfigModule }                   from '@nestjs/config'

import { configuration, validate }        from './config/configuration'
import { BaasDebitCardServiceController } from './baas-debit-card-service.controller'
import { BaasDebitCardServiceService }    from './baas-debit-card-service.service'

import { DebitCardsModule }               from './debit-cards/debit-cards.module'
import { DebitCardsReissueModule }        from './debit-cards-reissue/debit-cards-reissue.module'
import { DebitCardsBlocksModule }         from './debit-cards-blocks/debit-cards-blocks.module'

import { WinstonLoggerModule }            from '@app/winston-logger'

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
  ],
  controllers:  [BaasDebitCardServiceController],
  providers:    [BaasDebitCardServiceService],
})
export class BaasDebitCardServiceModule {}
