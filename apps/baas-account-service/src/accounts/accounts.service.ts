//-----------------------------------------------------------------------------
// apps/baas-account-service/src/accounts/accounts.service.ts
//-----------------------------------------------------------------------------
import { Injectable }           from '@nestjs/common'
import { ConfigService }        from '@nestjs/config'
import axios                    from 'axios'

import { CreateAccountDto }     from './dto/create-account.dto'
import { UpdateAccountDto }     from './dto/update-account.dto'

import { WinstonLoggerService } from '@app/winston-logger'
import { CoreSimulatorService } from '@app/core-simulator'
import { createBaaSException }  from '@app/baas-errors'

/**
 * @class AccountsService
 */
@Injectable()
export class AccountsService {
  private coreAccountsUrl: string

  constructor(
    private readonly configService: ConfigService,
    private readonly logger:        WinstonLoggerService,
    private readonly coreService:   CoreSimulatorService
  ) {
    this.coreAccountsUrl = configService.get('bankSimulatorAccountsUrl')
    this.logger.log(`Initialized the Account Simulator URL= %s`, this.coreAccountsUrl)
  }

  /**
   * @method create
   */
  async create(createAccountDto: CreateAccountDto) {
    try {
      const response    = await axios.post(this.coreAccountsUrl, createAccountDto)
      const { account } = response.data
      const result      = {
        account: account
      }

      return result
    }
    catch(error) {
      throw(createBaaSException(error, 'Account'))
    }
  }

  /**
   * @method findAll
   */
  async findAll() {
    try {
      const response      = await axios.get(this.coreAccountsUrl)
      const { accounts }  = response.data
      const result  = {
        accounts: accounts
      }

      return result
    }
    catch(error) {
      throw(createBaaSException(error, 'Account'))
    }
  }

  /**
   * @method findOne
   */
  async findOne(accountId: string) {
    try {
      const url         = `${this.coreAccountsUrl}/${accountId}`
      const response    = await axios.get(url)
      const { account } = response.data
      const result = {
        account: account
      }

      return result
    }
    catch(error) {
      throw(createBaaSException(error, 'Account'))
    }
  }

  /**
   * @method update
   */
  async update(accountId: string, updateAccountDto: UpdateAccountDto) {
    try {
      const url         = `${this.coreAccountsUrl}/${accountId}`
      const response    = await axios.patch(url, updateAccountDto)
      const { account } = response.data
      const result = {
        account: account
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
  async remove(accountId: string) {
    try {
      const  url      = `${this.coreAccountsUrl}/${accountId}`
      const  response = await axios.delete(url)
      const  result   = response.data

      return result
    }
    catch(error) {
      throw(createBaaSException(error, 'Account'))
    }
  }
} // end of class AccountsService
