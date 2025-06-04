import { Model, Mongoose } from "mongoose"
import { IRepoLike } from "src/post/application/repository/repository-like.interface"
import { OdmLike, OdmLikeSchema } from "../entity/odm-like"
import { Pagination } from "src/_core/infraestructure/pagination-dto/pagination-dto"
import { ILike } from "src/post/application/entity/like-interface"
import { PostLikes } from "src/post/application/repository/types/post-like"
import { IRepoUser } from "src/user/application/repository/repository-user.interface"
import { OdmRepositoryUser } from "src/user/infraestructure/repository/odm-repo-user"

export class OdmLikeRepository implements IRepoLike {

    private readonly like: Model<OdmLike>
    private readonly user: IRepoUser
    
    constructor( mongoose: Mongoose ) { 
        this.like = mongoose.model<OdmLike>('OdmLike', OdmLikeSchema)
        this.user = new OdmRepositoryUser( mongoose )
    }

    async findMany(entry: { idUser?: string; idPost?: string }, pagination: Pagination): Promise<PostLikes[]> {
        const query: any = {}
        if (entry.idPost) query.idPost = new RegExp(entry.idPost, "i")
        if (entry.idUser) query.idUser = new RegExp(entry.idUser, "i")
        const result = await this.like.find(query, {}, {
            skip: pagination.page,
            limit: pagination.perPage,
            sort: { createdAt: -1 }
        })
        const userId: string[] = []
        result.forEach( e => { userId.push(e.idUser) })
        const users = await this.user.findMany({ id: userId }, pagination)
        const data: PostLikes[] = []
        users.forEach ( e => {
            data.push( {
                idUser: e.idUser,
                username: e.username,
                profilePictureUrl: e.profilePictureUrl,  
            })
        } )
        return data
    }
    
    async createLike(entry: ILike): Promise<void> {
        try {
            const odm = new this.like(entry)
            await this.like.create( odm )
        } catch (e) {}    
    }
    
    async deleteLike(entry: ILike): Promise<void> {
        try {
            const odm = this.like.findOneAndDelete({
                idPost: entry.idUser,
                idUser: entry.idUser
            })
        } catch (e) {}   
    }
    
}