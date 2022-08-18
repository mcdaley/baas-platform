//---------------------------------------------------------------------------------------
// apps/marqeta-adapter/src/funding-sources/program/program-funding-sources.service.ts
//---------------------------------------------------------------------------------------
import { Injectable }               from '@nestjs/common'
import { ConfigService }            from '@nestjs/config'
import axios                        from 'axios'

import { 
  CreateProgramFundingSourceDto, 
}                                   from './dto/create-program-funding-source.dto'
import { 
  UpdateProgramFundingSourceDto, 
}                                   from './dto/update-program-funding-source.dto'

import { 
  createBaaSException,
  BaaSErrorLabel, 
}                                   from '@app/baas-errors'
import { base64EncodeCredentials }  from '@app/baas-marqeta'
import { WinstonLoggerService }     from '@app/winston-logger'

@Injectable()
export class ProgramFundingSourcesService {
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
  async create(createProgramFundingSourceDto: CreateProgramFundingSourceDto) {
    try {
      const url    = `${this.baseUrl}fundingsources/program`
      const config = {
        headers: this.buildRequestHeader(),
      }

      const response             = await axios.post(url, createProgramFundingSourceDto, config)
      const programFundingSource = response.data
      const result               = {
        program_funding_source: programFundingSource,
      }

      this.logger.log(`Created program funding source= %o`, result)
      return result
    }
    catch(error) {
      const errorData = error.response.data
      this.logger.error(`Failed to create program funding source, error= %o`, errorData)
      throw(createBaaSException(error, BaaSErrorLabel.Marqeta))
    }
  }

  /**
   * @method findOne
   */
  async findOne(programFundingSourceToken: string) {
    try {
      const url    = `${this.baseUrl}fundingsources/program/${programFundingSourceToken}`
      const config = {
        headers: this.buildRequestHeader(),
      }

      const response             = await axios.get(url, config)
      const programFundingSource = response.data
      const result = {
        program_funding_source: programFundingSource
      }

      return result
    }
    catch(error) {
      const errorData = error.response.data
      this.logger.error(
        `Failed to fetch program funding sources w/ token=${programFundingSourceToken}, error= %o`, 
        errorData
      )
      throw(createBaaSException(error, BaaSErrorLabel.Marqeta))
    }
  }

  /**
   * @method update
   */
  async update(
    programFundingSourceToken:     string, 
    updateProgramFundingSourceDto: UpdateProgramFundingSourceDto
  ) {
    try {
      const url    = `${this.baseUrl}fundingsources/program/${programFundingSourceToken}`
      const config = {
        headers: this.buildRequestHeader(),
      }

      const response             = await axios.put(url, updateProgramFundingSourceDto, config)
      const programFundingSource = response.data
      const result = {
        program_funding_source: programFundingSource
      }

      return result
    }
    catch(error) {
      const errorData = error.response.data
      this.logger.error(
        `Failed to update program funding sources w/ token=${programFundingSourceToken}, error= %o`, 
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
}