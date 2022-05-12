//-----------------------------------------------------------------------------
// apps/baas-account-service/test/app.e2e.spec.ts
//-----------------------------------------------------------------------------
import { 
  Test, 
  TestingModule, 
}                                   from '@nestjs/testing'
import { INestApplication }         from '@nestjs/common'
import axios, { AxiosResponse }     from 'axios'
import faker                        from '@faker-js/faker'
import * as request                 from 'supertest'

import { BaasAccountServiceModule } from './../src/baas-account-service.module'
import { mainConfig }               from '../src/main.config'

import { 
  AccountStatus, 
  AccountType, 
  CustomerStatus, 
  IAccount, 
  ICreateAccountDto, 
  ICustomer, 
  IUpdateAccountDto, 
  ParticipantRole, 
  States 
}                                   from '@app/baas-interfaces'
import { 
  uuid,
  currentTime,
}                                   from '@app/baas-utils'
import { WinstonLoggerService }     from '@app/winston-logger'
import { BaaSErrors, NotFoundError } from '@app/baas-errors'

// Tell jest to mock all the axios calls.
jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

/**
 * Accounts Test Data
 */
 let customerData : ICustomer = {
  id:                 uuid(),
  branch_id:          uuid(),
  first_name:         `Joe`,
  last_name:          `Ferguson`,
  status:             CustomerStatus.Active,
  email:              `joe@bills.com`,
  phone_number:       `716-649-1475`,
  ssn:                `222-33-4444`,
  physical_address: {
    name:             `Joe Ferguson`,
    street_line_1:    `One Bills Drive`,
    city:             `Orchard Park`,
    state:            States.NY,
    postal_code:      `14075`,  
  }
}
 
const createAccountDto : ICreateAccountDto = {
  account_type:     AccountType.Checking,
  participants: [
    {
      participant_customer_id:  customerData.id,
      participant_role:         ParticipantRole.Holder
    },
  ]
}

const updateAccountDto : IUpdateAccountDto = {
  account_status:     AccountStatus.Blocked,
  nickname:           'Blocked Checking Account'
}

const accountData : IAccount = {
  id:                     uuid(),
  branch_id:              uuid(),
  account_number:         faker.finance.account(),
  routing_number:         faker.finance.routingNumber(),
  account_status:         AccountStatus.Open,
  // currency:               Currency.USD,
  name:                   'Joes Checking Account',
  name_on_account:        'Joe Ferguson',
  multiple_participants:  createAccountDto.participants.length > 1 ? true : false,
  ...createAccountDto,
  available_balance:      0,
  posted_balance:         0,
  created_at:             new Date(),
  updated_at:             new Date(),
}

/**
 * BaasAccountServiceController
 */
