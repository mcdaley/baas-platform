//-----------------------------------------------------------------------------
// apps/marqeta-adapter.module.ts
//-----------------------------------------------------------------------------
import { Module }                         from '@nestjs/common'
import { ConfigModule }                   from '@nestjs/config'

import { configuration, validate  }       from './config/marqeta-adapter.config'
import { MarqetaAdapterController }       from './marqeta-adapter.controller'
import { MarqetaAdapterService }          from './marqeta-adapter.service'
import { CardProductsModule }             from './card-products/card-products.module'

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
    WinstonLoggerModule,
  ],
  controllers:  [MarqetaAdapterController],
  providers:    [MarqetaAdapterService],
})
export class MarqetaAdapterModule {}
