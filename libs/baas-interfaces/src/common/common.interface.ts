//-----------------------------------------------------------------------------
// libs/baas-interfaces/src/common/common.interface.ts
//-----------------------------------------------------------------------------

/**
 * @interface IHeartbeat
 */
export interface IHeartbeat {
  app:        string,
  message:    string,
  timestamp:  string,
}

/**
 * @interface IPagination
 */
export interface IPagination {
  count:        number,
  start_index:  number,
  end_index:    number,
  is_more:      boolean,
}

/**
 * @interface IResponseMetadata
 */
export interface IResponseMetadata {
  pagination?:  IPagination,
}
