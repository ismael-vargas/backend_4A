import { SetMetadata } from '@nestjs/common';

// Este decorador toma los roles como parámetros
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
