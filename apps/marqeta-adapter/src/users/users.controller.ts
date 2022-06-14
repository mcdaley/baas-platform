//-----------------------------------------------------------------------------
// apps/marqeta-adapter/src/users/users.controller.ts
//-----------------------------------------------------------------------------
import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete 
}                                 from '@nestjs/common'

import { UsersService }           from './users.service'
import { CreateUserDto }          from './dto/create-user.dto'
import { UpdateUserDto }          from './dto/update-user.dto'

import { WinstonLoggerService }   from '@app/winston-logger'

/**
 * @class UsersController
 */
@Controller({path: 'users', version: '1'})
export class UsersController {
  /**
   * @constructor
   */
  constructor(
    private readonly usersService:  UsersService,
    private readonly logger:        WinstonLoggerService
  ) {}

  /**
   * @method create
   */
  @Post()
  createV1(@Body() createUserDto: CreateUserDto) {
    this.logger.log(`POST /v1/users, createUserDto= %o`, createUserDto)
    return this.usersService.create(createUserDto);
  }

  /**
   * @method findAll
   */
  @Get()
  findAllV1() {
    this.logger.log(`GET /v1/users`)
    return this.usersService.findAll()
  }

  /**
   * @method findOneV1
   */
  @Get(':userToken')
  findOneV1(@Param('userToken') userToken: string) {
    this.logger.log(`GET /v1/users/${userToken}`)
    return this.usersService.findOne(userToken)
  }

  /**
   * @method updateV1
   */
  @Patch(':userToken')
  updateV1(
    @Param('userToken') userToken: string, 
    @Body() updateUserDto: UpdateUserDto
  ) {
    this.logger.log(`PATCH /v1/users/${userToken}, updateUserDto= %o`, updateUserDto)
    return this.usersService.update(userToken, updateUserDto);
  }
} // end of class UsersController
