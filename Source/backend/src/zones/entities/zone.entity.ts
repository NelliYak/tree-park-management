import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('zones')
export class Zone {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  name: string;
}