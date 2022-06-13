//---------------------------------------------------------------------------------------
// apps/marqeta-adapter/src/funding-sources/program/program-funding-sources.controller.ts
//---------------------------------------------------------------------------------------
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post
}                   from '@nestjs/common'

import { ProgramFundingSourcesService }   from './program-funding-sources.service'
import { CreateProgramFundingSourceDto }  from './dto/create-program-funding-source.dto'
import { UpdateProgramFundingSourceDto }  from './dto/update-program-funding-source.dto'
import { ProgramFundingSource }           from './entities/program-funding-source.entity'

import { WinstonLoggerService }           from '@app/winston-logger'

/**
 * @class ProgramFundingSourcesController
 */
@Controller({path: 'funding-sources/program', version: '1'})
export class ProgramFundingSourcesController {
  constructor(
    private readonly programFundingSourcesService : ProgramFundingSourcesService,
    private readonly logger:                        WinstonLoggerService,
  ) {}

  /**
   * @method createV1
   */
  @Post()
  createV1(@Body() createProgramFundingSourceDto: CreateProgramFundingSourceDto) {
    this.logger.log(
      `POST /v1/funding-sources/program, createProgramFundingSourceDto = %o`, 
      createProgramFundingSourceDto
    )
    return this.programFundingSourcesService.create(createProgramFundingSourceDto)
  }

  /**
   * Fetch program funding source by using a token. I created the
   * token, "moolah_program_funding_source_token" for development.
   * 
   * @method       findOneV1
   */
  @Get(':programFundingSourceToken')
  findOneV1(@Param('programFundingSourceToken') programFundingSourceToken: string) {
    this.logger.log(`GET /v1/funding-sources/program/${programFundingSourceToken}`)
    return this.programFundingSourcesService.findOne(programFundingSourceToken)
  }

  /**
   * @method: updateV1
   */
  @Patch(':programFundingSourceToken')
  updateV1(
    @Param('programFundingSourceToken') programFundingSourceToken: string,
    @Body() updateProgramFundingSourceDto: UpdateProgramFundingSourceDto
  ) {
    this.logger.log(
      `PATCH /v1/funding-sources/program/${programFundingSourceToken}, updateCardProductDto = %o`, 
      updateProgramFundingSourceDto
    )
    
    return this.programFundingSourcesService.update(
      programFundingSourceToken, 
      updateProgramFundingSourceDto
    )
  }
} // end of class ProgramFundingSourcesController