//-----------------------------------------------------------------------------
// test/baas.factory.utils.ts
//-----------------------------------------------------------------------------

/**
 * @enum BaasApplications
 */
export enum BaasApplication {
  CustomerService   = 'CUSTOMER',
  AccountService    = 'ACCOUNT',
  DebitCardService  = 'DEBIT_CARD',
}

/**
 * Set the app environment variables required to run the unit and integration
 * tests. The "process.env" variables are set in the .jest/set-env-vars.ts
 * file which is loaded when jest command is run.
 * 
 * @function  setMockConfigService
 * @param     {BaasApplications} - Application tests that are running
 * @returns   {Map}              - Map of key, value pairs that mimics Nestjs ConfigService
 */
export function setMockConfigService(app: BaasApplication) : Map<string, string> {
  let mockConfigService = new Map()

  // App specific variables
  mockConfigService.set('NODE_ENV',    process.env.NODE_ENV)
  mockConfigService.set('appRoot',     '.')
  mockConfigService.set('appName',     process.env[`${app}_APP_NAME`])
  mockConfigService.set('logLevel',    process.env[`${app}_LOG_LEVEL`])

  // Global urls
  mockConfigService.set('customersUrl', process.env.CUSTOMER_URL)
  mockConfigService.set('accountsUrl',  process.env.ACCOUNT_URL)

  // Core bank urls
  mockConfigService.set('bankSimulatorCustomersUrl',  process.env.BANK_SIMULATOR_CUSTOMERS_URL)
  mockConfigService.set('bankSimulatorAccountsUrl',   process.env.BANK_SIMULATOR_ACCOUNTS_URL)
  mockConfigService.set('bankSimulatorDebitCardsUrl', process.env.BANK_SIMULATOR_DEBIT_CARDS_URL)

  return mockConfigService
}