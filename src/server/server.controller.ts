import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from "@nestjs/common";
import { Server as ServerModel } from ".prisma/client";
import { ServerService } from "./server.service";
import { ProductService } from "src/product/product.service";

@Controller('servers')
export class ServerController {
    constructor(
        private readonly service: ServerService,
        private readonly productService: ProductService
    ){}

    @Get()
    async findAll(): Promise<ServerModel[]> {
        return this.service.servers({
            where: {}
        })
    }

    @Get(':id')
    async getServerById(@Param('id') id: string): Promise<ServerModel> {
        const server = await this.service.server({ id: String(id) })
        if(!server){
            throw new NotFoundException(`O Servidor com o id: "${id}" não existe.`)
        }
        return server
    }

    @Post()
    async createServer(
        @Body() serverData: { name: string; description?: string }
    ): Promise<ServerModel> {
        const { name } = serverData
        const serverName = await this.service.server({ name })
        if(serverName){
            throw new BadRequestException('Já existe um servidor com este nome!')
        }
        return this.service.createServer(serverData)
    }

    @Put(':id')
    async updateServer(@Param('id') id: string, @Body() data: { name?: string; description?: string }): Promise<ServerModel> {
        if (data.name){
            throw new BadRequestException(`Já existe um servidor com o nome ${data.name}!`)
        }

        return this.service.updateServer({
            where: { id: String(id) },
            data,
        })
    }

    @Delete(':id')
    async deleteServer(@Param('id') id: string): Promise<ServerModel> {
        const server = await this.service.server({ id: String(id)})

        if(!server){
            throw new NotFoundException(`O Servidor com o id: "${id}" não existe.`)
        }

        await this.productService.deleteProductByServerId(server.id)

        return this.service.deleteServer({ id: server.id })
    }

}