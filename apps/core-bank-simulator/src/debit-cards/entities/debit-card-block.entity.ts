//-----------------------------------------------------------------------------
// apps/core-bank-simulator/src/debit-cards/entities/debit-card-block.entity.ts
//-----------------------------------------------------------------------------
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
}                           from 'typeorm'

import { DebitCard }        from './debit-card.entity'

import {
  BlockReason,
  IDebitCardsBlock,
}                           from '@app/baas-interfaces'

/**
 * @class DebitCardBlock
 */
@Entity({name: 'debit_card_blocks'})
export class DebitCardBlock implements IDebitCardsBlock {
  @PrimaryGeneratedColumn('uuid')
  id:             string

  @Column({type: 'varchar', nullable: true})
  block_reason:   BlockReason

  @Column({type: 'boolean'})
  is_active:      boolean

  @CreateDateColumn()
  block_date:     Date

  @UpdateDateColumn()
  updated_at:     Date

  @Column()
  debit_card_id:  string

  @ManyToOne(() => DebitCard, (debitCard) => debitCard.blocks)
  @JoinColumn({name: 'debit_card_id'})
  debitCard:      DebitCard
}