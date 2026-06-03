import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Zone } from './entities/zone.entity';
import { CreateZoneDto } from './dto/create-zone.dto';

@Injectable()
export class ZonesService {
  constructor(
    @InjectRepository(Zone)
    private zonesRepository: Repository<Zone>,
  ) {}

  findAll() {
    return this.zonesRepository.find();
  }

  create(createZoneDto: CreateZoneDto) {
    const zone =
      this.zonesRepository.create(createZoneDto);

    return this.zonesRepository.save(zone);
  }
}