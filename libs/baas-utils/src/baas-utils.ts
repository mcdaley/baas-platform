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