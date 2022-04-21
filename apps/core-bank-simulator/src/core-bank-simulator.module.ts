//-----------------------------------------------------------------------------
// apps/core-bank-simulator/src/bass-account-service.module.ts
//-----------------------------------------------------------------------------
import { Module }                         from '@nestjs/common'
import { ConfigModule }                   from '@nestjs/config'

import { configuration, validate }        from './config/core-bank-simulator.config'
import { CoreBankSimulatorController }    from './core-bank-simulator.controller'
import { CoreBankSimulatorService }       from './core-bank-simulator.service'

import { CoreCustomersModule }            from './core-customers/core-customers.module'
import { CoreAccountsModule }             from './core-accounts/core-accounts.module'
import { WinstonLoggerModule }            from '@app/winston-logger'

@Module({
  imports:      [
    ConfigModule.forRoot({
      envFilePath:  `./.env.${process.env.NODE_ENV}`,
      isGlobal:     true,
      load:         [configuration],
      validate,
    }),
    WinstonLoggerModule,
    CoreCustomersModule,
    CoreAccountsModule,
  ],
  controllers:  [CoreBankSimulatorController],
  providers:    [CoreBankSimulatorService],
})
export class CoreBankSimulatorModule {}
