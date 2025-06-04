import { Pagination } from "src/_core/infraestructure/pagination-dto/pagination-dto";
import { IComment } from "../entity/comment-interface";

export interface IRepoComment { 

    findMany( 
        entry: { 
            idUser?: string,
            idPost?: string 
        }, 
        pagination: Pagination 
    ): Promise <IComment[]>

    createComment(entry: IComment ): Promise <string>

}