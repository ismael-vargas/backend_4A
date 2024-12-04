import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from './entities/producto.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductoService {
  constructor(@InjectRepository(Producto) private productoRepository: Repository<Producto>) {}

  queryBuilder(alias: string) {
    return this.productoRepository.createQueryBuilder(alias);
  }

  async create(createProductoDto: CreateProductoDto): Promise<Producto> {
    const nuevoProducto = this.productoRepository.create(createProductoDto);
    return await this.productoRepository.save(nuevoProducto);
  }

  async findAll(): Promise<Producto[]> {
    return await this.productoRepository.find();
  }

  async findOne(id: number): Promise<Producto> {
    const producto = await this.productoRepository.findOne({ where: { id } });
    if (!producto) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }
    return producto;
  }

  async update(id: number, updateProductoDto: UpdateProductoDto): Promise<Producto> {
    const producto = await this.findOne(id);
    Object.assign(producto, updateProductoDto);
    return await this.productoRepository.save(producto);
  }

  async remove(id: number): Promise<void> {
    const producto = await this.findOne(id);
    await this.productoRepository.remove(producto);
  }
}
