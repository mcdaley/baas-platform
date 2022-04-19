//-----------------------------------------------------------------------------
// apps/baas-debit-card-service/src/baas-debit-service.module.ts
//-----------------------------------------------------------------------------
import { Module }                         from '@nestjs/common'
import { ConfigModule }                   from '@nestjs/config'

import { configuration, validate }        from './config/configuration'
import { BaasDebitCardServiceController } from './baas-debit-card-service.controller'
import { BaasDebitCardServiceService }    from './baas-debit-card-service.service'

import { DebitCardsModule }         from './debit-cards/debit-cards.module'
import { DebitCardsLimitsModule }   from './debit-cards-limits/debit-cards-limits.module'
//* import { DebitCardsReissueModule }  from './debit-cards-reissue/debit-cards-reissue.module'
import { DebitCardsPinModule }      from './debit-cards-pin/debit-cards-pin.module'
import { DebitCardsActivateModule } from './debit-cards-activate/debit-cards-activate.module'
import { DebitCardsBlocksModule }   from './debit-cards-blocks/debit-cards-blocks.module'
import { DebitCardsCancelModule }   from './debit-cards-cancel/debit-cards-cancel.module'

import { WinstonLoggerModule }            from '@app/winston-logger';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:  `./.env.${process.env.NODE_ENV}`,
      isGlobal:     true,
      load:         [configuration],
      validate,
    }), 
    DebitCardsModule,
    DebitCardsLimitsModule,
    //* DebitCardsReissueModule,
    DebitCardsPinModule,
    DebitCardsActivateModule,
    DebitCardsBlocksModule,
    DebitCardsCancelModule,
    WinstonLoggerModule,
  ],
  controllers:  [BaasDebitCardServiceController],
  providers:    [BaasDebitCardServiceService],
})
export class BaasDebitCardServiceModule {}
