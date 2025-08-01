import { Module } from "@nestjs/common";
import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
    controllers: [ProductController],
    providers: [ProductService, PrismaService]
})

export class ProductModule {}