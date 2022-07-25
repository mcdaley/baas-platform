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

import { WinstonLoggerService }   from '@app/winston-logger'
import { CustomerId, IdempotencyKey, TenantId } from '@app/baas-errors'

/**
 * @class DebitCardsController
 */
@Controller({path: 'debit-cards', version: '1'})
export class DebitCardsController {
  constructor(
    private readonly debitCardsService: DebitCardsService,
    private readonly logger:            WinstonLoggerService,
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
    this.logger.log(`POST /core/api/v1/debit-cards, createDebitCardDto= %o`, createDebitCardDto)
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
    this.logger.log(`GET /core/api/v1/debit-cards`)
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
    this.logger.log(`GET /core/api/v1/debit-cards/${debitCardId}`)
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
    this.logger.log(
      `PATCH /core/api/v1/debit-cards/${debitCardId}, updateDebitCardDto = %o`, 
      updateDebitCardDto
    )
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
    this.logger.log(`DELETE /core/api/v1/debit-cards/${debitCardId}`)
    return this.debitCardsService.remove(debitCardId, customerId, tenantId);
  }
}
