import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from "@nestjs/common";
import { Server as ServerModel } from ".prisma/client";
import { ServerService } from "./server.service";
import { ProductService } from "src/product/product.service";
import { MessagePattern } from "@nestjs/microservices";

@Controller('servers')
export class ServerController {
    constructor(
        private readonly service: ServerService,
        private readonly productService: ProductService
    ){}

    @MessagePattern({ cmd: 'findAllServers' })
    @Get()
    async findAll(): Promise<ServerModel[]> {
        return this.service.servers({
            where: {}
        })
    }

    @MessagePattern({ cmd: 'getServerById' })
    @Get(':id')
    async getServerById(@Param('id') id: string): Promise<ServerModel> {
        const server = await this.service.server({ id: String(id) })
        if(!server){
            throw new NotFoundException(`O servidor com o id: '${id}' não existe.`)
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
            throw new BadRequestException(`Já existe um servidor com o nome '${name}'.`)
        }
        return this.service.createServer(serverData)
    }

    @MessagePattern({ cmd: 'updateServerById' })
    @Put(':id')
    async updateServer(@Param('id') id: string, @Body() data: { name?: string; description?: string }): Promise<ServerModel> {
        const server = await this.service.server({ id: String(id) })
        if(!server){
            throw new BadRequestException(`Não existe nenhum servidor com o id: '${id}'`)
        }
        
        if (data.name){
            throw new BadRequestException(`Já existe um servidor com o nome '${data.name}'!`)
        }

        return this.service.updateServer({
            where: { id: String(id) },
            data,
        })
    }

    @MessagePattern({ cmd: 'deleteServerById' })
    @Delete(':id')
    async deleteServer(@Param('id') id: string): Promise<{ message: string }> {
        const server = await this.service.server({ id: String(id)})

        if(!server){
            throw new NotFoundException(`O servidor com o id: '${id}' não existe.`)
        }

        await this.productService.deleteProductByServerId(server.id)

        await this.service.deleteServer({ id: server.id })

        return { message: `Categoria '${server.name}' deletada com sucesso`}
    }

}