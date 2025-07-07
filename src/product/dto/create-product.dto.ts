import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  image?: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNumber()
  @IsOptional()
  promoPrice?: number;

  @IsArray()
  @IsOptional()
  permissions?: string[];

  @IsArray()
  @IsOptional()
  commands?: string[];

  @IsArray()
  @IsOptional()
  categoryIds?: string[];

  @IsArray()
  @IsOptional()
  serverIds?: string[];

  @IsString()
  qrcode: string;

  @IsString()
  paylink: string;

  @IsString()
  @IsOptional()
  slug?: string;
}
