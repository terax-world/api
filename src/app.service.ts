import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): { message: string, author: string } {
    return {
      message: 'API Restful for Terax.World Minecraft Network Server.',
      author: 'https://github.com/neveshardd'
    }
  }
}
