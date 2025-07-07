import { Body, Controller, Delete, Get, Param, Patch, Post, Req } from "@nestjs/common";
import { InvoiceService } from "./invoice.service";
import { CreateInvoiceDto } from "./dto/create-invoice.dto";
import { UpdateInvoiceDto } from "./dto/update-invoice.dto";
import { MercadoPagoConfig, Payment } from 'mercadopago'
import { Request } from "express";

const mp = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!
})

const paymentClient = new Payment(mp)

@Controller('invoices')
export class InvoiceController {
  constructor(private readonly service: InvoiceService) {}

  @Post()
  create(@Body() dto: CreateInvoiceDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateInvoiceDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }

  @Post("/webhook")
  async webhook(@Req() req: Request) {
    const { type, data } = req.body;
    if (type === 'payment' && data?.id) {
      try {
        const payment = await paymentClient.get({ id: data.id });

        if (payment && payment.status) {
          const status = payment.status;

          await this.service.updateByTransaction(data.id, { 
            status,
            mpTransactionId: data.id
          });
        }
      } catch (error) {
        console.error('Erro ao verificar status do pagamento: ', error);
      }
    }
    return { received: true };
  }
}