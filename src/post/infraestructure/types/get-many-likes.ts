import { IsNumberString, IsOptional } from "class-validator";

export class GetManyLikes {
     @IsOptional()
    @IsNumberString()
    page?: string;

    @IsOptional()
    @IsNumberString()
    perPage?: string;
 
    idPost: string
    
}