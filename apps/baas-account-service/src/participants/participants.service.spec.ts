//-----------------------------------------------------------------------------
// apps/baas-account-service/src/participants/participants.spec.ts
//-----------------------------------------------------------------------------
import { 
  Test, 
  TestingModule, 
}                                 from '@nestjs/testing'
import { ConfigService }          from '@nestjs/config'
import { APP_INTERCEPTOR }        from '@nestjs/core'

import { ParticipantsController } from './participants.controller'
import { ParticipantsService }    from './participants.service'
import { CreateParticipantDto }   from './dto/create-participant.dto'

import { 
  RequestIdAsyncLocalStorageModule, 
  RequestIdInterceptor 
}                                 from '@app/baas-async-local-storage'
import { WinstonLoggerService }   from '@app/winston-logger'
import { ParticipantRole }        from '@app/baas-interfaces'
import { uuid }                   from '@app/baas-utils'

/**
 * Import test data
 */
 import {
  createAccountDtoFactoryData,
  accountFactoryData,
  BaasApplication,
  setMockConfigService,
}                               from '../../../../test/'
import axios from 'axios'

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

 describe(`ParticipantsService`, () => {
  let participantsService:    ParticipantsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        RequestIdAsyncLocalStorageModule.forRoot(),
      ],
      controllers:  [ParticipantsController],
      providers:    [
        ParticipantsService,
        {
          provide:  ConfigService,
          useValue: mockConfigService,
        }, 
        {
          provide:  APP_INTERCEPTOR,
          useValue: RequestIdInterceptor,
        },
        WinstonLoggerService,
      ],
    }).compile();

    participantsService     = module.get<ParticipantsService>(ParticipantsService)
  })

  /**
   * @create
   */
  describe(`create`, () => {
    it(`Creates and adds participant to an account`, async () => {
      let url            = `http://localhost:5001/core/api/v1/accounts/${accountId}/participants`
      let requestHeaders = {
        'Customer-Id':      customerId,
        'Tenant-Id':        tenantId,
        'Idempotency-Key':  idempotencyKey,
      }
      let axiosConfig = {
        headers: requestHeaders,
      }
      let participant = {
        id:         uuid(),
        account_id: accountId,
        ...createParticipantDto
      }
      let response = { data: {data: participant } }

      const spy    = jest.spyOn(axios, 'post').mockResolvedValue(response)
      const result = await participantsService.create(
         accountId, createParticipantDto, requestHeaders
      )

      expect(spy).toBeCalled()
      expect(spy).toBeCalledWith(url, createParticipantDto, axiosConfig)
      expect(result).toEqual({participant: participant})
    })
  })

  /**
   * findAll
   */
  describe(`findAll`, () => {
    it(`Returns a list of account participants`, async () => {
      let url            = `http://localhost:5001/core/api/v1/accounts/${accountId}/participants`
      let requestHeaders = {
        'Customer-Id':      customerId,
        'Tenant-Id':        tenantId,
      }
      let axiosConfig = {
        headers: requestHeaders,
      }
      let participant = {
        id:         uuid(),
        account_id: accountId,
        ...createParticipantDto
      }
      let response = { data: {data: [participant] } }

      const spy    = jest.spyOn(axios, 'get').mockResolvedValue(response)
      const result = await participantsService.findAll(accountId, requestHeaders)

      expect(spy).toBeCalled()
      expect(spy).toBeCalledWith(url, axiosConfig)
      expect(result).toEqual({participants: [participant]})
    })
  })

  /**
   * remove
   */
  describe(`remove`, () => {
    it(`Removes a participant from an account`, async () => {
      let participantId = uuid()
      let url           = `http://localhost:5001/core/api/v1/accounts/${accountId}/participants/${participantId}`
      let requestHeaders = {
        'Customer-Id':      customerId,
        'Tenant-Id':        tenantId,
      }
      let axiosConfig = {
        headers: requestHeaders,
      }
      let response = { data: {} }

      const spy    = jest.spyOn(axios, 'delete').mockResolvedValue(response)
      const result = await participantsService.remove(accountId, participantId, requestHeaders)

      expect(spy).toBeCalled()
      expect(spy).toBeCalledWith(url, axiosConfig)
      expect(result).toEqual({})
    })
  })
 }) // end of describe ParticipantsService