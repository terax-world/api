import { Module } from "@nestjs/common";
import { DebugController } from "./debug.controller";
import { RealtimeGateway } from "./realtime.gateway";
import { RedisService } from "src/redis/redis.service";

@Module({
    controllers: [DebugController],
    providers: [RealtimeGateway, RedisService],
})
export class RealtimeModule {}