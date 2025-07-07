import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'API for Terax.World Minecraft Network Server Ecosystem';
  }
}
