import { Module } from '@nestjs/common';
import { CoreSimulatorService } from './core-simulator.service';

@Module({
  providers: [CoreSimulatorService],
  exports: [CoreSimulatorService],
})
export class CoreSimulatorModule {}
