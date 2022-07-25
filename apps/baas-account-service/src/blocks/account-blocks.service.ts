//-----------------------------------------------------------------------------
// apps/baas-account-service/src/blocks/account-blocks.service.ts
//-----------------------------------------------------------------------------
import { Injectable }             from '@nestjs/common'
import { ConfigService }          from '@nestjs/config'
import axios                      from 'axios'

import { CreateAccountBlockDto }  from './dto/create-account-block.dto'

import { WinstonLoggerService }   from '@app/winston-logger'
import { createBaaSException }    from '@app/baas-errors'

/**
 * @class AccountBlocksService
 */
@Injectable()
export class AccountBlocksService {
  private coreAccountsUrl: string

  /**
   * @constructor
   */
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
    accountId: string, 
    createAccountBlockDto: CreateAccountBlockDto,
    customerId:            string,
    tenantId:              string,
    idempotencyKey:        string) 
  {
    try {
      const url         = `${this.coreAccountsUrl}/${accountId}/blocks`
      const axiosConfig = {
        headers: {
          'Customer-Id':     customerId,
          'Tenant-Id':       tenantId,
          'Idempotency-Key': idempotencyKey,
        }
      }
      const response     = await axios.post(url, createAccountBlockDto, axiosConfig)
      const accountBlock = response.data.data
      const result = {
        block: accountBlock,
      }
      this.logger.log(`Blocked account id=[${accountId}] with block= %o`, createAccountBlockDto)

      return result
    }
    catch(error) {
      throw(createBaaSException(error, 'Account'))
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
      const url         = `${this.coreAccountsUrl}/${accountId}/blocks`
      const axiosConfig = {
        headers: {
          'Customer-Id': customerId,
          'Tenant-Id':   tenantId,
        }
      }
      const response  = await axios.get(url, axiosConfig)
      const blocks    = response.data.data
      const result    = {
        blocks: blocks,
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
  async remove(
    accountId:      string, 
    accountBlockId: string,
    customerId:     string,
    tenantId:       string) 
  {
    try {
      const url       = `${this.coreAccountsUrl}/${accountId}/blocks/${accountBlockId}`
      const axiosConfig = {
        headers: {
          'Customer-Id': customerId,
          'Tenant-Id':   tenantId,
        }
      }
      const response  = await axios.delete(url, axiosConfig)
      const block     = response.data.data
      const result    = {
        block: block
      }

      this.logger.log(
        `Removed account block id=[${accountBlockId}] for account, id=[${accountId}], result= %o`, 
        result
      )
      
      return result
    }
    catch(error) {
      throw(createBaaSException(error, 'Account'))
    }
  }
} // end of class AccountBlocksService
