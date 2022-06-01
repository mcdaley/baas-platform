//-----------------------------------------------------------------------------
// apps/core-bank-simulator/src/core-bank-db/core-accounts-db.service.ts
//-----------------------------------------------------------------------------
import { Injectable }           from '@nestjs/common'
import { v4 as uuidv4 }         from 'uuid'

import { 
  BaaSErrors, 
  NotFoundError, 
  BaaSException, 
  createBaaSException, 
}                               from '@app/baas-errors'
import { 
  IAccount, 
  IUpdateAccountDto,
  ICreateParticipantDto,
  IParticipant,
  IAccountBlock,
  AccountBlockStatus,
  AccountStatus, 
}                               from '@app/baas-interfaces'
import { WinstonLoggerService } from '@app/winston-logger'
import { CreateAccountsBlockDto } from '../accounts/blocks/dto/create-accounts-block.dto'

/**
 * @class CoreAccountsDBService
 */
@Injectable()
export class CoreAccountsDBService {
  private static  _default:     CoreAccountsDBService
  private         coreAccounts: Map<string, IAccount>

  /**
   * @method constructor
   */
  constructor(private readonly logger: WinstonLoggerService) {
    this.coreAccounts = new Map<string, IAccount>()
  }

  /**
   * @method instance
   */
  public static instance(logger: WinstonLoggerService) {
    if(!CoreAccountsDBService._default) {
      CoreAccountsDBService._default = new CoreAccountsDBService(logger)
    }
    return CoreAccountsDBService._default
  }

  /**
   * @method add
   */
  public add(account: IAccount) : Promise<IAccount> {
    return new Promise( (resolve, reject) => {
      try {
        this.coreAccounts.set(account.id, account)
        this.logger.log(`AccountsDB: added account= %o`, account)

        resolve(account)
      }
      catch(error) {
        reject(createBaaSException(error, `Account`))
      }
    })
  }

  /**
   * @method has
   */
  public has(accountId: string) : Promise<boolean> {
    return new Promise( (resolve, reject) => {
      try {
        const result = this.coreAccounts.has(accountId) ? true : false
        resolve(result)
      }
      catch(error) {
        reject(createBaaSException(error, `Account`))
      }
    })
  }

  /**
   * @method findAll
   */
   public findAll() : Promise<IAccount[]> {
    return new Promise( (resolve, reject) => {
      try {
        let accountList: IAccount[] = []
        for(let account of this.coreAccounts.values()) {
          accountList.push(account)
        }

        resolve(accountList)
      }
      catch(error) {
        reject(createBaaSException(error, `Account`))
      }
    })
  }

  /**
   * @method findOne
   */
  public findOne(accountId: string) : Promise<IAccount> {
    return new Promise( async (resolve, reject) => {
      try {
        if(!await this.has(accountId)) {
          return reject(this.accountNotFound(accountId))
        }
    
        const account = this.coreAccounts.get(accountId)
        resolve(account)
      }
      catch(error) {
        reject(createBaaSException(error, `Account`))
      }
    })
  }

  /**
   * @method update
   */
  public update(
    accountId:            string, 
    updateCoreAccountDto: IUpdateAccountDto) : Promise<IAccount> 
  {
    return new Promise( async (resolve, reject) => {
      try {
        if(!await this.has(accountId)) {
          return reject(this.accountNotFound(accountId))
        }

        let account = this.coreAccounts.get(accountId)
        account     = {
          ...account,
          ...updateCoreAccountDto,
        }
        this.coreAccounts.set(account.id, account)

        this.logger.log(`Updated account id=[${accountId}], account= %o`, account)
        resolve(account)
      }
      catch(error) {
        reject(createBaaSException(error, `Account`))
      }
    })
  }

  /**
   * @method remove
   */
  public remove(accountId: string) : Promise<boolean> {
    return new Promise( async (resolve, reject) => {
      try {
        if(!await this.has(accountId)) {
          return reject(this.accountNotFound(accountId))
        }

        this.coreAccounts.delete(accountId)
        this.logger.log(`Deleted account id=${accountId}`)

        resolve(true)
      }
      catch(error) {
        reject(createBaaSException(error, `Account`))
      }
    })
  }

