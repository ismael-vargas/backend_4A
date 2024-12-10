// update-role.dto.ts (este archivo debe estar en la carpeta 'src/modules/role/dto/')
import { IsString, IsOptional } from 'class-validator';

export class UpdateRoleDto {
  @IsString()
  @IsOptional()
  nombre?: string;  // 'role_name' cambiado a 'nombre'

  @IsString()
  @IsOptional()
  detalle?: string;  // 'descripcion' cambiado a 'detalle'
}
