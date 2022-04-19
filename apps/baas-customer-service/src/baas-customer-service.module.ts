//-----------------------------------------------------------------------------
// apps/baas-customer-service/src/baas-customer-service.module.ts
//-----------------------------------------------------------------------------
import { Module }                         from '@nestjs/common'
import { ConfigModule }                   from '@nestjs/config'

import { configuration, validate  }       from './config/configuration'

import { BaasCustomerServiceController }  from './baas-customer-service.controller'
import { BaasCustomerServiceService }     from './baas-customer-service.service'
import { CustomersModule }                from './customers/customers.module'

import { WinstonLoggerModule }            from '@app/winston-logger'

@Module({
  imports:      [
    ConfigModule.forRoot({
      envFilePath:  `./.env.${process.env.NODE_ENV}`,
      isGlobal:     true,
      load:         [configuration],
      validate,
    }),
    CustomersModule,
    WinstonLoggerModule,
  ],
  controllers:  [BaasCustomerServiceController],
  providers:    [BaasCustomerServiceService],
})
export class BaasCustomerServiceModule {}
