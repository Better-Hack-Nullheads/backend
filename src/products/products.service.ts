import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class ProductsService {
  private products: Product[] = [];
  private nextId = 1;

  create(createProductDto: CreateProductDto): Product {
    const product: Product = {
      id: this.nextId.toString(),
      ...createProductDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    this.nextId++;
    this.products.push(product);
    return product;
  }

  findAll(): Product[] {
    return this.products;
  }

  findOne(id: string): Product | undefined {
    return this.products.find(product => product.id === id);
  }

  update(id: string, updateProductDto: UpdateProductDto): Product | undefined {
    const productIndex = this.products.findIndex(product => product.id === id);
    
    if (productIndex === -1) {
      return undefined;
    }

    this.products[productIndex] = {
      ...this.products[productIndex],
      ...updateProductDto,
      updatedAt: new Date(),
    };

    return this.products[productIndex];
  }

  remove(id: string): boolean {
    const productIndex = this.products.findIndex(product => product.id === id);
    
    if (productIndex === -1) {
      return false;
    }

    this.products.splice(productIndex, 1);
    return true;
  }
}
