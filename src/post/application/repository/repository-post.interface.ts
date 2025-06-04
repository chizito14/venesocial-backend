import { Pagination } from "src/_core/infraestructure/pagination-dto/pagination-dto";
import { IPost } from "../entity/post.interface";


export interface IRepoPost { 

    findById(id: string ): Promise <IPost>

    findMany(pagination: Pagination ): Promise <IPost[]>

    createPost(entry: IPost ): Promise <string>

}