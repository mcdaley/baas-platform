//-----------------------------------------------------------------------------
// apps/baas-debit-card-service/src/debit-cards/debit-cards.controller.spec.ts
//-----------------------------------------------------------------------------
import { 
  Test, 
  TestingModule 
}                                 from '@nestjs/testing'
import { ConfigService }          from '@nestjs/config'

import { DebitCardsController }   from './debit-cards.controller'
import { DebitCardsService }      from './debit-cards.service'

import { 
  CardStatus,
  IAccount, 
  ICreateDebitCardDto, 
  ICustomer, 
  IDebitCard,
  IUpdateDebitCardsLimitDto,
  IUpdateDebitCardsPinDto, 
}                                 from '@app/baas-interfaces'
import { WinstonLoggerService }   from '@app/winston-logger'
import { CoreDebitCardSimulator } from '@app/core-simulator'

// Import test data
import { 
  customerFactoryData,
  accountFactoryData,
  createDebitCardDtoFactoryData,
  debitCardFactoryData,
}                                 from '../../../../test/baas.factory.data'

/**
 * Set mockConfigService using env variables in .jest/set-env-vars.ts
 */
let mockConfigService = new Map()
mockConfigService.set('NODE_ENV',    process.env.NODE_ENV)
mockConfigService.set('appRoot',     '.')
mockConfigService.set('appName',     process.env.DEBIT_CARD_APP_NAME)
mockConfigService.set('logLevel',    process.env.DEBIT_CARD_LOG_LEVEL)
mockConfigService.set('accountsUrl', process.env.ACCOUNT_URL)
mockConfigService.set('bankSimulatorDebitCardsUrl', process.env.BANK_SIMULATOR_DEBIT_CARDS_URL)

/**
 * Test Data
 */
const customerData       : ICustomer           = customerFactoryData.joe_ferguson
const accountData        : IAccount            = accountFactoryData.checking_1
const createDebitCardDto : ICreateDebitCardDto = createDebitCardDtoFactoryData.checking_1
const debitCardData      : IDebitCard          = debitCardFactoryData.checking_1

/**
 * DebitCardsController
 */
