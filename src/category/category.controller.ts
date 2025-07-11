import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from "@nestjs/common";
import { Category as CategoryModel } from ".prisma/client";
import { CategoryService } from "./category.service";
import { ProductService } from "src/product/product.service";
import { MessagePattern } from "@nestjs/microservices";

@Controller('categories')
export class CategoryController {
    constructor(
        private readonly service: CategoryService,
        private readonly productService: ProductService
    ) { }

    @MessagePattern({ cmd: 'findAllProducts' })
    @Get()
    async findAll(): Promise<CategoryModel[]> {
        return this.service.categories({
            where: {}
        })
    }

    @MessagePattern({ cmd: 'findCategoryById' })
    @Get(':id')
    async getCategoryById(@Param('id') id: string): Promise<CategoryModel> {
        const category = await this.service.category({ id: String(id) })
        if (!category) {
            throw new NotFoundException(`A Categoria com id: '${id}' não existe.`)
        }
        return category
    }

    @MessagePattern({ cmd: 'createCategory' })
    @Post()
    async createCategory(
        @Body() categoryData: { name: string; description?: string }
    ): Promise<CategoryModel> {
        const { name } = categoryData
        const categoryName = await this.service.category({ name })
        if (categoryName) {
            throw new BadRequestException(`Já existe uma categoria com o nome '${name}'`)
        }
        return this.service.createCategory(categoryData)
    }

    @MessagePattern({ cmd: 'updateCategoryById' })
    @Put(':id')
    async updateCategory(@Param('id') id: string, @Body() data: { name?: string; description?: string }): Promise<CategoryModel> {
        if (data.name) {
            throw new BadRequestException(`Já existe uma categoria com o nome '${data.name}'`)
        }

        return this.service.updateCategory({
            where: { id: String(id) },
            data
        })
    }

    @MessagePattern({ cmd: 'deleteCategoryById' })
    @Delete(':id')
    async deleteCategory(@Param('id') id: string): Promise<{ message: string }> {
        const category = await this.service.category({ id: String(id) })

        if (!category) {
            throw new NotFoundException(`A Categoria com id: '${id}' não existe.`)
        }

        await this.productService.deleteProductByCategoryId(category.id)

        await this.service.deleteCategory({ id: category.id })

        return { message: `Categoria '${category.name}' deletada com sucesso` }
    }
}