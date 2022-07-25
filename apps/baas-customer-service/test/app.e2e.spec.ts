//-----------------------------------------------------------------------------
// apps/baas-customer-service/test/app.2e2-spec.ts
//-----------------------------------------------------------------------------
import { 
  Test, 
  TestingModule, 
}                                     from '@nestjs/testing'
import { 
  INestApplication, 
  HttpStatus, 
}                                     from '@nestjs/common'
import axios, { AxiosResponse }       from 'axios'
import * as request                   from 'supertest'

import { BaasCustomerServiceModule }  from '../src/baas-customer-service.module'
import { mainConfig }                 from '../src/main.config'

import { 
  CustomerStatus, 
}                                     from '@app/baas-interfaces'
import { WinstonLoggerService }       from '@app/winston-logger'
import { NotFoundError, BaaSErrors }  from '@app/baas-errors'
import { uuid }                       from '@app/baas-utils'

/**
 * Import test data
 */
import {
  createCustomerDtoFactoryData,
  customerFactoryData,
}                                     from '../../../test/'

// Tell jest to mock all the axios calls.
jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

/**
 * Customer Test Data
 */
const createCustomerDto = createCustomerDtoFactoryData.joe_ferguson
const customerData      = customerFactoryData.joe_ferguson

/**
 * BaasCustomerServiceController (e2e)
 */
