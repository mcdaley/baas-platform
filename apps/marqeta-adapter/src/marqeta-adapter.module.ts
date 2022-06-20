//-----------------------------------------------------------------------------
import { CardsModule } from './cards/cards.module';
// apps/marqeta-adapter.module.ts
//-----------------------------------------------------------------------------
import { Module }                         from '@nestjs/common'
import { ConfigModule }                   from '@nestjs/config'

import { configuration, validate  }       from './config/marqeta-adapter.config'
import { MarqetaAdapterController }       from './marqeta-adapter.controller'
import { MarqetaAdapterService }          from './marqeta-adapter.service'
import { CardProductsModule }             from './card-products/card-products.module'
import { ProgramFundingSourcesModule }    from './funding-sources/program/program-funding-sources.module'
import { UsersModule }                    from './users/users.module'

import { WinstonLoggerModule }            from '@app/winston-logger'

@Module({
  imports:      [
    ConfigModule.forRoot({
      envFilePath:  `./.env.${process.env.NODE_ENV}`,
      isGlobal:     true,
      load:         [configuration],
      validate,
    }),
    CardProductsModule,
    ProgramFundingSourcesModule,
    UsersModule,
    WinstonLoggerModule,
    CardsModule,
  ],
  controllers:  [MarqetaAdapterController],
  providers:    [MarqetaAdapterService],
})
export class MarqetaAdapterModule {}
