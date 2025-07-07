import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateInvoiceDto {
  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsString()
  @IsNotEmpty()
  playerNick: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsString()
  @IsOptional()
  status?: string;

  @IsString()
  @IsOptional()
  mpTransactionId?: string;

  @IsString()
  @IsOptional()
  paymentLink: string;

  @IsString()
  paymentType: string;
}