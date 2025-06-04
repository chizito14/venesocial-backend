import { Model, Mongoose } from "mongoose";
import { Pagination } from "src/_core/infraestructure/pagination-dto/pagination-dto";
import { IUser } from "src/user/application/entity/user.interface";
import { IRepoUser } from "src/user/application/repository/repository-user.interface";
import { Result } from "src/_core/utils/result-handler/result.handler";
import { DataUser } from "./dto/data-user";
import { OdmUser, OdmUserSchema } from "../entity/odm-user";

export class OdmRepositoryUser implements IRepoUser {
    
    private readonly model: Model<OdmUser>

    constructor( mongoose: Mongoose ) { 
        this.model = mongoose.model<OdmUser>('OdmUser', OdmUserSchema)
    }

    async findMany(entry: { username?: string, id?: string[] }, pagination: Pagination): Promise<DataUser[]> {
        const query: any = {}
        if (entry.username) query.username = new RegExp(entry.username, "i")
        if (entry.id && entry.id.length > 0) query.idUser = { $in: entry.id }
        const result = await this.model.find( query, {}, { skip: pagination.page, limit: pagination.perPage })
        let mapped: DataUser[] = []
        result.forEach( e => mapped.push(
            {
                idUser:e.idUser,
                username: e.username,
                email: e.email,
                fullName: e.fullName,
                bio: e.bio,
                profilePictureUrl: e.profilePictureUrl,
                isPrivate: e.isPrivate
            }
        ))
        return mapped
    }
    
    async findById(id: string): Promise<Result<IUser>> {
        const odm = await this.model.findOne( { idUser: id } )
        if (!odm) return Result.fail<IUser>(new Error('No fue encontrado'))
        return Result.success<IUser>(odm)
    }

    async findByEmail(email: string): Promise<Result<IUser>> {
        const odm = await this.model.findOne( { email: email } )
        if (!odm) return Result.fail<IUser>(new Error('No fue encontrado'))
        return Result.success<IUser>(odm)
    }


    async createUser(entry: IUser): Promise<Result<string>> {
        try {
            const odm = new this.model(entry)
            await this.model.create( odm )
        } catch (e) {
            return Result.fail(e)
        }    
        return Result.success(entry.idUser)
    }

    
   

}