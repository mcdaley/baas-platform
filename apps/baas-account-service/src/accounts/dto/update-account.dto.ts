//-----------------------------------------------------------------------------
// apps/baas-account-service/src/accounts/dto/update-account.dto.ts
//-----------------------------------------------------------------------------
import { PartialType }        from '@nestjs/mapped-types'
import { CreateAccountDto }   from './create-account.dto'

/**
 * @class UpdateAccountDto
 */
export class UpdateAccountDto extends PartialType(CreateAccountDto) {}
