import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerserviceService } from './customer-service.service.js';
import { CustomerserviceController } from './customer-service.controller.js';
import { Customer } from './entities/customer-service.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Customer])],
  controllers: [CustomerserviceController],
  providers: [CustomerserviceService],
})
export class CustomerserviceModule {}