  /**
   * @method createCoreParticipant
   */
   public createCoreParticipant(
    accountId:            string, 
    createParticipantDto: ICreateParticipantDto) : Promise<IParticipant[]> 
  {
    return new Promise( async (resolve, reject) => {
      try {
        if(!await this.has(accountId)) {
          return reject(this.accountNotFound(accountId))
        }
        this.logger.log(`Add participant for account id=[${accountId}]`)

        ///////////////////////////////////////////////////////////////////////
        // NOTE: 04/11/2022
        // I'm NOT creating a participant Id and I'm just using the 
        // participant_customer_id as the unique identifier.
        ///////////////////////////////////////////////////////////////////////
        let account     : IAccount     = this.coreAccounts.get(accountId)
        let participant : IParticipant = {
          //* id:           uuid(),
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
        this.coreAccounts.set(account.id, account)

        this.logger.log(`Added participant for card id=[${accountId}], participant=[${participant}]`)
        resolve(account.participants)
      }
      catch(error) {
        reject(createBaaSException(error, `Account Participants`))
      }
    })
  }

  /**
   * @method findAllCoreParticipants
   */
  findAllCoreParticipants(accountId: string): Promise<IParticipant[]> {
    return new Promise( async (resolve, reject) => {
      try {
        if(!await this.has(accountId)) {
          return reject(this.accountNotFound(accountId))
        }

        ///////////////////////////////////////////////////////////////////////
        // NOTE: 04/13/2022
        // The participants array should always have 1 value in it. Logic
        // will depend on the core bank engine.
        ///////////////////////////////////////////////////////////////////////

        let account       = this.coreAccounts.get(accountId)
        let participants  = account.hasOwnProperty('participants') ? account.participants : []
        account.multiple_participants = participants.length <= 1 ? false : true
        
        this.logger.log(`Fetched participants for card id=[${accountId}], participants= %o`, participants)
        resolve(participants)
      }
      catch(error) {
        reject(createBaaSException(error, `Account`))
      }
    })
  }

  /**
   * @method removeCoreParticipants
   */
   removeCoreParticipants(
    accountId:             string, 
    participantConsumerId: string) : Promise<IParticipant[]> 
  {
    return new Promise( async (resolve, reject) => {
      try {
        if(!await this.has(accountId)) {
          return reject(this.accountNotFound(accountId))
        }

        let account = this.coreAccounts.get(accountId)
        let index   = account.participants.findIndex( (participant) => {
          return participant.participant_customer_id === participantConsumerId
        })

        // Participant not found
        if(index < 0) {
          let message = 
            `Failed to remove participants, participant consumer id=[${participantConsumerId}]` +
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
        this.coreAccounts.set(account.id, account)

        resolve(account.participants)
      }
      catch(error) {
        reject(createBaaSException(error, `Account Participant`))
      }
    })
  }

  /**
   * @method createCoreAccountsBlock
   */
   createCoreAccountsBlock(
    accountId:              string, 
    createAccountBlockDto:  CreateAccountsBlockDto) : Promise<IAccountBlock[]> 
  {
    return new Promise( async (resolve, reject) => {
      try {
        if(!await this.has(accountId)) {
          return reject(this.accountNotFound(accountId))
        }

        let account = this.coreAccounts.get(accountId)
        let blocks  = account.hasOwnProperty('blocks') ? account.blocks : []
        let block   = {
          id:           uuidv4(),
          block_status: AccountBlockStatus.Active,
          ...createAccountBlockDto
        }
        blocks.unshift(block)

        account.blocks          = blocks
        account.account_status  = AccountStatus.Blocked
        this.coreAccounts.set(account.id, account)

        resolve(account.blocks)
      }
      catch(error) {
        reject(createBaaSException(error, `Account Blocks`))
      }
    })
  }

  /**
   * @method findAllCoreAccountsBlocks
   */
   findAllCoreAccountsBlocks(accountId: string): Promise<IAccountBlock[]> {
    return new Promise( async (resolve, reject) => {
      try {
        if(!await this.has(accountId)) {
          return reject(this.accountNotFound(accountId))
        }

        let account = this.coreAccounts.get(accountId)
        let blocks  = account.hasOwnProperty('blocks') ? account.blocks : []

        resolve(blocks)
      }
      catch(error) {
        reject(createBaaSException(error, `Account Blocks`))
      }
    })
  }

  /**
   * @method removeCoreAccountsBlock
   */
   removeCoreAccountsBlock(
    accountId:      string, 
    accountBlockId: string): Promise<IAccountBlock[]> 
  {
    return new Promise( async (resolve, reject) => {
      try {
        if(!await this.has(accountId)) {
          return reject(this.accountNotFound(accountId))
        }

        let account = this.coreAccounts.get(accountId)
        
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
        this.coreAccounts.set(account.id, account)

        resolve(account.blocks)
      }
      catch(error) {
        reject(createBaaSException(error, `Account Block`))
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
} // end of class CoreAccountsDBService
