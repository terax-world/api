import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Controller('pay')
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService,
  ) {}

  @Post('link')
  async createPaymentLink(@Body() dto: CreatePaymentDto){
    const shortLink = await this.paymentService.generatePaymentLink(dto.slug)
    return { link: shortLink }
  }

  @Post('pix')
  async createPix(@Body() dto: CreatePaymentDto){
    return this.paymentService.generatePixQrCode(dto.slug)
  }
}
