//-----------------------------------------------------------------------------
// apps/baas-account-service/src/accounts/accounts.service.ts
//-----------------------------------------------------------------------------
import { Injectable }           from '@nestjs/common'
import { ConfigService }        from '@nestjs/config'
import axios                    from 'axios'

import { CreateAccountDto }     from './dto/create-account.dto'
import { UpdateAccountDto }     from './dto/update-account.dto'
import { CustomersService }     from '../customers/customers.service'

import { WinstonLoggerService } from '@app/winston-logger'
import { CoreSimulatorService } from '@app/core-simulator'
import { createBaaSException }  from '@app/baas-errors'
import { ICustomer } from '@app/baas-interfaces'

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
    private readonly coreService:       CoreSimulatorService,
  ) {
    this.coreAccountsUrl = configService.get('bankSimulatorAccountsUrl')
    this.logger.log(`Initialized the Account Simulator URL= %s`, this.coreAccountsUrl)
  }

  /**
   * @method create
   */
  async create(createAccountDto: CreateAccountDto) {
    try {
      // Validate the account participants and find account holder/owner
      const participantCustomers = await this.customersService.verifyCustomers(createAccountDto.participants)
      const accountHolder        = await this.customersService.findAccountHolder(
        createAccountDto, participantCustomers
      )
      //* this.logger.log(`[DEBUG] The account holder= %o`, accountHolder)

      createAccountDto  = this.fillInCreateAccountDtoFields(createAccountDto, accountHolder)
      const response    = await axios.post(this.coreAccountsUrl, createAccountDto)
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
