//-----------------------------------------------------------------------------
// apps/core-bank-simulator/src/bass-account-service.module.ts
//-----------------------------------------------------------------------------
import { Module }                         from '@nestjs/common'
import { ConfigModule }                   from '@nestjs/config'

import { configuration, validate }        from './config/core-bank-simulator.config'
import { CoreBankSimulatorController }    from './core-bank-simulator.controller'
import { CoreBankSimulatorService }       from './core-bank-simulator.service'

import { CustomersModule }                from './customers/customers.module'
import { AccountsModule }                 from './accounts/accounts.module'
import { ParticipantsModule }             from './accounts/participants/participants.module'
import { AccountsBlocksModule }           from './accounts/blocks/accounts-blocks.module'
import { DebitCardsModule }               from './debit-cards/debit-cards.module';
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
    CustomersModule,
    AccountsModule,
    ParticipantsModule,
    AccountsBlocksModule,
    DebitCardsModule,
  ],
  controllers:  [CoreBankSimulatorController],
  providers:    [CoreBankSimulatorService],
})
export class CoreBankSimulatorModule {}
