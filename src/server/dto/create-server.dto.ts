import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateServerDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  image?: string;
}