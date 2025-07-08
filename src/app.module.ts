import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductController } from './product/poduct.controller';
import { PrismaService } from './prisma/prisma.service';
import { ProductService } from './product/product.service';

@Module({
  imports: [],
  controllers: [AppController, ProductController],
  providers: [AppService, PrismaService, ProductService],
})
export class AppModule {}
