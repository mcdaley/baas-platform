//-----------------------------------------------------------------------------
// apps/baas-account-service/src/participants/participants.service.ts
//-----------------------------------------------------------------------------
import { Injectable }                   from '@nestjs/common'
import { ConfigService }                from '@nestjs/config'
import axios                            from 'axios'

import { CreateParticipantDto }         from './dto/create-participant.dto'

import { 
  createBaaSException,
  BaaSErrorLabel,
}                                       from '@app/baas-errors'
import { WinstonLoggerService }         from '@app/winston-logger'

@Injectable()
export class ParticipantsService {
  private coreAccountsUrl: string

  constructor(
    private readonly configService: ConfigService,
    private readonly logger:        WinstonLoggerService,
  ) {
    this.coreAccountsUrl = configService.get('bankSimulatorAccountsUrl')
  }

  /**
   * @method create
   */
  async create(
    accountId:            string, 
    createParticipantDto: CreateParticipantDto,
    customerId:           string,
    tenantId:             string,
    idempotencyKey:       string) 
  {
    try {
      const url         = `${this.coreAccountsUrl}/${accountId}/participants`
      const axiosConfig = {
        headers: {
          'Customer-Id':      customerId,
          'Tenant-Id':        tenantId,
          'Idempotency-Key':  idempotencyKey,
        }
      }
      const response    = await axios.post(url, createParticipantDto, axiosConfig)
      const participant = response.data.data
      
      const result = {
        participant: participant,
      }
      this.logger.log({
        message: `Added customerId=${createParticipantDto.customer_id} to accountId=[${accountId}]`
      })

      return result
    }
    catch(error) {
      this.logger.error({
        message:  `Failed to add participant to account id=[${accountId}]`, 
        error:    error
      })
      throw(createBaaSException(error, BaaSErrorLabel.Account))
    }
  }

  /**
   * @method findAll
   */
  async findAll(
    accountId:  string,
    customerId: string,
    tenantId:   string) 
  {
    try {
      const url          = `${this.coreAccountsUrl}/${accountId}/participants`
      const axiosConfig  = {
        headers: {
          'Customer-Id': customerId,
          'Tenant-Id':   tenantId,
        }
      }
      const response     = await axios.get(url, axiosConfig)
      const participants = response.data.data
      
      const result = {
        participants: participants,
      }

      return result
    }
    catch(error) {
      throw(createBaaSException(error, BaaSErrorLabel.Account))
    }
  }

  /**
   * @method remove
   */
  async remove(
    accountId:             string, 
    participantCustomerId: string,
    customerId:            string,
    tenantId:              string) 
  {
    try {
      const url         = `${this.coreAccountsUrl}/${accountId}/participants/${participantCustomerId}`
      const axiosConfig = {
        headers: {
          'Customer-Id': customerId,
          'Tenant-Id':   tenantId,
        }
      }
      const response  = await axios.delete(url, axiosConfig)
      const result    = response.data
      this.logger.log({
        message: `Deleted participantCustomerId=[${participantCustomerId}] from accountId=[${accountId}]`
      })

      return result
    }
    catch(error) {
      this.logger.error({
        message:  `Failed to remove participant from account id=[${accountId}]`, 
        error:    error
      })
      throw(createBaaSException(error, BaaSErrorLabel.Account))
    }
  }
} // end of class ParticipantsService
