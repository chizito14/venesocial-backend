import { Controller, Get, Inject, Logger } from "@nestjs/common";
import { Mongoose } from "mongoose";
import { IRepoUser } from "src/user/application/repository/repository-user.interface";

@Controller('user')
export class UserController {
 
    private readonly userRepo: IRepoUser
    private readonly logger = new Logger('UserController')

    constructor(
        @Inject('NoSQL') mongo: Mongoose,
    ) {}

    @Get('find/username/')
    async findManyByUserName() {}
    
    @Get('find/id/')
    async findById() {}
    
}