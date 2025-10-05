import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CustomerserviceService } from './customer-service.service.js';
import { CreateCustomerserviceDto } from './dto/create-customer.dto.js';
import { UpdateCustomerserviceDto } from './dto/update-customer.dto.js';

@Controller('customerservice')
export class CustomerserviceController {
  constructor(private readonly playgroundService: CustomerserviceService) {}

  @Post()
  create(@Body() createCustomerserviceDto: CreateCustomerserviceDto) {
    return this.playgroundService.create(createCustomerserviceDto);
  }

  @Get()
  findAll() {
    return this.playgroundService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.playgroundService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCustomerserviceDto: UpdateCustomerserviceDto,
  ) {
    return this.playgroundService.update(+id, updateCustomerserviceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.playgroundService.remove(+id);
  }
}
