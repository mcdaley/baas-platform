//-----------------------------------------------------------------------------
// apps/baas-account-service/src/baas-account-service.service.ts
//-----------------------------------------------------------------------------
import { Injectable } from '@nestjs/common'

@Injectable()
export class BaasAccountServiceService {
  ping() {
    return {
      heartbeat: {
        app: `baas-account-service`,
        time: new Date(),
      }
    }
  }
}
