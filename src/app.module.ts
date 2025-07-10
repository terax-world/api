import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductService } from './product/product.service';
import { PrismaService } from './prisma/prisma.service';
import { ProductController } from './product/product.controller';
import { CategoryService } from './category/category.service';
import { CategoryController } from './category/category.controller';
import { ServerService } from './server/server.service';
import { ServerController } from './server/server.controller';

@Module({
  imports: [],
  controllers: [AppController, ProductController, CategoryController, ServerController],
  providers: [AppService, PrismaService, ProductService, CategoryService, ServerService],
})
export class AppModule {}
