import { Controller, Get, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('create')
  async createProduct(@Body() body: { image: string; title: string; description: string; price: number; quantity: number }) {
    return this.productService.createProduct(body);
  }

  @Post('update')
  async updateProduct(@Body() body: { id: string; image?: string; title?: string; description?: string; price?: number; quantity?: number }) {
    try {
      return await this.productService.updateProduct(body.id, body.image, body.title, body.description, body.price, body.quantity);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('delete')
  async deleteProduct(@Body() body: { id: string }) {
    return this.productService.deleteProduct(body.id);
  }

  @Get()
  async getProducts() {
    return this.productService.getProducts();
  }

    @Post('order')
  async placeOrder(@Body() body: { orderItems: { id: string, quantity: number }[] }) {
    try {
      await this.productService.placeOrder(body.orderItems);
      return { message: 'Order placed successfully' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
