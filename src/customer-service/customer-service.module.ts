import { Module } from '@nestjs/common';
import { CustomerserviceService } from './customer-service.service';
import { CustomerserviceController } from './customer-service.controller';

@Module({
  controllers: [CustomerserviceController],
  providers: [CustomerserviceService],
})
export class PlaygroundModule {}
