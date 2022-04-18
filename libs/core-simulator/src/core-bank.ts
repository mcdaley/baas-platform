//-----------------------------------------------------------------------------
// libs/core-simulator/src/core-bank.ts
//-----------------------------------------------------------------------------
import { 
  IAccount, 
  IDebitCard, 
  IUpdateAccountDto,
}                       from '@app/baas-interfaces'

/**
 * CoreBank simulator that is implemented as a singleton, so that I have 
 * a single storage for debit cards.
 * 
 * @class CoreBank
 */
export class CoreBank {
  private static  _default:   CoreBank
  private         accounts:   Map<string, IAccount>
  private         debitCards: Map<string, IDebitCard>

  constructor() {
    this.accounts   = new Map<string, IAccount>()
    this.debitCards = new Map<string, IDebitCard>()
  }

  static instance(): CoreBank {
    if(!CoreBank._default) {
      CoreBank._default = new CoreBank()
    }
    return CoreBank._default
  }

  //
  // Account APIs
  //
  public hasAccount(accountId: string): boolean {
    return this.accounts.has(accountId) ? true : false
  }

  getAccounts() : IAccount[] {
    let accountList: IAccount[] = []
    for(let account of this.accounts.values()) {
      accountList.push(account)
    }
    return accountList
  }
  
  public getAccount(accountId: string): IAccount | undefined { 
    return this.accounts.get(accountId)
  }

  public setAccount(accountId: string, account: IAccount) {
    this.accounts.set(account.id, account)
  }

  public updateAccount(accountId: string, updateAccountDto: IUpdateAccountDto) {
    let account = this.getAccount(accountId)
    account = {...account, ...updateAccountDto}

    this.setAccount(account.id, account)
  }

  public removeAccount(accountId: string) {
    this.accounts.delete(accountId)
  }

  //
  // Debit Card APIs
  //
  public hasDebitCard(debitCardId: string): boolean {
    return this.debitCards.has(debitCardId) ? true : false
  }

  getDebitCards() : IDebitCard[] {
    let debitCardList: IDebitCard[] = []
    for(let debitCard of this.debitCards.values()) {
      debitCardList.push(debitCard)
    }
    return debitCardList
  }

  public getDebitCard(debitCardId: string): IDebitCard | undefined { 
    return this.debitCards.get(debitCardId)
  }

  public setDebitCard(debitCardId: string, debitCard: IDebitCard) {
    this.debitCards.set(debitCard.id, debitCard)
  }
}