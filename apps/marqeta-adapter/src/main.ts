//-----------------------------------------------------------------------------
// apps/marqeta-adapter/src/main.ts
//-----------------------------------------------------------------------------
import { NestFactory } from '@nestjs/core'
import { ConfigService }              from '@nestjs/config'

import { mainConfig }                 from './main.config'
import { MarqetaAdapterModule }       from './marqeta-adapter.module'

import {WinstonLoggerService }        from '@app/winston-logger'

/**
 * @function bootstrap
 */
 async function bootstrap() {
  const app = await NestFactory.create(MarqetaAdapterModule, {
    bufferLogs: true
  })
  
  // Load app configuration
  mainConfig(app)

  // Start the server
  const logger        = app.get(WinstonLoggerService)
  const configService = app.get(ConfigService)
  const port          = configService.get('port')
  logger.log(`Starting [${configService.get('appName')}] on port=[${port}]`)

  await app.listen(port)
}

bootstrap();

