import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateServerDto } from "./dto/create-server.dto";
import { UpdateServerDto } from "./dto/update-server.dto";

@Injectable()
export class ServerService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateServerDto) {
    return this.prisma.server.create({ data });
  }

  findAll() {
    return this.prisma.server.findMany();
  }

  findOne(id: string) {
    return this.prisma.server.findUnique({ where: { id } });
  }

  update(id: string, data: UpdateServerDto) {
    return this.prisma.server.update({ where: { id }, data });
  }

  remove(id: string) {
    return this.prisma.server.delete({ where: { id } });
  }
}