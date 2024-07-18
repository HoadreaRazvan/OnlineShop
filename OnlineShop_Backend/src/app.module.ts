import { Module } from '@nestjs/common';
import { CatsController } from './cats/cats.controller';
import { UserModule } from './user/user.module';


@Module({
  imports: [UserModule],
  controllers: [CatsController],
  providers: [],
})
export class AppModule {}
