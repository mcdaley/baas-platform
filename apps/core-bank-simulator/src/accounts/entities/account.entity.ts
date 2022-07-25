//-----------------------------------------------------------------------------
// apps/core-bank-simulator/src/accounts/entities/account.entity.ts
//-----------------------------------------------------------------------------
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
}                             from 'typeorm'

import { AccountToCustomer }  from './account-to-customer.entity'

import {
  AccountType,
  AccountStatus,
  IAccount,
}                             from '@app/baas-interfaces'
import { AccountBlock }       from './account-block.entity'

/**
 * @class Account
 */
 @Entity({name: 'accounts'})
export class Account {
  @PrimaryGeneratedColumn('uuid')
  id:                     string

  @Column()
  tenant_id:              string

  @Column({type: 'varchar'})
  account_type:           AccountType

  @Column()
  account_number:         string

  @Column()
  routing_number:         string

  @Column()
  name_on_account:        string

  @Column()
  name:                   string

  @Column()
  available_balance:      number

  @Column()
  posted_balance:         number

  //* @Column()
  //* currency:               Currency

  @Column({type: 'varchar'})
  account_status:         AccountStatus

  @Column({nullable: true})
  account_status_reason?: string

  @Column({nullable: true})
  usage?:                 string

  @Column({nullable: true})
  nickname?:              string

  @Column()
  multiple_participants:  boolean

  @OneToMany(() => AccountToCustomer, accountToCustomer => accountToCustomer.account, {cascade: true})
  @JoinColumn({name: 'account_id'})
  participants!: AccountToCustomer[]

  @OneToMany(() => AccountBlock, (block) => block.account)
  @JoinColumn({name: 'account_id'})
  blocks?: AccountBlock[]
  
  @CreateDateColumn()
  created_at:             Date
  
  @UpdateDateColumn()
  updated_at:             Date
} // end of class Account

