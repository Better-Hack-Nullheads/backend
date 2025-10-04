import { PartialType } from '@nestjs/mapped-types';
import { CreateCustomerserviceDto } from './create-customer.dto';

export class UpdateCustomerserviceDto extends PartialType(
  CreateCustomerserviceDto,
) {}
