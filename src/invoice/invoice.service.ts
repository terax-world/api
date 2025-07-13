import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { MercadoPagoConfig, Preference, Payment } from "mercadopago";
import * as dotenv from "dotenv";
import { RedisService } from "src/redis/redis.service";

dotenv.config();

@Injectable()
export class InvoiceService {
    private readonly logger = new Logger(InvoiceService.name);
    private readonly preference: Preference;
    private readonly payment: Payment;

    constructor(
        private prisma: PrismaService,
        private readonly redis: RedisService
    ) {
        const client = new MercadoPagoConfig({
            accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN!,
        });

        this.preference = new Preference(client);
        this.payment = new Payment(client);
    }

    async createCheckoutPro(data: {
        productSlug: string;
        nick: string;
        paymentMethod: string;
    }): Promise<{ invoiceId: string; qrcode?: string; link?: string }> {
        if (!data.productSlug || data.productSlug.trim() === '') {
            throw new Error('O slug do produto é obrigatório e não pode estar em branco');
        }

        if (!data.nick || data.nick.trim() === '') {
            throw new Error('O nick é obrigatório e não pode estar em branco');
        }

        if (!data.paymentMethod || data.paymentMethod.trim() === '') {
            throw new Error('O método de pagamento é obrigatório e não pode estar em branco');
        }

        const product = await this.prisma.product.findFirst({
            where: { slug: data.productSlug },
        });

        if (!product) {
            throw new Error(`Produto com slug '${data.productSlug}' não encontrado`);
        }

        if (data.paymentMethod === 'pix') {
            try {
                const res = await this.payment.create({
                    body: {
                        transaction_amount: Number(product.price),
                        payment_method_id: 'pix',
                        description: product.name,
                        external_reference: `terax_${data.nick}_${Date.now()}`,
                        payer: {
                            email: `${data.nick}@terax.world`,
                            first_name: data.nick,
                        },
                    },
                });

                const qrcode = res?.point_of_interaction?.transaction_data?.qr_code_base64;
                const link = res?.point_of_interaction?.transaction_data?.ticket_url;
                const transactionId = res?.id?.toString();

                if (!qrcode || !link || !transactionId) {
                    throw new Error('Erro ao gerar QR Code Pix');
                }

                const invoice = await this.prisma.invoice.create({
                    data: {
                        productId: product.id,
                        status: 'pending',
                        paymentMethod: 'pix',
                        amount: Number(product.price),
                        nick: data.nick,
                        transactionId,
                    },
                });

                return {
                    invoiceId: invoice.id,
                    qrcode,
                };
            } catch (error) {
                this.logger.error('Erro ao criar pagamento PIX:', error);
                throw error;
            }
        }

        try {
            const res = await this.preference.create({
                body: {
                    items: [
                        {
                            id: `${data.productSlug}-${Date.now()}`,
                            title: product.name,
                            quantity: 1,
                            currency_id: 'BRL',
                            unit_price: Number(product.price),
                        },
                    ],
                    payer: {
                        name: data.nick,
                        email: `${data.nick}@terax.world`,
                    },
                    external_reference: `terax_${data.nick}_${Date.now()}`,
                    back_urls: {
                        success: 'https://terax.world/success',
                        failure: 'https://terax.world/failure',
                        pending: 'https://terax.world/pending',
                    },
                    auto_return: 'approved',
                },
            });

            const invoice = await this.prisma.invoice.create({
                data: {
                    productId: product.id,
                    status: 'pending',
                    paymentMethod: data.paymentMethod,
                    amount: Number(product.price),
                    nick: data.nick,
                    transactionId: null,
                },
            });

            return {
                invoiceId: invoice.id,
                link: res.init_point!,
            };
        } catch (error) {
            this.logger.error('Erro ao criar preferência:', error);
            throw error;
        }
    }



    async getAllInvoices() {
        try {
            return await this.prisma.invoice.findMany({
                orderBy: {
                    createdAt: 'desc',
                },
            });
        } catch (error) {
            this.logger.error('Erro ao buscar invoices:', error);
            throw error;
        }
    }

    async updateInvoice(id: string, data: any) {
        await this.prisma.invoice.update({
            where: { id },
            data,
        });

        const updated = await this.prisma.invoice.findUnique({
            where: { id },
            include: {
                product: {
                    select: {
                        commands: true,
                        commandsRemove: true,
                        expiration: true
                    },
                },
            },
        });

        if (!updated) {
            throw new Error(`Invoice with id ${id} not found after update.`);
        }

        await this.redis.publish('invoice:update', {
            data: {
                id: updated.id,
                status: updated.status,
                nick: updated.nick,
            },
        });
    }

    async deleteInvoiceById(id: string) {
        try {
            const invoice = await this.prisma.invoice.findUnique({ where: { id } });

            if (!invoice) {
                throw new Error(`Invoice com ID ${id} não encontrada`);
            }

            await this.prisma.invoice.delete({ where: { id } });

            return { message: `Invoice ${id} deletada com sucesso` };
        } catch (error) {
            this.logger.error(`Erro ao deletar invoice ${id}:`, error);
            throw error;
        }
    }

    async handlePaymentWebhook(paymentId: string | number) {
        try {
            const payment = await this.payment.get({ id: paymentId })
            const status = payment.status
            const transactionId = payment.id?.toString()

            if (status !== 'approved') {
                this.logger.log(`Pagamento não aprovado, status: ${status}`)
                return
            }

            const invoice = await this.prisma.invoice.findFirst({
                where: { transactionId },
                include: { product: true }
            })

            if (!invoice) {
                this.logger.warn(`Invoice não encontrada para transactionId: ${transactionId}`)
                return
            }

            if (invoice.status === 'approved') {
                this.logger.log(`Invoice ${invoice.id} já está aprovada, ignorando webhook`)
                return
            }

            await this.prisma.invoice.update({
                where: { id: invoice.id },
                data: { status: 'approved' }
            })

            await this.redis.publish('invoice:update', JSON.stringify({
                id: invoice.id,
                status,
                nick: invoice.nick,
                commands: invoice.product.commands,
                commandsRemove: invoice.product.commandsRemove,
                expiration: invoice.product.expiration
            }))

            this.logger.log(`Pagamento ${status} atualizado para ${invoice.nick}`)
        } catch (error) {
            this.logger.log('Erro ao processar webhook: ', error)
            throw error
        }
    }


}