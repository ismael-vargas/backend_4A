import { AuthGuard } from "@nestjs/passport";
import { Injectable, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RolesGuard } from '../role/roles.guard';  // Asegúrate de que la importación sea correcta


@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  // Esta función se puede combinar con RolesGuard para verificar roles
  canActivate(context) {
    const isAuth = super.canActivate(context);

    if (isAuth) {
      const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());

      if (!requiredRoles) {
        return true; // Si no hay roles definidos, permitimos el acceso
      }

      const request = context.switchToHttp().getRequest();
      const user = request.user;

      // Verificamos si el usuario tiene los roles necesarios
      const hasRole = requiredRoles.some(role => user.roles?.includes(role));

      if (!hasRole) {
        throw new ForbiddenException('Acceso denegado: roles insuficientes');
      }

      return true;
    }

    return false;
  }
}
