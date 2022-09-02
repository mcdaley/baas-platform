//-----------------------------------------------------------------------------
// apps/core-bank-simulator/src/debit-cards/debit-cards.controller.ts
//-----------------------------------------------------------------------------
import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  ParseUUIDPipe,
  HttpCode,
  HttpStatus
}                                 from '@nestjs/common'

import { DebitCardsService }      from './debit-cards.service'
import { CreateDebitCardDto }     from './dto/create-debit-card.dto'
import { UpdateDebitCardDto }     from './dto/update-debit-card.dto'

import { 
  CustomerId, 
  IdempotencyKey, 
  TenantId, 
}                                 from '@app/baas-errors'

/**
 * @class DebitCardsController
 */
@Controller({path: 'debit-cards', version: '1'})
export class DebitCardsController {
  constructor(
    private readonly debitCardsService: DebitCardsService,
  ) {}

  /**
   * @method createV1
   */
  @Post()
  createV1(
    @TenantId()       tenantId:           string,
    @IdempotencyKey() idempotencyKey:     string,
    @Body()           createDebitCardDto: CreateDebitCardDto) 
  {
    return this.debitCardsService.create(createDebitCardDto, tenantId);
  }

  /**
   * @method findallV1
   */
  @Get()
  findAllV1(
    @CustomerId() customerId: string,
    @TenantId()   tenantId:   string) 
  {
    return this.debitCardsService.findAll(customerId, tenantId)
  }

  /**
   * @method findOneV1
   */
  @Get(':debitCardId')
  findOneV1(
    @CustomerId() customerId: string,
    @TenantId()   tenantId:   string,
    @Param('debitCardId', ParseUUIDPipe) debitCardId: string) 
  {
    return this.debitCardsService.findOne(debitCardId, customerId, tenantId)
  }

  /**
   * @method updateV1
   */
  @Patch(':debitCardId')
  updateV1(
    @CustomerId() customerId: string,
    @TenantId()   tenantId:   string,
    @Param('debitCardId', ParseUUIDPipe) debitCardId: string, 
    @Body() updateDebitCardDto: UpdateDebitCardDto) 
  {
    return this.debitCardsService.update(debitCardId, updateDebitCardDto, customerId, tenantId);
  }

  /**
   * @method removeV1
   */
  @Delete(':debitCardId')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeV1(
    @CustomerId() customerId: string,
    @TenantId()   tenantId:   string,
    @Param('debitCardId', ParseUUIDPipe) debitCardId: string) 
  {
    return this.debitCardsService.remove(debitCardId, customerId, tenantId);
  }
}
