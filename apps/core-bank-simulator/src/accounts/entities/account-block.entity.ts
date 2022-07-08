//----------------------------------------------------------------------------------
// apps/core-bank-simulator/src/accounts/entities/accounts-block.entity.ts
//----------------------------------------------------------------------------------
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
}                             from 'typeorm'

import { Account }            from './account.entity'

import { 
  AccountBlockStatus, 
  AccountBlockType,
  IAccountBlock, 
}                             from '@app/baas-interfaces'

/**
 * @class AccountBlock
 */
@Entity({name: 'account_blocks'})
export class AccountBlock implements IAccountBlock {
  @PrimaryGeneratedColumn('uuid')
  id:             string

  @Column()
  account_id:     string

  @Column({type: 'varchar'})
  block_status:   AccountBlockStatus

  @Column({type: 'varchar'})
  block_type:     AccountBlockType

  @Column({nullable: true})
  block_reason?:  string

  @ManyToOne(() => Account, (account) => account.blocks)
  @JoinColumn({name: 'account_id'})
  account:        Account

  @CreateDateColumn()
  created_at:     Date
  
  @UpdateDateColumn()
  updated_at:     Date
}