import { Module } from "@nestjs/common";
import { InvoiceService } from "./invoice.service";
import { PrismaService } from "src/prisma/prisma.service";
import { RedisService } from "src/redis/redis.service";
import { InvoiceWebhookController } from "./invoice.webhook.controller";
import { InvoiceController } from "./invoice.controller";

@Module({
    controllers: [InvoiceController, InvoiceWebhookController],
    providers: [InvoiceService, PrismaService, RedisService]
})

export class InvoiceModule {}