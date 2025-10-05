import { PartialType } from '@nestjs/mapped-types';
import { CreateCustomerserviceDto } from './create-customer.dto.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export class UpdateCustomerserviceDto extends PartialType(
  CreateCustomerserviceDto,
) {}
