//-----------------------------------------------------------------------------
// apps/marqeta-adapter/src/transactions/transactions.service.ts
//-----------------------------------------------------------------------------
import { Injectable }                   from '@nestjs/common'
import { ConfigService }                from '@nestjs/config'
import axios                            from 'axios'

import { 
  MarqetaTransactionsQueryDto, 
  MarqetaTransactionsByFundingSourceQueryDto,
  MarqetaTransactionsByTokenQueryDto, 
}                                       from './dto/transaction-query.dto'

import { WinstonLoggerService }         from '@app/winston-logger'
import { base64EncodeCredentials }      from '@app/baas-marqeta'
import { createBaaSException }          from '@app/baas-errors'

/**
 * @class TransactionsService
 */
@Injectable()
export class TransactionsService {
  private baseUrl:    string
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
   * @method findAll
   */
  async findAll(transactionSearchQueryDto: MarqetaTransactionsQueryDto) {
    try {
      const url    = `${this.baseUrl}transactions`
      const config = {
        headers: this.buildRequestHeader(),
        params:  transactionSearchQueryDto,
      }
      this.logger.log(`Axios config = %o`, config)

      const response      = await axios.get(url, config)
      const transactions  = response.data.data
      const metadata = {
        pagination: {
          count:        response.data.count,
          start_index:  response.data.start_index,
          end_index:    response.data.end_index,
          is_more:      response.data.is_more,
        }
      }
      const result = {
        transactions: transactions,
        metadata:     metadata,
      }

      this.logger.log(
        `Fetched ${transactions.length} transactions, result= %o`, 
        result
      )
      return result
    }
    catch(error) {
      const errorData = error.response.data
      this.logger.error(
        `Failed to fetch transactions, error= %o`, 
        errorData
      )
      throw(createBaaSException(error, 'Marqeta'))
    }
  }

  /**
   * @method findAllByFundingSourceToken
   */
  async findAllByFundingSourceToken(
    fundingSourceToken:        string, 
    transactionSearchQueryDto: MarqetaTransactionsByFundingSourceQueryDto,
  ) {
    try {
      const url    = `${this.baseUrl}transactions/fundingsource/${fundingSourceToken}`
      const config = {
        headers: this.buildRequestHeader(),
        params:  transactionSearchQueryDto,
      }
      this.logger.log(`Url= %s`, url)
      this.logger.log(`Axios config = %o`, config)

      const response      = await axios.get(url, config)
      const transactions  = response.data.data
      const metadata = {
        pagination: {
          count:        response.data.count,
          start_index:  response.data.start_index,
          end_index:    response.data.end_index,
          is_more:      response.data.is_more,
        }
      }
      const result = {
        transactions: transactions,
        metadata:     metadata,
      }

      this.logger.log(
        `Fetched ${transactions.length} transactions, result= %o`, 
        result
      )
      return result
    }
    catch(error) {
      const errorData = error.response.data
      this.logger.error(
        `Failed to fetch transactions for funding source=${fundingSourceToken}, error= %o`, 
        errorData
      )
      throw(createBaaSException(error, 'Marqeta'))
    }
  }

  /**
   * @method findOne
   */
  async findOne(
    transactionToken: string,
    transactionQueryDto: MarqetaTransactionsByTokenQueryDto,
  ) {
    try {
      const url    = `${this.baseUrl}transactions/${transactionToken}`
      const config = {
        headers: this.buildRequestHeader(),
        params:  transactionQueryDto,
      }
      this.logger.log(`Url= %s`, url)
      this.logger.log(`Axios config = %o`, config)

      const response    = await axios.get(url, config)
      const transaction = response.data.data
      const result      = {
        transaction: transaction
      }

      this.logger.log(`Fetched transaction for token=${transactionToken}, result= %o`, result)
      return result
    }
    catch(error) {
      const errorData = error.response.data
      this.logger.error(
        `Failed to fetch transactions for token=${transactionToken}, error= %o`, 
        errorData
      )
      throw(createBaaSException(error, 'Marqeta'))
    }
  }

  /**
   * @method findOneAndRelated
   */
  async findOneAndRelated(
    transactionToken:          string, 
    transactionSearchQueryDto: MarqetaTransactionsQueryDto
  ) {
    try {
      const url    = `${this.baseUrl}transactions/${transactionToken}/related`
      const config = {
        headers: this.buildRequestHeader(),
        params:  transactionSearchQueryDto,
      }
      this.logger.log(`Url= %s`, url)
      this.logger.log(`Axios config = %o`, config)

      const response      = await axios.get(url, config)
      const transactions  = response.data.data
      const metadata = {
        pagination: {
          count:        response.data.count,
          start_index:  response.data.start_index,
          end_index:    response.data.end_index,
          is_more:      response.data.is_more,
        }
      }
      const result = {
        transactions: transactions,
        metadata:     metadata,
      }

      this.logger.log(
        `Fetched ${transactions.length} related transactions, result= %o`, 
        result
      )
      return result
    }
    catch(error) {
      const errorData = error.response.data
      this.logger.error(
        `Failed to fetch related transactions for token=${transactionToken}, error= %o`, 
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

} // end of class TransactionsService
