import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from "@nestjs/common";
import { ProductService } from "./product.service";
import { Product as ProductModel } from ".prisma/client";
import { MessagePattern } from "@nestjs/microservices";

@Controller('products')
export class ProductController {
    constructor(
        private readonly service: ProductService
    ) { }

    @MessagePattern({ cmd: 'findAllProducts' })
    @Get()
    async findAll(): Promise<ProductModel[]> {
        return this.service.products({
            where: {}
        })
    }

    @MessagePattern({ cmd: 'getProductById' })
    @Get(':id')
    async getProductById(@Param('id') id: string): Promise<ProductModel> {
        const product = await this.service.product({ id: String(id) })
        if (!product) {
            throw new NotFoundException(`O produto com o id: '${id} não existe.'`)
        }
        return product
    }

    @MessagePattern({ cmd: 'createProduct' })
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
        const { name, slug, categoryId, serverId, ...rest } = productData;

        const existingProduct = await this.service.product({ name });
        if (existingProduct) {
            throw new BadRequestException(`Já existe um produto com o nome '${name}'.`);
        }

        if(!slug?.trim()) {
            throw new BadRequestException(`Você precisa inserir um slug`)
        }

        if (!categoryId?.trim()) {
            throw new BadRequestException(`Você precisa inserir uma categoria.`);
        }

        const categoryExists = await this.service.categoryExists(categoryId);
        if (!categoryExists) {
            throw new BadRequestException(`A categoria com o ID '${categoryId}' não existe.`);
        }

        if (!serverId?.trim()) {
            throw new BadRequestException(`Você precisa inserir um servidor.`);
        }

        const serverExists = await this.service.serverExists(serverId);
        if (!serverExists) {
            throw new BadRequestException(`O servidor com o ID '${serverId}' não existe.`);
        }

        return this.service.createProduct({
            ...rest,
            name,
            slug,
            categories: { connect: { id: categoryId } },
            servers: { connect: { id: serverId } },
        });
    }

    @MessagePattern({ cmd: 'updateProductById' })
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

    @MessagePattern({ cmd: 'deleteProductById' })
    @Delete(':id')
    async deleteProduct(@Param('id') id: string): Promise<{ message: string }> {
        const product = await this.service.product({ id })

        if (!product) {
            throw new NotFoundException(`O produto com o id: '${id} não existe.'`)
        }

        await this.service.deleteProduct({ id })

        return { message: `Categoria '${product.name}' deletada com sucesso`}
    }
}