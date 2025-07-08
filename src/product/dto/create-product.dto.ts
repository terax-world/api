import { IsArray, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateProductDto {
    @IsString()
    name: string

    @IsString()
    slug: string

    @IsOptional()
    @IsString()
    description?: string

    @IsString()
    categoryId: string

    @IsString()
    serverId: string

    @IsArray()
    permission: string[]

    @IsArray()
    commands: string[]

    @IsNumber()
    price: number

    @IsOptional()
    @IsNumber()
    promoPrice?: number

    @IsOptional()
    @IsString()
    image?: string

    @IsOptional()
    @IsNumber()
    duration?: number
}