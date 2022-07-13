//-----------------------------------------------------------------------------
// apps/core-bank-simulator/src/debit-cards/entities/debit-card.entity.ts
//-----------------------------------------------------------------------------
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
}                             from 'typeorm'

import { Account }            from '../../accounts/entities/account.entity'

import { 
  CardStatus, 
  IDebitCard, 
  IDebitCardsBlock,
}                             from '@app/baas-interfaces'
import { Customer } from '../../customers/entities/customer.entity'

/**
 * @class DebitCard
 */
@Entity({name: 'debit_cards'})
export class DebitCard {
  @PrimaryGeneratedColumn('uuid')
  id:                             string

  @Column()
  name_on_card:                   string

  @Column()
  card_number:                    string

  @Column()
  expiration_date:                string

  @Column()
  cvv:                            string

  @Column({type: 'varchar'})
  status:                         CardStatus

  @Column()
  pin:                            string

  @Column()
  atm_daily:                      number

  @Column()
  pos_daily:                      number

  @Column()
  daily_transactions:             number 

  @Column()
  account_id:                     string

  @OneToOne(() => Account)
  @JoinColumn({name: 'account_id'})
  account!:                       Account

  @Column()
  customer_id:                    string
  
  @OneToOne(() => Customer)
  @JoinColumn({name: 'customer_id'})
  customer!:                      Customer

  
  //* @Column()
  //* branch_id:                      string

  //* blocks?:                        IDebitCardsBlock[]
}

