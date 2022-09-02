//-----------------------------------------------------------------------------
// apps/core-bank-simulator/src/core-bank-simulator.controller.ts
//-----------------------------------------------------------------------------
import { Controller, Get }          from '@nestjs/common'
import { CoreBankSimulatorService } from './core-bank-simulator.service'

/**
 * @class CoreBankSimulatorController
 */
@Controller({path: '/ping', version: '1'})
export class CoreBankSimulatorController {
  constructor(
    private readonly coreBankSimulatorService: CoreBankSimulatorService,
  ) {}

  @Get()
  ping() {
    return this.coreBankSimulatorService.ping();
  }
}
