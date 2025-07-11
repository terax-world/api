import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { PrismaModule } from './prisma/prisma.module';
import { CategoryModule } from './category/category.module';
import { ServerModule } from './server/server.module';
import { InvoiceModule } from './invoice/invoice.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [ProductModule, CategoryModule, ServerModule, InvoiceModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/'
    })
  ],
  controllers: [AppController],
  providers: [PrismaModule, AppService],
})
export class AppModule {}
