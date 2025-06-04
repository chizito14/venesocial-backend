import { Pagination } from "src/_core/infraestructure/pagination-dto/pagination-dto";
import { IUser } from "../entity/user.interface";
import { Result } from "src/_core/utils/result-handler/result.handler";
import { ReturnDtoUser } from "src/user/infraestructure/entity/repository/dto/userReturn-interface";

export interface IRepoUser { 

    findById(id: string ): Promise < Result<IUser> >

    findMany(pagination: Pagination ): Promise <ReturnDtoUser[]>

    createUser(entry: IUser ): Promise <Result <string>>

}