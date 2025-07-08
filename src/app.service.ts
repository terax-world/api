import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): { message: string, autor: string } {
    return {
      message: 'API Restful for Terax.World Minecraft Network Server',
      autor: 'by @neveshardd in Github'
    }
  }
}
