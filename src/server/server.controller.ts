import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ServerService } from "./server.service";
import { CreateServerDto } from "./dto/create-server.dto";
import { UpdateServerDto } from "./dto/update-server.dto";

@Controller('servers')
export class ServerController {
  constructor(private readonly service: ServerService) {}

  @Post()
  create(@Body() dto: CreateServerDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateServerDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}