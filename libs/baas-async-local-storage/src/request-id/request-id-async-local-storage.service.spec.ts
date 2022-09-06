import { Test, TestingModule } from '@nestjs/testing';
import { RequestIdAsyncLocalStorage } from './request-id-async-local-storage.service';

describe('RequestIdAsyncLocalStorage', () => {
  let service: RequestIdAsyncLocalStorage;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RequestIdAsyncLocalStorage],
    }).compile();

    service = module.get<RequestIdAsyncLocalStorage>(RequestIdAsyncLocalStorage);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
