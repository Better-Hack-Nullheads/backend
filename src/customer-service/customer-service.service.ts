import { Injectable } from '@nestjs/common';
import { CreateCustomerserviceDto } from './dto/create-customer.dto.js';
import { UpdateCustomerserviceDto } from './dto/update-customer.dto.js';

@Injectable()
export class CustomerserviceService {
  create(createCustomerserviceDto: CreateCustomerserviceDto) {
    return 'This action adds a new playground';
  }

  findAll() {
    return `This action returns all playground`;
  }

  findOne(id: number) {
    return `This action returns a #${id} playground`;
  }

  update(id: number, updateCustomerserviceDto: UpdateCustomerserviceDto) {
    return `This action updates a #${id} playground`;
  }

  remove(id: number) {
    return `This action removes a #${id} playground`;
  }
}
