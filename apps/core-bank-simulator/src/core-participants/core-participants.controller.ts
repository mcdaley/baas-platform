//----------------------------------------------------------------------------------
// apps/core-bank-simulator/src/core-participants/core-participants.controller.ts
//----------------------------------------------------------------------------------
import { 
  Body,
  Controller, 
  Delete,
  Get, 
  HttpCode,
  Param,   
  ParseUUIDPipe,
  Post, 
}                                     from '@nestjs/common'

import { CoreParticipantsService }    from './core-participants.service'
import { CreateCoreParticipantDto }   from './dto/create-core-participant.dto'

import { IdempotencyKey }             from '@app/baas-errors'
import { WinstonLoggerService }       from '@app/winston-logger'

/**
 * @class CoreParticipantsController
 */
@Controller({path: 'core-accounts/:accountId/core-participants', version: '1'})
export class CoreParticipantsController {
  constructor(
    private readonly participantsService: CoreParticipantsService,
    private readonly logger:              WinstonLoggerService
  ) {}

  /**
   * @method createV1
   */
  @Post()
  createV1(
    @Param('accountId', ParseUUIDPipe) accountId: string,
    @Body() createCoreParticipantDto: CreateCoreParticipantDto) 
  {
    this.logger.log(
      `POST /v1/core-accounts/${accountId}/core-participants, createParticipanDto= %o`, 
      createCoreParticipantDto
    )
    return this.participantsService.create(accountId, createCoreParticipantDto)
  }

  /**
   * @method findAllV1
   */
  @Get()
  findAllV1(@Param('accountId', ParseUUIDPipe) accountId: string) {
    this.logger.log(`GET /v1/core-accounts/${accountId}/core-participants`)
    return this.participantsService.findAll(accountId)
  }

  /**
   * @method removeV1
   */
  @Delete(':participantId')
  @HttpCode(204)
  removeV1(
    @Param('accountId',     ParseUUIDPipe) accountId: string,
    @Param('participantId', ParseUUIDPipe) participantId: string
  ) {
    this.logger.log(`DELETE /v1/core-accounts/${accountId}/core-participants/${participantId}`)
    return this.participantsService.remove(accountId, participantId)
  }
} // end of class CoreParticipantsController
