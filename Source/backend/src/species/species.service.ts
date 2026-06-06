import {
  ConflictException,
  Injectable,
} from '@nestjs/common';

import { Species } from './entities/species.entity';
import { CreateSpeciesDto } from './dto/create-species.dto';
import { StorageService } from '../storage/storage.service';

@Injectable()
export class SpeciesService {
  constructor(
    private readonly storageService: StorageService,
  ) {}

  findAll() {
    return this.storageService.getSpecies();
  }

  create(createSpeciesDto: CreateSpeciesDto) {
    const speciesList = this.storageService.getSpecies();
    const alreadyExists = speciesList.some(
      (item) =>
        item.name.toLowerCase() ===
        createSpeciesDto.name.toLowerCase(),
    );

    if (alreadyExists) {
      throw new ConflictException(
        'Такая порода деревьев уже добавлена',
      );
    }

    const species: Species = {
      id: this.storageService.getNextId('species'),
      name: createSpeciesDto.name,
    };

    speciesList.push(species);

    return species;
  }
}
