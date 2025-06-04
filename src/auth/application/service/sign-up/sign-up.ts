import { IService } from "src/_core/application/service/service.interface";
import { SignUpEntry } from "./types/sign-up.entry";
import { SignUpResponse } from "./types/sign-up.response";
import { Result } from "src/_core/utils/result-handler/result.handler";
import { IRepoUser } from "src/user/application/repository/repository-user.interface";
import { IEncryptor } from "src/_core/application/encryptor/encryptor.interface";
import { IUUIDGenerator } from "src/_core/application/uuid-generator/uuid-generator.interface";

export class SignUp implements IService<SignUpEntry, SignUpResponse> {

    constructor(
        private readonly repo: IRepoUser,
        private readonly encryptor: IEncryptor,
        private readonly uuid: IUUIDGenerator
    ){}

    async execute(data: SignUpEntry): Promise<Result<SignUpResponse>> {
        const id = this.uuid.generate()
        const hashed = await this.encryptor.hash(data.password)
        // this.repo.createUser({})

        return Result.success({
            id: id
        })
    
    }

}