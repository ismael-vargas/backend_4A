// role.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { User } from '../../users/entities/user.entity';  // Asegúrate de importar User correctamente

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn()
  id: number;  // La clave primaria del rol

  @Column()
  nombre: string;  // Nombre del rol

  @Column()
  detalle: string;  // Detalle o descripción del rol

  @ManyToMany(() => User, (user) => user.roles)
  @JoinTable({ name: 'role_user' })  // Especificamos el nombre de la tabla intermedia
  users: User[];
}
