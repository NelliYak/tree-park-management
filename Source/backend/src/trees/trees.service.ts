import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Tree } from './entities/tree.entity';
import { Species } from '../species/entities/species.entity';
import { Zone } from '../zones/entities/zone.entity';

import { CreateTreeDto } from './dto/create-tree.dto';

@Injectable()
export class TreesService {
  constructor(
    @InjectRepository(Tree)
    private treesRepository: Repository<Tree>,

    @InjectRepository(Species)
    private speciesRepository: Repository<Species>,

    @InjectRepository(Zone)
    private zonesRepository: Repository<Zone>,
  ) {}

  async findAll() {
    return this.treesRepository.find({
  relations: {
    species: true,
    zone: true,
  },
});
  }

  async findOne(id: number) {
    return this.treesRepository.findOne({
  where: { id },
  relations: {
    species: true,
    zone: true,
  },
});
  }

  async create(createTreeDto: CreateTreeDto) {
  const species = await this.speciesRepository.findOne({
    where: { id: createTreeDto.speciesId },
  });

  const zone = await this.zonesRepository.findOne({
    where: { id: createTreeDto.zoneId },
  });

  const tree = new Tree();

  tree.name = createTreeDto.name;
  tree.age = createTreeDto.age;
  tree.height = createTreeDto.height;
  tree.plantingDate = createTreeDto.plantingDate;
  tree.species = species!;
  tree.zone = zone!;

  return this.treesRepository.save(tree);
}
}