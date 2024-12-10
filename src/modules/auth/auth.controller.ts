import { Controller, Post, Body, Get, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtAuthGuard } from './jwt-auth.guard'; // Asegúrate de que esté protegido por el guard de JWT
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Ruta para registrar un nuevo usuario
  @Post('register')
  registerUser(@Body() userobj: RegisterAuthDto) {
    console.log(userobj);
    return this.authService.funRegister(userobj);
  }

  // Ruta para realizar el login y obtener el token JWT
  @Post('login')
  async login(@Body() credenciales: LoginAuthDto) {
    const token = await this.authService.login(credenciales);
    return { access_token: token };
  }

  // Ruta para obtener el rol del usuario autenticado
  @UseGuards(JwtAuthGuard)  // Protege la ruta con el guard de JWT
  @Get('role')
  async getUserRole(@Request() req): Promise<string> {
    return this.authService.getUserRole(req.user.sub);  // Obtener el rol del usuario basado en su ID
  }
}
