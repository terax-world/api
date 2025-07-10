import { Prisma, Server } from ".prisma/client";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ServerService {
    constructor(
        private prisma: PrismaService
    ){}

    async server(
        serverWhereUniqueInput: Prisma.ServerWhereUniqueInput,
    ): Promise<Server | null> {
        return this.prisma.server.findUnique({
            where: serverWhereUniqueInput,
        })
    }

    async servers(params: {
        skip?: number
        take?: number
        cursor?: Prisma.ServerWhereUniqueInput
        where?: Prisma.ServerWhereInput
        orderBy?: Prisma.ServerOrderByWithRelationInput
    }): Promise<Server[]> {
        const { skip, take, cursor, where, orderBy } = params
        return this.prisma.server.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy
        })
    }

    async createServer(data: Prisma.ServerCreateInput): Promise<Server> {
        return this.prisma.server.create({
            data
        })
    }

    async updateServer(params: {
        where: Prisma.ServerWhereUniqueInput
        data: Prisma.ServerUpdateInput
    }): Promise<Server> {
        const { where, data } = params
        return this.prisma.server.update({
            data,
            where
        })
    }

    async deleteServer(where: Prisma.ServerWhereUniqueInput): Promise<Server> {
        return this.prisma.server.delete({
            where
        })
    }
}