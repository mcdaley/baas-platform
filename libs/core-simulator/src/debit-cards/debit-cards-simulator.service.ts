//-----------------------------------------------------------------------------
// libs/core-simulator/src/core-simulator.service.ts
//-----------------------------------------------------------------------------
import { Injectable }           from '@nestjs/common'
import { v4 as uuidv4 }         from 'uuid'

import { CoreBank }             from '../core-bank'

import { 
  CardStatus,
  ICreateDebitCardDto, 
  ICreateDebitCardsBlockDto, 
  ICreateDebitCardsPinDto, 
  ICreateDebitCardsReissueDto, 
  IDebitCard,
  IDebitCardsBlock,
  IDebitCardsLimit,
  IUpdateDebitCardsLimitDto, 
}                               from '@app/baas-interfaces'
import { 
  NotFoundError,
  BaaSErrors, 
  BaaSExceptionFactory,
  BaaSException,
  BadRequestError, 
}                               from '@app/baas-errors'
import { WinstonLoggerService } from '@app/winston-logger'

/**
 * @class CoreDebitCardSimulatorService
 */
 @Injectable()
export class CoreDebitCardSimulator {
  private coreBank: CoreBank

  constructor(private readonly logger: WinstonLoggerService) {
    this.coreBank = CoreBank.instance()
  }

  /**
   * Helper method to build the debit-card from the CreateDebitCardDto.
   * @method buildDebitCard
   */
   private buildDebitCard(createDebitCardDto: ICreateDebitCardDto) : IDebitCard {
    let debitCard : IDebitCard = {
      id:                 uuidv4(),
      name_on_card:       createDebitCardDto.name_on_card,
      card_number:        '4532-2451-6628-6807',
      expiration_date:    '12/2025',
      status:             CardStatus.Inactive,
      cvv:                '448',
      pin:                '',
      atm_daily:          500,
      pos_daily:          2000,
      daily_transactions: 10,
      customer_id:        createDebitCardDto.customer_id,
      account_id:         createDebitCardDto.account_id,
      tenant_id:          `buffalo_bills`,
    }
    
    this.logger.log(`Built debit card= %o`, debitCard)

    return debitCard
  }

  /**
   * @method create
   */
  public create(createDebitCardDto: ICreateDebitCardDto) : Promise<IDebitCard> {
    return new Promise( (resolve, reject) => {
      try {
        const debitCard = this.buildDebitCard(createDebitCardDto)
        this.coreBank.setDebitCard(debitCard.id, debitCard)

        resolve(debitCard)
      }
      catch(error) {
        reject(BaaSExceptionFactory.create(error, `Debit Card`))
      }
    })
  }

  /**
   * @method  findAll
   */
  public findAll() : Promise<IDebitCard[]> {
    return new Promise( (resolve, reject) => {
      try {
        let debitCardList: IDebitCard[] = []
        for(let debitCard of this.coreBank.getDebitCards().values()) {
          debitCardList.push(debitCard)
        }
        resolve(debitCardList)
      }
      catch(error) {
        reject(BaaSExceptionFactory.create(error, `Debit Card`))
      }
    })
  }

  /**
   * @method  findOne
   */
   public findOne(debitCardId: string) : Promise<IDebitCard> {
    return new Promise( (resolve, reject) => {
      try {
        // Debit Card is Not Found
        if(!this.coreBank.hasDebitCard(debitCardId)) {
          return reject(this.debitCardNotFound(debitCardId))
        }

        const debitCard = this.coreBank.getDebitCard(debitCardId)
        this.logger.log(`Fetched debit card= %o`, debitCard)

        resolve(debitCard)
      }
      catch(error) {
        reject(BaaSExceptionFactory.create(error, `Debit Card`))
      }
    })
  }

  /**
   * @method activateDebitCard
   */
  public activateDebitCard(debitCardId: string) : Promise<boolean> {
    return new Promise( (resolve, reject) => {
      try {
        // Debit Card is Not Found
        if(!this.coreBank.hasDebitCard(debitCardId)) {
          return reject(this.debitCardNotFound(debitCardId))
        }

        let debitCard = this.coreBank.getDebitCard(debitCardId)
        debitCard     = {
          ...debitCard,
          status:  CardStatus.Active,
        }
        this.coreBank.setDebitCard(debitCard.id, debitCard)

        this.logger.log(`Activated debit card id=[${debitCardId}], status=[${debitCard.status}]`)
        resolve(true)
      }
      catch(error) {
        reject(BaaSExceptionFactory.create(error, `Debit Card`)) 
      }
    })
  }

