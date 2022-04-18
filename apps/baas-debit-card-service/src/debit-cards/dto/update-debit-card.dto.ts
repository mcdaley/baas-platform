//-----------------------------------------------------------------------------
// apps/baas-debit-card-service/src/debit-cards/dto/update-debit-card.dto.ts
//-----------------------------------------------------------------------------
import { PartialType }        from '@nestjs/mapped-types'

import { CreateDebitCardDto } from './create-debit-card.dto'

///////////////////////////////////////////////////////////////////////////////
// NOTE: 04/18/2022
// I may not need the UpdateDebitCardDto since I don't think I allow the
// use of the PATCH debit cards API.
///////////////////////////////////////////////////////////////////////////////

/**
 * @class UpdateDebitCardDto
 */
export class UpdateDebitCardDto extends PartialType(CreateDebitCardDto) {}
