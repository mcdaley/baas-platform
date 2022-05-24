import { Test, TestingModule } from '@nestjs/testing';
import { DebitCardsController } from './debit-cards.controller';
import { DebitCardsService } from './debit-cards.service';

describe('DebitCardsController', () => {
  let controller: DebitCardsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DebitCardsController],
      providers: [DebitCardsService],
    }).compile();

    controller = module.get<DebitCardsController>(DebitCardsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
