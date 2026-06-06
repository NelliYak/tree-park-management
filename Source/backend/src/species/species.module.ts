import { Module } from '@nestjs/common';

import { SpeciesController } from './species.controller';
import { SpeciesService } from './species.service';
import { StorageModule } from '../storage/storage.module';

@Module({
  imports: [StorageModule],
  controllers: [SpeciesController],
  providers: [SpeciesService],
})
export class SpeciesModule {}
