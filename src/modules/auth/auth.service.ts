import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';
import { Role } from '../role/entities/role.entity';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    private readonly jwtService: JwtService
  ) {}

  /**
   * Registro de un nuevo usuario
   * @param dto Datos de registro
   * @returns Usuario creado
   */
  async funRegister(dto: RegisterAuthDto): Promise<User> {
    const role = await this.roleRepository.findOne({ where: { id: dto.roleId } });

    if (!role) {
      throw new Error('Role not found');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);  // Encriptación de la contraseña

    const user = this.userRepository.create({
      name: dto.name,
      mail: dto.mail,
      password: hashedPassword,  // Contraseña encriptada
      roles: [role],
    });

    return this.userRepository.save(user);
  }

  /**
   * Login de un usuario
   * @param credenciales Credenciales del usuario
   * @returns Token JWT
   */
  async login(credenciales: LoginAuthDto): Promise<string> {
    const { email, password } = credenciales;
    const user = await this.userRepository.findOne({ where: { mail: email }, relations: ['roles'] });

    if (!user || !(await bcrypt.compare(password, user.password))) {  // Verificación con bcrypt
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { username: user.mail, sub: user.id };
    return this.jwtService.sign(payload);
  }

  /**
   * Obtener el rol de un usuario
   * @param userId ID del usuario
   * @returns El rol del usuario
   */
  async getUserRole(userId: number): Promise<string> {
    const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['roles'] });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return user.roles[0]?.nombre;  // Devuelve el nombre del rol
  }
}
