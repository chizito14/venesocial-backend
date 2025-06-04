import { Model, Mongoose } from "mongoose";
import { Pagination } from "src/_core/infraestructure/pagination-dto/pagination-dto";
import { Result } from "src/_core/utils/result-handler/result.handler";
import { IPost } from "src/post/application/entity/post.interface";
import { IRepoPost } from "src/post/application/repository/repository-post.interface";
import { OdmPost, OdmPostSchema } from "../entity/odm-post";

export class OdmRepositoryPost implements IRepoPost {
    
    private readonly model: Model<OdmPost>

    constructor( mongoose: Mongoose ) { 
        this.model = mongoose.model<OdmPost>('OdmPost', OdmPostSchema)
    }

    async findMany(entry: { idAuthor?: string }, pagination: Pagination): Promise<IPost[]> {
        const query: any = {};
        if (entry.idAuthor) query.idAuthor = new RegExp(entry.idAuthor, "i");

        const result = await this.model.find(query, {}, {
            skip: pagination.page,
            limit: pagination.perPage,
            sort: { createdAt: -1 }
        })

        return result.map(e => ({
            idPost: e.idPost,
            idAuthor: e.idAuthor,
            mediaUrlImage: e.mediaUrlImage,
            mediaUrlVideo: e.mediaUrlVideo,
            likeCount: e.likeCount,
            caption: e.caption,
            createdAt: e.createdAt
        }))
    }


    async findById(id: string): Promise<Result<IPost>> {
        const odm = await this.model.findOne( { idPost: id } )
        if (!odm) return Result.fail<IPost>(new Error('No fue encontrado'))
        return Result.success<IPost>(odm)
    }

    async createPost(entry: IPost): Promise<Result<string>> {
        try {
            const odm = new this.model(entry)
            await this.model.create( odm )
        } catch (e) {
            return Result.fail(e)
        }    
        return Result.success(entry.idPost)
    }   
}