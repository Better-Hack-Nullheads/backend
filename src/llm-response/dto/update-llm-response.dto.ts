import { IsString, IsOptional } from 'class-validator';

export class UpdateLlmResponseDto {
  @IsOptional()
  @IsString()
  readonly content?: string;
}
