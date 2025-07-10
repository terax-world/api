import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ProductService } from "./product.service";
import { Product as ProductModel } from ".prisma/client";

@Controller('products')
export class ProductController {
    constructor(
        private readonly service: ProductService
    ){}

    @Get()
    async findAll(): Promise<ProductModel[]> {
        return this.service.products({
            where: {}
        })
    }

    @Get(':id')
    async findById(@Param('id') id: string): Promise<ProductModel[]> {
        return this.service.products({
            where: {}
        })
    }
}