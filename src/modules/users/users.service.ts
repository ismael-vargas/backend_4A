import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from '../role/entities/role.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Role) private roleRepository: Repository<Role>
  ) {}

  // Método para crear un nuevo usuario
  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  // Método para obtener todos los usuarios
  async findAll(): Promise<User[]> {
    return this.userRepository.find({ relations: ['roles'] }); // Corregir a 'roles'
  }

  // Método para obtener un usuario por ID
  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id }, relations: ['roles'] }); // Corregir a 'roles'
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  // Método para actualizar un usuario
  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    Object.assign(user, updateUserDto);
    return this.userRepository.save(user);
  }

  // Método para eliminar un usuario
  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    await this.userRepository.remove(user);
  }

  // Método para actualizar el rol del usuario
  async updateRole(id: number, role_id: number): Promise<User> {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    // Buscar el rol usando el ID proporcionado
    const role = await this.roleRepository.findOne({ where: { id: role_id } });
    if (!role) {
      throw new NotFoundException(`Role with ID ${role_id} not found`);
    }

    // Asignamos el rol al usuario, 'roles' es un array, así que lo agregamos al arreglo
    user.roles = [role]; // Corregir a 'roles'

    return this.userRepository.save(user);
  }
}
