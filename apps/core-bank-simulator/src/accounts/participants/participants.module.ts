//--------------------------------------------------------------------------------------
// apps/core-bank-simulator/src/accounts/participants/participants.module.ts
//---------------------------------------------------------------------------------------
import { Module }                     from '@nestjs/common'

import { ParticipantsController }     from './participants.controller'
import { ParticipantsService }        from './participants.service'
import { CoreAccountsDBService }      from '../../core-bank-db/core-accounts-db.service'

@Module({
  controllers:  [ParticipantsController],
  providers:    [ParticipantsService, CoreAccountsDBService],
})
export class ParticipantsModule {}