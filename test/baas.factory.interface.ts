//-----------------------------------------------------------------------------
// libs/baas-test-data/src/factory.interface.ts
//-----------------------------------------------------------------------------
import { 
  IAccount, 
  ICreateAccountDto, 
  ICreateCustomerDto, 
  ICreateDebitCardDto, 
  ICustomer, 
  IDebitCard, 
}                         from "@app/baas-interfaces"

/**
 * ICreateCustomerDtoFactoryDtoData
 */
 export interface ICreateCustomerDtoFactoryData {
  [key: string]: ICreateCustomerDto
}

/**
 * @interface ICustomerFactoryData
 */
export interface ICustomerFactoryData {
  [key: string]: ICustomer
}

export interface ICreateAccountDtoFactoryData {
  [key: string]: ICreateAccountDto,
}

/**
 * @interface IAccountFactoryData
 */
export interface IAccountFactoryData {
  [key: string]: IAccount
}

/**
 * @interface ICreateDebitCardDtoFactoryData
 */
export interface ICreateDebitCardDtoFactoryData {
  [key: string]: ICreateDebitCardDto
}

/**
 * @interface IDebitCardFactoryData
 */
export interface IDebitCardFactoryData {
  [key: string]: IDebitCard
}