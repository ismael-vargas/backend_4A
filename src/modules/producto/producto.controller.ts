import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { AnyARecord } from 'dns';

@ApiTags('producto')
@Controller('producto')
export class ProductoController {
  constructor(private readonly productoService: ProductoService) { }

  @Post()
  create(@Body() createProductoDto: CreateProductoDto) {
    return this.productoService.create(createProductoDto);
  }

  @Get()
  findAll() {
    return this.productoService.findAll();
  }

  @Get('back')
  async backend(@Req() req: Request) {
    const builder = this.productoService.queryBuilder('productos');

    // Aplicar búsqueda por nombre si existe
    if (req.query.q) {
      builder.where('productos.nombre LIKE :q', { q: `%${req.query.q}%` });
    }

    // Aplicar ordenamiento si se especifica
    if (req.query.sort) {
      const sortOrder = req.query.sort.toString().toLowerCase() === 'asc' ? 'ASC' : 'DESC';
      builder.orderBy('productos.nombre', sortOrder);

    }
    // Manejo de paginación
    const page = parseInt(req.query.page as any) || 1; // Página por defecto: 1
    const limit = 2; // Límite por página

    builder.offset((page - 1) * limit).limit(limit);
    
    const total=await builder.getCount();
    // Obtener los resultados
    return { 
      data: await builder.getMany(),
      total:total,
      page,
      last_page: Math.ceil(total/limit)
  }
}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductoDto: UpdateProductoDto) {
    return this.productoService.update(+id, updateProductoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productoService.remove(+id);
  }
}
 