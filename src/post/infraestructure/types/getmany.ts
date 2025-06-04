import { IsNumberString, IsOptional } from "class-validator";

export class GetManyPost {
     @IsOptional()
    @IsNumberString() // Para validar que el string es un número
    page?: string;

    @IsOptional()
    @IsNumberString()
    perPage?: string;
    
    @IsOptional()
    idUser?: string;
}