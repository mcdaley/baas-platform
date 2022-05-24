//----------------------------------------------------------------------------------
// apps/baas-debit-card-service/src/debit-cards-blocks/debit-cards-blocks.service.ts
//----------------------------------------------------------------------------------
import { Injectable }               from '@nestjs/common'
import { ConfigService }            from '@nestjs/config'
import axios                        from 'axios'

import { CreateDebitCardsBlockDto } from './dto/create-debit-cards-block.dto'

import { WinstonLoggerService }     from '@app/winston-logger'
import { CoreDebitCardSimulator }   from '@app/core-simulator'
import { IDebitCardsBlock } from '@app/baas-interfaces'

/**
 * @class DebitCardsBlocksService
 */
@Injectable()
export class DebitCardsBlocksService {
  constructor(
    private readonly configService:       ConfigService,
    private readonly logger:              WinstonLoggerService,
    private readonly debitCardSimulator:  CoreDebitCardSimulator,
  ) {}

  /**
   * @method create
   */
  async create(
    debitCardId:              string, 
    createDebitCardsBlockDto: CreateDebitCardsBlockDto) : Promise<IDebitCardsBlock[]> 
  {
    this.logger.log(`Block debit card id=[${debitCardId}], w/ block= %o`, createDebitCardsBlockDto)
    try {
      //* const blocks = await this.debitCardSimulator.createDebitCardBlocks(debitCardId, createDebitCardsBlockDto)
      //* const result = {
      //*   blocks: blocks,
      //* }
      const url      = `${this.configService.get('bankSimulatorDebitCardsUrl')}/${debitCardId}`
      const response = await axios.patch(url, createDebitCardsBlockDto)
      const result   = <IDebitCardsBlock[]>response.data
      
      return result
    }
    catch(error) {
      throw(error)
    }
  }

  /**
   * @method findAll
   */
  async findAll(debitCardId: string) : Promise<IDebitCardsBlock[]> {
    try {
      //* const blocks = await this.debitCardSimulator.findAllDebitCardBlocks(debitCardId)
      //* const result = {
      //*   blocks: blocks
      //* }
      const url      = `${this.configService.get('bankSimulatorDebitCardsUrl')}/${debitCardId}`
      const response = await axios.get(url)
      const result   = <IDebitCardsBlock[]>response.data
      
      return result
    }
    catch(error) {
      throw(error)
    }
  }

  /**
   * @method remove
   */
  async remove(debitCardId: string, blockId: string) : Promise<IDebitCardsBlock[]> {
    try {
      //* const  blocks = await this.debitCardSimulator.removeDebitCardBlocks(debitCardId, blockId)
      //* const result = {
      //*   blocks: blocks
      //* }
      const url      = `${this.configService.get('bankSimulatorDebitCardsUrl')}/${debitCardId}/blocks/${blockId}`
      const response = await axios.delete(url)
      const result   = <IDebitCardsBlock[]>response.data

      return result
    }
    catch(error) {
      throw(error)
    }
  }
}
