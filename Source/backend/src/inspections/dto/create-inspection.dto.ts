import {
  IsNotEmpty,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateInspectionDto {
  @IsNotEmpty()
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