//-----------------------------------------------------------------------------
// apps/baas-account-service/src/accounts/accounts.service.ts
//-----------------------------------------------------------------------------
import { Injectable }           from '@nestjs/common'

import { CreateAccountDto }     from './dto/create-account.dto'
import { UpdateAccountDto }     from './dto/update-account.dto'

import { WinstonLoggerService } from '@app/winston-logger'
import { CoreSimulatorService } from '@app/core-simulator'

/**
 * @class AccountsService
 */
@Injectable()
export class AccountsService {
  constructor(
    private readonly logger:      WinstonLoggerService,
    private readonly coreService: CoreSimulatorService
  ) {}

  /**
   * @method create
   */
  async create(createAccountDto: CreateAccountDto) {
    try {
      const account = await this.coreService.create(createAccountDto)
      const result  = {
        account: account
      }

      return result
    }
    catch(error) {
      throw(error)
    }
  }

  /**
   * @method findAll
   */
  async findAll() {
    try {
      const accounts = await this.coreService.findAll()
      const result   = {
        accounts: accounts
      }

      return result
    }
    catch(error) {
      throw(error)
    }
  }

  /**
   * @method findOne
   */
  async findOne(accountId: string) {
    try {
      const account  = await this.coreService.findOne(accountId)
      const result   = {
        result: account
      }

      return result
    }
    catch(error) {
      throw(error)
    }
  }

  /**
   * @method remove
   */
  async update(accountId: string, updateAccountDto: UpdateAccountDto) {
    try {
      const account  = await this.coreService.update(accountId, updateAccountDto)
      const result   = {
        result: account
      }

      return result
    }
    catch(error) {
      throw(error)
    }
  }

  /**
   * @method remove
   */
  async remove(accountId: string) {
    try {
      const  result  = await this.coreService.remove(accountId)
      return result
    }
    catch(error) {
      throw(error)
    }
  }
} // end of class AccountsService
