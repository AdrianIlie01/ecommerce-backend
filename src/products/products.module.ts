import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { UserService } from '../user/user.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, UserService],
})
export class ProductsModule {}
