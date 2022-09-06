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
  IdempotencyKey,
  BaaSRequestHeaders,
  IBaaSRequestHeaders,
}                                   from '@app/baas-errors'
import { CardStatus }               from '@app/baas-interfaces'

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
  ) {}

  /**
   * @method createV1
   */
  @Post()
  createV1(
    @BaaSRequestHeaders() requestHeaders: IBaaSRequestHeaders,
    @Body() createDebitCardDto: CreateDebitCardDto
  ) {
    return this.debitCardsService.create(createDebitCardDto, requestHeaders)
  }

  /**
   * @method findAllV1
   */
  @Get()
  findAllV1(
    @BaaSRequestHeaders() requestHeaders: IBaaSRequestHeaders) 
  {
    return this.debitCardsService.findAll(requestHeaders)
  }

  /**
   * @method findOneV1
   */
  @Get(':debitCardId')
  findOneV1(
    @BaaSRequestHeaders() requestHeaders: IBaaSRequestHeaders,
    @Param('debitCardId', ParseUUIDPipe) debitCardId: string) 
  {
    return this.debitCardsService.findOne(debitCardId, requestHeaders)
  }

  /**
   * @method activateDebitCardV1
   */
  @Patch(':debitCardId/activate')
  activateDebitCardV1(
    @BaaSRequestHeaders() requestHeaders: IBaaSRequestHeaders,
    @Param('debitCardId', ParseUUIDPipe) debitCardId: string) 
  { 
    const  updateDebitCardDto = {status: CardStatus.Active }
    return this.debitCardsService.update(
      debitCardId, updateDebitCardDto, requestHeaders
    )
  }

  /**
   * @method cancelDebitCardV1
   */
  @Patch(':debitCardId/cancel')
  cancelDebitCardV1(
    @BaaSRequestHeaders() requestHeaders: IBaaSRequestHeaders,
    @Param('debitCardId', ParseUUIDPipe) debitCardId: string) 
  { 
    const  updateDebitCardDto = {status: CardStatus.Canceled }
    return this.debitCardsService.update(
      debitCardId, updateDebitCardDto, requestHeaders
    )
  }

  /**
   * @method updateDebitCardLimitsV1
   */
  @Patch(':debitCardId/limits')
  updateDebitCardLimitsV1(
    @BaaSRequestHeaders() requestHeaders: IBaaSRequestHeaders,
    @Param('debitCardId', ParseUUIDPipe) debitCardId: string,
    @Body() updateDebitCardLimitsDto: UpdateDebitCardLimitsDto) 
  {
    return this.debitCardsService.update(
      debitCardId, updateDebitCardLimitsDto, requestHeaders
    )
  }

  /**
   * @method updateDebitCardPinDto
   */
  @Patch(':debitCardId/pin')
  updateDebitCardPinV1(
    @BaaSRequestHeaders() requestHeaders: IBaaSRequestHeaders,
    @Param('debitCardId', ParseUUIDPipe) debitCardId: string,
    @Body() updateDebitCardPinDto: UpdateDebitCardPinDto) 
  {
    return this.debitCardsService.update(
      debitCardId, updateDebitCardPinDto, requestHeaders
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
