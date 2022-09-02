//-----------------------------------------------------------------------------
// apps/baas-debit-card-service/src/main.ts
//-----------------------------------------------------------------------------
import { NestFactory }                from '@nestjs/core'
import { ConfigService }              from '@nestjs/config'

import { BaasDebitCardServiceModule } from './baas-debit-card-service.module'
import { mainConfig }                 from './main.config'

import { WinstonLoggerService }       from '@app/winston-logger'

/**
 * @function bootstrap
 */
 async function bootstrap() {
  const app = await NestFactory.create(BaasDebitCardServiceModule, {
    bufferLogs: true
  })
  
  // Load app configuration
  mainConfig(app)

  const logger        = app.get(WinstonLoggerService)
  const configService = app.get(ConfigService)
  const port          = configService.get('port')
  logger.log({
    message: `Starting [${configService.get('appName')}] on port=[${port}]`
  })

  await app.listen(port)
}

bootstrap();
