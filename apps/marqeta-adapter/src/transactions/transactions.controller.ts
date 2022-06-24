//-----------------------------------------------------------------------------
// apps/marqeta-adapter/src/transactions/transactions.controller.ts
//-----------------------------------------------------------------------------
import { 
  Controller, 
  Get, 
  Param, 
  Query
}                                       from '@nestjs/common'

import { TransactionsService }          from './transactions.service'
import { 
  MarqetaTransactionsQueryDto, 
  MarqetaTransactionsByFundingSourceQueryDto,
  MarqetaTransactionsByTokenQueryDto, 
}                                       from './dto/transaction-query.dto'

import { WinstonLoggerService }         from '@app/winston-logger'

/**
 * @class TransactionsController
 */
@Controller({path: 'transactions', version: '1'})
export class TransactionsController {
  /**
   * @constructor 
   */
  constructor(
    private readonly transactionsService: TransactionsService,
    private readonly logger:              WinstonLoggerService,
  ) {}

  /**
   * @method findAllV1
   */
  @Get()
  findAllV1(
    @Query() transactionSearchQueryDto: MarqetaTransactionsQueryDto,
  ) {
    this.logger.log(`GET /v1/transactions, query= %o`, transactionSearchQueryDto)
    return this.transactionsService.findAll(transactionSearchQueryDto)
  }

  /**
   * @method findAllByFundingSourceTokenV1
   */
  @Get('funding-sources/:fundingSourceToken')
  findAllByFundingSourceTokenV1(
    @Param('fundingSourceToken') fundingSourceToken: string,
    @Query() transactionSearchQueryDto: MarqetaTransactionsByFundingSourceQueryDto,
  ) {
    this.logger.log(
      `GET /v1/transactions/funding-sources/${fundingSourceToken}, query= %o`, 
      transactionSearchQueryDto
    )
    return this.transactionsService.findAllByFundingSourceToken(
      fundingSourceToken, transactionSearchQueryDto
    )
  }

  /**
   * @method findOneV1
   */
  @Get(':transactionToken')
  findOneV1(
    @Param('transactionToken') transactionToken: string,
    @Query() transactionQueryDto: MarqetaTransactionsByTokenQueryDto,
  ) {
    this.logger.log(`GET /v1/transactions/${transactionToken}, query= %o`, transactionQueryDto)
    return this.transactionsService.findOne(transactionToken, transactionQueryDto);
  }

  /**
   * @method findOneAndRelatedV1
   */
  @Get(':transactionToken/related')
  findOneAndRelatedV1(
    @Param('transactionToken') transactionToken: string,
    @Query() transactionSearchQueryDto: MarqetaTransactionsQueryDto,
  ) {
    this.logger.log(
      `GET /v1/transactions/${transactionToken}/related, query=%o`, 
      transactionSearchQueryDto
    )
    return this.transactionsService.findOneAndRelated(transactionToken, transactionSearchQueryDto)
  }
} // end of class TransactionsController
