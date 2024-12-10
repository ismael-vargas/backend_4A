// user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Role } from '../../role/entities/role.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;  // Cambiar "nombre" a "name"

  @Column()
  mail: string;

  @Column()
  password: string;

  @ManyToMany(() => Role, (role) => role.users)
  roles: Role[];
}
