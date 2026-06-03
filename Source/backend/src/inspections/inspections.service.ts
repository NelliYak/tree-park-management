import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Inspection } from './entities/inspection.entity';
import { Tree } from '../trees/entities/tree.entity';

import { CreateInspectionDto } from './dto/create-inspection.dto';

@Injectable()
export class InspectionsService {
  constructor(
    @InjectRepository(Inspection)
    private inspectionsRepository: Repository<Inspection>,

    @InjectRepository(Tree)
    private treesRepository: Repository<Tree>,
  ) {}

  async findAll() {
    return this.inspectionsRepository.find({
      relations: {
        tree: true,
      },
    });
  }

  async create(
    createInspectionDto: CreateInspectionDto,
  ) {
    const tree = await this.treesRepository.findOne({
      where: {
        id: createInspectionDto.treeId,
      },
    });

    const inspection = new Inspection();

    inspection.inspectionDate =
  new Date(createInspectionDto.inspectionDate);

    inspection.condition =
      createInspectionDto.condition;

    inspection.comment =
      createInspectionDto.comment ?? '';

    inspection.tree = tree!;

    return this.inspectionsRepository.save(
      inspection,
    );
  }
}