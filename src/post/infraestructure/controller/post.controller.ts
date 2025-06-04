import { Body, Controller, Get, Inject, Logger, Post, Query, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { Mongoose } from "mongoose";
import { IUUIDGenerator } from "src/_core/application/uuid-generator/uuid-generator.interface";
import { UUIDGenerator } from "src/_core/infraestructure/uuid-generator/uuid-generator";
import { IRepoPost } from "src/post/application/repository/repository-post.interface";
import { GetManyPost } from "../types/get-many";
import { OdmRepositoryPost } from "../repository/odm-post-repository";
import { CreatePostEntry } from "../types/create-post.entry";
import { JwtAuthGuard } from "src/auth/infraestructure/guards/jwt-auth.guard";
import { GetUser } from "src/auth/infraestructure/decorator/get-user.decorator";
import { FilesInterceptor } from "@nestjs/platform-express";
import { uploadFile } from "src/_core/infraestructure/firebase/firebase.storage.service";
import { IUser } from "src/user/application/entity/user.interface";

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

    @Post('create') 
    @UseGuards(JwtAuthGuard)
	@UseInterceptors(FilesInterceptor('media', 5))
    async createPost(
        @UploadedFile() files: Express.Multer.File[],
        @Body() post: CreatePostEntry, 
        @GetUser() user: IUser )
    {

        const imageUrls: string[] = []
        const videoUrls: string[] = []
        
        for (const file of files) {
            if (file.mimetype.startsWith('image/')) imageUrls.push(await uploadFile(file))
            else if (file.mimetype.startsWith('video/')) videoUrls.push(await uploadFile(file))
        }
        
        const result = await this.PostRepo.createPost({
            mediaUrlImage: imageUrls,
            mediaUrlVideo: videoUrls,
            caption: post.caption,
            createdAt: new Date(),
            idAuthor: user.idUser,
            idPost: this.uuid.generate(),
            likeCount: 0 
        }) 
        
        if (!result.isSuccess()) throw result.Error
        return result.Value
    }

}
