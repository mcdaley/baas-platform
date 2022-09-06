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
  IBaaSRequestHeaders,
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
    requestHeaders:     IBaaSRequestHeaders) 
  {
    try {
      const url         = this.simulatorUrl
      const axiosConfig = {
        headers: requestHeaders
      }
      this.logger.log({
        message:  `Call core bank engine to create the debit card`,
        url:      `POST ${url}`,
      })

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
  async findAll(requestHeaders: IBaaSRequestHeaders) {
    try {
      const url           = this.simulatorUrl
      const axiosConfig   = {
        headers: requestHeaders,
      }
      this.logger.log({
        message: `Call core bank engine to get debit cards for customer id = [${requestHeaders['Customer-Id']}]`,
        url:     `GET ${this.simulatorUrl}`
      })

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
  async findOne(debitCardId: string, requestHeaders: IBaaSRequestHeaders) {
    try {
      const url         = `${this.simulatorUrl}/${debitCardId}`
      const axiosConfig = {
        headers: requestHeaders,
      }
      this.logger.log({
        message: `Call core bank engine to fetch debit card id = ${debitCardId}`,
        url:     `GET ${url}`
      })

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
    requestHeaders:     IBaaSRequestHeaders) 
  {
    try {
      const url       = `${this.simulatorUrl}/${debitCardId}`
      const axiosConfig = {
        headers: requestHeaders,
      }
      this.logger.log({
        message: `Call core bank engine to update debit card id = ${debitCardId}`,
        url:     `PATCH ${url}`,
      })
      
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