  /**
   * @method blockDebitCard
   */
  public createDebitCardBlocks(
    debitCardId:              string,
    createDebitCardsBlockDto: ICreateDebitCardsBlockDto) : Promise<IDebitCardsBlock[]> 
  {
    return new Promise( (resolve, reject) => {
      try {
        // Debit Card is Not Found
        if(!this.coreBank.hasDebitCard(debitCardId)) {
          return reject(this.debitCardNotFound(debitCardId))
        }

        let debitCard : IDebitCard       = this.coreBank.getDebitCard(debitCardId)
        let block     : IDebitCardsBlock = {
          id:           uuidv4(),
          block_reason: createDebitCardsBlockDto.block_reason,
          block_date:   new Date(),
          is_active:    true,
        }

        // Add the block to the debit card.
        if(!debitCard.hasOwnProperty('blocks')) {
          // Create blocks array if account has never been blocked
          debitCard = {
            ...debitCard,
            blocks: [block]
          }
        }
        else {
          // Insert block at the beginning of the array and deactivate old blocks.
          debitCard.blocks.forEach( block => block.is_active = false)
          debitCard.blocks.unshift(block)
        }
        debitCard.status = CardStatus.Blocked
        this.coreBank.setDebitCard(debitCard.id, debitCard)

        this.logger.log(`Blocked debit card id=[${debitCardId}], block=[${block}]`)
        resolve(debitCard.blocks)
      }
      catch(error) {
        reject(BaaSExceptionFactory.create(error, `Debit Card`)) 
      }
    })  
  }

  /**
   * @method findAllDebitCardBlocks
   */
  public findAllDebitCardBlocks(debitCardId: string) : Promise<IDebitCardsBlock[]> {
    return new Promise( (resolve, reject) => {
      try {
        // Debit Card is Not Found
        if(!this.coreBank.hasDebitCard(debitCardId)) {
          return reject(this.debitCardNotFound(debitCardId))
        }

        let debitCard = this.coreBank.getDebitCard(debitCardId)
        let blocks    = debitCard.hasOwnProperty('blocks') ? debitCard.blocks : []

        this.logger.log(`Fetched blocks for debit card id=[${debitCardId}], blocks= o`, blocks)
        resolve(blocks)
      }
      catch(error) {
        reject(BaaSExceptionFactory.create(error, `Debit Card`)) 
      }
    })
  }

  /**
   * @method removeDebitCardBlocks
   */
  public removeDebitCardBlocks(
    debitCardId:      string, 
    debitCardBlockId: string) : Promise<IDebitCardsBlock[]> 
  {
    return new Promise( (resolve, reject) => {
      try {
        // Debit Card is Not Found
        if(!this.coreBank.hasDebitCard(debitCardId)) {
          return reject(this.debitCardNotFound(debitCardId))
        }

        let debitCard  = this.coreBank.getDebitCard(debitCardId)
        let blockFound = false

        // Remove the debit card block
        if(!debitCard.hasOwnProperty('blocks')) {
          // Error, card is not blocked
          this.logger.error(`Debit card id=[${debitCardId}] is not blocked`)
          return reject(
            new BadRequestError(
              BaaSErrors.debitcard.debitCardNotBlocked,
              `Debit card id=[${debitCardId}] is not blocked`
            )
          )
        }
        else {
          // Find and deactivate the block
          debitCard.blocks.forEach( (block) => {
            if(block.id === debitCardBlockId) {
              block.is_active = false
              blockFound      = true
            }
          })
        }

        // Return 404 error if the block is not found
        if(!blockFound) {
          this.logger.error(`Block Id==${debitCardBlockId}] for debit card id=${debitCardId} Not Found`)
          return reject(
            new NotFoundError(
              BaaSErrors.debitcard.blockNotFound, 
              `Block id=${debitCardBlockId} Not Found`
            )
          )
        }

        // Update the card status and return response
        debitCard.status = CardStatus.Active
        this.coreBank.setDebitCard(debitCard.id, debitCard)

        this.logger.log(`Removed block=[${debitCardBlockId}] for debit card id=[${debitCardId}]`)
        resolve(debitCard.blocks)
      }
      catch(error) {
        reject(BaaSExceptionFactory.create(error, `Debit Card`)) 
      }
    })
  }

  /**
   * @method findAllDebitCardsLimits
   */
  public findAllDebitCardsLimits(debitCardId: string) : Promise<IDebitCardsLimit> {
    return new Promise( (resolve, reject) => {
      try {
        // Debit Card is Not Found
        if(!this.coreBank.hasDebitCard(debitCardId)) {
          return reject(this.debitCardNotFound(debitCardId))
        }

        const debitCard       = this.coreBank.getDebitCard(debitCardId)
        const debitCardLimits = {
          atm_daily:          debitCard.atm_daily,
          pos_daily:          debitCard.pos_daily,
          daily_transactions: debitCard.daily_transactions,
        }
        this.logger.log(`Fetched debit card limits= %o`, debitCardLimits)

        resolve(debitCardLimits)
      }
      catch(error) {
        reject(BaaSExceptionFactory.create(error, `Debit Card`))
      }
    })
  }

