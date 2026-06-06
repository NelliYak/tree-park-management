import { Module } from '@nestjs/common';

import { UsersModule } from './users/users.module';
import { SpeciesModule } from './species/species.module';
import { ZonesModule } from './zones/zones.module';
import { TreesModule } from './trees/trees.module';
import { InspectionsModule } from './inspections/inspections.module';
import { StorageModule } from './storage/storage.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    StorageModule,
    AuthModule,
    UsersModule,
    SpeciesModule,
    ZonesModule,
    TreesModule,
    InspectionsModule,
  ],
})
export class AppModule {}
