import { OnGatewayInit, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";
import { RedisService } from "src/redis/redis.service";

@WebSocketGateway({ 
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: false
  } 
})
export class RealtimeGateway implements OnGatewayInit {
    @WebSocketServer()
    server: Server

    constructor(
        private readonly redis: RedisService
    ) {}

    afterInit() {
        this.redis.subscribe('product:update', (data) => {
      this.server.emit('product:update', data);
    });

    this.redis.subscribe('invoice:update', (data) => {
      this.server.emit('invoice:update', data);
    });
    }
}