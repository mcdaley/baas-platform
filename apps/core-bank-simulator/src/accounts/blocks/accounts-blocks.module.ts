//----------------------------------------------------------------------------------
// apps/core-bank-simulator/src/core-accounts-blocks/core-accounts-blocks.module.ts
//----------------------------------------------------------------------------------
import { Module }                         from '@nestjs/common'

import { AccountsBlocksController }       from './accounts-blocks.controller'
import { AccountsBlocksService }          from './accounts-blocks.service'

import { CoreSimulatorService }           from '@app/core-simulator'

@Module({
  controllers:  [AccountsBlocksController],
  providers:    [AccountsBlocksService, CoreSimulatorService],
})
export class AccountsBlocksModule {}