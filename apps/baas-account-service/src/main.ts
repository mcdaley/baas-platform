//-----------------------------------------------------------------------------
// apps/baas-account-service/src/main.ts
//-----------------------------------------------------------------------------
import { NestFactory }                from '@nestjs/core'
import { 
  VersioningType, 
}                                     from '@nestjs/common'

import { BaasAccountServiceModule }   from './baas-account-service.module'

/**
 * @function bootstrap
 */
async function bootstrap() {
  console.log(`[debug] Starting Baas Account Service`)

  const app = await NestFactory.create(BaasAccountServiceModule)
  
  app.enableVersioning({type: VersioningType.URI })
  
  await app.listen(3100)
}

bootstrap();
