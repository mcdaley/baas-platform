//---------------------------------------------------------------------------------------
// apps/core-bank-simulator/src/customers/entities/customer.entity.ts
//----------------------------------------------------------------------------------------
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
}                             from 'typeorm'

import { Address }            from './address.entity'
import { AccountToCustomer }  from '../../accounts/entities/account-to-customer.entity'

import { 
  CustomerStatus,
  ICustomer, 
}                             from '@app/baas-interfaces'

/**
 * @class Customer
 */
@Entity({name: 'customers'})
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  id?:                string            // Unique customer identifier
  
  @Column()
  branch_id:          string            // Identifies customer's bank
  
  //* @Column({type: 'enum', enum: CustomerStatus})
  //* status:             CustomerStatus
  @Column()
  status:             string

  @Column()
  first_name:         string
  
  @Column({nullable: true})
  middle_name?:       string
  
  @Column()
  last_name:          string

  @Column({nullable: true})
  suffix?:            string
  
  @Column()
  email:              string
  
  @Column()
  phone_number:       string

  @Column()
  ssn:                string
  
  @Column({nullable: true})
  metatdata?:         string

  @OneToOne(() => Address, {cascade: true})
  @JoinColumn({name: 'physical_address_id'})
  physical_address:   Address

  @OneToOne(() => Address, {cascade: true, nullable: true})
  @JoinColumn({name: 'mailing_address_id'})
  mailing_address?:   Address

  // Customer can have many accounts
  @OneToMany(() => AccountToCustomer, accountToCustomer => accountToCustomer.customer)
  @JoinColumn({name: 'participant_customer_id'})
  accounts?: AccountToCustomer[]
}
