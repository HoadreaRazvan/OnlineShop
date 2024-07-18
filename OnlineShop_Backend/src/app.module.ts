import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ProductController } from './product/product.controller';
import { ProductService } from './product/product.service';
import { ProductModule } from './product/product.module';


@Module({
  imports: [UserModule, ProductModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class AppModule {}
