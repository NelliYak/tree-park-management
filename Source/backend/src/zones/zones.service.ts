import {
  ConflictException,
  Injectable,
} from '@nestjs/common';

import { Zone } from './entities/zone.entity';
import { CreateZoneDto } from './dto/create-zone.dto';
import { StorageService } from '../storage/storage.service';

@Injectable()
export class ZonesService {
  constructor(
    private readonly storageService: StorageService,
  ) {}

  findAll() {
    return this.storageService.getZones();
  }

  create(createZoneDto: CreateZoneDto) {
    const zones = this.storageService.getZones();
    const alreadyExists = zones.some(
      (item) =>
        item.name.toLowerCase() ===
        createZoneDto.name.toLowerCase(),
    );

    if (alreadyExists) {
      throw new ConflictException(
        'Такая зона уже существует',
      );
    }

    const zone: Zone = {
      id: this.storageService.getNextId('zones'),
      name: createZoneDto.name,
    };

    zones.push(zone);

    return zone;
  }
}
