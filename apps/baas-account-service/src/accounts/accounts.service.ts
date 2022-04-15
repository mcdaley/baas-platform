//-----------------------------------------------------------------------------
// apps/baas-account-service/src/accounts/accounts.service.ts
//-----------------------------------------------------------------------------
import { Injectable }         from '@nestjs/common'

import { CreateAccountDto }   from './dto/create-account.dto'
import { UpdateAccountDto }   from './dto/update-account.dto'

import { WinstonLoggerService } from '@app/winston-logger'

/**
 * @class AccountsService
 */
@Injectable()
export class AccountsService {
  constructor(private readonly logger: WinstonLoggerService) {}

  create(createAccountDto: CreateAccountDto) {
    this.logger.log(`Dude, create an account from %o`, createAccountDto)
    return 'This action adds a new account';
  }

  findAll() {
    return `This action returns all accounts`;
  }

  findOne(accountId: string) {
    return `This action returns a #${accountId} account`;
  }

  update(accountId: string, updateAccountDto: UpdateAccountDto) {
    return `This action updates a #${accountId} account`;
  }

  remove(accountId: string) {
    return `This action removes a #${accountId} account`;
  }
}
