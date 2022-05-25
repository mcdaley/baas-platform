//-----------------------------------------------------------------------------
// apps/baas-debit-card-service/src/baas-debit-card-service.service.ts
//-----------------------------------------------------------------------------
import { Injectable }     from '@nestjs/common'
import { ConfigService }  from '@nestjs/config'

import { IHeartbeat }     from '@app/baas-interfaces'

/**
 * @class BaasDebitCardServiceService
 */
@Injectable()
export class BaasDebitCardServiceService {
  constructor(private readonly configService : ConfigService) {}

  ping() : IHeartbeat {
    const heartbeat : IHeartbeat = {
      app:        `${this.configService.get('appName')}`,
      message:    `Is alive`,
      timestamp:  (new Date()).toISOString(),
    }

    return heartbeat
  }
}
