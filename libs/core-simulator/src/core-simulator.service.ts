//-----------------------------------------------------------------------------
// libs/core-simulator/src/core-simulator.service.ts
//-----------------------------------------------------------------------------
import { Injectable }           from '@nestjs/common'
import { v4 as uuidv4 }         from 'uuid'

import { CoreBank }             from './core-bank'

import { 
  AccountType,
  AccountStatus,
  AccountBlockStatus,
  AccountBlockType,
  ICreateAccountDto,
  IAccount,
  IUpdateAccountDto,
  ICreateParticipantDto,
  IParticipant,
  ICreateAccountBlockDto,
  IAccountBlock,
}                               from '@app/baas-interfaces'
import { 
  BaaSErrors, 
  BaaSException, 
  BaaSExceptionFactory,
  NotFoundError, 
}                               from '@app/baas-errors'
import { WinstonLoggerService } from '@app/winston-logger'


/**
 * @class CoreSimulatorService
 */
@Injectable()
export class CoreSimulatorService {
  private coreBank: CoreBank

  constructor(private readonly logger: WinstonLoggerService) {
    this.coreBank = CoreBank.instance()
  }

  /**
   * Helper method to build the account from the CreateAccountDto.
   * 
   * @method buildAccount
   */
   private buildAccount(createAccountDto: ICreateAccountDto) : IAccount {
    let account: IAccount = {
      id:                     uuidv4(),
      tenant_id:              uuidv4(),
      account_number:         '1111-2222-3333',
      routing_number:         '5555-6666',
      account_status:         AccountStatus.Open,
      //* currency:              Currency.USD,
      name_on_account:        'Marv Levy',
      name:                   `Marv Levy - ${createAccountDto.account_type}`,
      nickname:               '',
      multiple_participants:  false,
      available_balance:      0,
      posted_balance:         0,
      created_at:             new Date(),
      updated_at:             new Date(),
      account_type:           createAccountDto.account_type,
      participants:           createAccountDto.participants.map( (participant) => {
        return {
          created_at: new Date(),
          updated_at: new Date(),
          ...participant
        }
      })

    }
    this.logger.log(`Built account= %o`, account)

    return account
  }

  /**
   * @method create
   */
  public create(createAccountDto: ICreateAccountDto) : Promise<IAccount> {
    this.logger.log(`Create new DDA account w/ createAccountDto= %o`, createAccountDto)

    return new Promise( (resolve, reject) => {
      try {
        const account = this.buildAccount(createAccountDto)
        this.coreBank.setAccount(account.id, account)

        resolve(account)
      }
      catch(error) {
        reject(BaaSExceptionFactory.create(error, `Account`))
      }
    })
  }

  /**
   * @method findAll
   */
  public findAll(): Promise<IAccount[]> {
    return new Promise( (resolve, reject) => {
      try {
        const accounts: IAccount[] = this.coreBank.getAccounts()
        resolve(accounts)
      }
      catch(error) {
        reject(BaaSExceptionFactory.create(error, `Account`))
      }
    })
  }

  /**
   * @method findOne
   */
  public findOne(accountId: string) : Promise<IAccount> {
    return new Promise( (resolve, reject) => {
      try {
        if(!this.coreBank.hasAccount(accountId)) {
          // Account is Not Found
          return reject(this.accountNotFound(accountId))
        }

        const account = this.coreBank.getAccount(accountId)
        this.logger.log(`Fetched account= %o`, account)

        resolve(account)
      }
      catch(error) {
        reject(BaaSExceptionFactory.create(error, `Account`))
      }
    })
  }

  /**
   * @method update
   */
  public update(
    accountId:        string,
    updateAccountDto: IUpdateAccountDto) : Promise<IAccount> 
  {
    return new Promise( (resolve, reject) => {
      try {
        if(!this.coreBank.hasAccount(accountId)) {
          // Account is Not Found
          return reject(this.accountNotFound(accountId))
        }

        this.coreBank.updateAccount(accountId, updateAccountDto)
        const account = this.coreBank.getAccount(accountId)

        resolve(account)
      }
      catch(error) {
        reject(BaaSExceptionFactory.create(error, `Account`))
      }
    })
  }

