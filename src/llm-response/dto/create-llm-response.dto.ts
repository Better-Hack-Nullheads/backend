import { IsString } from 'class-validator';

export class CreateLlmResponseDto {
  @IsString()
  readonly content: string;
}
