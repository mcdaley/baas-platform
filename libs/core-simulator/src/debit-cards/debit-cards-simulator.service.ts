//-----------------------------------------------------------------------------
// libs/core-simulator/src/core-simulator.service.ts
//-----------------------------------------------------------------------------
import { Injectable }           from '@nestjs/common'
import { v4 as uuidv4 }         from 'uuid'

import { CoreBank }             from '../core-bank'

import { 
  CardStatus,
  ICreateDebitCardDto, 
  IDebitCard, 
}                               from '@app/baas-interfaces'
import { 
  NotFoundError,
  BaaSErrors, 
  BaaSExceptionFactory,
  BaaSException, 
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
      credit_limit:       5000,
      available_balance:  0,
      posted_balance:     0,
      atm_daily:          500,
      pos_daily:          2000,
      daily_transactions: 10,
      phone_number:       createDebitCardDto.phone_number,
      mailing_address:    createDebitCardDto.mailing_address,
      customer_id:        createDebitCardDto.customer_id,
      account_id:         createDebitCardDto.account_id,
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
   * @method accountNotFound
   */
  private debitCardNotFound(debitCardId: string): BaaSException {
    this.logger.error(`Debit Card w/ id=${debitCardId} Not Found`)
    return new NotFoundError(
      BaaSErrors.debitCard.notFound, 
      `Debit Card w/ id=${debitCardId} Not Found`
    )
  }
} // end of class CoreDebitCardsSimulator