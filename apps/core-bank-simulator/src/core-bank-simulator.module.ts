//-----------------------------------------------------------------------------
// apps/core-bank-simulator/src/bass-account-service.module.ts
//-----------------------------------------------------------------------------
import { Module }                         from '@nestjs/common'
import { ConfigModule }                   from '@nestjs/config'
import { APP_INTERCEPTOR }                from '@nestjs/core'
import { TypeOrmModule }                  from '@nestjs/typeorm'
import { DataSource }                     from 'typeorm'

import { configuration, validate }        from './config/core-bank-simulator.config'
import { CoreBankSimulatorController }    from './core-bank-simulator.controller'
import { CoreBankSimulatorService }       from './core-bank-simulator.service'

import { CustomersModule }                from './customers/customers.module'
import { AccountsModule }                 from './accounts/accounts.module'
import { ParticipantsModule }             from './accounts/participants/participants.module'
import { AccountsBlocksModule }           from './accounts/blocks/accounts-blocks.module'
import { DebitCardsModule }               from './debit-cards/debit-cards.module'
import { DebitCardBlocksModule }          from './debit-cards/blocks/debit-card-blocks.module'
import { Customer }                       from './customers/entities/customer.entity'
import { Address }                        from './customers/entities/address.entity'
import { Account }                        from './accounts/entities/account.entity'
import { AccountToCustomer }              from './accounts/entities/account-to-customer.entity'
import { AccountBlock }                   from './accounts/entities/account-block.entity'
import { DebitCard }                      from './debit-cards/entities/debit-card.entity'
import { DebitCardBlock }                 from './debit-cards/entities/debit-card-block.entity'


import { 
  WinstonLoggerModule,
  WinstonLoggerInterceptor,
}                                         from '@app/winston-logger'

@Module({
  imports:      [
    ConfigModule.forRoot({
      envFilePath:  `./.env.${process.env.NODE_ENV}`,
      isGlobal:     true,
      load:         [configuration],
      validate,
    }),
    TypeOrmModule.forRoot({
      type:         'sqlite',
      database:     './db/core-bank-db.sqlite',
      entities:     [
        Customer, 
        Address, 
        Account, 
        AccountToCustomer, 
        AccountBlock, 
        DebitCard,
        DebitCardBlock,
      ],
      synchronize:  true,
      logging:      true,
    }),
    WinstonLoggerModule,
    CustomersModule,
    AccountsModule,
    ParticipantsModule,
    AccountsBlocksModule,
    DebitCardsModule,
    DebitCardBlocksModule,
  ],
  controllers:  [CoreBankSimulatorController],
  providers:    [
    CoreBankSimulatorService,
    { 
      provide:  APP_INTERCEPTOR,
      useClass: WinstonLoggerInterceptor
    }
  ],
})
export class CoreBankSimulatorModule {
  constructor(private dataSource: DataSource) {}
}
