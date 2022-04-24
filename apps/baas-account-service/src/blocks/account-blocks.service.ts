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
  async create(accountId: string, createAccountBlockDto: CreateAccountBlockDto) {
    try {
      const url         = `${this.coreAccountsUrl}/${accountId}/core-blocks`
      const response    = await axios.post(url, createAccountBlockDto)
      const { blocks }  = response.data
      const result = {
        blocks: blocks,
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
  async findAll(accountId: string) {
    try {
      const url         = `${this.coreAccountsUrl}/${accountId}/core-blocks`
      const response    = await axios.get(url)
      const { blocks }  = response.data
      const result = {
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
  async remove(accountId: string, accountBlockId: string) {
    try {
      const url       = `${this.coreAccountsUrl}/${accountId}/core-blocks/${accountBlockId}`
      const response  = await axios.delete(url)
      const result    = response.data
      this.logger.log(`Removed account block id=[${accountBlockId}] for account, id=[${accountId}]`)
      
      return result
    }
    catch(error) {
      throw(createBaaSException(error, 'Account'))
    }
  }
} // end of class AccountBlocksService
