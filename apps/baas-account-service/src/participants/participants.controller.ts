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

import { 
  BaaSRequestHeaders,
  IBaaSRequestHeaders,
}                                 from '@app/baas-errors'

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
    @BaaSRequestHeaders() requestHeaders: IBaaSRequestHeaders,
    @Param('accountId', ParseUUIDPipe) accountId: string,
    @Body() createParticipantDto: CreateParticipantDto) 
  {
    return this.participantsService.create(
      accountId, createParticipantDto, requestHeaders)
  }

  /**
   * @method findAllV1
   */
  @Get()
  findAllV1(
    @BaaSRequestHeaders() requestHeaders: IBaaSRequestHeaders,
    @Param('accountId', ParseUUIDPipe) accountId: string) 
  {
    return this.participantsService.findAll(accountId, requestHeaders)
  }

  /**
   * @method removeV1
   */
  @Delete(':participantId')
  @HttpCode(204)
  removeV1(
    @BaaSRequestHeaders() requestHeaders: IBaaSRequestHeaders,
    @Param('accountId',     ParseUUIDPipe) accountId: string,
    @Param('participantId', ParseUUIDPipe) participantId: string
  ) {
    return this.participantsService.remove(accountId, participantId, requestHeaders)
  }
} // end of class ParticipantsController
