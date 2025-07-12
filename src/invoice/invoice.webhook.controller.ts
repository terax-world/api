import { Controller, Post, Req, Res } from "@nestjs/common";
import { InvoiceService } from "./invoice.service";
import { Request, Response } from "express";

@Controller('webhooks')
export class InvoiceWebhookController {
    constructor(
        private readonly invoiceService: InvoiceService
    ){}

    @Post('mercadopago')
    async handleWebhook(@Req() req: Request, @Res() res: Response) {
        try {
            const body = req.body

            if (body.type === 'payment'){
                const paymentId = body.data.id

                await this.invoiceService.handlePaymentWebhook(paymentId)
            }

            res.status(200).send('OK')
        } catch (error) {
            console.error('Erro no webhook: ', error)
            res.status(500).send('Erro interno')
        }
    }
}