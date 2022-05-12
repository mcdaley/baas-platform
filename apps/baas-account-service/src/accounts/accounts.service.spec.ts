//-----------------------------------------------------------------------------
// apps/baas-account-service/src/accounts/accounts.service.spec.ts
//-----------------------------------------------------------------------------
import { 
  Test, 
  TestingModule, 
}                                 from '@nestjs/testing'
import { ConfigService }          from '@nestjs/config'
import axios                      from 'axios'
import faker                      from '@faker-js/faker'

import { AccountsService }        from './accounts.service'
import { CustomersService }       from '../customers/customers.service'

import { 
  AccountStatus, 
  AccountType, 
  CustomerStatus, 
  IAccount, 
  ICreateAccountDto, 
  ICustomer, 
  IUpdateAccountDto, 
  ParticipantRole, 
  States, 
}                                 from '@app/baas-interfaces'
import { 
  BaaSErrors, 
  NotFoundError, 
}                                 from '@app/baas-errors'
import { uuid }                   from '@app/baas-utils'
import { WinstonLoggerService }   from '@app/winston-logger'
import { CoreSimulatorService }   from '@app/core-simulator'

/**
 * Set mockConfigService using env variables in .jest/set-env-vars.ts
 */
 let mockConfigService = new Map()
 mockConfigService.set('NODE_ENV', process.env.NODE_ENV)
 mockConfigService.set('appRoot',  '.')
 mockConfigService.set('appName',  process.env.ACCOUNT_APP_NAME)
 mockConfigService.set('logLevel', process.env.ACCOUNT_LOG_LEVEL)
 mockConfigService.set('bankSimulatorAccountsUrl', process.env.BANK_SIMULATOR_ACCOUNTS_URL)

/**
 * AccountsService Test Data
 */
let customer : ICustomer = {
  id:                 `unique-customer-id`,
  branch_id:          `unique-branch-id`,
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
      participant_customer_id:  customer.id,
      participant_role:         ParticipantRole.Holder
    },
  ]
}

const updateAccountDto : IUpdateAccountDto = {
  account_status:     AccountStatus.Blocked,
  nickname:           'Blocked Checking Account'
}

