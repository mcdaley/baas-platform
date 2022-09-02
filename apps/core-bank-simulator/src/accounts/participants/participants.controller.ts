//----------------------------------------------------------------------------------
// apps/core-bank-simulator/src/accounts/participants/participants.controller.ts
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

import { ParticipantsService }        from './participants.service'
import { CreateParticipantDto }       from '../dto/create-participant.dto'

import { IdempotencyKey }             from '@app/baas-errors'

/**
 * @class ParticipantsController
 */
@Controller({path: 'accounts/:accountId/participants', version: '1'})
export class ParticipantsController {
  constructor(
    private readonly participantsService: ParticipantsService,
  ) {}

  /**
   * @method createV1
   */
  @Post()
  createV1(
    @Param('accountId', ParseUUIDPipe) accountId: string,
    @Body() createParticipantDto: CreateParticipantDto) 
  {
    return this.participantsService.create(accountId, createParticipantDto)
  }

  /**
   * @method findAllV1
   */
  @Get()
  findAllV1(@Param('accountId', ParseUUIDPipe) accountId: string) {
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
    return this.participantsService.remove(accountId, participantId)
  }
} // end of class ParticipantsController
