//-----------------------------------------------------------------------------
// apps/baas-account-service/src/participants/participants.module.ts
//-----------------------------------------------------------------------------
import { Module }                 from '@nestjs/common'

import { ParticipantsController } from './participants.controller'
import { ParticipantsService }    from './participants.service'
import { CoreSimulatorService }   from '@app/core-simulator'

@Module({
  controllers:  [ParticipantsController],
  providers:    [ParticipantsService, CoreSimulatorService],
})
export class ParticipantsModule {}