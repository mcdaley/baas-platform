//-----------------------------------------------------------------------------
// apps/core-bank-simulator/src/core-participants/core-participants.service.ts
//-----------------------------------------------------------------------------
import { Injectable }                   from '@nestjs/common'

import { CreateCoreParticipantDto }     from './dto/create-core-participant.dto'
import { CoreAccountsDBService }        from '../core-bank-db/core-accounts-db.service'

import { WinstonLoggerService }         from '@app/winston-logger'

@Injectable()
export class CoreParticipantsService {
  constructor(
    private readonly logger:      WinstonLoggerService,
    private readonly accountsDB:  CoreAccountsDBService,
  ) {
    this.accountsDB = CoreAccountsDBService.instance(logger)
  }

  /**
   * @method create
   */
  async create(accountId: string, createCoreParticipantDto: CreateCoreParticipantDto) {
    try {
      const participants = await this.accountsDB.createCoreParticipant(accountId, createCoreParticipantDto)
      const result       = {
        participants: participants,
      }

      return result
    }
    catch(error) {
      throw(error)
    }
  }

  /**
   * @method findAll
   */
  async findAll(accountId: string) {
    try {
      const participants = await this.accountsDB.findAllCoreParticipants(accountId)
      const result       = {
        participants: participants,
      }

      return result
    }
    catch(error) {
      throw(error)
    }
  }

  /**
   * @method remove
   */
  async remove(accountId: string, participantCustomerId: string) {
    try {
      const participants = await this.accountsDB.removeCoreParticipants(accountId, participantCustomerId)
      const result       = {
        participants: participants,
      }

      return result
    }
    catch(error) {
      throw(error)
    }
  }
} // end of class CoreParticipantsService
