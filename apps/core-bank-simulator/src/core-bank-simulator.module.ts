//-----------------------------------------------------------------------------
// apps/core-bank-simulator/src/bass-account-service.module.ts
//-----------------------------------------------------------------------------
import { Module }                         from '@nestjs/common'
import { ConfigModule }                   from '@nestjs/config'

import { configuration, validate }        from './config/core-bank-simulator.config'
import { CoreBankSimulatorController }    from './core-bank-simulator.controller'
import { CoreBankSimulatorService }       from './core-bank-simulator.service'

import { CoreCustomersModule }            from './core-customers/customers/core-customers.module'
import { CoreAccountsModule }             from './core-accounts/accounts/core-accounts.module'
import { CoreParticipantsModule }         from './core-accounts/participants/core-participants.module'
import { CoreAccountsBlocksModule }       from './core-accounts/blocks/core-accounts-blocks.module'
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
    CoreCustomersModule,
    CoreAccountsModule,
    CoreParticipantsModule,
    CoreAccountsBlocksModule,
    DebitCardsModule,
  ],
  controllers:  [CoreBankSimulatorController],
  providers:    [CoreBankSimulatorService],
})
export class CoreBankSimulatorModule {}
