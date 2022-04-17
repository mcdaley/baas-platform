//-----------------------------------------------------------------------------
// apps/baas-account-service/src/participants/participants.controller.ts
//-----------------------------------------------------------------------------
import { 
  Body,
  Controller, 
  Delete,
  Get, 
  HttpCode,
  Param,   
  ParseUUIDPipe,
  Patch,
  Post, 
  Put,
}                                 from '@nestjs/common'

import { ParticipantsService }    from './participants.service'
import { CreateParticipantDto }   from './dto/create-participant.dto'

import { IdempotencyKey }         from '@app/baas-errors'
import { WinstonLoggerService }   from '@app/winston-logger'

/**
 * @class ParticipantsController
 */
@Controller({path: 'accounts/:accountId/participants', version: '1'})
export class ParticipantsController {
  constructor(
    private readonly participantsService: ParticipantsService,
    private readonly logger: WinstonLoggerService
  ) {}

  /**
   * @method createV1
   */
  @Post()
  createV1(
    @Param('accountId', ParseUUIDPipe) accountId: string,
    @Body() createParticipantDto: CreateParticipantDto) 
  {
    this.logger.log(
      `POST /v1/accounts/${accountId}/participants, createParticipanDto= %o`, 
      createParticipantDto
    )
    return this.participantsService.create(accountId, createParticipantDto)
  }

  /**
   * @method findAllV1
   */
  @Get()
  findAllV1(@Param('accountId', ParseUUIDPipe) accountId: string) {
    this.logger.log(`GET /v1/accounts/${accountId}/participants`)
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
    this.logger.log(`DELETE /v1/accounts/${accountId}/participants/${participantId}`)
    return this.participantsService.remove(accountId, participantId)
  }
} // end of class ParticipantsController
