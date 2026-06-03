import {
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';

import { TreesService } from './trees.service';
import { CreateTreeDto } from './dto/create-tree.dto';

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

  @Post()
  create(
    @Body() createTreeDto: CreateTreeDto,
  ) {
    return this.treesService.create(createTreeDto);
  }
}