const account : IAccount = {
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
 * AccountsService
 */
describe('AccountsService', () => {
  let accountsService  : AccountsService;
  let customersService : CustomersService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountsService,
        CustomersService,
        {
          provide:  ConfigService,
          useValue: mockConfigService,
        }, 
        WinstonLoggerService,
        CoreSimulatorService,
      ],
    }).compile();

    accountsService  = module.get<AccountsService>(AccountsService)
    customersService = module.get<CustomersService>(CustomersService)
  });

  /**
   * create
   */
  describe(`create`, () => {
    it(`Creates a new account`, async () => {
      let url        = `http://localhost:5001/v1/core-accounts`
      let customers  = [customer]
      let response   = { account: account }

      let verifyCustomersSpy = jest
        .spyOn(customersService, 'verifyCustomers')
        .mockResolvedValueOnce(customers)
      
      let accountHolderSpy   = jest
        .spyOn(customersService, 'findAccountHolder')
        .mockResolvedValue(customer)

      const spy    = jest.spyOn(axios, 'post').mockResolvedValue({data: response})
      const result = await accountsService.create(createAccountDto)

      expect(verifyCustomersSpy).toBeCalled()
      expect(verifyCustomersSpy).toBeCalledWith(account.participants)

      expect(accountHolderSpy).toBeCalled()
      expect(accountHolderSpy).toBeCalledWith(createAccountDto, customers)
      
      expect(spy).toBeCalled()
      expect(spy).toBeCalledWith(
        url, 
        {
          ...createAccountDto, 
          name: `${account.name_on_account} ${account.account_type}`, 
          name_on_account: account.name_on_account
        }
      )
      expect(result).toEqual(response)
    })
  })

  /**
   * findAll
   */
  describe(`findAll`, () => {
    it(`Returns a list of accounts`, async () => {
      let url        = `http://localhost:5001/v1/core-accounts`
      let response   = { accounts: [account] }

      const spy    = jest.spyOn(axios, 'get').mockResolvedValue({data: response})
      const result = await accountsService.findAll()

      expect(spy).toBeCalled()
      expect(spy).toBeCalledWith(url)
      expect(result).toEqual(response)
    })
  })

  /**
   * findOne
   */
  describe(`findOne`, () => {
    it(`Returns an account`, async () => {
      let accountId = `unique-account-id`
      let url       = `http://localhost:5001/v1/core-accounts/${accountId}`
      let response  = { account: account }

      const spy     = jest.spyOn(axios, 'get').mockResolvedValue({data: {account: account}})
      const result  = await accountsService.findOne(accountId)

      expect(spy).toBeCalled()
      expect(spy).toBeCalledWith(url)
      expect(result).toEqual(response)
    })

    it(`Returns 404 account not found error`, async () => {
      let accountId = `unique-account-id`
      let url       = `http://localhost:5001/v1/core-accounts/${accountId}`

      const spy    = jest.spyOn(axios, 'get').mockRejectedValueOnce(
        new NotFoundError(BaaSErrors.account.notFound, `Account ${accountId} not found`)
      )

      try {
        await accountsService.findOne(accountId)
      }
      catch(error) {
        expect(spy).toBeCalled()
        expect(spy).toBeCalledWith(url)
        expect(error).toBeInstanceOf(NotFoundError)
      }
    })
  })

  /**
   * update
   */
  describe(`update`, () => {
    it(`Returns the updated account`, async () => {
      let accountId      = `unique-account-id`
      let url            = `http://localhost:5001/v1/core-accounts/${accountId}`
      let updatedAccount = {
        ...account,
        ...updateAccountDto,
      }
      let response        = {
        account: updatedAccount
      }

      const spy = jest.spyOn(axios, 'patch').mockResolvedValue({data: {account: updatedAccount}})
      const result = await accountsService.update(accountId, updateAccountDto)

      expect(spy).toBeCalled()
      expect(spy).toBeCalledWith(url, updateAccountDto)
      expect(result).toEqual(response)
    })

    it(`Returns 404 account not found error`, async () => {
      let accountId = `unique-account-id`
      let url       = `http://localhost:5001/v1/core-accounts/${accountId}`

      const spy    = jest.spyOn(axios, 'patch').mockRejectedValueOnce(
        new NotFoundError(BaaSErrors.account.notFound, `Account ${accountId} not found`)
      )

      try {
        await accountsService.update(accountId, updateAccountDto)
      }
      catch(error) {
        expect(spy).toBeCalled()
        expect(spy).toBeCalledWith(url, updateAccountDto)
        expect(error).toBeInstanceOf(NotFoundError)
      }
    })
  })

  /**
   * remove
   */
  describe(`remove`, () => {
    it(`Deletes the account`, async () => {
      let accountId = `unique-account-id`
      let url       = `http://localhost:5001/v1/core-accounts/${accountId}`
      let response  = true

      const spy     = jest.spyOn(axios, 'delete').mockResolvedValue({data: true})
      const result  = await accountsService.remove(accountId)

      expect(spy).toBeCalled()
      expect(spy).toBeCalledWith(url)
      expect(result).toEqual(response)
    })

    it(`Returns 404 account not found error`, async () => {
      let accountId = `unique-account-id`
      let url       = `http://localhost:5001/v1/core-accounts/${accountId}`

      const spy    = jest.spyOn(axios, 'delete').mockRejectedValueOnce(
        new NotFoundError(BaaSErrors.account.notFound, `Account ${accountId} not found`)
      )

      try {
        await accountsService.remove(accountId)
      }
      catch(error) {
        expect(spy).toBeCalled()
        expect(spy).toBeCalledWith(url)
        expect(error).toBeInstanceOf(NotFoundError)
      }
    })
  })
});
