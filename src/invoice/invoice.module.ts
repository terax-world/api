import { Module } from "@nestjs/common";
import { InvoiceController } from "./invoice.controller";
import { InvoiceService } from "./invoice.service";
import { PrismaService } from "src/prisma/prisma.service";
import { RedisService } from "src/redis/redis.service";

@Module({
    controllers: [InvoiceController],
    providers: [InvoiceService, PrismaService, RedisService]
})

export class InvoiceModule {}