import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { SpeciesModule } from './species/species.module';
import { ZonesModule } from './zones/zones.module';
import { TreesModule } from './trees/trees.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,

      autoLoadEntities: true,
      synchronize: true,
    }),

    UsersModule,

    SpeciesModule,

    ZonesModule,

    TreesModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}