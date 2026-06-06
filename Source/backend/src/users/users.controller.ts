import {
  Delete,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Body,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../auth/role.enum';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
  ) {
    return this.usersService.findOne(+id);
  }

  @Roles(Role.ADMIN)
  @Post()
  create(
    @Body() createUserDto: CreateUserDto,
  ) {
    return this.usersService.create(createUserDto);
  }

  @Roles(Role.ADMIN)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(
      +id,
      updateUserDto,
    );
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(
    @Param('id') id: string,
  ) {
    return this.usersService.remove(+id);
  }
}
