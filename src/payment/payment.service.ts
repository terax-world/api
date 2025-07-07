import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { MercadoPagoConfig, Preference, Payment } from 'mercadopago';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PaymentService {
  private readonly preference: Preference;
  private readonly payment: Payment;

  constructor(private readonly prisma: PrismaService) {
    const client = new MercadoPagoConfig({
      accessToken: process.env.MP_ACCESS_TOKEN!,
    });

    this.preference = new Preference(client);
    this.payment = new Payment(client);
  }

  async generatePaymentLink(slug: string) {
    const product = await this.prisma.product.findUnique({
      where: { slug },
    })

    if(!product){
      throw new NotFoundException('Produto não encontrado');
    }

    const preferenceBody = {
      items: [
        {
          id: product.id.toString(),
          title: `Produto ${product.name}`,
          quantity: 1,
          unit_price: product.price,
          currency_id: 'BRL',
        },
      ],
      back_urls: {
        success: `https://pay.terax.world/success?productId=${product.id}`,
        failure: `https://pay.terax.world/failure?productId=${product.id}`,
        pending: `https://pay.terax.world/pending?productId=${product.id}`,
      },
      auto_return: 'approved',
    };

    const response = await this.preference.create({ body: preferenceBody });

    const shortId = randomUUID().slice(0, 8)

    if(!response.init_point){
      throw new Error('Não foi possível gerar o link de pagamento.')
    }

    await this.prisma.paymentLink.create({
      data: {
        slug: shortId,
        url: response.init_point,
      },
    })
    //return `${process.env.ACCESS_URL}/${shortId}`;
    return response.init_point
  }

  async generatePixQrCode(slug: string) {
    const product = await this.prisma.product.findUnique({
      where: { slug },
    })

    if(!product){
      throw new NotFoundException('Produto não encontrado');
    }

    const paymentBody = {
      transaction_amount: product.price,
      description: `Produto ${product.name}`,
      payment_method_id: 'pix',
      payer: {
        email: 'player@terax.world',
        first_name: 'Player',
        last_name: 'Client',
        identification: {
          type: 'CPF',
          number: '08056566180',
        },
      },
    };

    const response = await this.payment.create({ body: paymentBody });

    return {
      qr_code: response.point_of_interaction?.transaction_data?.qr_code,
      qr_code_base64: response.point_of_interaction?.transaction_data?.qr_code_base64,
      payment_id: response.id,
      status: response.status,
    };
  }
}
