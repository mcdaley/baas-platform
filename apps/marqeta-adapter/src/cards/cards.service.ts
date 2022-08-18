//-----------------------------------------------------------------------------
// apps/marqeta-adapter/src/cards/cards.service.ts
//-----------------------------------------------------------------------------
import { Injectable }               from '@nestjs/common'
import { ConfigService }            from '@nestjs/config'
import axios                        from 'axios'

import { CreateCardDto }            from './dto/create-card.dto'
import { UpdateCardDto }            from './dto/update-card.dto'
import { 
  CardQueryDto, 
  MarqetaSearchQueryDto, 
}                                   from './dto/card-query.dto'
import { PanRequestDto }            from './dto/pan-request.dto'

import { 
  createBaaSException,
  BaaSErrorLabel, 
}                                   from '@app/baas-errors'
import { WinstonLoggerService }     from '@app/winston-logger'
import { base64EncodeCredentials }  from '@app/baas-marqeta'

/**
 * @class CardsService
 */
@Injectable()
export class CardsService {
  private baseUrl :   string
  private authToken:  string

  /**
   * @constructor
   */
  constructor(
    private readonly configService: ConfigService,
    private readonly logger:        WinstonLoggerService,
  ) {
    this.baseUrl   = configService.get('marqetaBaseUrl')
    this.authToken = base64EncodeCredentials(
      this.configService.get('marqetaUsername'), 
      this.configService.get('marqetaPassword')
    )
  }

  /**
   * @method create
   */
  async create(createCardDto: CreateCardDto) {
    try {
      const url    = `${this.baseUrl}cards`
      const config = {
        headers: this.buildRequestHeader(),
      }

      const response  = await axios.post(url, createCardDto, config)
      const card      = response.data
      const result    = {
        card: card
      }

      this.logger.log(`Created card= %o`, card)
      return result
    }
    catch(error) {
      const errorData = error.response.data
      this.logger.error(
        `Failed to create debit card, error= %o`, 
        errorData
      )
      throw(createBaaSException(error, BaaSErrorLabel.Marqeta))
    }
  }

  /**
   * @method findAllByUserToken
   */
  async findAllByUserToken(userToken: string, cardSearchQueryDto: MarqetaSearchQueryDto) {
    try {
      const url    = `${this.baseUrl}cards/user/${userToken}`
      const config = {
        headers: this.buildRequestHeader(),
        params:  cardSearchQueryDto,
      }
      this.logger.log(`Axios config = %o`, config)

      const response = await axios.get(url, config)
      const cards    = response.data.data
      const metadata = {
        pagination: {
          count:        response.data.count,
          start_index:  response.data.start_index,
          end_index:    response.data.end_index,
          is_more:      response.data.is_more,
        }
      }
      const result   = {
        cards:    cards,
        metadata: metadata,
      }

      this.logger.log(
        `Fetched ${cards.length} debit cards for user=[${userToken}], result= %o`, 
        result
      )
      return result
    }
    catch(error) {
      const errorData = error.response.data
      this.logger.error(
        `Failed to fetch debit cards, error= %o`, 
        errorData
      )
      throw(createBaaSException(error, BaaSErrorLabel.Marqeta))
    }
  }

  /**
   * @method findAllByLast4 
   */
  async findAllByLast4(cardQueryDto: CardQueryDto) {
    try {
      const url    = `${this.baseUrl}cards`
      const config = {
        headers: this.buildRequestHeader(),
        params:  cardQueryDto,
      }
      this.logger.log(`Axios config = %o`, config)

      const response = await axios.get(url, config)
      const cards    = response.data.data
      const metadata = {
        pagination: {
          count:        response.data.count,
          start_index:  response.data.start_index,
          end_index:    response.data.end_index,
          is_more:      response.data.is_more,
        }
      }
      const result   = {
        cards:    cards,
        metadata: metadata,
      }

      this.logger.log(
        `Fetched ${cards.length} debit cards for last 4 digits of PAN=[${cardQueryDto.last_four}], result= %o`, 
        result
      )
      return result
    }
    catch(error) {
      const errorData = error.response.data
      this.logger.error(
        `Failed to fetch debit cards, error= %o`, 
        errorData
      )
      throw(createBaaSException(error, BaaSErrorLabel.Marqeta))
    }
  }

