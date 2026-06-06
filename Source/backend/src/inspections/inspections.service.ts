import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { Inspection } from './entities/inspection.entity';
import { CreateInspectionDto } from './dto/create-inspection.dto';
import { StorageService } from '../storage/storage.service';

@Injectable()
export class InspectionsService {
  constructor(
    private readonly storageService: StorageService,
  ) {}

  findAll() {
    return this.storageService
      .getInspections()
      .map((inspection) => ({
        ...inspection,
        tree: this.getTreeById(inspection.treeId),
      }));
  }

  create(
    createInspectionDto: CreateInspectionDto,
  ) {
    const inspections =
      this.storageService.getInspections();
    const tree = this.getTreeById(createInspectionDto.treeId);

    const inspection: Inspection = {
      id: this.storageService.getNextId('inspections'),
      inspectionDate: createInspectionDto.inspectionDate,
      condition: createInspectionDto.condition,
      comment: createInspectionDto.comment ?? '',
      tree,
    };

    inspections.push({
      id: inspection.id,
      inspectionDate: inspection.inspectionDate,
      condition: inspection.condition,
      comment: inspection.comment,
      treeId: createInspectionDto.treeId,
    });

    return inspection;
  }

  private getTreeById(id: number) {
    const tree = this.storageService
      .getTrees()
      .find((item) => item.id === id);

    if (!tree) {
      throw new NotFoundException(
        `Дерево с id=${id} не найдено`,
      );
    }

    const species = this.storageService
      .getSpecies()
      .find((item) => item.id === tree.speciesId);
    const zone = this.storageService
      .getZones()
      .find((item) => item.id === tree.zoneId);

    if (!species || !zone) {
      throw new NotFoundException(
        'Для дерева не найдены связанные данные',
      );
    }

    return {
      id: tree.id,
      name: tree.name,
      age: tree.age,
      height: tree.height,
      plantingDate: tree.plantingDate,
      species,
      zone,
    };
  }
}
