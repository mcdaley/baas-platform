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
}                                   from '../../../../test/baas.factory.data'

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
        data: debitCardData,
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
        data: [debitCardData],
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
        data: debitCardData,
      }

      const spy    = jest.spyOn(axios, 'get').mockResolvedValue(axiosResponse)
      const result = await debitCardsService.findOne(debitCardId)

      expect(spy).toBeCalled()
      expect(spy).toBeCalledWith(url)
      expect(result).toEqual({debit_card: debitCardData})
    })
  })
})