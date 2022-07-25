//-----------------------------------------------------------------------------
// apps/baas-debit-card-service/src/debit-cards/debit-cards.controller.ts
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
}                                   from '@nestjs/common'

import { DebitCardsService }        from './debit-cards.service'
import { CreateDebitCardDto }       from './dto/create-debit-card.dto'
import { UpdateDebitCardDto }       from './dto/update-debit-card.dto'
import { UpdateDebitCardLimitsDto } from './dto/update-debit-card-limits.dto'
import { UpdateDebitCardPinDto }    from './dto/update-debit-card-pin.dto'

import { 
  CustomerId,
  TenantId,
  IdempotencyKey 
}                                   from '@app/baas-errors'
import { CardStatus }               from '@app/baas-interfaces'
import { WinstonLoggerService }     from '@app/winston-logger'

/**
 * @class DebitCardsController
 */
@Controller({path: 'debit-cards', version: '1'})
export class DebitCardsController {
  /**
   * @constructor
   */
  constructor(
    private readonly debitCardsService: DebitCardsService,
    private readonly logger:            WinstonLoggerService,
  ) {}

  /**
   * @method createV1
   */
  @Post()
  createV1(
    @CustomerId()     customerId:     string,
    @TenantId()       tenantId:       string,
    @IdempotencyKey() idempotencyKey: string,
    @Body() createDebitCardDto: CreateDebitCardDto
  ) {
    this.logger.log(`POST /v1/debit-cards, createDebitCardDto= %o`, createDebitCardDto)
    return this.debitCardsService.create(
      createDebitCardDto, customerId, tenantId, idempotencyKey)
  }

  /**
   * @method findAllV1
   */
  @Get()
  findAllV1(
    @CustomerId() customerId: string,
    @TenantId()   tenantId:   string) 
  {
    this.logger.log(`GET /v1/debit-cards`)
    return this.debitCardsService.findAll(customerId, tenantId)
  }

  /**
   * @method findOneV1
   */
  @Get(':debitCardId')
  findOneV1(
    @CustomerId() customerId: string,
    @TenantId()   tenantId:   string,
    @Param('debitCardId', ParseUUIDPipe) debitCardId: string) {
    this.logger.log(`GET /v1/debit-cards/${debitCardId}`)
    return this.debitCardsService.findOne(debitCardId, customerId, tenantId)
  }

  /**
   * @method activateDebitCardV1
   */
  @Patch(':debitCardId/activate')
  activateDebitCardV1(
    @CustomerId()     customerId:     string,
    @TenantId()       tenantId:       string,
    @IdempotencyKey() idempotencyKey: string,
    @Param('debitCardId', ParseUUIDPipe) debitCardId: string) 
  {
    this.logger.log(`PATCH /v1/debit-cards/${debitCardId}/activate`)
    
    const  updateDebitCardDto = {status: CardStatus.Active }
    return this.debitCardsService.update(
      debitCardId, updateDebitCardDto, customerId, tenantId, idempotencyKey
    )
  }

  /**
   * @method cancelDebitCardV1
   */
  @Patch(':debitCardId/cancel')
  cancelDebitCardV1(
    @CustomerId()     customerId:     string,
    @TenantId()       tenantId:       string,
    @IdempotencyKey() idempotencyKey: string,
    @Param('debitCardId', ParseUUIDPipe) debitCardId: string) 
  {
    this.logger.log(`PATCH /v1/debit-cards/${debitCardId}/cancel`)
    
    const  updateDebitCardDto = {status: CardStatus.Canceled }
    return this.debitCardsService.update(
      debitCardId, updateDebitCardDto, customerId, tenantId, idempotencyKey
    )
  }

  /**
   * @method updateDebitCardLimitsV1
   */
  @Patch(':debitCardId/limits')
  updateDebitCardLimitsV1(
    @CustomerId()     customerId:     string,
    @TenantId()       tenantId:       string,
    @IdempotencyKey() idempotencyKey: string,
    @Param('debitCardId', ParseUUIDPipe) debitCardId: string,
    @Body() updateDebitCardLimitsDto: UpdateDebitCardLimitsDto) 
  {
    this.logger.log(
      `PATCH /v1/debit-cards/${debitCardId}/limits, updateDebitCardLimitsDto= %o`, 
      updateDebitCardLimitsDto
    )
    
    return this.debitCardsService.update(
      debitCardId, updateDebitCardLimitsDto, customerId, tenantId, idempotencyKey
    )
  }

  /**
   * @method updateDebitCardPinDto
   */
  @Patch(':debitCardId/pin')
  updateDebitCardPinV1(
    @CustomerId()     customerId:     string,
    @TenantId()       tenantId:       string,
    @IdempotencyKey() idempotencyKey: string,
    @Param('debitCardId', ParseUUIDPipe) debitCardId: string,
    @Body() updateDebitCardPinDto: UpdateDebitCardPinDto) 
  {
    this.logger.log(
      `PATCH /v1/debit-cards/${debitCardId}/pin, updateDebitCardPinDto= %o`, 
      updateDebitCardPinDto
    )
    
    return this.debitCardsService.update(
      debitCardId, updateDebitCardPinDto, customerId, tenantId, idempotencyKey
    )
  }

  //* @Patch(':debitCardId')
  //* updateV1(
  //*   @Param('debitCardId', ParseUUIDPipe) debitCardId: string, 
  //*   @Body() updateDebitCardDto: UpdateDebitCardDto
  //* ) {
  //*   this.logger.log(
  //*     `PATCH /v1/debit-cards/${debitCardId}, updateDebitCardDto= %o`, updateDebitCardDto
  //*   )
  //*   return this.debitCardsService.update(debitCardId, updateDebitCardDto);
  //* }

  //* @Delete(':debitCardId')
  //* removeV1(@Param('debitCardId', ParseUUIDPipe) debitCardId: string) {
  //*   this.logger.log(`DELETE /v1/debit-cards/${debitCardId}`)
  //*   return this.debitCardsService.remove(debitCardId)
  //* }
}
