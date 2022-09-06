//----------------------------------------------------------------------------------
// apps/baas-debit-card-service/src/blocks/debit-cards-blocks.service.ts
//----------------------------------------------------------------------------------
import { Injectable }               from '@nestjs/common'
import { ConfigService }            from '@nestjs/config'
import axios                        from 'axios'

import { CreateDebitCardsBlockDto } from './dto/create-debit-cards-block.dto'

import { IBaaSRequestHeaders }      from '@app/baas-errors'
import { WinstonLoggerService }     from '@app/winston-logger'

/**
 * @class DebitCardsBlocksService
 */
@Injectable()
export class DebitCardsBlocksService {
  constructor(
    private readonly configService:       ConfigService,
    private readonly logger:              WinstonLoggerService,
  ) {}

  /**
   * @method create
   */
  async create(
    debitCardId:              string, 
    createDebitCardsBlockDto: CreateDebitCardsBlockDto,
    requestHeaders:           IBaaSRequestHeaders) 
  {
    try {
      const url         = `${this.configService.get('bankSimulatorDebitCardsUrl')}/${debitCardId}/blocks`
      const axiosConfig = {
        headers: requestHeaders
      }
      this.logger.log({
        message:  `Call core bank to block debit card id = ${debitCardId}`,
        url:      `POST ${url}`
      })

      const response = await axios.post(url, createDebitCardsBlockDto, axiosConfig)
      const block    = response.data.data
      const result   = {
        block: block
      }
      
      this.logger.log({
        message: `Blocked debit card id=${debitCardId}`
      })
      return result
    }
    catch(error) {
      this.logger.error({
        message:  `Failed to block debit card id=[${debitCardId}]`, 
        error:    error
      })
      throw(error)
    }
  }

  /**
   * @method findAll
   */
  async findAll(
    debitCardId:    string,
    requestHeaders: IBaaSRequestHeaders) {
    try {
      const url      = `${this.configService.get('bankSimulatorDebitCardsUrl')}/${debitCardId}/blocks`
      const axiosConfig = {
        headers: requestHeaders
      }
      this.logger.log({
        message: `Call core bank engine to get blocks for debit card id = ${debitCardId}`,
        url:     `GET ${url}`,
      })

      const response = await axios.get(url, axiosConfig)
      const blocks   = response.data.data
      const result   = {
        blocks: blocks
      }

      this.logger.log({
        message: `Fetched blocks for debit card id=[${debitCardId}]`
      })
      return result
    }
    catch(error) {
      this.logger.error({
        message:  `Failed to fetch blocks for debit card id=[${debitCardId}]`, 
        error:    error,
      })
      throw(error)
    }
  }

  /**
   * @method remove
   */
  async remove(
    debitCardId:    string, 
    blockId:        string,
    requestHeaders: IBaaSRequestHeaders) 
  {
    try {
      const url         = `${this.configService.get('bankSimulatorDebitCardsUrl')}/${debitCardId}/blocks/${blockId}`
      const axiosConfig = {
        headers: requestHeaders,
      }
      this.logger.log({
        message: `Call core bank engine to unblock debit card id = ${debitCardId}`,
        url:     `DELETE ${url}`,
      })
      
      const response = await axios.delete(url, axiosConfig)
      const block    = response.data.data
      const result   = {
        block: block
      }

      this.logger.log({
        message: `Removed block id=[${blockId}] from debit card id=[${debitCardId}]`
      })
      return result
    }
    catch(error) {
      this.logger.error({
        message:  `Failed to remove block id=[${blockId}] from debit card id=[${debitCardId}]`,
        error:    error
      })
      throw(error)
    }
  }
}
