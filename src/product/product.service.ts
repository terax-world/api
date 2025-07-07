import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import slugify from "slugify";

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async getBySlug(slug: string) {
    const product = await this.prisma.product.findUnique({
      where: { slug },
      include: { categories: true, servers: true },
    });

    if (!product) {
      throw new NotFoundException(`Produto com slug "${slug}" não encontrado`);
    }

    return product;
  }

  create(data: CreateProductDto) {

    const slug = data.slug || slugify(data.name, { lower: true, strict: true })
    return this.prisma.product.create({
      data: {
        ...data,
        slug,
        categories: {
          connect: data.categoryIds?.map(id => ({ id })) || [],
        },
        servers: {
          connect: data.serverIds?.map(id => ({ id })) || [],
        },
      },
    });
  }

  findAll() {
    return this.prisma.product.findMany({ include: { categories: true, servers: true } });
  }

  findOne(id: string) {
    return this.prisma.product.findUnique({
      where: { id },
      include: { categories: true, servers: true },
    });
  }

  update(id: string, data: UpdateProductDto) {
    return this.prisma.product.update({
      where: { id },
      data: {
        ...data,
        categories: data.categoryIds ? { set: data.categoryIds.map(id => ({ id })) } : undefined,
        servers: data.serverIds ? { set: data.serverIds.map(id => ({ id })) } : undefined,
      },
    });
  }

  remove(id: string) {
    return this.prisma.product.delete({ where: { id } });
  }
}