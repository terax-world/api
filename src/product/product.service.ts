import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ProductService {
    constructor(
        private prisma: PrismaService
    ){}

    async create(data: CreateProductDto){
        const exists = await this.prisma.product.findFirst({
            where: {
                OR: [{ name: data.name }, { slug: data.slug }]
            }
        })

        if (exists) {
            throw new BadRequestException('Já existe um produto com este Nome ou Slug.')
        }

        const [ category, server ] = await Promise.all([
            this.prisma.category.findUnique({ where: { id: data.categoryId } }),
            this.prisma.server.findUnique({ where: { id: data.serverId } })
        ])

        if (!category) throw new BadRequestException('Categoria não encotrada.')
        if (!server) throw new BadRequestException('Servidor não encontrado.')

        return this.prisma.product.create({ data })
    }

    findAll(){
        return this.prisma.product.findMany({
            include: { categories: true, servers: true }
        })
    }

    async findOne(id: string){
        const product = await this.prisma.product.findUnique({ where: { id } })
        if (!product) throw new NotFoundException('Produto não encontrado')
        return product
    }

    findBySlug(slug: string) {
        return this.prisma.product.findUnique({
            where: { slug },
            include: { categories: true, servers: true }
        })
    }

    async update(id: string, data: UpdateProductDto){
        const product = await this.prisma.product.findUnique({ where: { id } })
        if (!product) throw new NotFoundException('Produto não encontrado.')

        type ProductWhereInput = Prisma.ProductWhereInput
        const orConditions: ProductWhereInput[] = []

        if (data.name) orConditions.push({ name: data.name })
        if (data.slug) orConditions.push({ slug: data.slug })

        if (orConditions.length > 0) {
            const duplicate = await this.prisma.product.findFirst({
                where: {
                    AND: [
                        { id : { not: id } },
                        { OR: orConditions }
                    ]
                }
            })

            if (duplicate) {
                throw new BadRequestException('Já existe um produto com este Nome ou Slug.')
            }
        }

        return this.prisma.product.update({
            where: { id },
            data
        })
    }

    async remove(id: string){
        const product = await this.prisma.product.findUnique({ where: { id } })
        if (!product) throw new NotFoundException('Produto não encontrado')
        
        return this.prisma.product.delete({ where: { id } })
    }
}