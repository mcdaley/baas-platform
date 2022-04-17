//-----------------------------------------------------------------------------
// apps/baas-account-service/src/blocks/account-blocks.module.ts
//-----------------------------------------------------------------------------
import { Module }                   from '@nestjs/common'

import { AccountBlocksController }  from './account-blocks.controller'
import { AccountBlocksService }     from './account-blocks.service'

import { CoreSimulatorService }     from '@app/core-simulator'

@Module({
  controllers:  [AccountBlocksController],
  providers:    [AccountBlocksService, CoreSimulatorService],
})
export class AccountBlocksModule {}