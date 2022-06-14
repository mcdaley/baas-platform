//-----------------------------------------------------------------------------
// apps/marqeta-adapter/src/users/dto/update-user.dto.ts
//-----------------------------------------------------------------------------
import { PartialType }    from '@nestjs/mapped-types'
import { CreateUserDto }  from './create-user.dto'

/**
 * @class UpdateUserDto
 */
export class UpdateUserDto extends PartialType(CreateUserDto) {}
