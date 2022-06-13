//--------------------------------------------------------------------------------------------
// apps/marqeta-adapter/src/funding-sources/program/dto/update-program-funding-source.dto.ts
//--------------------------------------------------------------------------------------------
import { PartialType, OmitType }         from '@nestjs/mapped-types'

import { CreateProgramFundingSourceDto } from './create-program-funding-source.dto'

/**
 * @class UpdateProgramFundingSourceDto
 */
export class UpdateProgramFundingSourceDto extends PartialType(
  OmitType(CreateProgramFundingSourceDto, ['token'] as const)
) {}