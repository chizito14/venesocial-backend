import { Controller, Get, Inject, Logger, Param, Query, UseGuards } from "@nestjs/common";
import { Mongoose } from "mongoose";
import { IRepoUser } from "src/user/application/repository/repository-user.interface";
import { GetManyUsers } from "../types/get-many-users";
import { JwtAuthGuard } from "src/auth/infraestructure/guards/jwt-auth.guard";
import { OdmRepositoryUser } from "../repository/odm-repo-user";

@Controller('user')
export class UserController {
 
    private readonly userRepo: IRepoUser
    private readonly logger = new Logger('UserController')

    constructor(
        @Inject('NoSQL') mongo: Mongoose,
    ) {
        this.userRepo = new OdmRepositoryUser(mongo)
    }

    @Get('find/username')
    @UseGuards(JwtAuthGuard)
    async findManyByUserName( @Query() entry: GetManyUsers ) {
        let page:number = 0
        let perPage:number = 10
        let username:string = ''
        if (entry.page) page = parseInt(entry.page)
        if (entry.perPage) perPage = parseInt(entry.perPage)
        if (entry.username) username = entry.username
        return await this.userRepo.findMany({
            username: username
        }, { page: page, perPage: perPage })
    }
    
    @Get('find/id/:id')
    @UseGuards(JwtAuthGuard)
    async findById( @Param('id') id: string ) {
        return (await this.userRepo.findById(id)).Value
    }
    
}