import { Injectable } from '@nestjs/common';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import {
  InspectionRecord,
  SpeciesRecord,
  StorageCollectionName,
  StorageSnapshot,
  TreeRecord,
  UserRecord,
  ZoneRecord,
} from './storage.types';

@Injectable()
export class StorageService {
  private readonly data: StorageSnapshot;

  constructor() {
    this.data = this.loadSeedData();
  }

  getUsers() {
    return this.data.users;
  }

  getSpecies() {
    return this.data.species;
  }

  getZones() {
    return this.data.zones;
  }

  getTrees() {
    return this.data.trees;
  }

  getInspections() {
    return this.data.inspections;
  }

  getSnapshot() {
    return {
      users: this.data.users.map((item) => ({ ...item })),
      species: this.data.species.map((item) => ({ ...item })),
      zones: this.data.zones.map((item) => ({ ...item })),
      trees: this.data.trees.map((item) => ({ ...item })),
      inspections: this.data.inspections.map((item) => ({ ...item })),
    };
  }

  getNextId(collectionName: StorageCollectionName) {
    const collection = this.data[collectionName];

    return collection.length === 0
      ? 1
      : Math.max(...collection.map(({ id }) => id)) + 1;
  }

  private loadSeedData(): StorageSnapshot {
    const seedPath = resolve(
      process.cwd(),
      '..',
      '..',
      'DB',
      'tree-park-seed.json',
    );

    const raw = readFileSync(seedPath, 'utf-8');
    const parsed = JSON.parse(raw) as StorageSnapshot;

    return {
      users: parsed.users.map((user) => ({ ...user })) as UserRecord[],
      species: parsed.species.map((item) => ({ ...item })) as SpeciesRecord[],
      zones: parsed.zones.map((item) => ({ ...item })) as ZoneRecord[],
      trees: parsed.trees.map((item) => ({ ...item })) as TreeRecord[],
      inspections: parsed.inspections.map((item) => ({ ...item })) as InspectionRecord[],
    };
  }
}
