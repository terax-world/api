import { Module } from "@nestjs/common";
import { CategoryController } from "./category.controller";
import { CategoryService } from "./category.service";
import { PrismaService } from "src/prisma/prisma.service";
import { ProductService } from "src/product/product.service";

@Module({
    controllers: [CategoryController],
    providers: [CategoryService, PrismaService, ProductService]
})

export class CategoryModule {}