  /**
   * @method findOne
   */
  async findOne(cardToken: string) {
    try {
      const url    = `${this.baseUrl}cards/${cardToken}`
      const config = {
        headers: this.buildRequestHeader(),
      }
      this.logger.log(`[DEBUG] Axios config= %o`, config)

      const response = await axios.get(url, config)
      const card     = response.data
      const result   = {
        card: card
      }

      this.logger.log(`Fetched card for token=[${cardToken}], result= %o`, result)
      return result
    }
    catch(error) {
      const errorData = error.response.data
      this.logger.error(
        `Failed to fetch debit card w/ token=[${cardToken}], error= %o`, 
        errorData
      )
      throw(createBaaSException(error, BaaSErrorLabel.Marqeta))
    }
  }

  /**
   * @method findOneByBarcode
   */
  async findOneByBarcode(barcode: string) {
    try {
      const url    = `${this.baseUrl}cards/barcode/${barcode}`
      const config = {
        headers: this.buildRequestHeader(),
      }
      this.logger.log(`Url= %s`, url)

      const response = await axios.get(url, config)
      const card     = response.data
      const result   = {
        card: card
      }

      this.logger.log(`Fetched card for barcode=[${barcode}], result= %o`, result)
      return result
    }
    catch(error) {
      const errorData = error.response.data
      this.logger.error(
        `Failed to fetch debit card w/ barcode=[${barcode}], error= %o`, 
        errorData
      )
      throw(createBaaSException(error, BaaSErrorLabel.Marqeta))
    }
  }

  /**
   * @method findOneAndShowPan
   */
  async findOneAndShowPan(cardToken: string) {
    try {
      const url    = `${this.baseUrl}cards/${cardToken}/showpan`
      const config = {
        headers: this.buildRequestHeader(),
      }
      this.logger.log(`Url= %s`, url)

      const response = await axios.get(url, config)
      const card     = response.data
      const result   = {
        card: card
      }

      this.logger.log(`Fetched card for token=[${cardToken}], result= %o`, result)
      return result
    }
    catch(error) {
      const errorData = error.response.data
      this.logger.error(
        `Failed to fetch debit card w/ token=[${cardToken}], error= %o`, 
        errorData
      )
      throw(createBaaSException(error, BaaSErrorLabel.Marqeta))
    }
  }

  /**
   * @method findOneByPan
   */
  async findOneByPan(panRequestDto: PanRequestDto) {
    try {
      const url    = `${this.baseUrl}cards/getbypan`
      const config = {
        headers: this.buildRequestHeader(),
      }

      const response = await axios.post(url, panRequestDto, config)
      const card     = response.data
      const result   = {
        card: card
      }

      this.logger.log(`Fetched card w/ pan=[${panRequestDto.pan}], result= %o`, result)
      return result
    }
    catch(error) {
      const errorData = error.response.data
      this.logger.error(
        `Failed to fetch debit card w/ pan=[${panRequestDto.pan}], error= %o`, 
        errorData
      )
      throw(createBaaSException(error, BaaSErrorLabel.Marqeta))
    }
  }

  /**
   * @method update
   */
  async update(cardToken: string, updateCardDto: UpdateCardDto) {
    try {
      const url    = `${this.baseUrl}cards/${cardToken}`
      const config = {
        headers: this.buildRequestHeader(),
      }

      const response = await axios.put(url, updateCardDto, config)
      const card     = response.data
      const result   = {
        card: card
      }

      this.logger.log(`Updated card w/ token=[${cardToken}], result= %o`, result)
      return result
    }
    catch(error) {
      const errorData = error.response.data
      this.logger.error(
        `Failed to update card w/ token=[${cardToken}], error= %o`, 
        errorData
      )
      throw(createBaaSException(error, BaaSErrorLabel.Marqeta))
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
} // end of class CardsService
