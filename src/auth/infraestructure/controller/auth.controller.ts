import { Body, Controller, Inject, Logger, Post } from "@nestjs/common";
import { SignUpEntry } from "../types/sign-up.entry";
import { Mongoose } from "mongoose";
import { IRepoUser } from "src/user/application/repository/repository-user.interface";
import { SignUp } from "src/auth/application/service/sign-up/sign-up";
import { IUUIDGenerator } from "src/_core/application/uuid-generator/uuid-generator.interface";
import { IEncryptor } from "src/_core/application/encryptor/encryptor.interface";
import { UUIDGenerator } from "src/_core/infraestructure/uuid-generator/uuid-generator";
import { BcryptEncryptor } from "src/_core/infraestructure/encryptor/encryptor-brypt";
import { JwtService } from "@nestjs/jwt";
import { LogInEntry } from "src/auth/application/service/log-in/types/log-in.entry";
import { IJWTGenerator } from "src/_core/application/jwt-generator/jwt-generator.interface";
import { OdmRepositoryUser } from "src/user/infraestructure/repository/odm-repo-user";
import { JWTGenerator } from "src/_core/infraestructure/jwt-generator/jwt";
import { LogIn } from "src/auth/application/service/log-in/log-In";

@Controller('auth')
export class AuthController {
    
    private readonly userRepo: IRepoUser
    private readonly uuid: IUUIDGenerator
    private readonly encryptor: IEncryptor
    private readonly logger = new Logger('AuthController')
    private readonly jwtg: IJWTGenerator

    constructor(
        @Inject('NoSQL') mongo: Mongoose,
        private readonly jwt: JwtService
    ) {
        this.uuid = new UUIDGenerator()
        this.encryptor = new BcryptEncryptor()
        this.userRepo = new OdmRepositoryUser(mongo)
        this.jwtg = new JWTGenerator(jwt)
    }

    @Post('login')
    async logIn(@Body() entry: LogInEntry) {
        const service = new LogIn(
            this.userRepo,
            this.encryptor,
            this.jwtg
        )
        const result = await service.execute(entry)
        if(!result.isSuccess()) throw result.Error
        return result.Value
    }

    @Post('register')
    async signUp( @Body() entry: SignUpEntry ) {
        const service = new SignUp(
            this.userRepo,
            this.encryptor,
            this.uuid,
        )
        const result = await service.execute( entry )
        return result.Value
    }
    
}