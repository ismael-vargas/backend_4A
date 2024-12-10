import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('persona')
export class Persona {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombres: string;

  @Column()
  apellidos: string;

  @OneToOne(() => Persona, (persona) => persona.user, { nullable: true })
  persona: Persona;
   
  user: User; // Relación con User
}