describe('BaasAccountServiceController (e2e)', () => {
  let   app     : INestApplication
  const baseUrl : string      = `/v1/accounts`
  let   logger  : WinstonLoggerService

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [BaasAccountServiceModule],
    }).compile();

    app = moduleFixture.createNestApplication()
    mainConfig(app)

    await app.init();
  })

  afterAll(async () => {
    await app.close();
  })

  afterEach(() => {    
    jest.clearAllMocks()
  })

  /**
   * POST /v1/accounts
   */
  describe(`POST /v1/accounts`, () => {
    const result : AxiosResponse = {
      data:       {account: accountData},
      status:     201,
      statusText: 'OK',
      headers:    {},
      config:     {} 
    }

    mockedAxios.post.mockImplementationOnce(async (createAccountDto) => result)

    it(`Returns a new account`, () => {
      // Mock the call to GET /v1/customers/:customerId
      mockedAxios.get.mockResolvedValueOnce({data: {customer: customerData}})

      return request(app.getHttpServer())
        .post(`${baseUrl}`)
        .set(`Idempotency-Key`, uuid())
        .send(createAccountDto)
        .expect(201)
        .then( (response) => {
          let { account } = response.body

          expect(account).toMatchObject({
            name_on_account:      accountData.name_on_account,
              account_number:     accountData.account_number,
              routing_number:     accountData.routing_number,
              account_status:     accountData.account_status,
              account_type:       accountData.account_type,
              available_balance:  accountData.available_balance,
              posted_balance:     accountData.posted_balance,
          })
        })
    })

    it(`Returns 400 bad request error for invalid idempotency key`, () => {
      return request(app.getHttpServer())
        .post(`${baseUrl}`)
        .set(`Idempotency-Key`, `invalid-idempotency-key`)
        .send(createAccountDto)
        .expect(400)
        .then( (response) => {
          const { statusCode, message } = response.body
          expect(statusCode).toBe(400)
          expect(message).toMatch(/Invalid Idempotency-Key/i)
        })
    })

    it(`Returns 400 bad request for an empty request`, () => {
      let badData = {}

      return request(app.getHttpServer())
        .post(`${baseUrl}`)
        .set(`Idempotency-Key`, uuid())
        .send(badData)
        .expect(400)
        .then( (response) => {
          const { httpStatus, message } = response.body
          expect(httpStatus).toBe(400)
          expect(message.length).toBeGreaterThan(1)
        })
    })

    it(`Returns 400 bad request for an invalid request`, () => {
      let badData = {
        account_type: '',
        participants: [
          {
            participant_customer_id: `invalid-id`,
          },
        ]
      }

      return request(app.getHttpServer())
        .post(`${baseUrl}`)
        .set(`Idempotency-Key`, uuid())
        .send(badData)
        .expect(400)
        .then( (response) => {
          const { httpStatus, message } = response.body
          expect(httpStatus).toBe(400)
          expect(message.length).toBeGreaterThan(1)
        })
    })
  })

  /**
   * GET /v1/accounts
   */
  describe(`GET /v1/accounts`, () => {
    it(`Returns a list of accounts`, () => {
      let result : AxiosResponse = {
        data:       {accounts: [accountData]},
        status:     200,
        statusText: 'OK',
        headers:    {},
        config:     {} 
      }
      mockedAxios.get.mockResolvedValueOnce(result)

      return request(app.getHttpServer())
        .get(baseUrl)
        .expect(200)
        .then( (response) => {
          const { accounts } = response.body

          expect(accounts.length).toEqual(1)
          expect(accounts[0]).toMatchObject({
            name_on_account:      accountData.name_on_account,
              account_number:     accountData.account_number,
              routing_number:     accountData.routing_number,
              account_status:     accountData.account_status,
              account_type:       accountData.account_type,
              available_balance:  accountData.available_balance,
              posted_balance:     accountData.posted_balance,
          })
        })
    })
  })

  /**
   * GET /v1/accounts/:accountId
   */
  describe(`GET /v1/accounts/:accountId`, () => {
    it(`Returns an account`, () => {
      const accountId = accountData.id
      const url       = `${baseUrl}/${accountId}`

      const result : AxiosResponse = {
        data: {account: accountData},
        status:     200,
        statusText: 'OK',
        headers:    {},
        config:     {},
      }
      mockedAxios.get.mockResolvedValueOnce(result)

      return request(app.getHttpServer())
        .get(url)
        .expect(200)
        .then( (response) => {
          const { account } = response.body

          /////////////////////////////////////////////////////////////////////
          // TODO: 05/13/2022
          // Need to create some Date/Time utility methods to create/read
          // timestamps because I am sending a Date object in the request and
          // receiving a string in the response.
          /////////////////////////////////////////////////////////////////////
          //* expect(account).toEqual(accountData)
          expect(account).toMatchObject({
            name_on_account:      accountData.name_on_account,
              account_number:     accountData.account_number,
              routing_number:     accountData.routing_number,
              account_status:     accountData.account_status,
              account_type:       accountData.account_type,
              available_balance:  accountData.available_balance,
              posted_balance:     accountData.posted_balance,
              //* updated_at:         accountData.updated_at.toString(),
              //* created_at:         accountData.created_at.toString(),
          })
        })
    })

    it(`Returns 400 bad request for an invalid account id`, () => {
      const accountId = `bad-account-id`
      const url       = `${baseUrl}/${accountId}`

      return request(app.getHttpServer())
        .get(url)
        .expect(400)
        .then( (response) => {
          const { httpStatus, path, message } = response.body
          expect(httpStatus).toBe(400)
          expect(path).toMatch(url)
          expect(message).toMatch(/validation failed/i)
        })
    })

    it(`Returns 404 not found when accountId is not found`, () => {
      const accountId = uuid()
      const url       = `${baseUrl}/${accountId}`

      mockedAxios.get.mockRejectedValueOnce(
        new NotFoundError(
          BaaSErrors.account.notFound, 
          `Account id ${accountId} Not Found`
        )
      )

      return request(app.getHttpServer())
        .get(url)
        .expect(404)
        .then( (response) => {
          /////////////////////////////////////////////////////////////////////
          // TODO: 05/13/2022
          // Figure out why I have "statusCode" here instead of "httpStatus"
          // which I have in the error above.
          /////////////////////////////////////////////////////////////////////
          const { statusCode, path, message } = response.body
          expect(statusCode).toBe(404)
          expect(path).toMatch(url)
          expect(message).toMatch(/not found/i)
        })
    })
  })

  /**
   * PATCH /v1/accounts/:accountId
   */
  describe(`PATCH /v1/accounts/:accountId`, () => {
    it(`Updates an account`, () => {
      const accountId = accountData.id
      const url       = `${baseUrl}/${accountId}`
      
      const updatedAccount = {
        ...accountData,
        ...updateAccountDto,
      }

      const result : AxiosResponse = {
        data:       {account: updatedAccount},
        status:     200,
        statusText: 'OK',
        headers:    {},
        config:     {},
      }
      mockedAxios.patch.mockResolvedValueOnce(result)

      return request(app.getHttpServer())
        .patch(url)
        .set('Idempotency-Key', uuid())
        .send(updateAccountDto)
        .expect(200)
        .then( (response) => {
          const { account } = response.body
          expect(account.account_number).toBe(accountData.account_number)
          expect(account.routing_number).toBe(accountData.routing_number)
          expect(account.account_status).toBe(updateAccountDto.account_status)
        })
    })

    it(`Returns 400 bad request for an invalid idempotency key`, () => {
      const accountId      = accountData.id
      const url            = `${baseUrl}/${accountId}`
      const idempotencyKey = `bad-idempotency-key`

      return request(app.getHttpServer())
        .patch(url)
        .set('Idempotency-Key', idempotencyKey)
        .send(updateAccountDto)
        .expect(400)
        .then( (response) => {
          const { statusCode, path, message } = response.body

          expect(statusCode).toBe(400)
          expect(path).toBe(`PATCH ${url}`)
          expect(message).toMatch(/invalid idempotency-key/i)
        })
    })

    it(`Returns 404 not found when accountId is not found`, () => {
      const accountId = uuid()
      const url       = `${baseUrl}/${accountId}`

      mockedAxios.get.mockRejectedValueOnce(
        new NotFoundError(
          BaaSErrors.account.notFound, 
          `Account id ${accountId} Not Found`
        )
      )

      return request(app.getHttpServer())
        .get(url)
        .expect(404)
        .then( (response) => {
          /////////////////////////////////////////////////////////////////////
          // TODO: 05/13/2022
          // Figure out why I have "statusCode" here instead of "httpStatus"
          // which I have in the error above.
          /////////////////////////////////////////////////////////////////////
          const { statusCode, path, message } = response.body
          expect(statusCode).toBe(404)
          expect(path).toMatch(url)
          expect(message).toMatch(/not found/i)
        })
    })
  })

  /**
   * DELETE /v1/accounts/:accountId
   */
  describe(`DELETE /v1/accounts/:accountId`, () => {
    it(`Deletes an account`, () => {
      const accountId = accountData.id
      const url       = `${baseUrl}/${accountId}`

      const result : AxiosResponse = {
        data:       {},
        status:     204,
        statusText: 'OK',
        headers:    {},
        config:     {},
      }
      mockedAxios.delete.mockResolvedValueOnce(result)

      return request(app.getHttpServer())
        .delete(url)
        .expect(204)
    })
  })
});
