//-----------------------------------------------------------------------------
// apps/core-bank-simulator/src/accounts/accounts.service.ts
//-----------------------------------------------------------------------------
import { Injectable }             from '@nestjs/common'
import { InjectRepository }       from '@nestjs/typeorm'
import { Repository }             from 'typeorm'
import { v4 as uuidv4 }           from 'uuid'
import { faker }                  from '@faker-js/faker'

import { CreateAccountDto }       from './dto/create-core-account.dto'
import { UpdateAccountDto }       from './dto/update-core-account.dto'
import { Account }                from './entities/account.entity'
import { AccountToCustomer }      from './entities/account-to-customer.entity'

import { 
  AccountStatus, 
  IAccount, 
  ICreateAccountDto, 
  IUpdateAccountDto 
}                                 from '@app/baas-interfaces'
import { WinstonLoggerService }   from '@app/winston-logger'

/**
 * @class AccountsService
 */
@Injectable()
export class AccountsService {
  /**
   * @method constructor
   */
  constructor(
    @InjectRepository(Account) private accountRepository: Repository<Account>,
    @InjectRepository(AccountToCustomer) private participantRepository: Repository<AccountToCustomer>,
    private readonly logger: WinstonLoggerService,
  ) {}

  /**
   * @method create
   */
  async create(createAccountDto: CreateAccountDto) {
    try {
      // Build the account
      const account = this.buildAccount(createAccountDto)
      
      // Save the account to the DB and return it to caller
      const response = await this.accountRepository.save(account)
      const result   =  {
        data: response
      }

      this.logger.log(`Created account, result= %o`, result)
      return result
    }
    catch(error) {
      this.logger.error(`Failed to create the account, error= %o`, error)
      throw(error)
    }
  }

  /**
   * @method findAll
   */
  async findAll() {
    try {
      // Set up default pagination
      let start_index = 0
      let take        = 2
      let end_index   = start_index + take
      let is_more     = true

      // Query the DB
      const response = await this.accountRepository.findAndCount({
        relations:  ['participants', 'blocks'],
        skip:       start_index,
        take:       take,
      })
      const accounts  = response[0]
      const count     = response[1]

      // Reset pagination
      if(start_index + take > count) {
        is_more   = false
        end_index = count - 1
      }

      // Build and send the response
      const result = {
        data:     accounts,
        metadata: {
          pagination: {
            count:        count,
            start_index:  start_index,
            end_index:    end_index,
            is_more:      is_more,
          }
        }
      }

      this.logger.log(`Fetched [${accounts.length}] accounts`)
      return result
    }
    catch(error) {
      this.logger.error(`Failed to fetch the accounts, error= %o`, error)
      throw(error)
    }
  }

  /**
   * @method findOne 
   */
  async findOne(accountId: string) {
    try {
      const account = await this.accountRepository.findOne({
        where:      {id: accountId},
        relations:  ['participants', 'blocks'],
      })

      const result = {
        data: account,
      }

      this.logger.log(`Fetched account for id=[${accountId}], send result= %o`, result)
      return result
    }
    catch(error) {
      throw(error)
    }
  }

  /**
   * Updates an account using the repository "update" method and the fetches
   * and returns the updated account.
   * 
   * @method update
   */
  async update(accountId: string, updateAccountDto: UpdateAccountDto) {
    try {
      const response = await this.accountRepository.update({id: accountId}, updateAccountDto)
      const account  = await this.accountRepository.findOne({
        where:      {id: accountId},
        relations:  ['participants', 'blocks'],
      })

      const result  = {
        data: account
      }

      this.logger.log(`Updated account id=[${accountId}], send result= %o`, result)
      return result
    }
    catch(error) {
      this.logger.log(`Failed to update account id=[${accountId}], error= %o`, error)
      throw(error)
    }
  }

  /**
   * @method remove
   */
  async remove(accountId: string) {
    try {
      // Remove the participants
      await this.participantRepository
        .createQueryBuilder()
        .delete()
        .where('account_id = :accountId', {accountId: accountId})
        .execute()
      
      // Remove the account
      await this.accountRepository.delete(accountId)

      this.logger.log(`Removed account id=[${accountId}]`)
      return {
        message: `Dude, removed the account`
      }
    }
    catch(error) {
      this.logger.error(`Failed to remove account id=[${accountId}], error= %o`, error)
      throw(error)
    }
  }

  /**
   * @method buildAccount
   */
  private buildAccount(createAccountDto: ICreateAccountDto) : IAccount {
    /*
     * Build the account
     */
    let account = {
      //* id:                     uuidv4(),
      branch_id:              uuidv4(),
      account_number:         faker.finance.account(),
      routing_number:         faker.finance.routingNumber(),
      account_status:         AccountStatus.Open,
      // currency:               Currency.USD,
      multiple_participants:  createAccountDto.participants.length > 1 ? true : false,
      ...createAccountDto,
      available_balance:      0,
      posted_balance:         0,
      created_at:             new Date(),
      updated_at:             new Date(),
    }
    
    this.logger.log(`Built account= %o`, account)

    return <IAccount>account
  }

} // end of class AccountsService