import { Body, Controller, Get, Inject, Logger, Post, Query, UseGuards } from "@nestjs/common";
import { Mongoose } from "mongoose";
import { IUUIDGenerator } from "src/_core/application/uuid-generator/uuid-generator.interface";
import { UUIDGenerator } from "src/_core/infraestructure/uuid-generator/uuid-generator";
import { IRepoComment } from "src/post/application/repository/repository-comment.-interface";
import { OdmRepositoryComment } from "../repository/odm-comment-repository";
import { JwtAuthGuard } from "src/auth/infraestructure/guards/jwt-auth.guard";
import { GetManyComment } from "../types/get-many-comment";
import { CreateComment } from "../types/create-comment.entry";
import { GetUser } from "src/auth/infraestructure/decorator/get-user.decorator";
import { IUser } from "src/user/application/entity/user.interface";
import { IRepoPost } from "src/post/application/repository/repository-post.interface";
import { OdmRepositoryPost } from "../repository/odm-post-repository";

@Controller('comment')
export class CommentController {
 
    private readonly CommentRepo: IRepoComment
    private readonly PostRepo: IRepoPost
    private readonly uuid: IUUIDGenerator
    private readonly logger = new Logger('CommentController')

    constructor(
        @Inject('NoSQL') mongo: Mongoose,
    ) {
        this.uuid = new UUIDGenerator()
        this.CommentRepo = new OdmRepositoryComment(mongo)
        this.PostRepo = new OdmRepositoryPost(mongo)
    }

    @Get('find')
    @UseGuards(JwtAuthGuard)
    async findManyRecently( @Query() entry: GetManyComment ){
        let page:number = 0
        let perPage:number = 10
        if (entry.page) page = parseInt(entry.page)
        if (entry.perPage) perPage = parseInt(entry.perPage)
        return await this.CommentRepo.findMany( { 
            idPost: entry.idPost,
            createdAt: new Date()  },
            { page: page, perPage: perPage } 
        )
    }   

    @Post('create')
    @UseGuards(JwtAuthGuard)
    async createComment( @Body() entry: CreateComment, @GetUser() user: IUser ){
        const find = await this.PostRepo.findById( entry.idPost )
        if (!find) throw new Error ('Post no registrado')
        await this.CommentRepo.createComment({
            createdAt: new Date(), 
            idComment: this.uuid.generate(),
            idAuthor: user.idUser ,
            ...entry
        })
    
    }   

}