import { Injectable, OnModuleDestroy } from "@nestjs/common";
import Redis from "ioredis";

@Injectable()
export class RedisService implements OnModuleDestroy {
    private publisher: Redis
    private subscriber: Redis
    
    constructor(){
        const redisUrl = `redis://:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
        this.publisher = new Redis(redisUrl)
        this.subscriber = new Redis(redisUrl)
    }

    getPublisher(): Redis {
        return this.publisher
    }

    getSubscriber(): Redis {
        return this.subscriber
    }

    async publish(channel: string, data: any) {
        await this.publisher.publish(channel, JSON.stringify(data))
    }

    subscribe(channel: string, callback: (data: any) => void) {
        this.subscriber.subscribe(channel)
        this.subscriber.on('message', (ch, message) => {
            callback(JSON.parse(message))
        })
    }

    onModuleDestroy() {
        this.publisher.disconnect()
        this.subscriber.disconnect()
    }
}