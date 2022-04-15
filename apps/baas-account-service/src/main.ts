//-----------------------------------------------------------------------------
// apps/baas-account-service/src/main.ts
//-----------------------------------------------------------------------------
import { NestFactory }                from '@nestjs/core'
import { ConfigService }              from '@nestjs/config'
import { 
  VersioningType, 
}                                     from '@nestjs/common'

import { BaasAccountServiceModule }   from './baas-account-service.module'

/**
 * @function bootstrap
 */
async function bootstrap() {
  const app = await NestFactory.create(BaasAccountServiceModule)
  
  app.enableVersioning({type: VersioningType.URI })

  // Load app configuration
  const configService = app.get(ConfigService)
  console.log(`[debug] Environment= `, process.env.NODE_ENV)

  const port  = configService.get('port')
  console.log(`[debug] Starting Baas Account Service on port=[${port}]`)

  await app.listen(port)
}

bootstrap();
