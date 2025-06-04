import { Body, Controller, Get, Inject, Logger, Post, Query, UseGuards } from "@nestjs/common";
import { Mongoose } from "mongoose";
import { IUUIDGenerator } from "src/_core/application/uuid-generator/uuid-generator.interface";
import { UUIDGenerator } from "src/_core/infraestructure/uuid-generator/uuid-generator";
import { IRepoPost } from "src/post/application/repository/repository-post.interface";
import { GetManyPost } from "../types/getmany";
import { OdmPost } from "../entity/odm-post";
import { OdmRepositoryPost } from "../repository/odm-post-repository";
import { CreatePostEntry } from "../types/createpost.entry";
import { JwtAuthGuard } from "src/auth/infraestructure/guards/jwt-auth.guard";
import { GetUser } from "src/auth/infraestructure/decorator/get-user.decorator";

@Controller('post')
export class PostController {
 
    private readonly PostRepo: IRepoPost
    private readonly uuid: IUUIDGenerator
    private readonly logger = new Logger('PostController')

    constructor(
        @Inject('NoSQL') mongo: Mongoose,
    ) {
        this.uuid = new UUIDGenerator()
        this.PostRepo = new OdmRepositoryPost(mongo)
    }
    
    @Get('find')
    @UseGuards(JwtAuthGuard)
    async findManyRecently( @Query() entry:GetManyPost  ){
        let page:number = 0
        let perPage:number = 10
        if (entry.page) page = parseInt(entry.page)
        if (entry.perPage) perPage = parseInt(entry.perPage)
        if (entry.idUser) {
            return await this.PostRepo.findMany( { idAuthor: entry.idUser, createdAt: new Date() } ,{ page: page, perPage: perPage } )
        } 
        return await this.PostRepo.findMany( { createdAt: new Date()  } ,{ page: page, perPage: perPage } )
    }


    @Post('') 
    @UseGuards(JwtAuthGuard)
    createPost(@Body() post: CreatePostEntry, @GetUser() user ){
        this.PostRepo.createPost({
            mediaUrlImage: [],
            mediaUrlVideo: [],
            caption:post.caption,
            createdAt:new Date(),
            idAuthor: "",
            idPost: this.uuid.generate(),
            likeCount: 0 
        }) 
    }

}
