//----------------------------------------------------------------------------------
// apps/core-bank-simulator/src/core-accounts-blocks/core-accounts-blocks.module.ts
//----------------------------------------------------------------------------------
import { Module }                         from '@nestjs/common'
import { TypeOrmModule }                  from '@nestjs/typeorm'

import { AccountsBlocksController }       from './accounts-blocks.controller'
import { AccountsBlocksService }          from './accounts-blocks.service'
import { Account }                        from '../entities/account.entity'
import { AccountBlock }                   from '../entities/account-block.entity'

@Module({
  imports:      [TypeOrmModule.forFeature([Account, AccountBlock])],
  controllers:  [AccountsBlocksController],
  providers:    [AccountsBlocksService],
})
export class AccountsBlocksModule {}