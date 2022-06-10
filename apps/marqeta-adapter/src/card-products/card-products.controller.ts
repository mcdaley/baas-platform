//-----------------------------------------------------------------------------
// apps/marqeta-adapter/src/card-products/card-products.controller.ts
//-----------------------------------------------------------------------------
import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete 
}                                 from '@nestjs/common'

import { CardProductsService }    from './card-products.service'
import { CreateCardProductDto }   from './dto/create-card-product.dto'
import { UpdateCardProductDto }   from './dto/update-card-product.dto'

import { WinstonLoggerService }   from '@app/winston-logger'
import { IdempotencyKey }         from '@app/baas-errors'

/**
 * @class CardProductsController
 */
@Controller({path: 'card-products', version: '1'})
export class CardProductsController {
  constructor(
    private readonly cardProductsService: CardProductsService,
    private readonly logger:              WinstonLoggerService,
  ) {}

  @Post()
  createV1(@Body() createCardProductDto: CreateCardProductDto) {
    this.logger.log(`POST /v1/card-products, createCardProductDto= %o`, createCardProductDto)
    return this.cardProductsService.create(createCardProductDto);
  }

  @Get()
  findAllV1() {
    this.logger.log(`GET /v1/card-products`)
    return this.cardProductsService.findAll();
  }

  @Get(':cardProductToken')
  findOneV1(@Param('cardProductToken') cardProductToken: string) {
    this.logger.log(`GET /v1/card-products/${cardProductToken}`)
    return this.cardProductsService.findOne(cardProductToken);
  }

  @Patch(':cardProductToken')
  updateV1(
    @Param('cardProductToken') cardProductToken: string, 
    @Body() updateCardProductDto: UpdateCardProductDto
  ) {
    this.logger.log(`PATCH /v1/card-products/${cardProductToken}, updateCardProductDto= %o`, updateCardProductDto)
    return this.cardProductsService.update(cardProductToken, updateCardProductDto);
  }
}
