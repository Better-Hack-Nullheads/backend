import { Type } from 'class-transformer';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

class Level5Dto {
  @IsString()
  @IsNotEmpty()
  value: string;

  @IsDateString()
  timestamp: Date;

  @ValidateNested()
  @Type(() => Object)
  metadata: {
    source: string;
    version: string;
  };
}

class Level4Dto {
  @ValidateNested()
  @Type(() => Level5Dto)
  level5: Level5Dto;
}

class Level3Dto {
  @ValidateNested()
  @Type(() => Level4Dto)
  level4: Level4Dto;
}

class Level2Dto {
  @ValidateNested()
  @Type(() => Level3Dto)
  level3: Level3Dto;
}

class DeepNestedDataDto {
  @ValidateNested()
  @Type(() => Level2Dto)
  level2: Level2Dto;
}

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  category: string;

  @ValidateNested()
  @Type(() => DeepNestedDataDto)
  deepNestedData: DeepNestedDataDto;
}
