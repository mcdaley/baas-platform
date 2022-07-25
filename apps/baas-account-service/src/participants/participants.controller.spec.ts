//-----------------------------------------------------------------------------
// apps/baas-account-service/src/participants/participants.controller.spec.ts
//-----------------------------------------------------------------------------
import { 
  Test, 
  TestingModule, 
}                                 from '@nestjs/testing'
import { ConfigService }          from '@nestjs/config'

import { ParticipantsController } from './participants.controller'
import { ParticipantsService }    from './participants.service'
import { CreateParticipantDto }   from './dto/create-participant.dto'

import { WinstonLoggerService }   from '@app/winston-logger'
import { ParticipantRole }        from '@app/baas-interfaces'
import { uuid }                   from '@app/baas-utils'
///////////////////////////////////////////////////////////////////////////////
// TODO: 07/21/2022
// Remove all references to "CoreSimulatorService" in baas-account-service
// as it has been deprecated.
///////////////////////////////////////////////////////////////////////////////
import { CoreSimulatorService }   from '@app/core-simulator'

/**
 * Import test data
 */
 import {
  createAccountDtoFactoryData,
  accountFactoryData,
  BaasApplication,
  setMockConfigService,
}                               from '../../../../test/'

/**
 * Setup test environment and data
 */
const mockConfigService    = setMockConfigService(BaasApplication.AccountService)
const accountData          = accountFactoryData.checking_1
const accountId            = accountData.id
const customerId           = uuid()
const tenantId             = `buffalo_bills`
const idempotencyKey       = uuid()
const createParticipantDto = {
  customer_id:  uuid(),
  participant_role:         ParticipantRole.Authorized,
}


describe(`ParticipantsController`, () => {
  let participantsController: ParticipantsController
  let participantsService:    ParticipantsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers:  [ParticipantsController],
      providers:    [
        ParticipantsService,
        {
          provide:  ConfigService,
          useValue: mockConfigService,
        }, 
        WinstonLoggerService,
        CoreSimulatorService,
      ],
    }).compile();

    participantsController  = module.get<ParticipantsController>(ParticipantsController)
    participantsService     = module.get<ParticipantsService>(ParticipantsService)
  })

  /**
   * createV1
   */
  describe(`createV1`, () => {
    it(`Creates a new account participant`, async () => {
      let participant = {
        id:         uuid(),
        account_id: accountId,
        ...createParticipantDto
      }

      let response = {
        participant: participant 
      }

      const spy    = jest.spyOn(participantsService, 'create').mockResolvedValue(response)
      const result = await participantsController.createV1(
        customerId, tenantId, idempotencyKey, accountId, createParticipantDto
      )

      expect(spy).toBeCalled()
      expect(spy).toBeCalledWith(accountId, createParticipantDto, customerId, tenantId, idempotencyKey)
      expect(result).toBe(response)
    })
  })

  /**
   * findAllV1
   */
  describe(`findAllV1`, () => {
    it(`Returns a list of all the account participants`, async () => {
      let participant = {
        id:         uuid(),
        account_id: accountId,
        ...createParticipantDto
      }

      let response = {
        participants: [participant]
      }

      const spy    = jest.spyOn(participantsService, 'findAll').mockResolvedValue(response)
      const result = await participantsController.findAllV1(customerId, tenantId, accountId)

      expect(spy).toBeCalled()
      expect(spy).toBeCalledWith(accountId, customerId, tenantId)
      expect(result).toBe(response)
    })
  })

  describe(`removeV1`, () => {
    it(`Removes a participant from an account`, async () => {
      /////////////////////////////////////////////////////////////////////////
      // TODO: 07/23/2002
      //  - Need to define the default values/objects returned from "DELETE"
      //    requests for the core_bank_simulator and the baas services.
      //
      //  - When i delete a participant, do I delete it with the 
      //    "participant_id" or the "customer_id"? Need to look
      //    at the core-bank-simulator.
      /////////////////////////////////////////////////////////////////////////
      let participantId = accountData.participants[0].customer_id
      let response      = {}

      const spy    = jest.spyOn(participantsService, 'remove').mockResolvedValue({})
      const result = await participantsController.removeV1(customerId, tenantId, accountId, participantId)

      expect(spy).toBeCalled()
      expect(spy).toBeCalledWith(accountId, participantId, customerId, tenantId)
      expect(result).toEqual(response)
    })
  })
}) // end of describe ParticipantsController