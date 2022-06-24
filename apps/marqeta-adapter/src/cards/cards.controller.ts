//-----------------------------------------------------------------------------
// apps/marqeta-adapter/src/cards/cards.controller.ts
//-----------------------------------------------------------------------------
import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  Query
}                               from '@nestjs/common'

import { CardsService }         from './cards.service'
import { CreateCardDto }        from './dto/create-card.dto'
import { UpdateCardDto }        from './dto/update-card.dto'
import { PanRequestDto }        from './dto/pan-request.dto'
import { 
  CardQueryDto, 
  MarqetaSearchQueryDto, 
}                               from './dto/card-query.dto'

import { WinstonLoggerService } from '@app/winston-logger'

/**
 * @class CardsController
 */
@Controller({path: 'cards', version: '1'})
export class CardsController {
  /**
   * @constructor
   */
  constructor(
    private readonly cardsService:  CardsService,
    private readonly logger:        WinstonLoggerService,
  ) {}

  /**
   * @method createV1
   */
  @Post()
  createV1(@Body() createCardDto: CreateCardDto) {
    this.logger.log(`POST /v1/cards, createCardDto= %o`, createCardDto)
    return this.cardsService.create(createCardDto);
  }

  /**
   * Fetch all the cards for a user.
   * @method findAllByUserTokenV1
   */
  @Get('user/:userToken')
  findAllByUserTokenV1(
    @Param('userToken') userToken: string,
    @Query() cardSearchQueryDto: MarqetaSearchQueryDto
  ) {
    this.logger.log(`GET /v1/cards/user/${userToken}`)
    return this.cardsService.findAllByUserToken(userToken, cardSearchQueryDto)
  }

  /**
   * Fetch all cards by the last 4 digits of the PAN.
   * @method findAllV1
   */
  @Get()
  findAllByLast4V1(@Query() cardQueryDto: CardQueryDto) {
    this.logger.log(`GET /v1/cards, query= %o`, cardQueryDto)
    return this.cardsService.findAllByLast4(cardQueryDto)
  }

  /**
   * @method findOneV1
   */
  @Get(':cardToken')
  findOneV1(@Param('cardToken') cardToken: string) {
    this.logger.log(`GET /v1/cards/${cardToken}`)
    return this.cardsService.findOne(cardToken);
  }

  /**
   * @method findOneByBarcodeV1
   */
  @Get('barcode/:barcode')
  findOneByBarcodeV1(@Param('barcode') barcode: string) {
    this.logger.log(`GET /v1/cards/barcode/${barcode}`)
    return this.cardsService.findOneByBarcode(barcode)
  }

  /**
   * Fetch a card using the card_token and return the full PAN w/ the
   * card details.
   * @method findCardWithPanV1
   */
  @Get(':cardToken/showpan')
  findOneAndShowPanV1(@Param('cardToken') cardToken: string) {
    this.logger.log(`GET /v1/cards/${cardToken}/showpan`)
    return this.cardsService.findOneAndShowPan(cardToken)
  }

  /**
   * Fetch a card using the PAN. The request is a POST instead of a GET because it
   * is more secure to include the PAN in the request body instead of the Url.
   * @method findOneByPanV1
   */
  @Post('get-by-pan')
  findOneByPanV1(@Body() panRequestDto: PanRequestDto) {
    this.logger.log(`POST /v1/cards/get-by-pan, panRequestDto= %o`, panRequestDto)
    return this.cardsService.findOneByPan(panRequestDto)
  }

  /**
   * @method updateV1
   */
  @Patch(':cardToken')
  updateV1(
    @Param('cardToken') cardToken: string, 
    @Body() updateCardDto: UpdateCardDto
  ) {
    this.logger.log(`PATCH /v1/cards/${cardToken}, updateCardDto= %o`, updateCardDto)
    return this.cardsService.update(cardToken, updateCardDto)
  }
} // end of class CardsController