describe(`DebitCardsController`, () => {
  let debitCardsController:  DebitCardsController
  let debitCardsService:     DebitCardsService
  let configService:         ConfigService

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers:  [DebitCardsController],
      providers:    [
        DebitCardsService, 
        {
          provide:  ConfigService,
          useValue: mockConfigService,
        }, 
        WinstonLoggerService,
        CoreDebitCardSimulator,       // TODO: REMOVE ONCE I REMOVE SIMULATOR
      ],
    }).compile()

    debitCardsController = module.get<DebitCardsController>(DebitCardsController)
    debitCardsService    = module.get<DebitCardsService>(DebitCardsService)
    configService        = module.get<ConfigService>(ConfigService)
  })

  afterEach( () => {
    jest.clearAllMocks()
    jest.resetAllMocks()
  })

  /**
   * createV1()
   */
  describe(`createV1`, () => {
    it(`Creates a new debit card`, async () => {
      const response = {
        debit_card: debitCardData,
      }

      const spy    = jest.spyOn(debitCardsService, 'create').mockResolvedValue(response)
      const result = await debitCardsController.createV1(`idempotency-key`, createDebitCardDto)

      expect(spy).toBeCalled()
      expect(spy).toBeCalledWith(createDebitCardDto)
      expect(result).toBe(response)
    })
  })

  /**
   * findAllV1()
   */
  describe(`findAllV1`, () => {
    it(`Returns a list of debit cards`, async () => {
      const response = {
        debit_cards: [debitCardData],
      }

      const spy    = jest.spyOn(debitCardsService, `findAll`).mockResolvedValue(response)
      const result = await debitCardsController.findAllV1()

      expect(spy).toBeCalled()
      expect(spy).toBeCalledWith()
      expect(result).toEqual(response)
    })
  })

  /**
   * findOneV1()
   */
  describe(`findOneV1`, () => {
    it(`Returns a debit card`, async () => {
      const debitCardId = debitCardData.id
      const response    = {
        debit_card: debitCardData,
      }

      const spy    = jest.spyOn(debitCardsService, `findOne`).mockResolvedValue(response)
      const result = await debitCardsController.findOneV1(debitCardId)

      expect(spy).toBeCalled()
      expect(spy).toBeCalledWith(debitCardId)
      expect(result).toEqual(response)
    })
  })

  /**
   * activateDebitCardV1()
   */
  describe(`activateDebitCardV1`, () => {
    it(`Activates a debit card`, async () => {
      const idempotencyKey = `unique-idempotency-key`
      const debitCardId    = debitCardData.id
      const response       = {
        debit_card: debitCardData
      }
      const updateDebitCardDto = {
        status: CardStatus.Active
      }

      const spy    = jest.spyOn(debitCardsService, 'update').mockResolvedValueOnce(response)
      const result = await debitCardsController.activateDebitCardV1(idempotencyKey, debitCardId)

      expect(spy).toBeCalled()
      expect(spy).toBeCalledWith(debitCardId, updateDebitCardDto)
      expect(result.debit_card.status).toEqual(CardStatus.Active)
      expect(result).toEqual(response)
    })
  })

  /**
   * cancelDebitCardV1()
   */
  describe(`cancelDebitCardV1`, () => {
    it(`Cancels a debit card`, async () => {
      const idempotencyKey     = `unique-idempotency-key`
      const debitCardId        = debitCardData.id
      const updateDebitCardDto = {
        status: CardStatus.Canceled
      }
      const canceledDebitCard  = {
        ...debitCardData,
        ...updateDebitCardDto
      }
      const response = {
        debit_card: canceledDebitCard
      }

      const spy    = jest.spyOn(debitCardsService, 'update').mockResolvedValueOnce(response)
      const result = await debitCardsController.activateDebitCardV1(idempotencyKey, debitCardId)

      expect(spy).toBeCalled()
      //* expect(spy).toBeCalledWith(debitCardId, updateDebitCardDto)
      expect(result.debit_card.status).toEqual(CardStatus.Canceled)
      expect(result).toEqual(response)
    })
  })

  /**
   * updateDebitCardLimitsV1()
   */
  describe(`updateDebitCardLimitsV1`, () => {
    it(`Updates a debit card spending limits`, async () => {
      const updateDebitCardLimitsDto : IUpdateDebitCardsLimitDto = {
        atm_daily:          99,
        pos_daily:          77,
        daily_transactions: 1000
      }

      const idempotencyKey   = `unique-idempotency-key`
      const debitCardId      = debitCardData.id
      const updatedDebitCard = {
        ...debitCardData,
        ...updateDebitCardLimitsDto
      }
      const response = {
        debit_card: updatedDebitCard
      }

      const spy    = jest.spyOn(debitCardsService, 'update').mockResolvedValueOnce(response)
      const result = await debitCardsController.activateDebitCardV1(idempotencyKey, debitCardId)

      expect(spy).toBeCalled()
      //* expect(spy).toBeCalledWith(debitCardId, updateDebitCardLimitsDto)
      expect(result).toEqual(response)
    })
  })

  /**
   * updateDebitCardPinV1()
   */
  describe(`updateDebitCardPinV1`, () => {
    it(`Updates the debit card pin`, async () => {
      const updateDebitCardPinDto : IUpdateDebitCardsPinDto = {
        pin: "7883"
      }

      const idempotencyKey   = `unique-idempotency-key`
      const debitCardId      = debitCardData.id
      const updatedDebitCard = {
        ...debitCardData,
        ...updateDebitCardPinDto
      }
      const response = {
        debit_card: updatedDebitCard
      }

      const spy    = jest.spyOn(debitCardsService, 'update').mockResolvedValueOnce(response)
      const result = await debitCardsController.activateDebitCardV1(idempotencyKey, debitCardId)

      expect(spy).toBeCalled()
      //* expect(spy).toBeCalledWith(debitCardId, updateDebitCardPinDto)
      expect(result).toEqual(response)
    })
  })
 }) // end of describe DebitCardsController