import { Pagination } from "src/_core/infraestructure/pagination-dto/pagination-dto";
import { ILike } from "../entity/like-interface";


export interface IRepoLike { 

    findMany(
        entry: { 
            idUser?: string,
            idPost?: string 
        }, 
        pagination: Pagination ): Promise<ILike[]>
    createLike(entry: ILike ): Promise<string>

}