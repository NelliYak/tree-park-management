import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Species } from './entities/species.entity';
import { CreateSpeciesDto } from './dto/create-species.dto';

@Injectable()
export class SpeciesService {
  constructor(
    @InjectRepository(Species)
    private speciesRepository: Repository<Species>,
  ) {}

  findAll() {
    return this.speciesRepository.find();
  }

  create(createSpeciesDto: CreateSpeciesDto) {
    const species =
      this.speciesRepository.create(createSpeciesDto);

    return this.speciesRepository.save(species);
  }
}