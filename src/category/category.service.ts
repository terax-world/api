import { Injectable } from "@nestjs/common";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class CategoryService {
    constructor(private prisma: PrismaService) {}

    create(data: CreateCategoryDto){
        return this.prisma.category.create({ data })
    }

    findAll() {
        return this.prisma.category.findMany()
    }

    findOne(id: string){
        return this.prisma.category.findUnique({ where: { id }})
    }

    update(id: string, data: UpdateCategoryDto) {
        return this.prisma.category.update({ where: { id }, data })
    }

    remove(id: string){
        return this.prisma.category.delete({ where: { id }})
    }
}