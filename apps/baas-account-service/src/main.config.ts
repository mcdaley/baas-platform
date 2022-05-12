//-----------------------------------------------------------------------------
// apps/baas-account-service/src/main.config.ts
//-----------------------------------------------------------------------------
import {
  INestApplication,
  ValidationPipe,
  VersioningType,
}                                 from '@nestjs/common'

import { WinstonLoggerService }   from '@app/winston-logger'
import { HttpExceptionFilter }    from '@app/baas-errors'

/**
 * Common function to load the configuration for main.ts and e2e tests.
 * 
 * @function mainConfig
 * @param    {INestApplication} app 
 */
export function mainConfig(app: INestApplication) {
  //* app.setGlobalPrefix('/api')
  app.enableVersioning({type: VersioningType.URI })
  app.useLogger(app.get(WinstonLoggerService))

  // Validation pipeline to validate requests
  app.useGlobalPipes(new ValidationPipe({ 
    transform:            true, 
    whitelist:            true,  
    forbidNonWhitelisted: true,
  }))

  // Load app configuration
  const logger = app.get(WinstonLoggerService)
  app.useGlobalFilters(new HttpExceptionFilter(logger))
}