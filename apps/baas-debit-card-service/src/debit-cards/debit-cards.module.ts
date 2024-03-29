//-----------------------------------------------------------------------------
// apps/baas-debit-card-service/src/debit-cards/debit-cards.module.ts
//-----------------------------------------------------------------------------
import { Module }                   from '@nestjs/common'

import { DebitCardsService }        from './debit-cards.service'
import { DebitCardsController }     from './debit-cards.controller'
import { CustomersService }         from '../customers/customers.service'
import { AccountsService }          from '../accounts/accounts.service'

@Module({
  controllers:  [DebitCardsController],
  providers:    [
    DebitCardsService,
    CustomersService,
    AccountsService,
  ]
})
export class DebitCardsModule {}
