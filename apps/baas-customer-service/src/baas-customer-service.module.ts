//-----------------------------------------------------------------------------
// apps/baas-customer-service/src/baas-customer-service.module.ts
//-----------------------------------------------------------------------------
import { 
  Module, 
  NestModule, 
  MiddlewareConsumer,
  RequestMethod, 
}                                         from '@nestjs/common'
import { ConfigModule }                   from '@nestjs/config'

import { configuration, validate  }       from './config/configuration'

import { BaasCustomerServiceController }  from './baas-customer-service.controller'
import { BaasCustomerServiceService }     from './baas-customer-service.service'
import { CustomersModule }                from './customers/customers.module'

import { WinstonLoggerModule }            from '@app/winston-logger'
import { TenantIdMiddleware }             from '@app/baas-errors'

/**
 * @class BaasCustomerServiceModule
 */
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
//* Turn off TenantIdMiddleware
//* export class BaasCustomerServiceModule implements NestModule {
//*   configure(consumer: MiddlewareConsumer) {
//*     consumer
//*       .apply(TenantIdMiddleware)
//*       .forRoutes({path: '/v*/customers', method: RequestMethod.ALL})
//*   }
//* }
