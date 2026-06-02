import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('species')
export class Species {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  name: string;
}