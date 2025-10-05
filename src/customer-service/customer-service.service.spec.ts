import { Test, TestingModule } from '@nestjs/testing';
import { CustomerserviceService } from './customer-service.service.js';

describe('Customerservice', () => {
  let service: CustomerserviceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomerserviceService],
    }).compile();

    service = module.get<CustomerserviceService>(CustomerserviceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
