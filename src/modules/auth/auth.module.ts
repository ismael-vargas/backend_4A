import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { RoleModule } from '../role/role.module';  // Importa el RoleModule

@Module({
  imports: [
    JwtModule.register({
      secret: 'MI_CODIGO_SECRETO',
      signOptions: { expiresIn: '60S' },
    }),
    TypeOrmModule.forFeature([User]),  // UserRepository no necesita importar explícitamente, ya está con TypeOrmModule
    RoleModule,  // Asegúrate de importar el RoleModule aquí
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
