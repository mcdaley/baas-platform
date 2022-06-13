//--------------------------------------------------------------------------------------------
// apps/marqeta-adapter/src/funding-sources/program/entities/program-funding-source.entity.ts
//--------------------------------------------------------------------------------------------
import { IProgramFundingSourceResponse } from '@app/baas-marqeta'

/**
 * @class ProgramFundingSource
 */
export class ProgramFundingSource implements IProgramFundingSourceResponse {
  name:               string
  token:              string
  account:            string
  active?:            boolean
  created_time:       string
  last_modified_time: string
}