import { Module } from '@nestjs/common';

import { ZonesController } from './zones.controller';
import { ZonesService } from './zones.service';
import { StorageModule } from '../storage/storage.module';

@Module({
  imports: [StorageModule],
  controllers: [ZonesController],
  providers: [ZonesService],
})
export class ZonesModule {}
