//----------------------------------------------------------------------------------
// apps/core-bank-simulator/src/core-accounts-blocks/core-accounts-blocks.module.ts
//----------------------------------------------------------------------------------
import { Module }                         from '@nestjs/common'

import { CoreAccountsBlocksController }   from './core-accounts-blocks.controller'
import { CoreAccountsBlocksService }      from './core-accounts-blocks.service'

import { CoreSimulatorService }     from '@app/core-simulator'

@Module({
  controllers:  [CoreAccountsBlocksController],
  providers:    [CoreAccountsBlocksService, CoreSimulatorService],
})
export class CoreAccountsBlocksModule {}