import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TreesController } from './trees.controller';
import { TreesService } from './trees.service';

import { Tree } from './entities/tree.entity';
import { Species } from '../species/entities/species.entity';
import { Zone } from '../zones/entities/zone.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Tree,
      Species,
      Zone,
    ]),
  ],
  controllers: [TreesController],
  providers: [TreesService],
})
export class TreesModule {}