import { Pagination } from "src/_core/infraestructure/pagination-dto/pagination-dto";
import { IPost } from "../entity/post.interface";    
import { Result } from "src/_core/utils/result-handler/result.handler";

export interface IRepoPost { 
    findById( id: string ): Promise <Result<IPost>>
    findMany( 
        entry: { 
            idAuthor?: string,
            createdAt?: Date
        },
        pagination: Pagination ): Promise <IPost[]>
    createPost(entry: IPost ): Promise <Result<string>>

}