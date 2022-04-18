import { Test, TestingModule } from '@nestjs/testing';
import { BaasDebitCardServiceController } from './baas-debit-card-service.controller';
import { BaasDebitCardServiceService } from './baas-debit-card-service.service';

describe('BaasDebitCardServiceController', () => {
  let baasDebitCardServiceController: BaasDebitCardServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [BaasDebitCardServiceController],
      providers: [BaasDebitCardServiceService],
    }).compile();

    baasDebitCardServiceController = app.get<BaasDebitCardServiceController>(BaasDebitCardServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(baasDebitCardServiceController.getHello()).toBe('Hello World!');
    });
  });
});
