//-----------------------------------------------------------------------------
// apps/core-bank-simulator/src/accounts/entities/account-to-customer.entity.ts
//-----------------------------------------------------------------------------
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
}                             from 'typeorm'

import { Account }            from './account.entity'
import { Customer }           from '../../customers/entities/customer.entity'

import { ParticipantRole }    from '@app/baas-interfaces'

/**
 * Join table for the accounts many-to-many relationship with customers.
 * 
 * @class AccountToCustomer
 */
@Entity({name: 'accounts_to_customers'})
export class AccountToCustomer {
  @PrimaryGeneratedColumn('uuid')
  id!:                string

  @Column()
  account_id!:        string

  @Column()
  customer_id!: string

  @Column({type: 'varchar'})
  participant_role!:  ParticipantRole

  @ManyToOne(() => Account, (account) => account.participants)
  @JoinColumn({name: 'account_id'})
  account!: Account

  @ManyToOne(() => Customer, (customer) => customer.accounts)
  @JoinColumn({name: 'customer_id'})
  customer!: Customer

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}