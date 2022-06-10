//-----------------------------------------------------------------------------
// apps/marqeta-adapter/src/card-products/card-products.controller.spec.ts
//-----------------------------------------------------------------------------
import { 
  Test, 
  TestingModule 
}                                   from '@nestjs/testing'
import { ConfigService }            from '@nestjs/config'

import { CardProductsController }   from './card-products.controller'
import { CardProductsService }      from './card-products.service'
import { CreateCardProductDto }     from './dto/create-card-product.dto'
import { UpdateCardProductDto }     from './dto/update-card-product.dto'

import { WinstonLoggerService }     from '@app/winston-logger'

/**
 * Import test data
 */
import {
  createCardProductDtoFactoryData,
  cardProductFactoryData,
  cardProductListFactoryData,
  BaasApplication,
  setMockConfigService,
}                                   from '../../../../test/'

/**
 * Setup test environment and data
 */
const mockConfigService    = setMockConfigService(BaasApplication.MarqetaAdapter)
const createCardProductDto = createCardProductDtoFactoryData.moolah_demo_1
const cardProductData      = cardProductFactoryData.moolah_demo_1
const cardProductListData  = cardProductListFactoryData.moolah_demo_01

/**
 * CardProductsController
 */
describe('CardProductsController', () => {
  let cardProductsController: CardProductsController
  let cardProductsService:    CardProductsService


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CardProductsController],
      providers:   [
        CardProductsService,
        {
          provide:  ConfigService,
          useValue: mockConfigService,
        }, 
        WinstonLoggerService,
      ],
    }).compile();

    cardProductsController = module.get<CardProductsController>(CardProductsController)
    cardProductsService    = module.get<CardProductsService>(CardProductsService)
  });

  /**
   * createV1
   */
  describe(`createV1`, () => {
    it(`Returns a new card product`, async () => {
      let response = {
        card_product: cardProductData,
      }

      const spy    = jest.spyOn(cardProductsService, 'create').mockResolvedValue(response)
      const result = await cardProductsController.createV1(createCardProductDto)

      expect(spy).toBeCalled()
      expect(spy).toBeCalledWith(createCardProductDto)
      expect(result).toEqual(response)
    })
  })

  /**
   * findAllV1
   */
  describe(`findAllV1`, () => {
    it(`Returns a list of card products`, async () => {
      let response = {
        card_products: cardProductListData.data,
        metadata:      {
          pagination: {
            count:       cardProductListData.count,
            start_index: cardProductListData.start_index,
            end_index:   cardProductListData.end_index,
            is_more:     cardProductListData.is_more,
          }
        }
      }

      const spy    = jest.spyOn(cardProductsService, 'findAll').mockResolvedValue(response)
      const result = await cardProductsController.findAllV1()

      expect(spy).toBeCalled()
      expect(spy).toBeCalledWith()
      expect(result).toEqual(response)
    })
  })

  /**
   * findOneV1
   */
  describe(`findOneV1`, () => {
    it(`Returns a card product`, async () => {
      let cardProductToken = cardProductData.token
      let response = {
        card_product: cardProductData,
      }

      const spy    = jest.spyOn(cardProductsService, 'findOne').mockResolvedValue(response)
      const result = await cardProductsController.findOneV1(cardProductToken)

      expect(spy).toBeCalled()
      expect(spy).toBeCalledWith(cardProductToken)
      expect(result).toEqual(response)
    })
  })

  /**
   * updateV1
   */
  describe(`updateV1`, () => {
    it(`Updates a card product`, async () => {
      const cardProductToken     = cardProductData.token
      const updateCardProductDto = {
        active: false,
      }

      const cardProduct = {
        ...cardProductData,
        ...updateCardProductDto,
      }
      const response    = {
        card_product: cardProduct,
      }

      const spy    = jest.spyOn(cardProductsService, 'update').mockResolvedValue(response)
      const result = await cardProductsController.updateV1(cardProductToken, updateCardProductDto)

      expect(spy).toBeCalled()
      expect(spy).toBeCalledWith(cardProductToken, updateCardProductDto)
      expect(result).toEqual(response)
    })
  })
});
