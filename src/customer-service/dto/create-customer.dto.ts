/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsString, IsEmail, IsOptional, IsPhoneNumber } from 'class-validator';

export class CreateCustomerserviceDto {
  @IsString()
  readonly name: string;

  @IsEmail()
  readonly email: string;

  @IsOptional()
  @IsPhoneNumber()
  readonly phone?: string;

  @IsOptional()
  @IsString()
  readonly address?: string;

  @IsOptional()
  @IsString()
  readonly notes?: string;
}
