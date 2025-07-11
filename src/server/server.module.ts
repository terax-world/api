import { Module } from "@nestjs/common";
import { ServerController } from "./server.controller";
import { ServerService } from "./server.service";
import { PrismaService } from "src/prisma/prisma.service";
import { ProductService } from "src/product/product.service";

@Module({
    controllers: [ServerController],
    providers: [ServerService, PrismaService, ProductService]
})

export class ServerModule {}