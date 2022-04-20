//-----------------------------------------------------------------------------
// apps/core-bank-simulator/src/main.ts
//-----------------------------------------------------------------------------
import { NestFactory }                from '@nestjs/core'
import { ConfigService }              from '@nestjs/config'
import { 
  ValidationPipe,
  VersioningType, 
}                                     from '@nestjs/common'

import { CoreBankSimulatorModule }    from './core-bank-simulator.module'

import { WinstonLoggerService }       from '@app/winston-logger'
import { HttpExceptionFilter }        from '@app/baas-errors'

/**
 * @function bootstrap
 */
async function bootstrap() {
  const app = await NestFactory.create(CoreBankSimulatorModule, {
    bufferLogs: true
  })
  
  app.enableVersioning({type: VersioningType.URI })
  app.useLogger(app.get(WinstonLoggerService))

  // Validation pipeline to validate requests
  app.useGlobalPipes(new ValidationPipe({ 
    transform:            true, 
    whitelist:            true,  
    forbidNonWhitelisted: true,
  }))

  // Load app configuration
  const logger  = app.get(WinstonLoggerService)
  app.useGlobalFilters(new HttpExceptionFilter(logger))

  const configService = app.get(ConfigService)
  const port    = configService.get('port')
  logger.log(`Starting [${configService.get('appName')}] on port=[${port}]`)

  await app.listen(port)
}

bootstrap();
