import { Species } from '../../species/entities/species.entity';
import { Zone } from '../../zones/entities/zone.entity';

export class Tree {
  id: number;
  name: string;
  age: number;
  height: number;
  plantingDate: string;
  species: Species;
  zone: Zone;
}
