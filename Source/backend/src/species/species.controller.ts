import { Body, Controller, Get, Post } from '@nestjs/common';

import { SpeciesService } from './species.service';
import { CreateSpeciesDto } from './dto/create-species.dto';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../auth/role.enum';

@Controller('species')
export class SpeciesController {
  constructor(
    private readonly speciesService: SpeciesService,
  ) {}

  @Get()
  findAll() {
    return this.speciesService.findAll();
  }

  @Roles(Role.ADMIN)
  @Post()
  create(
    @Body() createSpeciesDto: CreateSpeciesDto,
  ) {
    return this.speciesService.create(createSpeciesDto);
  }
}