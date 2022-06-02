//-----------------------------------------------------------------------------
// apps/baas-account-service/src/baas-account-service.service.ts
//-----------------------------------------------------------------------------
import { Injectable }     from '@nestjs/common'
import { ConfigService }  from '@nestjs/config'

import { IHeartbeat }     from '@app/baas-interfaces'

/**
 * @class BaasAccountServiceService
 */
@Injectable()
export class BaasAccountServiceService {
  constructor(private readonly configService: ConfigService) {}

  ping() : IHeartbeat {
    const heartbeat : IHeartbeat = {
      app:        `${this.configService.get('appName')}`,
      message:    `Is alive`,
      timestamp:  (new Date()).toISOString(),
    }

    return heartbeat
  }
}
