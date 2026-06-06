import { Role } from '../auth/role.enum';

export class UserRecord {
  id: number;
  name: string;
  email: string;
  age?: number;
  role: Role;
  password: string;
}

export class SpeciesRecord {
  id: number;
  name: string;
}

export class ZoneRecord {
  id: number;
  name: string;
}

export class TreeRecord {
  id: number;
  name: string;
  age: number;
  height: number;
  plantingDate: string;
  speciesId: number;
  zoneId: number;
}

export class InspectionRecord {
  id: number;
  inspectionDate: string;
  condition: string;
  comment: string;
  treeId: number;
}

export type StorageCollectionName =
  | 'users'
  | 'species'
  | 'zones'
  | 'trees'
  | 'inspections';

export interface StorageSnapshot {
  users: UserRecord[];
  species: SpeciesRecord[];
  zones: ZoneRecord[];
  trees: TreeRecord[];
  inspections: InspectionRecord[];
}
