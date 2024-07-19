import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient, Product } from '@prisma/client';

@Injectable()
export class ProductService implements OnModuleInit, OnModuleDestroy {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async onModuleInit() {
    await this.prisma.$connect();
  }

  async onModuleDestroy() {
    await this.prisma.$disconnect();
  }

  async createProduct(data: { image: string; title: string; description: string; price: number; quantity: number }): Promise<Product> {
    try {
      const product = await this.prisma.product.create({ data });
      console.log('Product created:', product);
      return product;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  }

  async updateProduct(id: string, image?: string, title?: string, description?: string, price?: number, quantity?: number): Promise<Product> {
    try {
      const data: any = {};
      if (image) data.image = image;
      if (title) data.title = title;
      if (description) data.description = description;
      if (price !== undefined) data.price = price;
      if (quantity !== undefined) data.quantity = quantity;

      return await this.prisma.product.update({
        where: { id: id },
        data,
      });
    } catch (error) {
      throw new Error(`Failed to update product with id ${id}: ${error.message}`);
    }
  }

  async deleteProduct(id: string): Promise<Product> {
    try {
      const product = await this.prisma.product.delete({
        where: { id },
      });
      console.log('Product deleted:', product);
      return product;
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  }

  async getProducts(): Promise<Product[]> {
    try {
      const products = await this.prisma.product.findMany();
      console.log('Fetched products:', products);
      return products;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }

   async placeOrder(orderItems: { id: string, quantity: number }[]): Promise<void> {
    try {
      for (const item of orderItems) {
        const product = await this.prisma.product.findUnique({
          where: { id: item.id }
        });
        
        if (!product) {
          throw new Error(`Product with id ${item.id} not found`);
        }
        
        if (product.quantity < item.quantity) {
          throw new Error(`Not enough stock for product with id ${item.id}`);
        }
        
        await this.prisma.product.update({
          where: { id: item.id },
          data: { quantity: product.quantity - item.quantity },
        });
      }
    } catch (error) {
      throw new Error(`Failed to place order: ${error.message}`);
    }
  }
}
