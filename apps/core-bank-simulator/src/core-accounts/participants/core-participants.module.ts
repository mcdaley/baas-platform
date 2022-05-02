//--------------------------------------------------------------------------------------
// apps/core-bank-simulator/src/core-accounts/participants/core-participants.module.ts
//---------------------------------------------------------------------------------------
import { Module }                     from '@nestjs/common'

import { CoreParticipantsController } from './core-participants.controller'
import { CoreParticipantsService }    from './core-participants.service'
import { CoreAccountsDBService }      from '../../core-bank-db/core-accounts-db.service'

@Module({
  controllers:  [CoreParticipantsController],
  providers:    [CoreParticipantsService, CoreAccountsDBService],
})
export class CoreParticipantsModule {}