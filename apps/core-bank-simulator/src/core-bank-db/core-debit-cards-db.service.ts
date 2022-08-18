//-----------------------------------------------------------------------------
// apps/core-bank-simulator/src/core-bank-db/core-debit-cards-db.service.ts
//-----------------------------------------------------------------------------
import { Injectable }             from '@nestjs/common'

import { 
  IDebitCard, 
  IUpdateDebitCardDto, 
}                                 from '@app/baas-interfaces'
import { 
  BaaSErrors,
  BaaSException,
  createBaaSException,
  BaaSErrorLabel,
  NotFoundError, 
}                                 from '@app/baas-errors'
import { WinstonLoggerService }   from '@app/winston-logger'


/**
 * @class CoreDebitCardsDBService
 */
@Injectable()
export class CoreDebitCardsDBService {
  private static  _default:     CoreDebitCardsDBService
  private         debitCardsDB: Map<string, IDebitCard>

  /**
   * @method constructor
   */
  constructor(private readonly logger: WinstonLoggerService) {
    this.debitCardsDB = new Map<string, IDebitCard>()
  }

  /**
   * @method instance
   */
  public static instance(logger: WinstonLoggerService) {
    if(!CoreDebitCardsDBService._default) {
      CoreDebitCardsDBService._default = new CoreDebitCardsDBService(logger)
    }
    return CoreDebitCardsDBService._default
  }

  /**
   * @method add
   */
  public add(debitCard: IDebitCard) : Promise<IDebitCard> {
    return new Promise( (resolve, reject) => {
      try {
        this.debitCardsDB.set(debitCard.id, debitCard)
        this.logger.log(`DebitCardsDB: added debit card= %o`, debitCard)

        resolve(debitCard)
      }
      catch(error) {
        reject(createBaaSException(error, BaaSErrorLabel.DebitCard))
      }
    })
  }

  /**
   * @method has
   */
  public has(debitCardId: string) : Promise<boolean> {
    return new Promise( (resolve, reject) => {
      try {
        const result = this.debitCardsDB.has(debitCardId) ? true : false
        resolve(result)
      }
      catch(error) {
        reject(createBaaSException(error, BaaSErrorLabel.DebitCard))
      }
    })
  }

  /**
   * @method findAll
   */
  public findAll() : Promise<IDebitCard[]> {
    return new Promise( (resolve, reject) => {
      try {
        let debitCardList: IDebitCard[] = []
        for(let debitCard of this.debitCardsDB.values()) {
          debitCardList.push(debitCard)
        }

        resolve(debitCardList)
      }
      catch(error) {
        reject(createBaaSException(error, BaaSErrorLabel.DebitCard))
      }
    })
  }

  /**
   * @method findOne
   */
  public findOne(debitCardId: string) : Promise<IDebitCard> {
    return new Promise( async (resolve, reject) => {
      try {
        if(!await this.has(debitCardId)) {
          return reject(this.debitCardNotFound(debitCardId))
        }
    
        const debitCard = this.debitCardsDB.get(debitCardId)
        resolve(debitCard)
      }
      catch(error) {
        reject(createBaaSException(error, BaaSErrorLabel.DebitCard))
      }
    })
  }

  /**
   * @method update
   */
  public update(
    debitCardId:        string, 
    updateDebitCardDto: IUpdateDebitCardDto) : Promise<IDebitCard> 
  {
    return new Promise( async (resolve, reject) => {
      try {
        if(!await this.has(debitCardId)) {
          return reject(this.debitCardNotFound(debitCardId))
        }

        let debitCard = this.debitCardsDB.get(debitCardId)
        debitCard     = {
          ...debitCard,
          ...updateDebitCardDto,
        }
        this.debitCardsDB.set(debitCard.id, debitCard)

        this.logger.log(`Updated debitCard id=[${debitCardId}], debitCard= %o`, debitCard)
        resolve(debitCard)
      }
      catch(error) {
        reject(createBaaSException(error, BaaSErrorLabel.DebitCard))
      }
    })
  }

  /**
   * @method remove
   */
  public remove(debitCardId: string) : Promise<boolean> {
    return new Promise( async (resolve, reject) => {
      try {
        if(!await this.has(debitCardId)) {
          return reject(this.debitCardNotFound(debitCardId))
        }

        this.debitCardsDB.delete(debitCardId)
        this.logger.log(`Deleted debitCard id=${debitCardId}`)

        resolve(true)
      }
      catch(error) {
        reject(createBaaSException(error, BaaSErrorLabel.DebitCard))
      }
    })
  }

  /**
   * @method debitCardNotFound
   */
  private debitCardNotFound(debitCardId: string): BaaSException {
    this.logger.error(`Debit card w/ id=${debitCardId} Not Found`)
    return new NotFoundError(
      BaaSErrors.debitcard.notFound, 
      `Debit Card w/ id=${debitCardId} Not Found`
    )
  }

} // end of class CoreDebitCardsDBService
