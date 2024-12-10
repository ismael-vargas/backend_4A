import { IsNotEmpty, IsEmail } from 'class-validator';

export class RegisterAuthDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  mail: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  roleId: number; // ID del rol asignado al usuario
}
