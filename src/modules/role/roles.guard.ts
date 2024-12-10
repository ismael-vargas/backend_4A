import { Injectable, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // Importamos la guardia JWT para usarla por separado

@Injectable()
export class RolesGuard {
  constructor(private reflector: Reflector) {}

  // Usamos JwtAuthGuard como base, pero sin heredar
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // Obtenemos los roles requeridos de los metadatos de la ruta
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());

    if (!requiredRoles) {
      return true; // Si no se especifican roles, permitimos el acceso
    }

    // Comprobamos si el usuario tiene alguno de los roles requeridos
    const hasRole = requiredRoles.some(role => user.roles?.includes(role));

    if (!hasRole) {
      throw new ForbiddenException('Acceso denegado: roles insuficientes');
    }

    return true;
  }
}
