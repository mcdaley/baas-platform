//-----------------------------------------------------------------------------
// apps/marqeta-adapter/src/transactions/transactions/module.ts
//-----------------------------------------------------------------------------
import { Module }                 from '@nestjs/common'
import { TransactionsService }    from './transactions.service'
import { TransactionsController } from './transactions.controller'

@Module({
  controllers:  [TransactionsController],
  providers:    [TransactionsService]
})
export class TransactionsModule {}
