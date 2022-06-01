//---------------------------------------------------------------------------------------
// apps/core-bank-simulator/src/accounts/participants/participants.service.ts
//----------------------------------------------------------------------------------------
import { Injectable }                   from '@nestjs/common'

import { CreateParticipantDto }         from './dto/create-participant.dto'
import { CoreAccountsDBService }        from '../../core-bank-db/core-accounts-db.service'

import { WinstonLoggerService }         from '@app/winston-logger'

@Injectable()
export class ParticipantsService {
  constructor(
    private readonly logger:      WinstonLoggerService,
    private readonly accountsDB:  CoreAccountsDBService,
  ) {
    this.accountsDB = CoreAccountsDBService.instance(logger)
  }

  /**
   * @method create
   */
  async create(accountId: string, createParticipantDto: CreateParticipantDto) {
    try {
      const participants = await this.accountsDB.createCoreParticipant(accountId, createParticipantDto)
      const result       = {
        data: participants,
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
        data: participants,
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
        data: participants,
      }

      return result
    }
    catch(error) {
      throw(error)
    }
  }
} // end of class ParticipantsService