  /**
   * @method remove
   */
  public remove(accountId: string) : Promise<boolean> {
    return new Promise( (resolve, reject) => {
      try {
        if(!this.coreBank.hasAccount(accountId)) {
          // Account is Not Found
          return reject(this.accountNotFound(accountId))
        }
        this.logger.log(`Remove the account id=[${accountId}]`)

        this.coreBank.removeAccount(accountId)
        resolve(true)
      }
      catch(error) {
        reject(BaaSExceptionFactory.create(error, `Account`))
      }
    })
  }

  /**
   * @method createParticipant
   */
  public createParticipant(
    accountId:            string, 
    createParticipantDto: ICreateParticipantDto) : Promise<IParticipant[]> 
  {
    return new Promise( (resolve, reject) => {
      try {
        if(!this.coreBank.hasAccount(accountId)) {
          return reject(this.accountNotFound(accountId))
        }
        this.logger.log(`Add participant for account id=[${accountId}]`)

        ///////////////////////////////////////////////////////////////////////
        // NOTE: 04/11/2022
        // I'm NOT creating a participant Id and I'm just using the 
        // customer_id as the unique identifier.
        ///////////////////////////////////////////////////////////////////////
        let account     : IAccount     = this.coreBank.getAccount(accountId)
        let participant : IParticipant = {
          created_at: new Date(),
          updated_at: new Date(),
          ...createParticipantDto
        }

        // Add the participant to the account
        if(!account.hasOwnProperty('participants')) {
          // Create participants array if account does not have any particpants
          account = {
            ...account,
            multiple_participants:  false,
            participants:           [participant]
          }
        }
        else {
          // Insert participant at the beginning of the array
          account.participants.unshift(participant)
          account.multiple_participants = true
        }
        this.coreBank.setAccount(account.id, account)

        this.logger.log(`Added participant for card id=[${accountId}], participant=[${participant}]`)
        resolve(account.participants)
      }
      catch(error) {
        reject(BaaSExceptionFactory.create(error, `Account Participants`))
      }
    })
  }

  /**
   * @method findAllParticipants
   */
  public findAllParticipants(accountId: string) : Promise<IParticipant[]> {
    return new Promise( (resolve, reject) => {
      try {
        if(!this.coreBank.hasAccount(accountId)) {
          return reject(this.accountNotFound(accountId))
        }

        ///////////////////////////////////////////////////////////////////////
        // NOTE: 04/17/2022
        // An Account will always have a participants array as it is required
        // in the ICreateAccountDto interface definition.
        ///////////////////////////////////////////////////////////////////////
        let account       = this.coreBank.getAccount(accountId)
        let participants  = account.hasOwnProperty('participants') ? account.participants : []

        resolve(participants)
      }
      catch(error) {
        reject(BaaSExceptionFactory.create(error, `Account Participants`))
      }
    })
  }

  /**
   * @method removeParticipants
   */
  public removeParticipants(
    accountId:              string, 
    participantCustomerId:  string) : Promise<IParticipant[]> 
  {
    return new Promise( (resolve, reject) => {
      try {
        if(!this.coreBank.hasAccount(accountId)) {
          return reject(this.accountNotFound(accountId))
        }

        let account = this.coreBank.getAccount(accountId)
        let index   = account.participants.findIndex( (participant) => {
          return participant.customer_id === participantCustomerId
        })

        // Participant not found
        if(index < 0) {
          let message = 
            `Failed to remove participants, participant customer id=[${participantCustomerId}]` +
            `Not Found for account w/ id=${accountId}`
          this.logger.error(message)
          
          return reject(
            new NotFoundError(BaaSErrors.account.participantNotFound, message)
          )
        }

        ///////////////////////////////////////////////////////////////////////
        // NOTE: 4/12/2022
        // CAN I REMOVE A PARTIPANT FROM AN ACCOUNT IF THE ACCOUNT HAS ONLY
        // ONE PARTICIPANT? THIS SEEMS LIKE IT SHOULD THROW AN EXCEPTION.
        //
        // ALSO IT SHOULD BE REQUIRED THAT AN ACCOUNT HAS ONE PARTICIPANT
        // THAT IS THE ACCOUNT "HOLDER"
        ///////////////////////////////////////////////////////////////////////

        // Remove particpant
        account.participants.splice(index, 1)
        account.multiple_participants = account.participants.length <= 1 ? false : true
        this.coreBank.setAccount(account.id, account)

        resolve(account.participants)
      }
      catch(error) {
        reject(BaaSExceptionFactory.create(error, `Account Participants`))
      }
    })
  }

