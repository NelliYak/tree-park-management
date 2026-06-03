import { Body, Controller, Get, Post } from '@nestjs/common';

import { ZonesService } from './zones.service';
import { CreateZoneDto } from './dto/create-zone.dto';

@Controller('zones')
export class ZonesController {
  constructor(
    private readonly zonesService: ZonesService,
  ) {}

  @Get()
  findAll() {
    return this.zonesService.findAll();
  }

  @Post()
  create(
    @Body() createZoneDto: CreateZoneDto,
  ) {
    return this.zonesService.create(createZoneDto);
  }
}