import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { InspectionsController } from './inspections.controller';
import { InspectionsService } from './inspections.service';

import { Inspection } from './entities/inspection.entity';
import { Tree } from '../trees/entities/tree.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Inspection,
      Tree,
    ]),
  ],
  controllers: [InspectionsController],
  providers: [InspectionsService],
})
export class InspectionsModule {}