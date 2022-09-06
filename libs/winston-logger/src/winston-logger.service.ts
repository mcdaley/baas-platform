//-----------------------------------------------------------------------------
// libs/winston-logger/src/winston-logger.service.ts
//-----------------------------------------------------------------------------
import { Injectable, LoggerService }  from '@nestjs/common'
import { ConfigService }              from '@nestjs/config'
import winston, { 
  createLogger,
  format, 
  transports, 
}                                     from 'winston'

import { RequestIdAsyncLocalStorage } from '@app/baas-async-local-storage'

/**
 * @enum LogLevel
 */
 enum LogLevel {
  Debug   = 'debug',
  Info    = 'info',
  Warn    = 'warn',
  Error   = 'error',
  Verbose = 'verbose'
}

const { combine, timestamp, label, json, prettyPrint } = format

/**
 * @class WinstonLoggerService
 */
@Injectable()
export class WinstonLoggerService implements LoggerService {
  private logger:   winston.Logger
  private options:  any

  constructor(
    private readonly configService:              ConfigService,
    private readonly requestIdAsyncLocalStorage: RequestIdAsyncLocalStorage) 
  {
    // Define log filename
    const logFilename: string = `${configService.get('appRoot')}/logs/${configService.get('appName')}.${configService.get('NODE_ENV')}.log`
    
    // Set loggin options
    this.options = {
      file: {
        level:            configService.get('logLevel'),
        filename:         logFilename,
        handleExceptions: true,
        maxsize:          5242880,      // 5MB
        maxFiles:         5,
        format:           combine(
          label({ label: configService.get('appName') }),
          timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
          }),
          json(),
        ),
      },
      console: {
        level:            configService.get('logLevel'),
        handleExceptions: true,
        exitOnError:      false,
        format:           combine(
          label({ 
            label: configService.get('appName') 
          }),
          timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
          }),
          json(),
          prettyPrint({depth: 8, colorize: true}),
        )
      },
    }

    this.logger = this.initLogger()
  }

  /**
   * @method initLogger
   */
  private initLogger() {
    let outputs : any[] = [new transports.File(this.options.file)]
    
    // Log to console in development
    if(this.configService.get('NODE_ENV') === 'development') { 
      outputs.push(new transports.Console(this.options.console))
    }

    return createLogger({
      transports: outputs
    })
  }

  /**
   * @method log
   */
  public log(message: any, ...optionalParams: any[]) : winston.Logger {
    return this.write(LogLevel.Info, message, optionalParams)
  }

  /**
   * @method error
   */
  public error(message: any, ...optionalParams: any[]) {
    return this.write(LogLevel.Error, message, optionalParams)
  }

  /**
   * @method warn
   */
  public warn(message: any, ...optionalParams: any[]) {
    return this.write(LogLevel.Warn, message, optionalParams)
  }

  /**
   * @method debug
   */
  public debug?(message: any, ...optionalParams: any[]) {
    return this.write(LogLevel.Debug, message, optionalParams)
  }

  /**
   * @method verbose
   */
  public verbose?(message: any, ...optionalParams: any[]) {
    return this.write(LogLevel.Verbose, message, optionalParams)
  }

  /**
   * Logs a message at the specified logging level. Also, adds the
   * requestId to the log message.
   * 
   * @method  write
   * @param   {LogLevel} level 
   * @param   {any}      message 
   * @param   {any[]}    optionalParams 
   * @returns winston.Logger
   */
  private write(
    level:             LogLevel, 
    message:           any, 
    ...optionalParams: any[]) : winston.Logger 
  {
    const requestId = this.requestIdAsyncLocalStorage.getRequestIdStore()

    if(typeof message === 'object') {
      // Add the requestId to the log message if it is defined
      if(requestId) {
        message.requestId = requestId
      }

      const { message: msg, ...meta } = message;

      return this.logger.log(level, msg as string, { ...meta })
    }
    return this.logger.log(level, message, optionalParams)
  }
}
