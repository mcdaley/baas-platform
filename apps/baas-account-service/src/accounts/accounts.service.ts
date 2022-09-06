//-----------------------------------------------------------------------------
// apps/baas-account-service/src/accounts/accounts.service.ts
//-----------------------------------------------------------------------------
import { Injectable }           from '@nestjs/common'
import { ConfigService }        from '@nestjs/config'
import axios                    from 'axios'

import { CreateAccountDto }     from './dto/create-account.dto'
import { UpdateAccountDto }     from './dto/update-account.dto'
import { CustomersService }     from '../customers/customers.service'

import { 
  IAccountListResponse, 
  IAccountResponse, 
  ICustomer 
}                               from '@app/baas-interfaces'
import { 
  BaaSErrorLabel, 
  createBaaSException, 
  IBaaSRequestHeaders
}                               from '@app/baas-errors'
import { WinstonLoggerService } from '@app/winston-logger'

/**
 * @class AccountsService
 */
@Injectable()
export class AccountsService {
  private coreAccountsUrl: string

  constructor(
    private readonly configService:     ConfigService,
    private readonly logger:            WinstonLoggerService,
    private readonly customersService:  CustomersService,
  ) {
    this.coreAccountsUrl = configService.get('bankSimulatorAccountsUrl')
  }

  /**
   * @method create
   */
  async create(
    createAccountDto: CreateAccountDto,
    requestHeaders:   IBaaSRequestHeaders) : Promise<IAccountResponse> 
  {
    try {
      // Define axios request headers
      const axiosConfig = {
        headers: requestHeaders,
      }

      // Validate the account participants and find account holder/owner
      const participantCustomers = await this.customersService.verifyCustomers(
        createAccountDto.participants, axiosConfig
      )
      const accountHolder = await this.customersService.findAccountHolder(
        createAccountDto, participantCustomers
      )

      createAccountDto  = this.fillInCreateAccountDtoFields(createAccountDto, accountHolder)

      const response    = await axios.post(this.coreAccountsUrl, createAccountDto, axiosConfig)
      const account     = response.data.data

      const result = {
        account: account
      }

      this.logger.log({message: `Created account id = ${account.id}`})
      return result
    }
    catch(error) {
      this.logger.error({
        message:  `Failed to create account`, 
        error:    error
      })
      throw(createBaaSException(error, BaaSErrorLabel.Account))
    }
  }

  /**
   * @method findAll
   */
  async findAll(
    requestHeaders: IBaaSRequestHeaders) : Promise<IAccountListResponse> 
  {
    try {
      const axiosConfig = {
        headers: requestHeaders,
      }
      const response    = await axios.get(this.coreAccountsUrl, axiosConfig)
      const accounts    = response.data.data
      const result      = {
        accounts: accounts
      }

      this.logger.log({
        message: `Fetched ${accounts.length} accounts for customer id = [${requestHeaders['Customer-Id']}]`
      })
      return result
    }
    catch(error) {
      throw(createBaaSException(error, BaaSErrorLabel.Account))
    }
  }

  /**
   * @method findOne
   */
  async findOne(
    accountId:      string,
    requestHeaders: IBaaSRequestHeaders) : Promise<IAccountResponse> 
  {
    try {
      const url         = `${this.coreAccountsUrl}/${accountId}`
      const axiosConfig = {
        headers: requestHeaders,
      }
      const response  = await axios.get(url, axiosConfig)
      const account   = response.data.data
      const result    = {
        account: account
      }

      this.logger.log({
        message: `Fetched account id = [${accountId}] for customer id = [${requestHeaders['Customer-Id']}]`
      })
      return result
    }
    catch(error) {
      throw(createBaaSException(error, BaaSErrorLabel.Account))
    }
  }

  /**
   * @method update
   */
  async update(
    accountId:        string, 
    updateAccountDto: UpdateAccountDto,
    requestHeaders:   IBaaSRequestHeaders) 
  {
    try {
      const url         = `${this.coreAccountsUrl}/${accountId}`
      const axiosConfig = {
        headers: requestHeaders
      }
      const response = await axios.patch(url, updateAccountDto, axiosConfig)
      const account  = response.data.data
      const result   = {
        account: account
      }

      this.logger.log({
        message: `Updated account id = [${accountId}]`
      })
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
    accountId:      string,
    requestHeaders: IBaaSRequestHeaders) : Promise<boolean> 
  {
    try {
      const url         = `${this.coreAccountsUrl}/${accountId}`
      const axiosConfig = {
        headers: requestHeaders,
      }
      const response = await axios.delete(url, axiosConfig)
      const result   = response.data

      this.logger.log({
        message: `Remove account id = [${accountId}]`
      })
      return result
    }
    catch(error) {
      throw(createBaaSException(error, BaaSErrorLabel.Account))
    }
  }

  /**
   * Add the "name_on_account" and the "name" of the account fields if they
   * were not defined in the create account request.
   * 
   * @method fillInCreateAccountDtoFields
   */
  private fillInCreateAccountDtoFields(
    createAccountDto: CreateAccountDto, 
    accountHolder:    ICustomer) : CreateAccountDto 
  {
    let result: CreateAccountDto = { ...createAccountDto }

    // Set name of account holder if not specified in request
    if( !createAccountDto.hasOwnProperty('name_on_account') ||
        result.name_on_account === '' ) 
    { 
      result.name_on_account = `${accountHolder.first_name} ${accountHolder.last_name}`
    }

    // Set account name if not specified in request
    if( !createAccountDto.hasOwnProperty('name') || 
        createAccountDto.name === '' ) 
    {
      result.name = `${result.name_on_account} ${result.account_type}`
    }

    return result
  }
} // end of class AccountsService
