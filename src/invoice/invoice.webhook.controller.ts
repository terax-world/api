import { Controller, Post, Req, Res, Logger } from "@nestjs/common";
import { InvoiceService } from "./invoice.service";
import { Request, Response } from "express";

@Controller('webhooks')
export class InvoiceWebhookController {
    private readonly logger = new Logger(InvoiceWebhookController.name);

    constructor(
        private readonly invoiceService: InvoiceService
    ) {}

    @Post('mercadopago')
    async handleWebhook(@Req() req: Request, @Res() res: Response) {
        try {
            const body = req.body;

            if (!body || body.type !== 'payment' || !body.data || !body.data.id) {
                this.logger.warn('Webhook inválido recebido: ', body);
                return res.status(400).send('Dados inválidos');
            }

            const paymentId = body.data.id;

            await this.invoiceService.handlePaymentWebhook(paymentId);

            res.status(200).send('OK');
        } catch (error) {
            this.logger.error('Erro no processamento do webhook: ', error);
            res.status(500).send('Erro interno');
        }
    }
}
