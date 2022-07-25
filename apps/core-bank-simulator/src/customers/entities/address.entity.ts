//-----------------------------------------------------------------------------
// apps/core-bank-simulator/src/customers/entities/address.entity.ts
//-----------------------------------------------------------------------------
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
}                             from 'typeorm'

import { IAddress, States }   from '@app/baas-interfaces'

/**
 * @class Address
 */
@Entity({name: 'addresses'})
export class Address {

  @PrimaryGeneratedColumn('uuid')
  id?:               string
  
  @Column({nullable: true})
  name?:             string
  
  @Column()
  street_line_1:    string
  
  @Column({nullable: true})
  street_line_2?:   string
  
  @Column()
  city:             string
  
  @Column({type: 'varchar'})
  state:            States
  
  @Column()
  postal_code:      string

  @CreateDateColumn()
  created_at:       Date

  @UpdateDateColumn()
  updated_at:       Date
}