  /**
   * @method updateDebitCardsLimits
   */
  public updateDebitCardsLimits(
    debitCardId:              string, 
    updateDebitCardsLimitDto: IUpdateDebitCardsLimitDto) : Promise<IDebitCardsLimit> 
  {
    return new Promise( (resolve, reject) => {
      try {
        // Debit Card is Not Found
        if(!this.coreBank.hasDebitCard(debitCardId)) {
          return reject(this.debitCardNotFound(debitCardId))
        }

        let debitCard = this.coreBank.getDebitCard(debitCardId)
        debitCard     = {
          ...debitCard,
          ...updateDebitCardsLimitDto,
        }
        this.coreBank.setDebitCard(debitCard.id, debitCard)

        // Fetch and return the updated limits
        const updatedDebitCard = this.coreBank.getDebitCard(debitCardId)
        const limits           = {
          atm_daily:          updatedDebitCard.atm_daily,
          pos_daily:          updatedDebitCard.pos_daily,
          daily_transactions: updatedDebitCard.daily_transactions,
        }
        this.logger.log(`Updated debit card limits= %o`, limits)

        resolve(limits)
      }
      catch(error) {
        reject(BaaSExceptionFactory.create(error, `Debit Card`))
      }
    })
  }

  /**
   * @method createDebitCardsPin
   */
  public createDebitCardsPin(
    debitCardId:      string, 
    debitCardsPinDto: ICreateDebitCardsPinDto) : Promise<boolean> 
  {
    return new Promise( (resolve, reject) => {
      try {
        // Debit Card is Not Found
        if(!this.coreBank.hasDebitCard(debitCardId)) {
          return reject(this.debitCardNotFound(debitCardId))
        }

        let debitCard = this.coreBank.getDebitCard(debitCardId)
        debitCard     = {
          ...debitCard,
          pin:  debitCardsPinDto.pin,
        }
        this.coreBank.setDebitCard(debitCard.id, debitCard)

        this.logger.log(`Created pin for debit card id=[${debitCardId}], pin= %s`, debitCard.pin)
        resolve(true)
      }
      catch(error) {
        reject(BaaSExceptionFactory.create(error, `Debit Card`))
      }
    })
  }

  /**
   * @method cancelDebitCard
   */
  public cancelDebitCard(debitCardId: string) : Promise<boolean> {
    return new Promise( (resolve, reject) => {
      try {
        // Debit Card is Not Found
        if(!this.coreBank.hasDebitCard(debitCardId)) {
          return reject(this.debitCardNotFound(debitCardId))
        }

        let debitCard = this.coreBank.getDebitCard(debitCardId)
         debitCard     = {
           ...debitCard,
           status:  CardStatus.Canceled,
         }
         this.coreBank.setDebitCard(debitCard.id, debitCard)
 
         this.logger.log(`Canceled debit card id=[${debitCardId}], status=[${debitCard.status}]`)
         resolve(true)
      }
      catch(error) {
        reject(BaaSExceptionFactory.create(error, `Debit Card`))
      }
    })
  }

  /**
   * @method reissueDebitCard
   */
  public reissueDebitCard(
    debitCardId:                string, 
    createDebitCardsReissueDto: ICreateDebitCardsReissueDto) : Promise<IDebitCard> 
  {
    return new Promise( (resolve, reject) => {
      try {
        // Debit Card is Not Found
        if(!this.coreBank.hasDebitCard(debitCardId)) {
          return reject(this.debitCardNotFound(debitCardId))
        }

        let debitCard = this.coreBank.getDebitCard(debitCardId)
        debitCard     = {
          ...debitCard,
          name_on_card:     createDebitCardsReissueDto.name_on_card,
          //* phone_number:     createDebitCardsReissueDto.phone_number,
          //* mailing_address:  createDebitCardsReissueDto.mailing_address,
        }
        this.coreBank.setDebitCard(debitCard.id, debitCard)

        this.logger.log(`Reissue debit card= %o`, debitCard)
        resolve(debitCard)
      }
      catch(error) {
        reject(BaaSExceptionFactory.create(error, `Debit Card`))
      }
    })
  }

  /**
   * @method accountNotFound
   */
  private debitCardNotFound(debitCardId: string): BaaSException {
    this.logger.error(`Debit Card w/ id=${debitCardId} Not Found`)
    return new NotFoundError(
      BaaSErrors.debitcard.notFound, 
      `Debit Card w/ id=${debitCardId} Not Found`
    )
  }
} // end of class CoreDebitCardsSimulator