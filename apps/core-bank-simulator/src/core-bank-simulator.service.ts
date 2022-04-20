//-----------------------------------------------------------------------------
// apps/core-bank-simulator/src/core-bank-simulator.controller.ts
//-----------------------------------------------------------------------------
import { Injectable }             from '@nestjs/common'
import { ConfigService }          from '@nestjs/config'

import { WinstonLoggerService }   from '@app/winston-logger'

@Injectable()
export class CoreBankSimulatorService {
  constructor(
    private readonly configService: ConfigService,
    private readonly logger:        WinstonLoggerService,
  ) {}

  /**
   * @method ping
   */
  ping() {
    const heartbeat = {
      app_name:   this.configService.get('appName'),
      timestamp:  new Date(),
    }
    return heartbeat
  }
}
