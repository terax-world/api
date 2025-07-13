import { Prisma, Product } from ".prisma/client";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ProductService {
    constructor(
        private prisma: PrismaService
    ) { }

    async product(
        productWhereUniqueInput: Prisma.ProductWhereUniqueInput,
    ): Promise<Product | null> {
        return this.prisma.product.findUnique({
            where: productWhereUniqueInput,
        })
    }

    async products(params: {
        skip?: number
        take?: number
        cursor?: Prisma.ProductWhereUniqueInput
        where?: Prisma.ProductWhereInput
        orderBy?: Prisma.ProductOrderByWithRelationInput
    }): Promise<Product[]> {
        const { skip, take, cursor, where, orderBy } = params
        return this.prisma.product.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy
        })
    }

    async createProduct(data: Prisma.ProductCreateInput): Promise<Product> {
        return this.prisma.product.create({
            data: {
                ...data,
            }
        });
    }

    async updateProduct(params: {
        where: Prisma.ProductWhereUniqueInput;
        data: Prisma.ProductUpdateInput;
    }): Promise<Product> {
        const { where, data } = params;

        return this.prisma.product.update({
            where,
            data
        });
    }

    async deleteProduct(where: Prisma.ProductWhereUniqueInput): Promise<Product> {
        return this.prisma.product.delete({
            where
        })
    }

    async deleteProductByServerId(serverId: string): Promise<Prisma.BatchPayload> {
        return this.prisma.product.deleteMany({
            where: {
                serverId
            }
        })
    }

    async deleteProductByCategoryId(categoryId: string): Promise<Prisma.BatchPayload> {
        return this.prisma.product.deleteMany({
            where: {
                categoryId
            }
        })
    }

    async categoryExists(id: string): Promise<boolean> {
        return !!(await this.prisma.category.findUnique({ where: { id } }));
    }

    async serverExists(id: string): Promise<boolean> {
        return !!(await this.prisma.server.findUnique({ where: { id } }));
    }
}