//-----------------------------------------------------------------------------
// apps/maqeta-adapter/src/users/users.service.ts
//-----------------------------------------------------------------------------
import { Injectable }               from '@nestjs/common'
import { ConfigService }            from '@nestjs/config'
import axios                        from 'axios'

import { CreateUserDto }            from './dto/create-user.dto'
import { UpdateUserDto }            from './dto/update-user.dto'

import { base64EncodeCredentials }  from '@app/baas-marqeta'
import { WinstonLoggerService }     from '@app/winston-logger'
import { createBaaSException }      from '@app/baas-errors'

/**
 * @class UsersService
 */
@Injectable()
export class UsersService {
  private baseUrl:    string
  private authToken:  string

  /**
   * @constructor
   */
  constructor(
    private readonly configService: ConfigService,
    private readonly logger:        WinstonLoggerService,
  ) {
    this.baseUrl   = this.configService.get('marqetaBaseUrl')
    this.authToken = base64EncodeCredentials(
      this.configService.get('marqetaUsername'), 
      this.configService.get('marqetaPassword')
    ) 
  }

  /**
   * @method create
   */
  async create(createUserDto: CreateUserDto) {
    try {
      const url    = `${this.baseUrl}users`
      const config = {
        headers: this.buildRequestHeader(),
      }

      const response = await axios.post(url, createUserDto, config)
      const user     = response.data
      
      const result   = {
        user: user,
      }

      this.logger.log(`Created user= %o`, result)
      return result
    }
    catch(error) {
      const errorData = error.response.data
      this.logger.error(`Failed to create user, error= %o`, errorData)
      throw(createBaaSException(error, 'Marqeta'))
    }
  }

  /**
   * @method findAll
   */
  async findAll() {
    try {
      const url    = `${this.baseUrl}users`
      const config = {
        headers: this.buildRequestHeader(),
      }

      const response = await axios.get(url, config)
      const userList = response.data.data
      const metadata = {
        pagination: {
          count:        response.data.count,
          start_index:  response.data.start_index,
          end_index:    response.data.end_index,
          is_more:      response.data.is_more,
        }
      }
      this.logger.log(`Fetched ${userList.length} users`)
      
      const result   = {
        users:    userList,
        metadata: metadata,
      }

      return result
    }
    catch(error) {
      const errorData = error.response.data
      this.logger.error(`Failed to fetch users, error= %o`, errorData)
      throw(createBaaSException(error, 'Marqeta'))
    }
  }

  /**
   * @method findOne
   */
  async findOne(userToken: string) {
    try {
      const url    = `${this.baseUrl}users/${userToken}`
      const config = {
        headers: this.buildRequestHeader(),
      }

      const response = await axios.get(url, config)
      const user     = response.data      
      const result   = {
        user: user,
      }

      this.logger.log(`Fetched user token=${userToken}= %o`, result)
      return result 
    }
    catch(error) {
      const errorData = error.response.data
      this.logger.error(`Failed to fetch user w/ token=${userToken}, error= %o`, errorData)
      throw(createBaaSException(error, 'Marqeta'))
    }
  }

  /**
   * @method udpate
   */
  async update(userToken: string, updateUserDto: UpdateUserDto) {
    try {
      const url    = `${this.baseUrl}users/${userToken}`
      const config = {
        headers: this.buildRequestHeader(),
      }

      const response = await axios.put(url, updateUserDto, config)
      const user     = response.data
      const result   = {
        user: user
      }

      this.logger.log(`Updated user w/ token=${userToken} = %o`, user)
      return result
    }
    catch(error) {
      const errorData = error.response.data
      this.logger.error(`Failed to update user w/ token=${userToken}, error= %o`, errorData)
      throw(createBaaSException(error, 'Marqeta'))
    }
  }

  /**
   * @method buildRequestHeader
   */
   private buildRequestHeader() {
    const header  = {
      'Content-Type':   `application/json`,
      'Accept':         `application/json`,
      'Authorization':  `Basic ${this.authToken}`,
    }

    return header
  }
} // end of class UsersService
