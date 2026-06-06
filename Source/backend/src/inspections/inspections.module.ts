import { Module } from '@nestjs/common';

import { InspectionsController } from './inspections.controller';
import { InspectionsService } from './inspections.service';
import { StorageModule } from '../storage/storage.module';

@Module({
  imports: [StorageModule],
  controllers: [InspectionsController],
  providers: [InspectionsService],
})
export class InspectionsModule {}
