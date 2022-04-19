import { Test, TestingModule } from '@nestjs/testing';
import { BaasCustomerServiceController } from './baas-customer-service.controller';
import { BaasCustomerServiceService } from './baas-customer-service.service';

describe('BaasCustomerServiceController', () => {
  let baasCustomerServiceController: BaasCustomerServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [BaasCustomerServiceController],
      providers: [BaasCustomerServiceService],
    }).compile();

    baasCustomerServiceController = app.get<BaasCustomerServiceController>(BaasCustomerServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(baasCustomerServiceController.getHello()).toBe('Hello World!');
    });
  });
});