describe('BaasCustomerServiceController (e2e)', () => {
  let   app         : INestApplication
  const baseUrl     : string      = `/v1/customers`
  let   logger      : WinstonLoggerService

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [BaasCustomerServiceModule],
    }).compile();

    app = moduleFixture.createNestApplication()
    mainConfig(app)

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  })

  afterEach(async () => {    
    jest.clearAllMocks()
    jest.resetAllMocks()
  })

  /**
   * POST /v1/customers
   */
  describe(`POST /v1/customers`, () => {
    const result : AxiosResponse = {
      data:       {data: customerData},
      status:     201,
      statusText: 'OK',
      headers:    {},
      config:     {} 
    }

    mockedAxios.post.mockImplementationOnce(async (createCustomerDto) => result)

    it(`Returns a new customer`, () => {
      return request(app.getHttpServer())
        .post(`${baseUrl}`)
        .set(`Tenant-Id`, `buffalo_bills`)
        .set(`Idempotency-Key`, uuid())
        .send(createCustomerDto)
        .expect(201)
        .then( (response) => {
          const { customer } = response.body
          expect(customer.last_name).toBe(customerData.last_name)
          expect(customer.email).toBe(customerData.email)
        })
    })

    it(`Returns 400 Bad Request error if Idempotency-Key is not defined`, () => {
      return request(app.getHttpServer())
        .post(`${baseUrl}`)
        .set(`Tenant-Id`, `buffalo_bills`)
        .send(createCustomerDto)
        .expect(400)
        .then( (response) => {
          const { statusCode, message } = response.body
          expect(statusCode).toBe(400)
          expect(message).toMatch(/Idempotency-Key is required/i)
        })
    })

    it(`Returns 400 Bad Request error for an invalid Idempotency-Key`, () => {
      return request(app.getHttpServer())
        .post(`${baseUrl}`)
        .set(`Tenant-Id`, `buffalo_bills`)
        .set(`Idempotency-Key`, `bad-idempotency-key`)
        .send(createCustomerDto)
        .expect(400)
        .then( (response) => {
          const { statusCode, message } = response.body
          expect(statusCode).toBe(400)
          expect(message).toMatch(/Invalid Idempotency-Key/i)
        })
    })

    it(`Returns 400 Bad Request for invalid request`, () => {
      const badData = {
        first_name:         ``,
        last_name:          ``,
        status:             `Wrong`,
      }
      return request(app.getHttpServer())
        .post(`${baseUrl}`)
        .set(`Tenant-Id`, `buffalo_bills`)
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
   * GET /v1/customers
   */ 
  describe.skip(`GET /v1/customers`, () => {
    ///////////////////////////////////////////////////////////////////////////
    // BUG: 06/01/2022
    // The test works when run with ".only", but it does not run with all 
    // of the other tests.
    //
    // Seems to be a weird scoping issue that this axiosReponse overrides the
    // other axiosResponse definitions.
    ///////////////////////////////////////////////////////////////////////////

    /**********
    let axiosResponse : AxiosResponse = {
      data:       {data: [customerData]},
      status:     200,
      statusText: 'OK',
      headers:    {},
      config:     {} 
    }

    jest.spyOn(axios, 'get').mockImplementationOnce(async () => axiosResponse)
    //* mockedAxios.get.mockResolvedValueOnce(axiosResponse)

    it(`Returns a list of customers`, () => {
      return request(app.getHttpServer())
        .get(`${baseUrl}`)
        .expect(200)
        .then( (response) => {
          const { customers } = response.body
          expect(customers.length).toBe(1)
        })
    })
    **********/
  })

  /**
   * GET /v1/customers/:customerId
   */
  describe(`GET /v1/customers/:customerId`, () => {
    let axiosResponse: AxiosResponse = {
      data:       {data: customerData},
      status:     200,
      statusText: 'OK',
      headers:    {},
      config:     {} 
    }

    it(`Returns a customer`, () => {
      let customerId  = uuid()
      let url         = `${baseUrl}/${customerId}`
      //* let headers     = { headers: {'Tenant-Id': 'fake_tenant_id'} }
      //* jest.spyOn(axios, 'get').mockImplementationOnce(async (url, headers) => axiosResponse)
      mockedAxios.get.mockResolvedValueOnce(axiosResponse)

      return request(app.getHttpServer())
        .get(`${url}`)
        .set(`Tenant-Id`, `buffalo_bills`)
        .expect(200)
        .then( (response) => {
          const { customer } = response.body
          expect(customer).toEqual(customerData)
        })
    })

    it(`Returns 400 Bad Request for an invalid customerId`, () => {
      let customerId  = `bad-customer-id`
      let url         = `${baseUrl}/${customerId}`

      return request(app.getHttpServer())
        .get(url)
        .set(`Tenant-Id`, `buffalo_bills`)
        .expect(400)
        .then( (response) => {
          const {httpStatus, message} = response.body
          expect(httpStatus).toBe(400)
          expect(message).toMatch(/validation failed/i)
        })
    })

    it(`Returns 404 Not Found when customerId is not found`, () => {
      let customerId  = uuid()
      let url         = `${baseUrl}/${customerId}`
      mockedAxios.get.mockImplementationOnce(async () => {
        throw new NotFoundError(
          BaaSErrors.customer.notFound, 
          `Customer id ${customerId} Not Found`
        )
      })

      return request(app.getHttpServer())
        .get(`${url}`)
        .set(`Tenant-Id`, `buffalo_bills`)
        .expect(404)
        .then( (response) => {
          const { message } = response.body
          expect(message).toMatch(/not found/i)
        })
    })
  })

  /**
   * PATCH /v1/customers/:customerId
   */
  describe(`PATCH /v1/customers/:customerId`, () => {
    let updateCustomerDto   = {
      email:        `kgun@bills.com`,
      phone_number: `212-555-1212`,
      status:       CustomerStatus.Blocked,
    }
    let updatedCustomerData = {
      ...customerData,
      ...updateCustomerDto,
    }

    let axiosResponse : AxiosResponse = {
      data:       {data: updatedCustomerData},
      status:     200,
      statusText: 'OK',
      headers:    {},
      config:     {} 
    }

    it(`Updates a customer and returns the updated customer`, () => {
      let customerId  = uuid()
      let url         = `${baseUrl}/${customerId}`
      mockedAxios.patch.mockImplementationOnce(async () => axiosResponse)

      return request(app.getHttpServer())
        .patch(url)
        .set(`Tenant-Id`, `buffalo_bills`)
        .set(`Idempotency-Key`, uuid())
        .send(updateCustomerDto)
        .expect(200)
        .then( (response) => {
          const { customer } = response.body
          expect(customer).toEqual(updatedCustomerData)
        })
    })
  })

  /**
   * DELETE /v1/customers/:customerId
   */
  describe(`DELETE /v1/customers/:customerId`, () => {
    let axiosResponse : AxiosResponse = {
      data:       {},
      status:     200,
      statusText: 'OK',
      headers:    {},
      config:     {} 
    }

    it(`Deletes a customer`, () => {
      let customerId  = uuid()
      let url         = `${baseUrl}/${customerId}`
      mockedAxios.delete.mockImplementationOnce(async () => axiosResponse)

      return request(app.getHttpServer())
        .delete(url)
        .set(`Tenant-Id`, `buffalo_bills`)
        .expect(204)
    })
  })
});
