import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';

import { Species } from '../../species/entities/species.entity';
import { Zone } from '../../zones/entities/zone.entity';

@Entity('trees')
export class Tree {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column('float')
  height: number;

  @Column()
  plantingDate: Date;

  @ManyToOne(() => Species)
  species: Species;

  @ManyToOne(() => Zone)
  zone: Zone;
}