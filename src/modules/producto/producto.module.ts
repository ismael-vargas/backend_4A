import { Module } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { ProductoController } from './producto.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from './entities/producto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Producto])], // Registra la entidad Producto para usarla en el repositorio
  controllers: [ProductoController],
  providers: [ProductoService], // Aquí también podrías agregar un repositorio si lo tienes personalizado
})
export class ProductoModule {}
