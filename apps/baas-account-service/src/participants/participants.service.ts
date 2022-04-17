//-----------------------------------------------------------------------------
// apps/baas-account-service/src/participants/participants.service.ts
//-----------------------------------------------------------------------------
import { Injectable }                   from '@nestjs/common'

import { CreateParticipantDto }         from './dto/create-participant.dto'

import { CoreSimulatorService }         from '@app/core-simulator'
import { WinstonLoggerService }         from '@app/winston-logger'

@Injectable()
export class ParticipantsService {
  constructor(
    private readonly logger:      WinstonLoggerService,
    private readonly coreService: CoreSimulatorService
  ) {}

  /**
   * @method create
   */
  async create(accountId: string, createParticipantDto: CreateParticipantDto) {
    try {
      const participants = await this.coreService.createParticipant(accountId, createParticipantDto)
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
      const participants = await this.coreService.findAllParticipants(accountId)
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
      const participants = await this.coreService.removeParticipants(accountId, participantCustomerId)
      const result       = {
        participants: participants,
      }

      return result
    }
    catch(error) {
      throw(error)
    }
  }
} // end of class ParticipantsService
