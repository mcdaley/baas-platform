//-----------------------------------------------------------------------------
// apps/core-bank-simulator/src/config/core-bank-simulator.config.ts
//-----------------------------------------------------------------------------
import { plainToClass }   from 'class-transformer'
import { 
  IsEnum, 
  IsNumber, 
  IsOptional, 
  IsString, 
  validateSync, 
  ValidationError
}                         from 'class-validator'

// Supported environments
enum Environment {
  Development   = 'development',
  Test          = 'test',
  Production    = 'production',
}

enum LogLevel {
  Debug   = 'debug',
  Info    = 'info'
}

/**
 * @class EnvironmentVariables
 * 
 * Define the environment variables and their formats that are 
 * required when the service starts using the class-validator. The
 * variables are defined in the .env.${NODE_ENV} files.
 */
class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment

  @IsString()
  @IsOptional()
  CORE_BANK_APP_NAME: string

  @IsEnum(LogLevel)
  @IsOptional()
  CORE_BANK_LOG_LEVEL: LogLevel

  @IsNumber()
  CORE_BANK_PORT: number
 }


/**
 * @function validate
 * 
 * Validates the format of the environment variables defined in the
 * .env.${NODE_ENV} files. Throws an exception to stop the app from
 * running if their is an invalid configuration variable.
 */
export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(
    EnvironmentVariables,
    config,
    { enableImplicitConversion: true },
  );
  const errors = validateSync(validatedConfig, { skipMissingProperties: false });

  if (errors.length > 0) {
    let messages: string[] = []
    errors.forEach( (error) => {
      if(error instanceof ValidationError) {
        let message = `Abort startup w/ invalid configuration: ${error.property} equals ${error.value} is invalid`
        messages.push(message)
      }
    })
    throw new Error(messages[0]);
  }
  return validatedConfig;
}

/**
 * @function configuration
 * 
 * Converts the app environment variables to a configuration object that
 * can be accessed in the app.
 */
export const configuration = () => ({
  NODE_ENV: process.env.NODE_ENV            || Environment.Development,
  appName:  process.env.CORE_BANK_APP_NAME  || 'connext-bank',
  LogLevel: process.env.CORE_BANK_LOG_LEVEL || LogLevel.Debug,
  appRoot:  process.cwd(),
  port:     parseInt(process.env.CORE_BANK_PORT, 10) || 4001,
})