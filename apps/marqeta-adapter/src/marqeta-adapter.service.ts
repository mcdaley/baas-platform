//-----------------------------------------------------------------------------
// apps/marqeta-adapter/src/marqeta-adapter.service.ts
//-----------------------------------------------------------------------------
import { Injectable }     from '@nestjs/common'
import { ConfigService }  from '@nestjs/config'

import { IHeartbeat }     from '@app/baas-interfaces'

/**
 * @class MarqetaAdapterService
 */
@Injectable()
export class MarqetaAdapterService {
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
