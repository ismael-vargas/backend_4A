// create-role.dto.ts
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;  // Nombre del rol

  @IsString()
  @IsNotEmpty()
  detalle: string;  // Descripción o detalle del rol
}
