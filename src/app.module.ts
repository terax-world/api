import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { PrismaModule } from './prisma/prisma.module';
import { CategoryModule } from './category/category.module';
import { ServerModule } from './server/server.module';
import { InvoiceModule } from './invoice/invoice.module';

@Module({
  imports: [AppModule, ProductModule, CategoryModule, ServerModule, InvoiceModule],
  controllers: [],
  providers: [PrismaModule],
})
export class AppModule {}
