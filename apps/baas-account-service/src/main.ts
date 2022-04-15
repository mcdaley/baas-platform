//-----------------------------------------------------------------------------
// apps/baas-account-service/src/main.ts
//-----------------------------------------------------------------------------
import { NestFactory }                from '@nestjs/core'
import { ConfigService }              from '@nestjs/config'
import { 
  VersioningType, 
}                                     from '@nestjs/common'

import { BaasAccountServiceModule }   from './baas-account-service.module'
import { WinstonLoggerService }       from '@app/winston-logger'

/**
 * @function bootstrap
 */
async function bootstrap() {
  const app = await NestFactory.create(BaasAccountServiceModule, {
    bufferLogs: true
  })
  
  app.enableVersioning({type: VersioningType.URI })
  app.useLogger(app.get(WinstonLoggerService))

  // Load app configuration
  const configService = app.get(ConfigService)
  const logger        = app.get(WinstonLoggerService)

  const port  = configService.get('port')
  logger.log(`Starting [${configService.get('appName')}] on port=[${port}]`)

  await app.listen(port)
}

bootstrap();
