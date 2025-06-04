import { Pagination } from "src/_core/infraestructure/pagination-dto/pagination-dto";
import { IComment } from "../entity/comment-interface";
import { Result } from "src/_core/utils/result-handler/result.handler";

export interface IRepoComment { 

    findMany( 
        entry: { 
            idPost: string,
            createdAt: Date
        }, 
        pagination: Pagination 
    ): Promise <IComment[]>

    createComment( entry: IComment ): Promise<Result<string>>

}