//----------------------------------------------------------------------------------
// apps/baas-debit-card-service/src/blocks/debit-cards-blocks.service.ts
//----------------------------------------------------------------------------------
import { Injectable }               from '@nestjs/common'
import { ConfigService }            from '@nestjs/config'
import axios                        from 'axios'

import { CreateDebitCardsBlockDto } from './dto/create-debit-cards-block.dto'

import { IDebitCardsBlock }         from '@app/baas-interfaces'
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
    customerId:               string,
    tenantId:                 string,
    idempotencyKey:           string) 
  {
    this.logger.log(`Block debit card id=[${debitCardId}], w/ block= %o`, createDebitCardsBlockDto)
    try {
      const url         = `${this.configService.get('bankSimulatorDebitCardsUrl')}/${debitCardId}/blocks`
      const axiosConfig = {
        headers: {
          'Customer-Id':     customerId,
          'Tenant-Id':       tenantId,
          'Idempotency-Key': idempotencyKey,
        }
      }
      const response = await axios.post(url, createDebitCardsBlockDto, axiosConfig)
      const block    = response.data.data
      const result   = {
        block: block
      }
      
      this.logger.log(`Created block for debit card id=${debitCardId}, result= %o`, result)
      return result
    }
    catch(error) {
      this.logger.error(
        `Failed to create block for debit card id=[${debitCardId}], error= %o`, 
        error
      )
      throw(error)
    }
  }

  /**
   * @method findAll
   */
  async findAll(
    debitCardId: string,
    customerId:  string,
    tenantId:    string) {
    try {
      const url      = `${this.configService.get('bankSimulatorDebitCardsUrl')}/${debitCardId}/blocks`
      const axiosConfig = {
        headers: {
          'Customer-Id':  customerId,
          'Tenant-Id':    tenantId,
        }
      }
      const response = await axios.get(url, axiosConfig)
      const blocks   = response.data.data
      const result   = {
        blocks: blocks
      }

      this.logger.log(`Fetched blocks for debit card id=[${debitCardId}], result= %o`, result)
      return result
    }
    catch(error) {
      this.logger.error(
        `Failed to fetch blocks for debit card id=[${debitCardId}], error= %o`, 
        error
      )
      throw(error)
    }
  }

  /**
   * @method remove
   */
  async remove(
    debitCardId: string, 
    blockId:     string,
    customerId:  string,
    tenantId:    string) 
  {
    try {
      const url         = `${this.configService.get('bankSimulatorDebitCardsUrl')}/${debitCardId}/blocks/${blockId}`
      const axiosConfig = {
        headers: {
          'Customer-Id': customerId,
          'Tenant-Id':   tenantId,
        }
      }
      const response = await axios.delete(url, axiosConfig)
      const block    = response.data.data
      const result   = {
        block: block
      }

      this.logger.log(`Removed block id=[${blockId}] from debit card id=[${debitCardId}], result= %o`, result)
      return result
    }
    catch(error) {
      this.logger.error(
        `Failed to remove block id=[${blockId}] from debit card id=[${debitCardId}], error= %o`,
        error
      )
      throw(error)
    }
  }
}
