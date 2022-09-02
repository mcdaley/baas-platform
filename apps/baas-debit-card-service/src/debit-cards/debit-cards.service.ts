//-----------------------------------------------------------------------------
// apps/baas-debit-card-service/src/debit-cards/debit-cards.service.ts
//-----------------------------------------------------------------------------
import { Injectable }                   from '@nestjs/common'
import { ConfigService }                from '@nestjs/config'
import axios                            from 'axios'

import { CreateDebitCardDto }           from './dto/create-debit-card.dto'
import { UpdateDebitCardDto }           from './dto/update-debit-card.dto'

import { 
  createBaaSException,
  BaaSErrorLabel,
}                                       from '@app/baas-errors'
import { WinstonLoggerService }         from '@app/winston-logger'


/**
 * @class DebitCardsService
 */
@Injectable()
export class DebitCardsService {
  simulatorUrl : string

  /**
   * @constructor
   */
  constructor(
    private readonly configService  : ConfigService,
    private readonly logger         : WinstonLoggerService) 
  {
    this.simulatorUrl = configService.get(`bankSimulatorDebitCardsUrl`)
  }

  /**
   * @method create
   */
  async create(
    createDebitCardDto: CreateDebitCardDto,
    customerId:         string,
    tenantId:           string,
    idempotencyKey:     string) 
  {
    try {
      const url       = this.simulatorUrl
      const axiosConfig = {
        headers: {
          'Customer-Id':     customerId,
          'Tenant-Id':       tenantId,
          'Idempotency-Key': idempotencyKey,
        }
      }
      const response  = await axios.post(url, createDebitCardDto, axiosConfig)
      const debitCard = response.data.data
      const result    = {
        debit_card: debitCard
      }
      
      this.logger.log({
        message: `Created debit card`
      })
      return result
    }
    catch(error) {
      this.logger.error({
        message:  `Failed to create debit cards`, 
        error:    error
      })
      throw(createBaaSException(error, BaaSErrorLabel.DebitCard))
    }
  }

  /**
   * @method findAll
   */
  async findAll(customerId: string, tenantId: string) {
    try {
      const url           = this.simulatorUrl
      const axiosConfig   = {
        headers: {
          'Customer-Id': customerId,
          'Tenant-Id':   tenantId,
        }
      }
      const response      = await axios.get(this.simulatorUrl, axiosConfig)
      const debitCardList = response.data.data
      const result        = {
        debit_cards: debitCardList,
      }
      this.logger.log({
        message: `Fetched ${debitCardList.length} debit cards`
      })
      
      return result
    }
    catch(error) {
      this.logger.error({
        message:  `Failed to fetch debit cards`, 
        error:    error
      })
      throw(createBaaSException(error, BaaSErrorLabel.DebitCard))
    }
  }

  /**
   * @method findOne
   */
  async findOne(debitCardId: string, customerId: string, tenantId: string) {
    try {
      const url         = `${this.simulatorUrl}/${debitCardId}`
      const axiosConfig = {
        headers: {
          'Customer-Id': customerId,
          'Tenant-Id':   tenantId,
        }
      }
      const response  = await axios.get(url, axiosConfig)
      const debitCard = response.data.data
      const result    = {
        debit_card: debitCard,
      }

      this.logger.log({
        message: `Fetched debit card w/ id=[${debitCardId}]`
      })
      return result
    }
    catch(error) {
      this.logger.error({
        message:  `Failed to find debit card id=[${debitCardId}]`, 
        error:    error
      })
      throw(createBaaSException(error, BaaSErrorLabel.DebitCard))
    }
  }

  /**
   * @method update
   */
  async update(
    debitCardId:        string, 
    updateDebitCardDto: UpdateDebitCardDto,
    customerId:         string,
    tenantId:           string,
    idempotencyKey:     string) 
  {
    try {
      const url       = `${this.simulatorUrl}/${debitCardId}`
      const axiosConfig = {
        headers: {
          'Customer-Id':     customerId,
          'Tenant-Id':       tenantId,
          'Idempotency-Key': idempotencyKey,
        }
      }
      const response  = await axios.patch(url, updateDebitCardDto, axiosConfig)
      const debitCard = response.data.data
      const result    = {
        debit_card: debitCard,
      }

      this.logger.log({
        message: `Updated debit card id=[${debitCardId}]`
      })
      return result
    }
    catch(error) {
      this.logger.error({
        message:  `Failed to update debit card id=${debitCardId}`, 
        error:    error
      })
      throw(createBaaSException(error, BaaSErrorLabel.DebitCard))
    }
  }

  //* remove(debitCardId: string) {
  //*   return `This action removes a ${debitCardId} debitCard`
  //* }
}
