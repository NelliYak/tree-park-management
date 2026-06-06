import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Min,
} from 'class-validator';

export class UpdateTreeDto {
  @IsOptional()
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  age?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  height?: number;

  @IsOptional()
  @IsNotEmpty()
  plantingDate?: string;

  @IsOptional()
  @IsInt()
  speciesId?: number;

  @IsOptional()
  @IsInt()
  zoneId?: number;
}
