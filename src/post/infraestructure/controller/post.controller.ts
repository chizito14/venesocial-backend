import { Controller, Inject, Logger } from "@nestjs/common";
import { Mongoose } from "mongoose";
import { IUUIDGenerator } from "src/_core/application/uuid-generator/uuid-generator.interface";
import { UUIDGenerator } from "src/_core/infraestructure/uuid-generator/uuid-generator";
import { IRepoPost } from "src/post/application/repository/repository-post.interface";

@Controller('post')
export class PostController {
 
    private readonly userRepo: IRepoPost
    private readonly uuid: IUUIDGenerator
    private readonly logger = new Logger('PostController')

    constructor(
        @Inject('NoSQL') mongo: Mongoose,
    ) {
        this.uuid = new UUIDGenerator()
    }
    
}