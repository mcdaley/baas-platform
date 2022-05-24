import { Test, TestingModule } from '@nestjs/testing';
import { DebitCardsService } from './debit-cards.service';

describe('DebitCardsService', () => {
  let service: DebitCardsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DebitCardsService],
    }).compile();

    service = module.get<DebitCardsService>(DebitCardsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
