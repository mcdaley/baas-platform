//-----------------------------------------------------------------------------
// apps/baas-customer-service/src/main.ts
//-----------------------------------------------------------------------------
import { NestFactory }                from '@nestjs/core'
import { ConfigService }              from '@nestjs/config'

import { BaasCustomerServiceModule }  from './baas-customer-service.module'
import { mainConfig }                 from './main.config'

import { WinstonLoggerService }       from '@app/winston-logger'

/**
 * @function bootstrap
 */
async function bootstrap() {
  const app = await NestFactory.create(BaasCustomerServiceModule, {
    bufferLogs: true
  })
  
  const logger = app.get(WinstonLoggerService)
  mainConfig(app)

  const configService = app.get(ConfigService)
  const port          = configService.get('port')
  logger.log({
    message: `Starting [${configService.get('appName')}] on port=[${port}]`
  })

  await app.listen(port)
}
bootstrap();
