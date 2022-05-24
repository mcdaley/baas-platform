//-----------------------------------------------------------------------------
// libs/baas-test-data/src/factory.data.ts
//-----------------------------------------------------------------------------
import faker                        from "@faker-js/faker"

import { 
  IAccountFactoryData, 
  ICreateAccountDtoFactoryData, 
  ICreateCustomerDtoFactoryData, 
  ICreateDebitCardDtoFactoryData, 
  ICustomerFactoryData, 
  IDebitCardFactoryData 
}                                   from "./baas.factory.interface"

import { 
  AccountStatus,
  AccountType,
  CardStatus,
  CardType,
  CustomerStatus, 
  Delivery, 
  Packaging, 
  ParticipantRole, 
  States, 
}                                   from "@app/baas-interfaces";
import { uuid }                     from "@app/baas-utils";


/**
 * Create Customer Dto
 */
export const createCustomerDtoFactoryData : ICreateCustomerDtoFactoryData = {
  joe_ferguson: {
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
    },
    branch_id:          uuid(),
  }
}

/**
 * Customers
 */
export const customerFactoryData : ICustomerFactoryData = {
  joe_ferguson: {
    id: uuid(),
    ...createCustomerDtoFactoryData.joe_ferguson,
  },
}

/**
 * Create Account Dto
 */
export const createAccountDtoFactoryData : ICreateAccountDtoFactoryData = {
  checking_1: {
    account_type: AccountType.Checking,
    participants: [
      {
        participant_customer_id:  customerFactoryData.joe_ferguson.id,
        participant_role:         ParticipantRole.Holder
      },
    ]
  }
}

/**
 * Accounts
 */
export const accountFactoryData : IAccountFactoryData = {
  checking_1: {
    id:                     uuid(),
    account_type:           AccountType.Checking,
    account_number:         faker.finance.account(),
    routing_number:         faker.finance.routingNumber(),
    account_status:         AccountStatus.Open,
    // currency:               Currency.USD,
    name:                   'Joes Checking Account',
    name_on_account:        `${customerFactoryData.joe_ferguson.first_name} ${customerFactoryData.joe_ferguson.last_name}`,
    multiple_participants:  false,
    participants:           [{
      participant_customer_id:  customerFactoryData.joe_ferguson.id,
      participant_role:         ParticipantRole.Holder,
    }],
    available_balance:      0,
    posted_balance:         0,
    created_at:             new Date(),
    updated_at:             new Date(),
    branch_id:              customerFactoryData.joe_ferguson.branch_id,
  },
}

/**
 * Create Debit Card Dto
 */
export const createDebitCardDtoFactoryData : ICreateDebitCardDtoFactoryData = {
  checking_1: {
    card_type:                      CardType.Debit,
    name_on_card:                   `${customerFactoryData.joe_ferguson.first_name} ${customerFactoryData.joe_ferguson.last_name}`,
    delivery:                       Delivery.Standard,
    packaging:                      Packaging.Regular,
    phone_number:                   customerFactoryData.joe_ferguson.phone_number,
    mailing_address:                customerFactoryData.joe_ferguson.physical_address,
    customer_id:                    customerFactoryData.joe_ferguson.id,
    account_id:                     accountFactoryData.checking_1.id,
  },
}

/**
 * DebitCards
 */
export const debitCardFactoryData : IDebitCardFactoryData = {
  checking_1: {
    id:                             uuid(),
    name_on_card:                   createDebitCardDtoFactoryData.checking_1.name_on_card,
    card_number:                    faker.finance.creditCardNumber(),
    expiration_date:                `07/25`,
    cvv:                            faker.finance.creditCardCVV(),
    status:                         CardStatus.Active,
    pin:                            ``,
    atm_daily:                      500,
    pos_daily:                      800,
    daily_transactions:             10,
    customer_id:                    createDebitCardDtoFactoryData.checking_1.customer_id,
    account_id:                     createDebitCardDtoFactoryData.checking_1.account_id,
  },
}

