import { Test, TestingModule } from '@nestjs/testing';
import { CoreBankSimulatorController } from './core-bank-simulator.controller';
import { CoreBankSimulatorService } from './core-bank-simulator.service';

describe('CoreBankSimulatorController', () => {
  let coreBankSimulatorController: CoreBankSimulatorController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CoreBankSimulatorController],
      providers: [CoreBankSimulatorService],
    }).compile();

    coreBankSimulatorController = app.get<CoreBankSimulatorController>(CoreBankSimulatorController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(coreBankSimulatorController.getHello()).toBe('Hello World!');
    });
  });
});
