//-----------------------------------------------------------------------------
// libs/baas-marqeta/src/utils/baas-marqeta.utils.ts
//-----------------------------------------------------------------------------

/**
 * Utility to combine the username and password into a base64 string that
 * is used for the basic HTTP Authorization for Marqeta API calls.
 * 
 * @function base64EncodeCredentials
 * @param    {string} username 
 * @param    {string} password 
 * @returns  {string} Concated and encoded string used for basic authentication
 */
export function base64EncodeCredentials(username: string, password: string): string {
  const  credentials       = `${username}:${password}`
  const  buffer            = Buffer.from(credentials, 'utf8')
  const  base64Credentials = buffer.toString('base64')

  return base64Credentials
}