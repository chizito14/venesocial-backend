import { IsNumberString, IsOptional } from "class-validator";

export class GetManyComment {
     @IsOptional()
    @IsNumberString() // Para validar que el string es un número
    page?: string;

    @IsOptional()
    @IsNumberString()
    perPage?: string;
    
    idPost: string;
}