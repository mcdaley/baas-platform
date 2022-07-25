//-----------------------------------------------------------------------------
// libs/baas-utils/src/baas-utils.ts
//-----------------------------------------------------------------------------
import { v4 as uuidv4 } from 'uuid'

/**
 * Standard utility to create uuids for all of the baas-platform services.
 * 
 * @function uuid
 * @returns  {string} uuid
 */
export function uuid(): string {
  return uuidv4()
}

/**
 * Returns an ISO formatted string with the current date and time.
 * 
 * @function currentTimeString()
 * @returns  {string} Current ISO formatted time.
 */
export function currentTimeString() : string {
  return (new Date()).toISOString()
}