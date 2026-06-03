import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Role } from '../../auth/role.enum';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column({
    nullable: true,
  })
  age?: number;
  
  @Column({
  type: 'enum',
  enum: Role,
  default: Role.VIEWER,
})
role: Role;
}