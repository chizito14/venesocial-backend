import { Pagination } from "src/_core/infraestructure/pagination-dto/pagination-dto";
import { IUser } from "../entity/user.interface";
import { Result } from "src/_core/utils/result-handler/result.handler";
import { DataUser } from "src/user/infraestructure/repository/dto/data-user";

export interface IRepoUser { 
    findById( id: string ): Promise < Result<IUser> >
    findByEmail( email: string ): Promise <Result<IUser> >
    findMany( entry: { username?: string, id?: string[] }, pagination: Pagination ): Promise <DataUser[]>
    createUser( entry: IUser ): Promise <Result <string>>
    updatePhoto(userId: string, photoPath: string): Promise<IUser> 

}