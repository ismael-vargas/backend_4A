import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @MaxLength(255)
  mail: string;

  @IsString()
  @MinLength(8)
  @MaxLength(200)
  password: string;

  // Puede incluirse el campo para Persona si es necesario
}
