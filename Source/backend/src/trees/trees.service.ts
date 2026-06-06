import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { Tree } from './entities/tree.entity';

import { CreateTreeDto } from './dto/create-tree.dto';
import { UpdateTreeDto } from './dto/update-tree.dto';
import { StorageService } from '../storage/storage.service';

@Injectable()
export class TreesService {
  constructor(
    private readonly storageService: StorageService,
  ) {}

  findAll() {
    return this.storageService.getTrees().map((tree) => ({
      id: tree.id,
      name: tree.name,
      age: tree.age,
      height: tree.height,
      plantingDate: tree.plantingDate,
      species: this.getSpeciesById(tree.speciesId),
      zone: this.getZoneById(tree.zoneId),
    }));
  }

  findOne(id: number) {
    const tree = this.storageService
      .getTrees()
      .find((item) => item.id === id);

    if (!tree) {
      throw new NotFoundException(
        `Дерево с id=${id} не найдено`,
      );
    }

    return {
      id: tree.id,
      name: tree.name,
      age: tree.age,
      height: tree.height,
      plantingDate: tree.plantingDate,
      species: this.getSpeciesById(tree.speciesId),
      zone: this.getZoneById(tree.zoneId),
    };
  }

  create(createTreeDto: CreateTreeDto) {
    const species = this.getSpeciesById(
      createTreeDto.speciesId,
    );
    const zone = this.getZoneById(createTreeDto.zoneId);
    const trees = this.storageService.getTrees();

    const treeRecord = {
      id: this.storageService.getNextId('trees'),
      name: createTreeDto.name,
      age: createTreeDto.age,
      height: createTreeDto.height,
      plantingDate: createTreeDto.plantingDate,
      speciesId: species.id,
      zoneId: zone.id,
    };

    trees.push(treeRecord);

    return {
      id: treeRecord.id,
      name: treeRecord.name,
      age: treeRecord.age,
      height: treeRecord.height,
      plantingDate: treeRecord.plantingDate,
      species,
      zone,
    } as Tree;
  }

  update(id: number, updateTreeDto: UpdateTreeDto) {
    const tree = this.storageService
      .getTrees()
      .find((item) => item.id === id);

    if (!tree) {
      throw new NotFoundException(
        `Дерево с id=${id} не найдено`,
      );
    }

    if (updateTreeDto.speciesId) {
      this.getSpeciesById(updateTreeDto.speciesId);
    }

    if (updateTreeDto.zoneId) {
      this.getZoneById(updateTreeDto.zoneId);
    }

    Object.assign(tree, updateTreeDto);

    return this.findOne(id);
  }

  remove(id: number) {
    const trees = this.storageService.getTrees();
    const index = trees.findIndex((item) => item.id === id);

    if (index === -1) {
      throw new NotFoundException(
        `Дерево с id=${id} не найдено`,
      );
    }

    const [removedTree] = trees.splice(index, 1);
    const inspections =
      this.storageService.getInspections();

    for (let i = inspections.length - 1; i >= 0; i -= 1) {
      if (inspections[i].treeId === id) {
        inspections.splice(i, 1);
      }
    }

    return {
      ...removedTree,
      species: this.getSpeciesById(
        removedTree.speciesId,
      ),
      zone: this.getZoneById(removedTree.zoneId),
    };
  }

  private getSpeciesById(id: number) {
    const species = this.storageService
      .getSpecies()
      .find((item) => item.id === id);

    if (!species) {
      throw new NotFoundException(
        `Порода дерева с id=${id} не найдена`,
      );
    }

    return species;
  }

  private getZoneById(id: number) {
    const zone = this.storageService
      .getZones()
      .find((item) => item.id === id);

    if (!zone) {
      throw new NotFoundException(
        `Зона с id=${id} не найдена`,
      );
    }

    return zone;
  }
}
