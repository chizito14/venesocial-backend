import { IService } from "src/_core/application/service/service.interface";

import { Result } from "src/_core/utils/result-handler/result.handler";
import { IRepoUser } from "src/user/application/repository/repository-user.interface";
import { IEncryptor } from "src/_core/application/encryptor/encryptor.interface";
import { IUUIDGenerator } from "src/_core/application/uuid-generator/uuid-generator.interface";
import { LogInEntry } from "./types/log-in.entry";
import { LogInResponse } from "./types/log-in.response";
import { IJWTGenerator } from "src/_core/application/jwt-generator/jwt-generator.interface";

export class LogIn implements IService<LogInEntry, LogInResponse> {

    constructor(
        private readonly repo: IRepoUser,
        private readonly encryptor: IEncryptor,
        private readonly jwt:IJWTGenerator
        
    ){}

    async execute(data: LogInEntry): Promise<Result<LogInResponse>> {
        const find = await this.repo.findByEmail(data.email)
        if (!find.isSuccess()) return Result.fail( new Error('Email no encontrado') )
        const password = await this.encryptor.compareHash(data.password, find.Value.password )
        if ( !password ) return Result.fail (new Error ('contraseña incorrecta'))
        return Result.success( { token: this.jwt.generate(   find.Value.idUser  ) })
        }


}