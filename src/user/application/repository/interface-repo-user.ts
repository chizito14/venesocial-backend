import { Pagination } from "src/_core/infraestructure/pagination-dto/pagination-dto";
import { IUser } from "../entity/user.interface";




export interface IRepoUser { 

    findById(id: string ): Promise <IUser>

    findMany(pagination: Pagination ): Promise <IUser[]>

    createUser(entry: IUser ): Promise <string>

}