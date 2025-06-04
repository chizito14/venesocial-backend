import { Pagination } from "src/_core/infraestructure/pagination-dto/pagination-dto";
import { IComment } from "src/post/application/entity/comment-interface";
import { IRepoComment } from "src/post/application/repository/repository-comment.-interface";
import { OdmComment, OdmCommentSchema } from "../entity/odm-comment";
import { Model, Mongoose } from "mongoose";
import { Result } from "src/_core/utils/result-handler/result.handler";

export class OdmRepositoryComment implements IRepoComment {
    
    private readonly model: Model<OdmComment>
    
        constructor( mongoose: Mongoose ) { 
            this.model = mongoose.model<OdmComment>('OdmPost', OdmCommentSchema)
        }
    
    async findMany(entry: {  idPost: string; createdAt: Date }, pagination: Pagination): Promise<IComment[]> {
        const query: any = {};
        query.idPost = entry.idPost;
        if (entry.createdAt) {
        query.createdAt = entry.createdAt;
        }

        const result = await this.model.find(query, {}, {
        skip: pagination.page,
        limit: pagination.perPage,
        sort: { createdAt: -1 }
        });

        return result.map((e: any) => ({
        idComment: e.idComment,
        idAuthor: e.idAuthor,
        idPost: e.idPost,
        text: e.text,
        createdAt: e.createdAt
        }));
    }
    

    async createComment(entry: IComment): Promise<Result <string>> {
        try {
      const createdComment = await this.model.create(entry);
      return Result.success(createdComment.idComment);
    } catch (error: any) {
      console.error("Error al crear comentario:", error);
      return Result.fail (  Error(`Fallo al crear comentario: ${error.message || 'Error desconocido'}`))
    }
  }

}
