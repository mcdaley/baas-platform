//---------------------------------------------------------------------------------------
// apps/marqeta-adapter/src/funding-sources/program/program-funding-sources.module.ts
//---------------------------------------------------------------------------------------
import { Module }                           from "@nestjs/common"

import { ProgramFundingSourcesController }  from './program-funding-sources.controller'
import { ProgramFundingSourcesService }     from './program-funding-sources.service'

@Module({
  controllers: [ProgramFundingSourcesController],
  providers:    [
    ProgramFundingSourcesService,
  ]
})
export class ProgramFundingSourcesModule {}