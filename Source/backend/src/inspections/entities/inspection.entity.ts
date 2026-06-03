import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';

import { Tree } from '../../trees/entities/tree.entity';

@Entity('inspections')
export class Inspection {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'date',
  })
  inspectionDate: Date;

  @Column()
  condition: string;

  @Column({
    nullable: true,
  })
  comment: string;

  @ManyToOne(() => Tree)
  tree: Tree;
}