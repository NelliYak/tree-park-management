import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsNumber,
  Min,
} from 'class-validator';

export class CreateTreeDto {
  @IsNotEmpty()
  name: string;

  @IsInt()
  @Min(0)
  age: number;

  @IsNumber()
  @Min(0)
  height: number;

  @IsDateString()
  plantingDate: string;

  @IsInt()
  speciesId: number;

  @IsInt()
  zoneId: number;
}
