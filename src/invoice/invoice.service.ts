import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateInvoiceDto } from "./dto/create-invoice.dto";
import { UpdateInvoiceDto } from "./dto/update-invoice.dto";

@Injectable()
export class InvoiceService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateInvoiceDto) {
    return this.prisma.invoice.create({ data });
  }

  findAll() {
    return this.prisma.invoice.findMany({ include: { product: true } });
  }

  findOne(id: string) {
    return this.prisma.invoice.findUnique({
      where: { id },
      include: { product: true },
    });
  }

  update(id: string, data: UpdateInvoiceDto) {
    return this.prisma.invoice.update({ where: { id }, data });
  }

  updateByTransaction(mpTransactionId: string, data: Partial<UpdateInvoiceDto>){
    return this.prisma.invoice.updateMany({
      where: { mpTransactionId },
      data,
    })
  }

  remove(id: string) {
    return this.prisma.invoice.delete({ where: { id } });
  }
}
