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
  CustomerId, 
  IdempotencyKey, 
  TenantId 
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
    @CustomerId()     customerId:     string,
    @TenantId()       tenantId:       string,
    @IdempotencyKey() idempotencyKey: string,
    @Param('accountId', ParseUUIDPipe) accountId: string,
    @Body() createParticipantDto: CreateParticipantDto) 
  {
    return this.participantsService.create(
      accountId, createParticipantDto, customerId, tenantId, idempotencyKey)
  }

  /**
   * @method findAllV1
   */
  @Get()
  findAllV1(
    @CustomerId() customerId: string,
    @TenantId()   tenantId:   string,
    @Param('accountId', ParseUUIDPipe) accountId: string) 
  {
    return this.participantsService.findAll(accountId, customerId, tenantId)
  }

  /**
   * @method removeV1
   */
  @Delete(':participantId')
  @HttpCode(204)
  removeV1(
    @CustomerId() customerId: string,
    @TenantId()   tenantId:   string,
    @Param('accountId',     ParseUUIDPipe) accountId: string,
    @Param('participantId', ParseUUIDPipe) participantId: string
  ) {
    return this.participantsService.remove(accountId, participantId, customerId, tenantId)
  }
} // end of class ParticipantsController