  /**
   * @method createAccountBlock
   */
  public createAccountBlock(
    accountId:             string,
    createAccountBlockDto: ICreateAccountBlockDto) : Promise<IAccountBlock[]> 
  {
    return new Promise( (resolve, reject) => {
      try {
        if(!this.coreBank.hasAccount(accountId)) {
          return reject(this.accountNotFound(accountId))
        }

        let account = this.coreBank.getAccount(accountId)
        let blocks  = account.hasOwnProperty('blocks') ? account.blocks : []
        let block   = {
          id:           uuidv4(),
          block_status: AccountBlockStatus.Active,
          created_at:   new Date(),
          updated_at:   new Date(),
          ...createAccountBlockDto
        }
        blocks.unshift(block)

        account.blocks          = blocks
        account.account_status  = AccountStatus.Blocked
        this.coreBank.setAccount(account.id, account)

        resolve(account.blocks)
      }
      catch(error) {
        reject(BaaSExceptionFactory.create(error, `Account Blocks`))
      }
    })
  }

  /**
   * @method findAll
   */
  public findAllAccountBlocks(accountId: string) : Promise<IAccountBlock[]> {
    return new Promise( (resolve, reject) => {
      try {
        if(!this.coreBank.hasAccount(accountId)) {
          return reject(this.accountNotFound(accountId))
        }

        let account = this.coreBank.getAccount(accountId)
        let blocks  = account.hasOwnProperty('blocks') ? account.blocks : []

        resolve(blocks)
      }
      catch(error) {
        reject(BaaSExceptionFactory.create(error, `Account Blocks`))
      }
    })
  }

  /**
   * @method removeAccountBlock
   */
  public removeAccountBlock(
    accountId:      string,
    accountBlockId: string) : Promise<IAccountBlock[]>
  {
    return new Promise( (resolve, reject) => {
      try {
        if(!this.coreBank.hasAccount(accountId)) {
          return reject(this.accountNotFound(accountId))
        }

        let account = this.coreBank.getAccount(accountId)
        
        // Return error if account is not blocked
        if(!account.hasOwnProperty('blocks')) {
          this.logger.error(`Account w/ id=${accountId} is not blocked`)
          return reject(
            new NotFoundError(
              BaaSErrors.account.accountBlockNotFound, 
              `Failed to cancel account block, account w/ id=${accountId} is not blocked`
            )
          )
        }

        let index = account.blocks.findIndex( block => block.id === accountBlockId)
        if(index < 0) {
          this.logger.error(
            `Account Block w/ id=[${accountBlockId}] is Not Found for Account w/ id=${accountId}`
          )
          return reject(
            new NotFoundError(
              BaaSErrors.account.accountBlockNotFound, 
              `Failed to cancel account block, account w/ id=${accountId} is not found`
            )
          )
        }

        // Unblock the account
        account.blocks[index].block_status  = AccountBlockStatus.Canceled
        account.account_status              = AccountStatus.Open

        resolve(account.blocks)
      }
      catch(error) {
        reject(BaaSExceptionFactory.create(error, `Account Blocks`))
      }
    })
  }

  /**
   * @method accountNotFound
   */
  private accountNotFound(accountId: string): BaaSException {
    this.logger.error(`Account w/ id=${accountId} Not Found`)
    return new NotFoundError(
      BaaSErrors.account.notFound, 
      `Account w/ id=${accountId} Not Found`
    )
  }

} // end of class CoreSimulatorService
