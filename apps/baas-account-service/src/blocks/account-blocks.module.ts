//-----------------------------------------------------------------------------
// apps/baas-account-service/src/blocks/account-blocks.module.ts
//-----------------------------------------------------------------------------
import { Module }                   from '@nestjs/common'

import { AccountBlocksController }  from './account-blocks.controller'
import { AccountBlocksService }     from './account-blocks.service'

/**
 * @class AccountBlocksModule
 */
@Module({
  controllers:  [AccountBlocksController],
  providers:    [AccountBlocksService],
})
export class AccountBlocksModule {}