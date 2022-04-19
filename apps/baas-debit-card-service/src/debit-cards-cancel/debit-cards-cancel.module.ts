//----------------------------------------------------------------------------------
// apps/baas-debit-card-service/src/debit-cards-cancel/debit-cards-cancel.module.ts
//----------------------------------------------------------------------------------
import { Module }                     from '@nestjs/common'

import { DebitCardsCancelService }    from './debit-cards-cancel.service'
import { DebitCardsCancelController } from './debit-cards-cancel.controller'

import { CoreDebitCardSimulator }     from '@app/core-simulator'

@Module({
  controllers:  [DebitCardsCancelController],
  providers:    [DebitCardsCancelService, CoreDebitCardSimulator]
})
export class DebitCardsCancelModule {}
