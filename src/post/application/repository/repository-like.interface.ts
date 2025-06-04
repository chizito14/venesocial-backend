import { Pagination } from "src/_core/infraestructure/pagination-dto/pagination-dto";
import { ILike } from "../entity/like-interface";
import { PostLikes } from "./types/post-like";

export interface IRepoLike { 
    findMany(
        entry: { 
            idUser?: string,
            idPost?: string 
        }, 
        pagination: Pagination ): Promise<PostLikes[]>
    createLike( entry: ILike ): Promise<void>
    deleteLike( entry: ILike ): Promise<void>
}