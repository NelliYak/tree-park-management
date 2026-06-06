import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { TreesService } from './trees.service';
import { CreateTreeDto } from './dto/create-tree.dto';
import { UpdateTreeDto } from './dto/update-tree.dto';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../auth/role.enum';

@Controller('trees')
export class TreesController {
  constructor(
    private readonly treesService: TreesService,
  ) {}

  @Get()
  findAll() {
    return this.treesService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
  ) {
    return this.treesService.findOne(+id);
  }

  @Roles(Role.ADMIN, Role.MANAGER)
  @Post()
  create(
    @Body() createTreeDto: CreateTreeDto,
  ) {
    return this.treesService.create(createTreeDto);
  }

  @Roles(Role.ADMIN, Role.MANAGER)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateTreeDto: UpdateTreeDto,
  ) {
    return this.treesService.update(+id, updateTreeDto);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(
    @Param('id') id: string,
  ) {
    return this.treesService.remove(+id);
  }
}
