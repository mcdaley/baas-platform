//--------------------------------------------------------------------------------------------
// apps/baas-debit-card-service/src/debit-cards-activate/debit-cards-activate.service.spec.ts
//--------------------------------------------------------------------------------------------
import { 
  Test, 
  TestingModule 
}                                       from '@nestjs/testing'
import { ConfigService }                from '@nestjs/config'
import axios                            from 'axios'

import { DebitCardsActivateService }    from './debit-cards-activate.service'

import { CardStatus }                   from '@app/baas-interfaces'
import { WinstonLoggerService }         from '@app/winston-logger'
import { CoreDebitCardSimulator }       from '@app/core-simulator'  // TODO: Remove

// Import the test data
import { debitCardFactoryData }         from '../../../../test/baas.factory.data'

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
  * Test data
  */
const debitCardData = debitCardFactoryData.checking_1

describe(`DebitCardsActivateService`, () => {
  let debitCardsActivateService : DebitCardsActivateService
  let configService             : ConfigService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DebitCardsActivateService, 
        { 
          provide:  ConfigService,
          useValue: mockConfigService,
        }, 
        WinstonLoggerService,
        CoreDebitCardSimulator,
      ],
    }).compile()

    configService             = module.get<ConfigService>(ConfigService)
    debitCardsActivateService = module.get<DebitCardsActivateService>(DebitCardsActivateService)
  })

  it(`Activates a debit`, async () => {
    const updateDebitCardStatusDto = {
      status: CardStatus.Active
    }

    const debitCardId = debitCardData.id
    const url         = `${configService.get('bankSimulatorDebitCardsUrl')}/${debitCardId}`
    const response    = {
      data: {debit_card: debitCardData},
    }

    const spy    = jest.spyOn(axios, 'patch').mockResolvedValue(response)
    const result = await debitCardsActivateService.update(debitCardId)

    expect(spy).toBeCalled()
    expect(spy).toBeCalledWith(url, updateDebitCardStatusDto)
    expect(result).toEqual({debit_card: debitCardData})
  })
})
