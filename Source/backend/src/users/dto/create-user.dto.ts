import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsInt,
  IsEnum,
} from 'class-validator';

import { Role } from '../../auth/role.enum';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsInt()
  age?: number;

  @IsEnum(Role)
  role: Role;
}