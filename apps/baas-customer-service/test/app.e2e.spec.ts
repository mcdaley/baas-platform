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
  ICreateCustomerDto, 
  ICustomer, 
  IUpdateCustomerDto, 
  CustomerStatus, 
  States, 
}                                     from '@app/baas-interfaces'
import { WinstonLoggerService }       from '@app/winston-logger'
import { NotFoundError, BaaSErrors }  from '@app/baas-errors'
import { uuid }                       from '@app/baas-utils'

// Tell jest to mock all the axios calls.
jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

/**
 * Customer Test Data
 */
 const createCustomerDto : ICreateCustomerDto = {
  branch_id:          uuid(),
  first_name:         `Joe`,
  last_name:          `Ferguson`,
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

const updateCustomerDto : IUpdateCustomerDto = {
  status: CustomerStatus.Blocked,
}

const customerData : ICustomer = {
  id:       `unique-id`,
  status:   CustomerStatus.Active,
  ...createCustomerDto,
}

// Define customer response from core-bank-simulator
let customerMessage = { 
  customer: {...customerData}
}

let customerListMessage = {
  customers: [customerData]
}

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

  afterEach(() => {    
    jest.clearAllMocks()
  })

  /**
   * POST /v1/customers
   */
  describe(`POST /v1/customers`, () => {
    const result : AxiosResponse = {
      data:       {customer: customerData},
      status:     201,
      statusText: 'OK',
      headers:    {},
      config:     {} 
    }

    mockedAxios.post.mockImplementationOnce(async (createCustomerDto) => result)

    it(`Returns a new customer`, () => {
      return request(app.getHttpServer())
        .post(`${baseUrl}`)
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
   describe(`GET /v1/customers`, () => {
    let result : AxiosResponse = {
      data:       {customers: [customerData]},
      status:     200,
      statusText: 'OK',
      headers:    {},
      config:     {} 
    }

    //* jest.spyOn(axios, 'get').mockImplementationOnce(async () => result)
    mockedAxios.get.mockImplementationOnce( async () => result)

    it(`Returns a list of customers`, () => {
      return request(app.getHttpServer())
        .get(`${baseUrl}`)
        .expect(200)
        .then( (response) => {
          const { customers } = response.body
          expect(customers.length).toBe(1)
        })
    })
  })

  /**
   * GET /v1/customers/:customerId
   */
  describe(`GET /v1/customers/:customerId`, () => {
    let axiosResponse : AxiosResponse = {
      data:       {customer: customerData},
      status:     200,
      statusText: 'OK',
      headers:    {},
      config:     {} 
    }

    it(`Returns a customer`, () => {
      let customerId  = uuid()
      let url         = `${baseUrl}/${customerId}`
      //* jest.spyOn(axios, 'get').mockImplementationOnce(async (url) => customerResult)
      mockedAxios.get.mockImplementationOnce(async () => axiosResponse)

      return request(app.getHttpServer())
        .get(`${url}`)
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
      data:       {customer: updatedCustomerData},
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
        .expect(204)
    })
  })
});
