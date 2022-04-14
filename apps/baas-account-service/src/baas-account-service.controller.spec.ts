import { Test, TestingModule } from '@nestjs/testing';
import { BaasAccountServiceController } from './baas-account-service.controller';
import { BaasAccountServiceService } from './baas-account-service.service';

describe('BaasAccountServiceController', () => {
  let baasAccountServiceController: BaasAccountServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [BaasAccountServiceController],
      providers: [BaasAccountServiceService],
    }).compile();

    baasAccountServiceController = app.get<BaasAccountServiceController>(BaasAccountServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(baasAccountServiceController.getHello()).toBe('Hello World!');
    });
  });
});
