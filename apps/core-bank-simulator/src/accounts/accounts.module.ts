//-----------------------------------------------------------------------------
// apps/core-bank-simulator/src/accounts/accounts.module.ts
//-----------------------------------------------------------------------------
import { Module }                 from '@nestjs/common'
import { TypeOrmModule }          from '@nestjs/typeorm'

import { AccountsService }        from './accounts.service'
import { AccountsController }     from './accounts.controller'
import { Account }                from './entities/account.entity'
import { AccountToCustomer }      from './entities/account-to-customer.entity'

@Module({
  imports:      [TypeOrmModule.forFeature([Account, AccountToCustomer])],
  controllers:  [AccountsController],
  providers:    [AccountsService]
})
export class AccountsModule {}
