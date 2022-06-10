//-----------------------------------------------------------------------------
// apps/marqeta-adapter/src/card-products/card-products.service.ts
//-----------------------------------------------------------------------------
import { Injectable }               from '@nestjs/common'
import { ConfigService }            from '@nestjs/config'
import axios                        from 'axios'

import { CreateCardProductDto }     from './dto/create-card-product.dto'
import { UpdateCardProductDto }     from './dto/update-card-product.dto'

import { base64EncodeCredentials }  from '@app/baas-marqeta'
import { WinstonLoggerService }     from '@app/winston-logger'
import { createBaaSException }      from '@app/baas-errors'

/**
 * @class CardProductsService
 */
@Injectable()
export class CardProductsService {
  private baseUrl:    string
  private authToken:  string

  /**
   * @constructor
   */
  constructor(
    private readonly configService: ConfigService,
    private readonly logger:        WinstonLoggerService,
  ) {
    this.baseUrl   = this.configService.get('marqetaBaseUrl')
    this.authToken = base64EncodeCredentials(
      this.configService.get('marqetaUsername'), 
      this.configService.get('marqetaPassword')
    ) 
  }

  /**
   * @method create
   */
  async create(createCardProductDto: CreateCardProductDto) {
    try {
      const url    = `${this.baseUrl}cardproducts`
      const config = {
        headers: this.buildRequestHeader(),
      }

      const response    = await axios.post(url, createCardProductDto, config)
      const cardProduct = response.data
      const result      = {
        card_product: cardProduct
      }

      this.logger.log(`Created card product %o`, cardProduct)
      return result
    }
    catch(error) {
      const errorData = error.response.data
      this.logger.error(
        `Failed to create card product, error= %o`, 
        errorData
      )
      throw(createBaaSException(error, 'Marqeta'))
    }
  }

  /**
   * @method findAll
   */
  async findAll() {
    try {
      const url    = `${this.baseUrl}cardproducts`
      const config = {
        headers: this.buildRequestHeader()
      }

      const response        = await axios.get(url, config)
      const cardProductList = response.data.data
      const metadata        = {
        pagination: {
          count:        response.data.count,
          start_index:  response.data.start_index,
          end_index:    response.data.end_index,
          is_more:      response.data.is_more,
        }
      }

      const result = {
        card_products: cardProductList,
        metadata:      metadata,
      }

      this.logger.log(`Fetched card products = %o`, cardProductList)
      return result
    }
    catch(error) {
      const errorData = error.response.data
      this.logger.error(
        `Failed to fetch card products, error= %o`, 
        errorData
      )
      throw(createBaaSException(error, 'Marqeta'))
    }
  }

  /**
   * @method findOne
   */
  async findOne(cardProductToken: string) {
    try {
      const url     = `${this.baseUrl}cardproducts/${cardProductToken}`
      const config  = {
        headers: this.buildRequestHeader()
      }

      const response    = await axios.get(url, config)
      const cardProduct = response.data
      const result      = {
        card_product: cardProduct,
      }

      this.logger.log(`Fetched card product w/ token=[${cardProductToken}], %o`, cardProduct)
      return result
    }
    catch(error) {
      const errorData = error.response.data
      this.logger.error(
        `Failed to fetch card product w/ token=[${cardProductToken}], error= %o`, 
        errorData
      )
      throw(createBaaSException(error, 'Marqeta'))
    }
  }

  /**
   * @method udpate
   */
  async update(cardProductToken: string, updateCardProductDto: UpdateCardProductDto) {
    try {
      const url    = `${this.baseUrl}cardproducts/${cardProductToken}`
      const config = {
        headers: this.buildRequestHeader(),
      }
      this.logger.log(`Axios config= %o`, config)
      this.logger.log(`PUT ${url}, updateCardProductDto= %o`, updateCardProductDto)

      const response    = await axios.put(url, updateCardProductDto, config)
      const cardProduct = response.data
      const result      = {
        card_product: cardProduct,
      }

      this.logger.log(`Updated card product w/ token=[${cardProductToken}], %o`, cardProduct)
      return result
    }
    catch(error) {
      const errorData = error.response.data
      this.logger.error(
        `Failed to update card product w/ token=[${cardProductToken}], error= %o`, 
        errorData
      )
      throw(createBaaSException(error, 'Marqeta'))
    }
  }

  /**
   * @method buildRequestHeader
   */
  private buildRequestHeader() {
    const header  = {
      'Content-Type':   `application/json`,
      'Accept':         `application/json`,
      'Authorization':  `Basic ${this.authToken}`,
    }

    return header
  }
} // end of class CardProductsService
