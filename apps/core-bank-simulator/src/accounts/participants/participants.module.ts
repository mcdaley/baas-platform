//--------------------------------------------------------------------------------------
// apps/core-bank-simulator/src/accounts/participants/participants.module.ts
//---------------------------------------------------------------------------------------
import { Module }                     from '@nestjs/common'
import { TypeOrmModule }              from '@nestjs/typeorm'

import { ParticipantsController }     from './participants.controller'
import { ParticipantsService }        from './participants.service'
import { Customer }                   from '../../customers/entities/customer.entity'
import { AccountToCustomer }          from '../entities/account-to-customer.entity'

@Module({
  imports:      [TypeOrmModule.forFeature([Customer, AccountToCustomer])],
  controllers:  [ParticipantsController],
  providers:    [ParticipantsService],
})
export class ParticipantsModule {}