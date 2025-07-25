import { Controller, Get } from "@nestjs/common";
import { RedisService } from "src/redis/redis.service";

@Controller('debug-invoice')
export class DebugController {
    constructor(
        private readonly redisService: RedisService
    ) { }

    @Get()
    async testEvent() {
        this.redisService.publish('invoice:update', {
            data: {
                status: 'PAID',
                nick: 'neveshardd'
            }
        });
        return { success: true }
    }

}