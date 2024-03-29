//-----------------------------------------------------------------------------
// apps/baas-debit-card-service/src/debit-cards/debit-cards.controller.spec.ts
//-----------------------------------------------------------------------------
import { 
  Test, 
  TestingModule 
}                                 from '@nestjs/testing'
import { ConfigService }          from '@nestjs/config'
import { APP_INTERCEPTOR }        from '@nestjs/core'

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
import {
  RequestIdAsyncLocalStorageModule,
  RequestIdInterceptor,
}                                 from '@app/baas-async-local-storage'
import { WinstonLoggerService }   from '@app/winston-logger'
import { CoreDebitCardSimulator } from '@app/core-simulator'
import { uuid } from '@app/baas-utils'

// Import test data
import { 
  customerFactoryData,
  accountFactoryData,
  createDebitCardDtoFactoryData,
  debitCardFactoryData,
  BaasApplication,
  setMockConfigService,
}                                 from '../../../../test/'


/**
 * Setup environment and test data
 */
const mockConfigService   = setMockConfigService(BaasApplication.DebitCardService)
const customerData        = customerFactoryData.joe_ferguson
const accountData         = accountFactoryData.checking_1
const createDebitCardDto  = createDebitCardDtoFactoryData.checking_1
const debitCardData       = debitCardFactoryData.checking_1
const customerId          = customerData.id
const tenantId            = customerData.tenant_id
const idempotencyKey      = uuid()

/**
 * DebitCardsController
 */
describe(`DebitCardsController`, () => {
  let debitCardsController:  DebitCardsController
  let debitCardsService:     DebitCardsService
  let configService:         ConfigService

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports:      [RequestIdAsyncLocalStorageModule.forRoot()],
      controllers:  [DebitCardsController],
      providers:    [
        DebitCardsService, 
        {
          provide:  ConfigService,
          useValue: mockConfigService,
        }, 
        {
          provide:  APP_INTERCEPTOR,
          useValue: RequestIdInterceptor,
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
      const requestHeaders = {
        'Customer-Id':      customerId,
        'Tenant-Id':        tenantId,
        'Idempotency-Key':  idempotencyKey,
      }
      const response = {
        debit_card: debitCardData,
      }

      const spy    = jest.spyOn(debitCardsService, 'create').mockResolvedValue(response)
      const result = await debitCardsController.createV1(
        requestHeaders, createDebitCardDto
      )

      expect(spy).toBeCalled()
      expect(spy).toBeCalledWith(createDebitCardDto, requestHeaders)
      expect(result).toBe(response)
    })
  })

  /**
   * findAllV1()
   */
  describe(`findAllV1`, () => {
    it(`Returns a list of debit cards`, async () => {
      const requestHeaders = {
        'Customer-Id':      customerId,
        'Tenant-Id':        tenantId,
      }
      const response = {
        debit_cards: [debitCardData],
      }

      const spy    = jest.spyOn(debitCardsService, `findAll`).mockResolvedValue(response)
      const result = await debitCardsController.findAllV1(requestHeaders)

      expect(spy).toBeCalled()
      expect(spy).toBeCalledWith(requestHeaders)
      expect(result).toEqual(response)
    })
  })

  /**
   * findOneV1()
   */
  describe(`findOneV1`, () => {
    it(`Returns a debit card`, async () => {
      const debitCardId    = debitCardData.id
      const requestHeaders = {
        'Customer-Id':      customerId,
        'Tenant-Id':        tenantId,
      }
      const response = {
        debit_card: debitCardData,
      }

      const spy    = jest.spyOn(debitCardsService, `findOne`).mockResolvedValue(response)
      const result = await debitCardsController.findOneV1(requestHeaders, debitCardId)

      expect(spy).toBeCalled()
      expect(spy).toBeCalledWith(debitCardId, requestHeaders)
      expect(result).toEqual(response)
    })
  })

  /**
   * activateDebitCardV1()
   */
  describe(`activateDebitCardV1`, () => {
    it(`Activates a debit card`, async () => {
      const debitCardId    = debitCardData.id
      const requestHeaders = {
        'Customer-Id':      customerId,
        'Tenant-Id':        tenantId,
        'Idempotency-Key':  idempotencyKey,
      }
      const updateDebitCardDto = {
        status: CardStatus.Active
      }
      const activatedDebitCard  = {
        ...debitCardData,
        ...updateDebitCardDto
      }

      const response       = {
        debit_card: activatedDebitCard,
      }

      const spy    = jest.spyOn(debitCardsService, 'update').mockResolvedValueOnce(response)
      const result = await debitCardsController.activateDebitCardV1(
        requestHeaders, debitCardId
      )

      expect(spy).toBeCalled()
      expect(spy).toBeCalledWith( debitCardId, updateDebitCardDto, requestHeaders)
      expect(result.debit_card.status).toEqual(CardStatus.Active)
      expect(result).toEqual(response)
    })
  })

  /**
   * cancelDebitCardV1()
   */
  describe(`cancelDebitCardV1`, () => {
    it(`Cancels a debit card`, async () => {
      const debitCardId    = debitCardData.id
      const requestHeaders = {
        'Customer-Id':      customerId,
        'Tenant-Id':        tenantId,
        'Idempotency-Key':  idempotencyKey,
      }
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
      const result = await debitCardsController.cancelDebitCardV1(
        requestHeaders, debitCardId
      )

      expect(spy).toBeCalled()
      expect(spy).toBeCalledWith(debitCardId, updateDebitCardDto, requestHeaders)
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

      const debitCardId    = debitCardData.id
      const requestHeaders = {
        'Customer-Id':      customerId,
        'Tenant-Id':        tenantId,
        'Idempotency-Key':  idempotencyKey,
      }
      const updatedDebitCard = {
        ...debitCardData,
        ...updateDebitCardLimitsDto
      }
      const response = {
        debit_card: updatedDebitCard
      }

      const spy    = jest.spyOn(debitCardsService, 'update').mockResolvedValueOnce(response)
      const result = await debitCardsController.updateDebitCardLimitsV1(
        requestHeaders, debitCardId, updateDebitCardLimitsDto
      )

      expect(spy).toBeCalled()
      expect(spy).toBeCalledWith(debitCardId, updateDebitCardLimitsDto, requestHeaders)
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

      const debitCardId    = debitCardData.id
      const requestHeaders = {
        'Customer-Id':      customerId,
        'Tenant-Id':        tenantId,
        'Idempotency-Key':  idempotencyKey,
      }
      const updatedDebitCard = {
        ...debitCardData,
        ...updateDebitCardPinDto
      }
      const response = {
        debit_card: updatedDebitCard
      }

      const spy    = jest.spyOn(debitCardsService, 'update').mockResolvedValueOnce(response)
      const result = await debitCardsController.updateDebitCardPinV1(
        requestHeaders, debitCardId, updateDebitCardPinDto
      )

      expect(spy).toBeCalled()
      expect(spy).toBeCalledWith(debitCardId, updateDebitCardPinDto, requestHeaders)
      expect(result).toEqual(response)
    })
  })
 }) // end of describe DebitCardsController