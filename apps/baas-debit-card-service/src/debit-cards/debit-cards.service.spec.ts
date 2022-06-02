//-----------------------------------------------------------------------------
// apps/baas-debit-card-service/src/debit-cards/debit-cards.service.spec.ts
//-----------------------------------------------------------------------------
import { 
  Test, 
  TestingModule 
}                               from '@nestjs/testing'
import { ConfigService }        from '@nestjs/config'
import axios                    from 'axios'

import { DebitCardsService }    from './debit-cards.service'

import { 
  CardStatus,
  IAccount, 
  ICreateDebitCardDto, 
  ICustomer, 
  IDebitCard, 
}                               from '@app/baas-interfaces'
import { uuid }                 from '@app/baas-utils'
import { WinstonLoggerService } from '@app/winston-logger'
import { CoreDebitCardSimulator }  from '@app/core-simulator'   // TODO: REMOVE!

// Import test data
import {
  customerFactoryData,
  accountFactoryData,
  createDebitCardDtoFactoryData,
  debitCardFactoryData,
  BaasApplication,
  setMockConfigService,
}                                   from '../../../../test/'

/**
 * Setup test environment and data
 */
const mockConfigService   = setMockConfigService(BaasApplication.DebitCardService)
const customerData        = customerFactoryData.joe_ferguson
const accountData         = accountFactoryData.checking_1 
const createDebitCardDto  = createDebitCardDtoFactoryData.checking_1
const debitCardData       = debitCardFactoryData.checking_1

/**
 * DebitCardsService
 */
describe(DebitCardsService, () => {
  let debitCardsService : DebitCardsService
  let configService     : ConfigService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DebitCardsService, 
        { 
          provide:  ConfigService,
          useValue: mockConfigService,
        }, 
        WinstonLoggerService,
        CoreDebitCardSimulator,
      ],
    }).compile();

    configService     = module.get<ConfigService>(ConfigService)
    debitCardsService = module.get<DebitCardsService>(DebitCardsService)
  })

  /**
   * create()
   */
  describe(`create`, () => {
    it(`Creates a new debit card`, async () => {
      const url           = configService.get('bankSimulatorDebitCardsUrl')
      const axiosResponse = {
        data: {
          data: debitCardData
        },
      }

      const spy    = jest.spyOn(axios, 'post').mockResolvedValue(axiosResponse)
      const result = await debitCardsService.create(createDebitCardDto)

      expect(spy).toBeCalled()
      expect(spy).toBeCalledWith(url, createDebitCardDto)
      expect(result).toEqual({debit_card: debitCardData})
    })
  })

  /**
   * findAll()
   */
  describe(`findAll`, () => {
    it(`Returns a list of debit cards`, async () => {
      const url           = configService.get('bankSimulatorDebitCardsUrl')
      const axiosResponse = {
        data: {
          data: [debitCardData]
        },
      }

      const spy    = jest.spyOn(axios, 'get').mockResolvedValue(axiosResponse)
      const result = await debitCardsService.findAll()

      expect(spy).toBeCalled()
      expect(spy).toBeCalledWith(url)
      expect(result).toEqual({debit_cards: [debitCardData]})
    })
  })

  /**
   * findOne()
   */
  describe(`findOne`, () => {
    it(`Returns a debit card`, async () => {
      const debitCardId   = debitCardData.id
      const url           = `${configService.get('bankSimulatorDebitCardsUrl')}/${debitCardId}`
      const axiosResponse = {
        data: {
          data: debitCardData
        },
      }

      const spy    = jest.spyOn(axios, 'get').mockResolvedValue(axiosResponse)
      const result = await debitCardsService.findOne(debitCardId)

      expect(spy).toBeCalled()
      expect(spy).toBeCalledWith(url)
      expect(result).toEqual({debit_card: debitCardData})
    })
  })

  describe(`update`, () => {
    it(`Updates a debit card`, async () => {
      const debitCardId = debitCardData.id
      const url         = `${configService.get('bankSimulatorDebitCardsUrl')}/${debitCardId}`

      const updateDebitCardDto = {
        pin:                '4545',
        status:             CardStatus.Blocked,
        atm_daily:          7777,
        pos_daily:          9999,
        daily_transactions: 2,
      }

      const debitCard = {
        ...debitCardData,
        ...updateDebitCardDto
      }

      const axiosResponse = {
        data: {
          data: debitCard
        },
      }

      const spy    = jest.spyOn(axios, 'patch').mockResolvedValue(axiosResponse)
      const result = await debitCardsService.update(debitCardId, updateDebitCardDto)

      expect(spy).toBeCalled()
      expect(spy).toBeCalledWith(url, updateDebitCardDto)
      expect(result).toEqual({debit_card: debitCard})
    })
  })
})