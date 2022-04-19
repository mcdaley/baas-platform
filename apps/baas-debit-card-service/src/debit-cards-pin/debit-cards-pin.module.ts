//----------------------------------------------------------------------------------
// apps/baas-debit-card-service/src/debit-cards-pin/debit-cards-pin.module.ts
//----------------------------------------------------------------------------------
import { Module }                   from '@nestjs/common'

import { DebitCardsPinService }     from './debit-cards-pin.service'
import { DebitCardsPinController }  from './debit-cards-pin.controller'

import { CoreDebitCardSimulator }    from '@app/core-simulator'

@Module({
  controllers:  [DebitCardsPinController],
  providers:    [DebitCardsPinService, CoreDebitCardSimulator]
})
export class DebitCardsPinModule {}
