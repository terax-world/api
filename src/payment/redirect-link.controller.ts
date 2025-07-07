import { Controller, Get, NotFoundException, Param, Res } from "@nestjs/common";
import { Response } from "express";
import { PrismaService } from "src/prisma/prisma.service";

// @Controller()
// export class RedirectLinkController{
//     constructor(private readonly prisma: PrismaService){}

//     @Get(':slug')
//     async redirectToPayment(@Param('slug') slug: string, @Res() res: Response){
//         const link = await this.prisma.paymentLink.findUnique({ where: { slug }});
//         if (!link) throw new NotFoundException('Link não encontrado.')

//         return res.redirect(link.url)
//     }
// }