import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): {message: string} {
    return {
      message: 'API for Terax.World Minecraft Network Server Ecosystem',
    }
  }
}
