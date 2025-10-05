/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsString, IsEmail, IsOptional, IsPhoneNumber } from 'class-validator';

export class CreateCustomerserviceDto {
  @IsString()
  name: string;

  @IsEmail()
   email: string;

  @IsOptional()
  @IsPhoneNumber()
  phone?: string;

}
