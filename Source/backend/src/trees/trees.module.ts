import { Module } from '@nestjs/common';

import { TreesController } from './trees.controller';
import { TreesService } from './trees.service';
import { StorageModule } from '../storage/storage.module';

@Module({
  imports: [StorageModule],
  controllers: [TreesController],
  providers: [TreesService],
})
export class TreesModule {}
