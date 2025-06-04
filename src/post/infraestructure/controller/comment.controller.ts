import { Controller, Get, Inject, Logger, Query, UseGuards } from "@nestjs/common";
import { Mongoose } from "mongoose";
import { IUUIDGenerator } from "src/_core/application/uuid-generator/uuid-generator.interface";
import { UUIDGenerator } from "src/_core/infraestructure/uuid-generator/uuid-generator";
import { IRepoComment } from "src/post/application/repository/repository-comment.-interface";
import { OdmRepositoryComment } from "../repository/odm-comment-repository";
import { JwtAuthGuard } from "src/auth/infraestructure/guards/jwt-auth.guard";
import { GetManyComment } from "../types/getmanycomment";

@Controller('comment')
export class CommentController {
 
    private readonly CommentRepo: IRepoComment
    private readonly uuid: IUUIDGenerator
    private readonly logger = new Logger('CommentController')

    constructor(
        @Inject('NoSQL') mongo: Mongoose,
    ) {
        this.uuid = new UUIDGenerator()
        this.CommentRepo = new OdmRepositoryComment(mongo)
    }

    @Get('find')
    @UseGuards(JwtAuthGuard)
        async findManyRecently( @Query() entry:GetManyComment   ){
            let page:number = 0
            let perPage:number = 10
            if (entry.page) page = parseInt(entry.page)
            if (entry.perPage) perPage = parseInt(entry.perPage)
            return await this.CommentRepo.findMany( { 
                idPost: entry.idPost,
                createdAt: new Date()  },
            { page: page, perPage: perPage } )
    }   


}