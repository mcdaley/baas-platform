//-----------------------------------------------------------------------------
// apps/baas-account-service/src/participants/participants.service.ts
//-----------------------------------------------------------------------------
import { Injectable }                   from '@nestjs/common'
import { ConfigService }                from '@nestjs/config'
import axios                            from 'axios'

import { CreateParticipantDto }         from './dto/create-participant.dto'

import { WinstonLoggerService }         from '@app/winston-logger'
import { createBaaSException }          from '@app/baas-errors'

@Injectable()
export class ParticipantsService {
  private coreAccountsUrl: string

  constructor(
    private readonly configService: ConfigService,
    private readonly logger:        WinstonLoggerService,
  ) {
    this.coreAccountsUrl = configService.get('bankSimulatorAccountsUrl')
    //* this.logger.log(`Initialized the Account Simulator URL= %s`, this.coreAccountsUrl)
  }

  /**
   * @method create
   */
  async create(accountId: string, createParticipantDto: CreateParticipantDto) {
    try {
      const url               = `${this.coreAccountsUrl}/${accountId}/core-participants`
      const response          = await axios.post(url, createParticipantDto)
      const { participants }  = response.data
      
      const result = {
        participants: participants,
      }
      this.logger.log(`Added customerId=${createParticipantDto.participant_customer_id} to accountId=[${accountId}]`)

      return result
    }
    catch(error) {
      throw(createBaaSException(error, 'Account'))
    }
  }

  /**
   * @method findAll
   */
  async findAll(accountId: string) {
    try {
      const url               = `${this.coreAccountsUrl}/${accountId}/core-participants`
      const response          = await axios.get(url)
      const { participants }  = response.data
      
      const result = {
        participants: participants,
      }

      return result
    }
    catch(error) {
      throw(createBaaSException(error, 'Account'))
    }
  }

  /**
   * @method remove
   */
  async remove(accountId: string, participantCustomerId: string) {
    try {
      const url       = `${this.coreAccountsUrl}/${accountId}/core-participants/${participantCustomerId}`
      const response  = await axios.delete(url)
      const result    = response.data
      this.logger.log(`Deleted participantCustomerId=[${participantCustomerId}] from accountId=[${accountId}]`)

      return result
    }
    catch(error) {
      throw(createBaaSException(error, 'Account'))
    }
  }
} // end of class ParticipantsService
