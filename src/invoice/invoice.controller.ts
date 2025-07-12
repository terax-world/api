import { Body, Controller, Post, HttpException, HttpStatus, Get, Delete, Param } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('invoices')
export class InvoiceController {
  constructor(
    private readonly invoiceService: InvoiceService,
  ) { }

  @MessagePattern({ cmd: 'createInvoice' })
  @Post()
  async create(@Body() body: {
    productSlug: string;
    nick: string;
    paymentMethod: string;
  }): Promise<any> {
    try {
      const checkoutData = await this.invoiceService.createCheckoutPro({
        productSlug: body.productSlug,
        nick: body.nick,
        paymentMethod: body.paymentMethod,
      });
      return { 
        message: 'Checkout criado com sucesso',
        invoiceId: checkoutData.invoiceId, 
        checkoutData };
    } catch (error) {
      throw new HttpException('Erro ao criar checkout', HttpStatus.BAD_REQUEST);
    }
  }

  @MessagePattern({ cmd: 'getAllInvoices' })
  @Get()
  getAll() {
    return this.invoiceService.getAllInvoices();
  }

  @MessagePattern({ cmd: 'deleteInvoiceById'})
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.invoiceService.deleteInvoiceById(id);
  }
}