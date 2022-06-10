//-----------------------------------------------------------------------------
// apps/marqeta-adapter/src/card-products/card-products.service.spec.ts
//-----------------------------------------------------------------------------
import { 
  Test, 
  TestingModule 
}                                   from '@nestjs/testing'
import { ConfigService }            from '@nestjs/config'
import axios                        from 'axios'

import { CardProductsService }      from './card-products.service'

import { base64EncodeCredentials }  from '@app/baas-marqeta'
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
import { response } from 'express'

/**
 * Setup test environment and data
 */
const mockConfigService    = setMockConfigService(BaasApplication.MarqetaAdapter)
const createCardProductDto = createCardProductDtoFactoryData.moolah_demo_1
const cardProductData      = cardProductFactoryData.moolah_demo_1
const cardProductListData  = cardProductListFactoryData.moolah_demo_01

/**
 * CardProductsService
 */
describe('CardProductsService', () => {
  let cardProductsService: CardProductsService
  let configService:       ConfigService
  let baseUrl:             string

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CardProductsService,
        {
          provide:  ConfigService,
          useValue: mockConfigService,
        }, 
        WinstonLoggerService,
      ],
    }).compile();

    cardProductsService = module.get<CardProductsService>(CardProductsService)
    configService       = module.get<ConfigService>(ConfigService)
  })

  /**
   * @function buildRequestHeader
   */
  const buildRequestHeader = () => {
    const authToken = base64EncodeCredentials(
      configService.get('marqetaUsername'),
      configService.get('marqetaPassword')
    )
    
    const header  = {
      'Content-Type':   `application/json`,
      'Accept':         `application/json`,
      'Authorization':  `Basic ${authToken}`,
    }

    return header
  }

  /**
   * @function marqetaUrl
   */
  const marqetaUrl = () => {
    return `${configService.get('marqetaBaseUrl')}cardproducts`
  }

  /**
   * create()
   */
  describe(`create`, () => {
    it(`Creates a new card product`, async () => {
      let url             = marqetaUrl()
      let config          = { headers:      buildRequestHeader() }
      let axiosResponse   = { data:         cardProductData }
      let serviceResponse = { card_product: cardProductData}

      const spy    = jest.spyOn(axios, 'post').mockResolvedValue(axiosResponse)
      const result = await cardProductsService.create(createCardProductDto)

      expect(spy).toBeCalled()
      expect(spy).toBeCalledWith(url, createCardProductDto, config)
      expect(result).toEqual(serviceResponse)
    })
  })

  /**
   * findAll()
   */
  describe(`findAll`, () => {
    ///////////////////////////////////////////////////////////////////////////
    // TODO: NEED TO CONVERT THE MARQETA RESPONSE TO MY FORMAT.
    ///////////////////////////////////////////////////////////////////////////
    it(`Returns a list of card products`, async () => {
      let url             = marqetaUrl()
      let config          = { headers:  buildRequestHeader() }
      let axiosResponse   = { data:     cardProductListData }
      let serviceResponse = {
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

      const spy    = jest.spyOn(axios, 'get').mockResolvedValue(axiosResponse)
      const result = await cardProductsService.findAll()

      expect(spy).toBeCalled()
      expect(spy).toBeCalledWith(url, config)
      expect(result).toEqual(serviceResponse)
    })
  })

  /**
   * findOne()
   */
  describe(`findOne`, () => {
    it(`Returns a card product`, async () => {
      let cardProductToken  = cardProductData.token
      let url               = `${marqetaUrl()}/${cardProductToken}`
      let config            = { headers:      buildRequestHeader() }
      let axiosResponse     = { data:         cardProductData }
      let serviceResponse   = { card_product: cardProductData }

      const spy    = jest.spyOn(axios, 'get').mockResolvedValue(axiosResponse)
      const result = await cardProductsService.findOne(cardProductToken)

      expect(spy).toBeCalled()
      expect(spy).toBeCalledWith(url, config)
      expect(result).toEqual(serviceResponse)
    })
  })

  describe(`update`, () => {
    it(`Updates a card product`, async () => {
      let updateCardProductDto = {
        active: false,
        config: {
          poi: {
            ecommerce:  true,
            atm:        true,
          }
        }
      }
      let cardProduct = {
        ...cardProductData,
        ...updateCardProductDto
      }
      
      let cardProductToken  = cardProduct.token
      let url               = `${marqetaUrl()}/${cardProductToken}`
      let config            = { headers:      buildRequestHeader() }
      let axiosResponse     = { data:         cardProduct }
      let serviceResponse   = { card_product: cardProduct }

      const spy    = jest.spyOn(axios, 'put').mockResolvedValue(axiosResponse)
      const result = await cardProductsService.update(cardProductToken, updateCardProductDto)

      expect(spy).toBeCalled()
      expect(spy).toBeCalledWith(url, updateCardProductDto, config)
      expect(result).toEqual(serviceResponse)
    })
  })
});
