//---------------------------------------------------------------------------------------
// apps/core-bank-simulator/src/accounts/participants/participants.service.ts
//----------------------------------------------------------------------------------------
import { Injectable }                   from '@nestjs/common'
import { InjectRepository }             from '@nestjs/typeorm'
import { Repository }                   from 'typeorm'

import { AccountToCustomer }            from '../entities/account-to-customer.entity'
import { CreateParticipantDto }         from '../dto/create-participant.dto'

import { 
  BaaSErrorLabel, 
  createBaaSException, 
}                                       from '@app/baas-errors'
import { WinstonLoggerService }         from '@app/winston-logger'

/**
 * @class ParticipantsService
 */
@Injectable()
export class ParticipantsService {
  constructor(
    @InjectRepository(AccountToCustomer) private participantRepository: Repository<AccountToCustomer>,
    private readonly logger: WinstonLoggerService,
  ) {}

  /**
   * Add a customer/participant to an account by adding a row to to the
   * accounts_to_customers DB table.
   * 
   * @method create
   */
  async create(accountId: string, createParticipantDto: CreateParticipantDto) {
    try {
      const participant = {account_id: accountId, ...createParticipantDto}
      const response    = await this.participantRepository.save(participant)
        
      const result      = {
        data: response,
      }

      this.logger.log({
        message: `Added participant for account id=[${accountId}]`
      })
      return result
    }
    catch(error) {
      this.logger.error({
        message:  `Failed to create participant for account id=[${accountId}]`, 
        error:    error
      })
      throw(createBaaSException(error, BaaSErrorLabel.Account))
    }
  }

  /**
   * @method findAll
   */
  async findAll(accountId: string) {
    try {
      const participants = await this.participantRepository.find({
        where: {account_id: accountId}
      })

      const result       = {
        data: participants,
      }

      this.logger.log({
        message: `Fetched [${participants.length}] participants for account id=[${accountId}]`
      })
      return result
    }
    catch(error) {
      this.logger.error({
        message:  `Failed to fetch participants for account id=[${accountId}]`, 
        error:    error
      })
      throw(createBaaSException(error, BaaSErrorLabel.Account))
    }
  }

  /**
   * @method remove
   */
  async remove(accountId: string, participantId: string) {
    try {
      const response = await this.participantRepository.delete({
        account_id: accountId, 
        id:         participantId
      })
      const result = {
        data: participantId,
      }

      this.logger.log({
        message: `Removed participant for account id=[${accountId}]`
      })
      return result
    }
    catch(error) {
      this.logger.error({
        message:  `Failed to delete participant id=[${participantId}]`, 
        error:    error
      })
      throw(createBaaSException(error, BaaSErrorLabel.Account))
    }
  }
} // end of class ParticipantsService
