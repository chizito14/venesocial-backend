import { Pagination } from "src/_core/infraestructure/pagination-dto/pagination-dto";
import { ILike } from "../entity/like-interface";


export interface IRepoLike { 

    findById(id: string ): Promise <ILike>

    findMany(pagination: Pagination ): Promise <ILike[]>

    createLike(entry: ILike ): Promise <string>

}