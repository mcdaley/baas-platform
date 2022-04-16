import { Test, TestingModule } from '@nestjs/testing';
import { CoreSimulatorService } from './core-simulator.service';

describe('CoreSimulatorService', () => {
  let service: CoreSimulatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoreSimulatorService],
    }).compile();

    service = module.get<CoreSimulatorService>(CoreSimulatorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
