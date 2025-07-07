import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryController } from './category/category.controller';
import { InvoiceController } from './invoice/invoice.controller';
import { ProductController } from './product/product.controller';
import { ServerController } from './server/server.controller';
import { CategoryService } from './category/category.service';
import { InvoiceService } from './invoice/invoice.service';
import { PrismaService } from './prisma/prisma.service';
import { ProductService } from './product/product.service';
import { ServerService } from './server/server.service';
import { PrismaModule } from './prisma/prisma.module';
import { PaymentService } from './payment/payment.service';
import { PaymentController } from './payment/payment.controller';
import { RedirectLinkController } from './payment/redirect-link.controller';

@Module({
  imports: [PrismaModule],
  controllers: [AppController, CategoryController, InvoiceController, ProductController, ServerController, PaymentController, RedirectLinkController],
  providers: [AppService, CategoryService, InvoiceService, PaymentService, PrismaService, ProductService, ServerService, PaymentService],
})
export class AppModule {}
