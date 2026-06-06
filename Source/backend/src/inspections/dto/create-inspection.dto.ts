import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateInspectionDto {
  @IsDateString()
  inspectionDate: string;

  @IsNotEmpty()
  @IsString()
  condition: string;

  @IsOptional()
  @IsString()
  comment?: string;

  @IsInt()
  treeId: number;
}
