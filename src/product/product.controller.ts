import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from "@nestjs/common";
import { ProductService } from "./product.service";
import { Product as ProductModel } from ".prisma/client";

@Controller('products')
export class ProductController {
    constructor(
        private readonly service: ProductService
    ) { }

    @Get()
    async findAll(): Promise<ProductModel[]> {
        return this.service.products({
            where: {}
        })
    }

    @Get(':id')
    async getProductById(@Param('id') id: string): Promise<ProductModel> {
        const product = await this.service.product({ id: String(id) })
        if (!product) {
            throw new NotFoundException(`O produto com o id: '${id} não existe.'`)
        }
        return product
    }

    @Post()
    async createProduct(
        @Body() productData: {
            name: string;
            description?: string;
            categoryId: string;
            serverId: string;
            permissions: string[];
            commands: string[];
            price: number;
            promoPrice?: number;
            image?: string;
            duration?: number;
            slug: string;
            active: boolean;
        }
    ): Promise<ProductModel> {
        const { name, categoryId, serverId, ...rest } = productData;

        const existingProduct = await this.service.product({ name });
        if (existingProduct) {
            throw new BadRequestException(`Já existe um produto com o nome '${name}'.`);
        }

        const categoryExists = await this.service.categoryExists(categoryId);
        if (!categoryExists) {
            throw new BadRequestException(`Categoria com ID '${categoryId}' não existe.`);
        }

        const serverExists = await this.service.serverExists(serverId);
        if (!serverExists) {
            throw new BadRequestException(`Servidor com ID '${serverId}' não existe.`);
        }

        return this.service.createProduct({
            ...rest,
            name,
            categories: { connect: { id: categoryId } },
            servers: { connect: { id: serverId } },
        });
    }


    @Put(':id')
    async updateProduct(@Param('id') id: string, @Body() productData: {
        name?: string;
        description?: string;
        categoryId?: string;
        serverId?: string;
        permissions?: string[];
        commands?: string[];
        price?: number;
        promoPrice?: number;
        image?: string;
        duration?: number;
        slug?: string;
        active?: boolean;
    }): Promise<ProductModel> {
        const product = await this.service.product({ id })
        const { categoryId, serverId, ...rest } = productData
        if (!product) {
            throw new BadRequestException(`Não existe nenhum produto com o id: '${id}'`)
        }
        const productWithSameName = await this.service.product({ name: productData.name });
        if (productWithSameName && productWithSameName.id !== id) {
            throw new BadRequestException(`Já existe um produto com o nome '${productData.name}'`);
        }

        return this.service.updateProduct({
            where: { id },
            data: {
                ...rest,
                categories: {
                    connect: { id: categoryId }
                },
                servers: {
                    connect: { id: serverId }
                }
            }
        })
    }

    @Delete(':id')
    async deleteProduct(@Param('id') id: string): Promise<ProductModel> {
        const product = await this.service.product({ id })

        if (!product) {
            throw new NotFoundException(`O produto com o id: '${id} não existe.'`)
        }

        return this.service.deleteProduct({ id })
    }
}