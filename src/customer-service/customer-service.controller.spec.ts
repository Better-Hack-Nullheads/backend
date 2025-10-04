import { Test, TestingModule } from '@nestjs/testing';
import { CustomerserviceController } from './customer-service.controller';
import { CustomerserviceService } from './customer-service.service';

describe('CustomerserviceController', () => {
  let controller: CustomerserviceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerserviceController],
      providers: [CustomerserviceService],
    }).compile();

    controller = module.get<CustomerserviceController>(
      CustomerserviceController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
