import { IsNumberString, IsOptional, IsString } from "class-validator";

export class GetManyUsers {
     @IsOptional()
    @IsNumberString() // Para validar que el string es un número
    page?: string;

    @IsOptional()
    @IsNumberString()
    perPage?: string;
    
    @IsOptional()
    @IsString()
    username?: string;
}