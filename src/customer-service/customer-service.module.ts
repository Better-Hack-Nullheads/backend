import { Module } from '@nestjs/common';
import { CustomerserviceService } from './customer-service.service.js';
import { CustomerserviceController } from './customer-service.controller.js';

@Module({
  controllers: [CustomerserviceController],
  providers: [CustomerserviceService],
})
export class PlaygroundModule {}
