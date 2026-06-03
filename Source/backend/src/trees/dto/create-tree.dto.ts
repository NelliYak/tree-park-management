import {
  IsNotEmpty,
  IsInt,
  IsNumber,
} from 'class-validator';

export class CreateTreeDto {
  @IsNotEmpty()
  name: string;

  @IsInt()
  age: number;

  @IsNumber()
  height: number;

  @IsNotEmpty()
  plantingDate: Date;

  @IsInt()
  speciesId: number;

  @IsInt()
  zoneId: number;
}