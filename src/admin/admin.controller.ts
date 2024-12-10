import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../modules/auth/jwt-auth.guard'; // Importa la guardia JWT
import { RolesGuard } from '../modules/role/roles.guard'; // Importa la guardia de roles
import { Roles } from '../modules/role/roles.decorator';

@Controller('admin') // Esta será la ruta base para los administradores
@UseGuards(JwtAuthGuard, RolesGuard) // Aplica la guardia JWT y la de roles
export class AdminController {

  @Get()
  @Roles('admin') // Solo accesible para usuarios con el rol 'admin'
  getAdminData() {
    return 'Solo accesible para administradores';
  }
}
